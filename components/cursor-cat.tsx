"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// desktop-pointer-only decoration — keep the lottie engine out of everyone else's bundle
const Lottie = dynamic(() => import("lottie-react").then((m) => m.LottieLight), { ssr: false });

// All tunable values live here — tune visually against the live site.
const CONFIG = {
  follow: 0.05, // base ease toward target when it's right on the cursor
  followExcited: 0.08, // ...a little quicker when excited
  followPerPx: 0.0004, // extra ease per px of distance — gentle, just enough to lean in
  followMax: 0.16, // cap on the ease factor
  maxStep: 7.5, // px/frame hard speed cap — this is what makes it chase, not teleport
  maxStepExcited: 12, // ...when excited it sprints a little
  cursorSmooth: 0.4, // glowing target lerp toward real pointer (stays responsive)
  velScale: 2.6, // how far the cat trails behind along velocity
  velClamp: 52, // px cap on that trailing offset
  maxLean: 14, // deg
  offsetY: 34, // cat trails below the bowl, looking up at it — never under the cursor
  idleDelay: 1500, // ms still -> IDLE
  sleepDelay: 3800, // ms still -> SLEEPING
  excitedMs: 650, // EXCITED reaction length
  clickMs: 200, // CLICKING reaction length
  trailMinSpeed: 0.5, // px/frame before pawprints appear
  trailGap: 55, // ms between pawprints
  fastSpeak: 32, // pointer px/frame that counts as "too fast"
  sayMs: 2800, // how long a speech bubble stays up
  sayCooldown: 2200, // min ms between bubbles
  cursorSize: 30,
  catSize: 44, // rendered cat height; the lottie canvas is scaled around it
  catCanvas: 3.7, // the cat fills ~1/3.7 of its 400x300 lottie canvas
  feederSize: 104, // the big bowl parked in the bottom-right corner
  feederRight: 30,
  feederBottom: 30,
  feederPad: 16, // how far outside the bowl still counts as "cursor is on the food"
  eatRange: 40, // px from the bowl before the cat actually tucks in
  eatSayMin: 2000, // a new line every 2-3s while it eats
  eatSayMax: 3000,
  eatFullMs: 10000, // after this much eating he's had enough and wants a walk
  speed: { following: 1, idle: 0.55, hover: 1.5, excited: 1.9, click: 1.5, sleeping: 0.25, eating: 1.4 },
};

const FAST = ["heyyyy slow down!", "woah, too fast!", "slow down for me!", "i can't keep up 😿"];
const pickFast = () => FAST[(Math.random() * FAST.length) | 0];

const NAME = "daemon"; // the cat's name — it also labels the bowl

const EAT = [
  "nom nom nom",
  "*crunch crunch*",
  "this is SO good",
  "best human ever",
  "10/10 would eat again",
  "purrrrr",
  "don't take it away",
  "just five more bites",
  "ok maybe ten more",
  "daemon is pleased",
];
const FULL = "i'm full, let's go for a walk";

// a bowl of kibble — the cursor, and the big one in the corner
const Bowl = () => (
  <svg viewBox="0 0 26 26" width="100%" height="100%">
    <ellipse cx="13" cy="19" rx="11" ry="4.2" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
    <path d="M4 16.5 A9 9 0 0 0 22 16.5 Z" fill="oklch(0.24 0.006 255)" stroke="var(--accent)" strokeWidth="1" />
    <g fill="var(--accent)">
      <circle cx="9.5" cy="14.6" r="2" />
      <circle cx="13.4" cy="13.2" r="2.2" />
      <circle cx="17" cy="15" r="1.9" />
      <circle cx="11.4" cy="11.6" r="1.7" />
      <circle cx="15.4" cy="10.9" r="1.5" />
    </g>
  </svg>
);

const HIT = 'a,button,input,textarea,select,[role="button"],[data-cat]';

type State = keyof typeof CONFIG.speed;

export function CursorCat() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<State>("following");
  const layerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const feederRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (fine.matches && !reduce.matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const layer = layerRef.current!;
    const cursorEl = cursorRef.current!;
    const catEl = catRef.current!;
    const leanEl = leanRef.current!;
    const trailEls = Array.from(trailRef.current!.children) as HTMLElement[];
    const bubbleEl = bubbleRef.current!;
    const feederEl = feederRef.current!;

    document.documentElement.classList.add("cat-active");

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const dot = { ...pointer };
    const prevDot = { ...pointer };
    const cat = { ...pointer };
    const vel = { x: 0, y: 0 };

    let started = false;
    let lastMove = performance.now();
    let lastTrail = 0;
    let trailIdx = 0;
    const prevCat = { ...cat };
    let clickUntil = 0;
    let excitedUntil = 0;
    let hoverType: string | null = null;
    let lastHoverEl: Element | null = null;
    let lastSection: Element | null = null;
    let current = "";
    let raf = 0;

    let sayUntil = 0;
    let sayCooldownUntil = 0;
    let fastQuietUntil = 0;
    let eatIdx = 0;
    let ateSince = 0; // when the current sitting started
    let full = false; // stays true until the pointer leaves the bowl

    // the bowl is fixed, so its box only moves when the viewport does
    const feeder = { x: 0, y: 0, l: 0, r: 0, t: 0, b: 0 };
    const measure = () => {
      const box = feederEl.getBoundingClientRect();
      const p = CONFIG.feederPad;
      feeder.x = box.left - CONFIG.catSize * 0.34; // the cat eats from the near rim
      feeder.y = box.top + box.height * 0.6;
      feeder.l = box.left - p;
      feeder.r = box.right + p;
      feeder.t = box.top - p;
      feeder.b = box.bottom + p;
    };
    measure();

    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));

    const say = (text: string, gap = CONFIG.sayCooldown, force = false) => {
      const now = performance.now();
      if (!force && now < sayCooldownUntil) return;
      bubbleEl.textContent = text;
      catEl.dataset.say = "true";
      sayUntil = now + CONFIG.sayMs;
      sayCooldownUntil = now + gap;
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      lastMove = performance.now();
      if (!started) {
        started = true;
        dot.x = prevDot.x = cat.x = prevCat.x = pointer.x;
        dot.y = prevDot.y = cat.y = prevCat.y = pointer.y;
        layer.dataset.visible = "true";
      }
    };
    const onDown = () => {
      clickUntil = performance.now() + CONFIG.clickMs;
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.(HIT) as HTMLElement | null;
      hoverType = el ? el.dataset.cat || "interactive" : null;
      if (el && el !== lastHoverEl && (hoverType === "project" || hoverType === "primary")) {
        excitedUntil = performance.now() + CONFIG.excitedMs;
      }
      lastHoverEl = el;

      const sec = (target?.closest?.("[data-cat-section]") as HTMLElement | null) ?? null;
      if (sec !== lastSection) {
        if (sec?.dataset.catSection) say(sec.dataset.catSection);
        catEl.dataset.bubble = sec?.dataset.catBubble || "above";
        lastSection = sec;
      }
    };
    const hide = () => {
      layer.dataset.visible = "false";
    };
    const show = () => {
      if (started) layer.dataset.visible = "true";
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        lastMove = performance.now();
        loop();
      }
    };

    const loop = () => {
      const now = performance.now();
      const excited = now < excitedUntil;

      if (ateSince && now - ateSince > CONFIG.eatFullMs) {
        full = true;
        ateSince = 0;
        lastMove = now; // he just got up — don't let him say "walk" and doze off mid-sentence
        say(FULL, CONFIG.sayCooldown, true);
      }

      dot.x += (pointer.x - dot.x) * CONFIG.cursorSmooth;
      dot.y += (pointer.y - dot.y) * CONFIG.cursorSmooth;
      vel.x += (dot.x - prevDot.x - vel.x) * 0.3;
      vel.y += (dot.y - prevDot.y - vel.y) * 0.3;
      prevDot.x = dot.x;
      prevDot.y = dot.y;

      const onFood =
        pointer.x > feeder.l && pointer.x < feeder.r && pointer.y > feeder.t && pointer.y < feeder.b;
      if (!onFood) full = false; // step away from the bowl and he's hungry again
      const wantsFood = onFood && !full;
      const tx = wantsFood ? feeder.x : pointer.x - clamp(vel.x * CONFIG.velScale, CONFIG.velClamp);
      const ty = wantsFood
        ? feeder.y
        : pointer.y - clamp(vel.y * CONFIG.velScale, CONFIG.velClamp) + CONFIG.offsetY;
      const dx = tx - cat.x;
      const dy = ty - cat.y;
      const dist = Math.hypot(dx, dy) || 1;
      const base = excited ? CONFIG.followExcited : CONFIG.follow;
      const f = Math.min(CONFIG.followMax, base + dist * CONFIG.followPerPx);
      const step = Math.min(dist * f, excited ? CONFIG.maxStepExcited : CONFIG.maxStep);
      cat.x += (dx / dist) * step;
      cat.y += (dy / dist) * step;

      const eating = wantsFood && dist < CONFIG.eatRange;
      ateSince = eating ? ateSince || now : 0;
      // same guard say() uses, so the line only advances when one actually lands
      if (eating && now > sayCooldownUntil) {
        say(EAT[eatIdx], CONFIG.eatSayMin + Math.random() * (CONFIG.eatSayMax - CONFIG.eatSayMin));
        eatIdx = (eatIdx + 1) % EAT.length;
      }

      if (!onFood && Math.hypot(vel.x, vel.y) > CONFIG.fastSpeak && now > fastQuietUntil) {
        say(pickFast(), 5000);
        fastQuietUntil = now + 9000;
      }

      const speed = Math.hypot(cat.x - prevCat.x, cat.y - prevCat.y);
      prevCat.x = cat.x;
      prevCat.y = cat.y;
      if (
        layer.dataset.visible === "true" &&
        speed > CONFIG.trailMinSpeed &&
        now - lastTrail > CONFIG.trailGap
      ) {
        lastTrail = now;
        const t = trailEls[trailIdx];
        trailIdx = (trailIdx + 1) % trailEls.length;
        t.style.setProperty("--tx", `${cat.x}px`);
        t.style.setProperty("--ty", `${cat.y + CONFIG.catSize * 0.42}px`);
        t.classList.remove("on");
        void t.offsetWidth;
        t.classList.add("on");
      }

      cursorEl.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      catEl.style.transform = `translate3d(${cat.x}px, ${cat.y}px, 0)`;
      leanEl.style.transform = `rotate(${clamp(vel.x * 1.1, CONFIG.maxLean)}deg)`;

      let s: State;
      if (eating) s = "eating";
      else if (now < clickUntil) s = "click";
      else if (excited) s = "excited";
      else if (hoverType) s = "hover";
      else if (now - lastMove > CONFIG.sleepDelay) s = "sleeping";
      else if (now - lastMove > CONFIG.idleDelay) s = "idle";
      else s = "following";
      if (s !== current) {
        current = s;
        catEl.dataset.state = s;
        if (s === "eating") catEl.dataset.bubble = "above"; // the bowl is at the bottom
        setState(s);
      }

      if (catEl.dataset.say === "true" && now > sayUntil) catEl.dataset.say = "false";

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", measure, { passive: true });
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", measure);
      document.documentElement.classList.remove("cat-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      className="cat-layer"
      aria-hidden="true"
      data-visible="false"
      style={
        {
          "--cat-cursor-size": `${CONFIG.cursorSize}px`,
          "--cat-size": `${CONFIG.catSize}px`,
          "--cat-canvas": `${CONFIG.catSize * CONFIG.catCanvas}px`,
          "--cat-feeder-size": `${CONFIG.feederSize}px`,
          "--cat-feeder-right": `${CONFIG.feederRight}px`,
          "--cat-feeder-bottom": `${CONFIG.feederBottom}px`,
        } as React.CSSProperties
      }
    >
      {/* the big bowl, parked in the bottom-right corner */}
      <div className="cat-feeder">
        <div ref={feederRef} className="cat-feeder-bowl">
          <Bowl />
        </div>
        <span className="cat-feeder-label">
          <span className="cat-feeder-idle">$ feed {NAME}</span>
          <span className="cat-feeder-busy">$ feeding {NAME}...</span>
        </span>
      </div>

      {/* cursor: a bowl of cat food */}
      <div ref={cursorRef} className="cat-cursor">
        <Bowl />
      </div>

      <div ref={trailRef} className="cat-trail">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="cat-trail-dot" />
        ))}
      </div>

      <div ref={catRef} className="cat-sprite" data-state="following" data-say="false" data-bubble="above">
        <div ref={bubbleRef} className="cat-bubble" />
        <div ref={leanRef} className="cat-lean">
          <div className="cat-scale">
            <div className="cat-bob">
              <Lottie src="/cat.json" loop autoplay speed={CONFIG.speed[state]} className="cat-lottie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
