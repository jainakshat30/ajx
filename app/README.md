# Distributed Job Orchestrator (Temporal-lite)

![CI](https://github.com/jainakshat30/job-orchestrator/actions/workflows/ci.yml/badge.svg)

![A worker is killed mid-job and another finishes it](./media/crash-recovery.gif)

*One unedited run of `npm run demo`, at real speed — a job is submitted over
HTTP, a worker commits two steps, that exact worker is `SIGKILL`ed, and th
surviving worker waits out the dead lease and finishes the job. The last table
is `step_attempts`: four steps, four successful attempts, and the worker column
changing part-way down. Recorded with `LEASE_SECONDS=6` to keep it under 20
seconds; [the shipped default is 30s](./src/engine/claim.ts), which would only
make the wait in step 4 longer.*

A workflow engine: you define multi-step jobs — with retries, timeouts, and
dependencies — as code, and a pool of workers executes them **reliably**, even
if a worker crashes in the middle of a job. Most systems that need durable
background work fake it with a single `setTimeout()`, which silently loses
everything on restart. This one doesn't: workers persist progress after every
step, so if one dies mid-job, another resumes exactly where it left off.

Think of it as a small, from-scratch version of [Temporal](https://temporal.io/)
or [AWS Step Functions](https://aws.amazon.com/step-functions/).

---

## The code map

Two entry points — [`src/server.ts`](./src/server.ts) and
[`src/worker.ts`](./src/worker.ts) — sharing everything under `src/`. They never
talk to each other; Postgres is the only thing between them.

| File | What lives there |
|------|------------------|
| [`src/server.ts`](./src/server.ts) | The API. `POST /jobs` validates and stores; `GET /jobs/:id` and `GET /jobs/:id/attempts` read state back. Runs nothing. |
| [`src/worker.ts`](./src/worker.ts) | The loop: claim a job → pick the next runnable step → run it → persist → decide → repeat. Holds no state worth losing. |
| [`src/dag/validate.ts`](./src/dag/validate.ts) | Zod shape check, unknown-dependency check, Kahn's-algorithm cycle detection. The only gate into the database. |
| [`src/engine/claim.ts`](./src/engine/claim.ts) | Atomic claiming (`FOR UPDATE SKIP LOCKED`) and the lease: 30s, renewed in the background, expiring the moment a worker dies. |
| [`src/engine/runStep.ts`](./src/engine/runStep.ts) | Handler lookup, raced against the step's `timeoutMs`. |
| [`src/engine/persist.ts`](./src/engine/persist.ts) | Every state transition, each one a single transaction. Persist before you proceed. |
| [`src/engine/retry.ts`](./src/engine/retry.ts) | Exponential backoff with jitter, and the decision of whether attempts remain. |
| [`src/db/schema.ts`](./src/db/schema.ts) | `jobs`, `steps`, `step_attempts` — plus `charges`, which stands in for a payment gateway's own storage. |
| [`src/handlers/index.ts`](./src/handlers/index.ts) | The registered step handlers. A DAG can only name something in here — this folder is the extension point. |
| [`src/handlers/payments.ts`](./src/handlers/payments.ts) | The fake gateway. Dedups on an idempotency key, which is what makes a retried charge safe. |
| [`src/bench.ts`](./src/bench.ts) | The measurements below: throughput, retry success rate, recovery time. Reports, never asserts. |
| [`src/chaos.ts`](./src/chaos.ts) | 100 killed-worker trials that *assert* zero lost and zero duplicated steps. Exits non-zero if either breaks. |
| [`src/harness.ts`](./src/harness.ts) | The worker-process pool those drive, so a job can be killed by name. |
| [`src/demo.ts`](./src/demo.ts) | The crash-recovery demo as one command — what the recording above is. |
| [`tests/`](./tests) | Six suites, including the automated crash drill. Run on every push. |
| [`examples/`](./examples) | One valid DAG and two deliberately broken ones. |

---

## Quick start

```bash
# 1. Start Postgres
docker compose up -d

# 2. Install dependencies
npm install

# 2b. Optional -- only if you want to change a default
cp .env.example .env

# 3. Create the tables
npm run migrate

# 4. Start the API server (accepts jobs, serves status)
npm run server

# 5. Start one or more workers (each in its own terminal)
npm run worker
npm run worker   # run a second one to see the pool in action

# 6. Submit a sample job
npm run seed     # prints the job id
```

Everything defaults to `postgres://postgres:postgres@localhost:5432/postgres`
and port `3000`, so a fresh clone runs with no configuration at all.
[`.env.example`](./.env.example) documents every knob that exists; copy it to
`.env` to override one. It's loaded by Node itself — no `dotenv` dependency —
and a missing `.env` is the normal case.

`npm run seed` is just a `curl` with nicer output — `POST /jobs` is the only way
in, so the API validates every job no matter who submits it:

```bash
# The content-type header is required; without it Express hands the route an
# empty body and the DAG is rejected as malformed.
curl -X POST localhost:3000/jobs \
  -H 'content-type: application/json' \
  -d @examples/hello-dag.json

# Watch it run, then read back every attempt of every step
curl -s localhost:3000/jobs/<job-id>
curl -s localhost:3000/jobs/<job-id>/attempts
```

The two broken examples are there to be rejected — `examples/bad-cycle.json` and
`examples/bad-missing-dep.json` each come back as a `400` naming the problem:

```bash
npm run seed examples/bad-cycle.json
```

Run the tests with `npm test` (every suite but `dag` and `retry` needs Postgres
up), the measurements with `npm run bench`, and the 100-trial durability proof
with `npm run chaos`. The last two take minutes and stay out of CI. `npm run check` lints and checks
formatting (`npm run check:fix` applies both), `npm run typecheck` runs `tsc`.
CI runs all three on every push.

---

## The one demo that proves it works

Kill a worker mid-job and watch a different one finish it, without redoing the
steps that were already done.

### By hand, in four terminals

```bash
# 1. A short lease, so you don't spend 30 seconds watching nothing happen
export LEASE_SECONDS=6

# 2. terminal 1 -- the API
npm run server

# 3. terminal 2 -- the first worker
npm run worker

# 4. terminal 3 -- submit a job and note the id
npm run seed
```

Terminal 2 starts printing `Running step: create_account`. Each of those steps
sleeps for four seconds, which is your window:

```bash
# 5. terminal 2 -- Ctrl+C it, hard, part-way through a step.
#    Nothing is released: no lease handback, no cleanup.

# 6. terminal 4 -- start a second worker
npm run worker

# 7. terminal 4 -- watch. For up to six seconds it says "No job to run": the
#    dead worker's lease has not expired yet, so the job is still legally
#    someone else's. Then it claims the job and resumes at the step that was
#    interrupted -- the completed ones are never re-run.

# 8. terminal 3 -- the receipt
curl -s localhost:3000/jobs/<job-id>/attempts
```

Every completed step has exactly one `SUCCEEDED` attempt, and the `workerId`
column changes part-way down the list. That column is the proof: two different
processes ran this job, and neither repeated the other's work.

### As one command

```bash
npm run demo
```

That is what the recording at the top of this page shows: it starts the API and
two named workers, submits the job, kills whichever worker claimed it, and
prints `step_attempts` at the end. Roughly 18 seconds.

### As a test

```bash
npx tsx tests/recovery.test.ts
```

Same drill without the terminals — it `SIGKILL`s a worker's process group
mid-step, starts another, and then asserts from rows alone that nothing was lost,
nothing ran twice, two workers were involved, and the card was charged once. It
runs on every push.

---

## Measured

Every number below came out of `npm run bench` and `npm run chaos` on an
M-series laptop against Postgres 16 in Docker. Both are scripts, not one-off
runs — re-run them and you get your own numbers. Nothing here is rounded up or
picked from a good run.

**On the lease:** the shipped default is **30 seconds**
([`src/engine/claim.ts`](./src/engine/claim.ts)). The benchmark and chaos
scripts override it to 3s *for the worker processes they spawn*, purely so a
hundred trials don't take an hour — the application default is untouched. So
the recovery figure below is measured at a 3s lease and scales with it: at the
30s default, expect roughly 30s plus the same small overhead.

| Metric | Measured | How it was measured |
|--------|----------|---------------------|
| Throughput, end to end | **79.6 jobs/sec** | 200 trivial single-step jobs, 3 workers already running, 2.5s from first submit to last `COMPLETED` (0.5s of it serial client-side submission) |
| Throughput, pool working | **283.3 jobs/sec** | The same run, timed from first attempt to last using the database's own clock: 0.7s |
| Retry success rate | **100% (37/37)** | 40 jobs, `maxAttempts=3`, failure counts shuffled across 0/1/2/5 |
| Dead-lettered on purpose | **3/3** | The three jobs given 5 failures against `maxAttempts=3` |
| Recovery after a killed worker | **2.4s–4.5s** (10 trials, **3s lease**) | Worker killed the instant it committed step 1, timed until a *different* worker owned the job |
| Killed-worker durability | **100/100 trials, 0 lost, 0 duplicated** | 400 jobs × 6 steps, 4 workers, a worker killed and replaced 100 times mid-job |

Four things worth knowing before trusting any of these:

- **The two throughput figures are the same run.** An idle worker sleeps 2s
  between polls, so up to 2s of that 2.5s wall-clock window is a worker that
  simply hadn't woken up yet. 79.6/sec is the pessimistic end-to-end number
  including that latency; 283.3/sec is the rate the pool actually clears work
  once it's awake. The honest summary is "~80/sec end to end, ~280/sec once
  warm" — not one of them on its own.
- **Throughput is orchestrator overhead, not real work.** The benchmark's steps
  return instantly, so this is the cost of claiming, checking dependencies and
  committing two transactions per step. Any handler doing real I/O dominates it
  completely. Single-step jobs are the worst case, since a claim is per-job and
  can't be amortised across steps.
- **Recovery time is mostly the lease, and the lease is a config value.**
  Measured at `LEASE_SECONDS=3`, it is the lease still remaining when the worker
  died (0–3s, since it renews every 1s) plus up to 2s for an idle worker's next
  poll. **The shipped default is 30s**, so a production-configured deployment
  recovers in roughly 30s, not 2.4s — quote the number with its lease attached
  or it means nothing. That trade is the whole knob: a long lease tolerates slow
  workers, a short one recovers faster from dead ones.
- **"0 duplicated" means no step was *committed* twice.** A step may well have
  executed twice in the world after a crash — at-least-once says so, and it's
  why `chargeCard` dedupes on an idempotency key. What never happened is a
  worker re-running work another had already recorded as done.

The chaos script asserts rather than reports: it exits non-zero if any job is
lost or any step has two `SUCCEEDED` attempts. Verified by running it against a
backlog too small to sustain 40 kills, which exits 1 with
`only managed 0 of 40 kills`.

---

## Project status

🟢 **M1–M4 done — the MVP runs end to end.** A submitted DAG executes in
dependency order, every step is persisted before the next one starts, a killed
worker's job is picked up by another after its lease expires, and a failing step
retries with backoff before dead-lettering.

**Built:**

| Milestone | What works | Where |
|-----------|-----------|-------|
| **M1** — data model & DAG format | `jobs` / `steps` / `step_attempts` migrations; Zod shape check, unknown-dependency check, and Kahn's-algorithm cycle detection; a bad graph is a `400`, never a stored job | `src/db/schema.ts`, `src/dag/validate.ts` |
| **M2** — durable sequential execution | `POST /jobs` → worker claims → runs the next step whose dependencies all succeeded → commits the attempt row and the step row in one transaction → repeats | `src/server.ts`, `src/worker.ts`, `src/engine/persist.ts` |
| **M3** — crash recovery | Atomic claiming with `FOR UPDATE SKIP LOCKED`, 30s leases renewed in the background, expired leases reclaimable; a resuming worker skips `SUCCEEDED` steps, and the idempotency key is derived from the step id so a re-run mid-flight step can't double-charge | `src/engine/claim.ts`, `src/handlers/payments.ts` |
| **M4** — retries, timeouts & DLQ | Each handler raced against its `timeoutMs`; failures get exponential backoff with jitter (capped at 30s) written to `next_run_at`, so the retry window survives the worker that set it; out of attempts → job `DEAD_LETTER` with its full error history | `src/engine/runStep.ts`, `src/engine/retry.ts` |
| Observability | `GET /jobs/:id` for live state, `GET /jobs/:id/attempts` for every attempt of every step, oldest first | `src/server.ts` |

**Six suites, run on every push** by [CI](.github/workflows/ci.yml) against a
throwaway Postgres — `npm test`:

| Suite | What it pins down |
|-------|-------------------|
| `dag` | Bad shapes, unknown dependencies and cycles are each rejected with their own message |
| `retry` | The backoff curve, its jitter window, and the 30s cap that stops `2**n` overflowing `setTimeout` |
| `idempotency` | One key charges once across 7 calls; a different key still charges |
| `claim` | 6 workers × 15 rounds never claim the same job, and a row another transaction holds is skipped, not waited on |
| `retry-flow` | Submitted over real HTTP `POST /jobs`: a transient failure heals in 3 attempts with backoff that visibly grows (~1.2s then ~2.1s), a permanent one dead-letters after 2 with its errors intact |
| `recovery` | **The headline demo, automated.** A worker is `SIGKILL`ed mid-step; another finishes the job, no completed step re-runs, and the card is charged exactly once |

`recovery` is the one that matters. It kills a real worker process — no cleanup,
no lease release, the way a power cut works — then asserts from rows alone that
two different workers touched the job and nothing was lost or repeated.

**Not done yet:**

- **Advanced tier untouched:** parallel steps within a job (independent branches
  of a diamond still run one at a time), the dead-letter dashboard, worker
  autoscaling, and cron triggers.
- **No replay.** A dead-lettered job keeps its full error history but there is no
  way to put it back on the queue short of resubmitting it.
- **Single Postgres.** No read replicas, no partitioning of `step_attempts`,
  and the claim query is one `SELECT ... FOR UPDATE SKIP LOCKED` against one
  table — fine at this scale, the first thing to look at beyond it.

Steps are never written as `RUNNING` and jobs never as `FAILED` — both go
straight to their terminal state. Deliberate (a crashed worker would strand a
step in `RUNNING` with nothing to clear it), but it's a divergence from the
lifecycle in the data model.