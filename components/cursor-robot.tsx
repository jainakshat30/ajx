"use client";

import { useEffect, useRef, useState } from "react";

// All tunable values live here — tune visually against the live site.
const CONFIG = {
  follow: 0.05, // base ease toward target when it's right on the cursor
  followExcited: 0.08, // ...a little quicker when excited
  followPerPx: 0.0004, // extra ease per px of distance — gentle, just enough to lean in
  followMax: 0.16, // cap on the ease factor
  maxStep: 7.5, // px/frame hard speed cap — this is what makes it chase, not teleport
  maxStepExcited: 12, // ...when excited it sprints a little
  cursorSmooth: 0.4, // glowing target lerp toward real pointer (stays responsive)
  velScale: 2.6, // how far the robot trails behind along velocity
  velClamp: 52, // px cap on that trailing offset
  maxLean: 14, // deg
  offsetY: 12, // robot rests slightly below the cursor, never under it
  idleDelay: 1500, // ms still -> IDLE
  sleepDelay: 3800, // ms still -> SLEEPING
  excitedMs: 650, // EXCITED reaction length
  clickMs: 200, // CLICKING reaction length
  trailMinSpeed: 0.5, // px/frame before footprints appear
  trailGap: 55, // ms between footprints
  fastSpeak: 32, // pointer px/frame that counts as "too fast"
  sayMs: 2800, // how long a speech bubble stays up
  sayCooldown: 2200, // min ms between bubbles
  cursorSize: 24,
  robotSize: 44,
};

const FAST = ["heyyyy slow down!", "woah, too fast!", "slow down for me!", "i can't keep up 😵"];
const pickFast = () => FAST[(Math.random() * FAST.length) | 0];

const HIT = 'a,button,input,textarea,select,[role="button"],[data-robot]';

export function CursorRobot() {
  const [enabled, setEnabled] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (fine.matches && !reduce.matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const layer = layerRef.current!;
    const cursorEl = cursorRef.current!;
    const botEl = botRef.current!;
    const leanEl = leanRef.current!;
    const eyesEl = eyesRef.current!;
    const trailEls = Array.from(trailRef.current!.children) as HTMLElement[];
    const bubbleEl = bubbleRef.current!;

    document.documentElement.classList.add("robot-active");

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const dot = { ...pointer };
    const prevDot = { ...pointer };
    const bot = { ...pointer };
    const vel = { x: 0, y: 0 };

    let started = false;
    let lastMove = performance.now();
    let lastTrail = 0;
    let trailIdx = 0;
    const prevBot = { ...bot };
    let clickUntil = 0;
    let excitedUntil = 0;
    let hoverType: string | null = null;
    let lastHoverEl: Element | null = null;
    let lastSection: Element | null = null;
    let state = "";
    let raf = 0;

    let sayUntil = 0;
    let sayCooldownUntil = 0;
    let fastQuietUntil = 0;

    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));

    const say = (text: string, gap = CONFIG.sayCooldown) => {
      const now = performance.now();
      if (now < sayCooldownUntil) return;
      bubbleEl.textContent = text;
      botEl.dataset.say = "true";
      sayUntil = now + CONFIG.sayMs;
      sayCooldownUntil = now + gap;
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      lastMove = performance.now();
      if (!started) {
        started = true;
        dot.x = prevDot.x = bot.x = prevBot.x = pointer.x;
        dot.y = prevDot.y = bot.y = prevBot.y = pointer.y;
        layer.dataset.visible = "true";
      }
    };
    const onDown = () => {
      clickUntil = performance.now() + CONFIG.clickMs;
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.(HIT) as HTMLElement | null;
      hoverType = el ? el.dataset.robot || "interactive" : null;
      if (el && el !== lastHoverEl && (hoverType === "project" || hoverType === "primary")) {
        excitedUntil = performance.now() + CONFIG.excitedMs;
      }
      lastHoverEl = el;

      const sec = (target?.closest?.("[data-robot-section]") as HTMLElement | null) ?? null;
      if (sec !== lastSection) {
        if (sec?.dataset.robotSection) say(sec.dataset.robotSection);
        botEl.dataset.bubble = sec?.dataset.robotBubble || "above";
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

      dot.x += (pointer.x - dot.x) * CONFIG.cursorSmooth;
      dot.y += (pointer.y - dot.y) * CONFIG.cursorSmooth;
      vel.x += (dot.x - prevDot.x - vel.x) * 0.3;
      vel.y += (dot.y - prevDot.y - vel.y) * 0.3;
      prevDot.x = dot.x;
      prevDot.y = dot.y;

      const tx = pointer.x - clamp(vel.x * CONFIG.velScale, CONFIG.velClamp);
      const ty = pointer.y - clamp(vel.y * CONFIG.velScale, CONFIG.velClamp) + CONFIG.offsetY;
      const dx = tx - bot.x;
      const dy = ty - bot.y;
      const dist = Math.hypot(dx, dy) || 1;
      const base = excited ? CONFIG.followExcited : CONFIG.follow;
      const f = Math.min(CONFIG.followMax, base + dist * CONFIG.followPerPx);
      const step = Math.min(dist * f, excited ? CONFIG.maxStepExcited : CONFIG.maxStep);
      bot.x += (dx / dist) * step;
      bot.y += (dy / dist) * step;

      if (Math.hypot(vel.x, vel.y) > CONFIG.fastSpeak && now > fastQuietUntil) {
        say(pickFast(), 5000);
        fastQuietUntil = now + 9000;
      }

      const speed = Math.hypot(bot.x - prevBot.x, bot.y - prevBot.y);
      prevBot.x = bot.x;
      prevBot.y = bot.y;
      if (
        layer.dataset.visible === "true" &&
        speed > CONFIG.trailMinSpeed &&
        now - lastTrail > CONFIG.trailGap
      ) {
        lastTrail = now;
        const t = trailEls[trailIdx];
        trailIdx = (trailIdx + 1) % trailEls.length;
        t.style.setProperty("--tx", `${bot.x}px`);
        t.style.setProperty("--ty", `${bot.y + CONFIG.robotSize * 0.42}px`);
        t.classList.remove("on");
        void t.offsetWidth;
        t.classList.add("on");
      }

      cursorEl.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      botEl.style.transform = `translate3d(${bot.x}px, ${bot.y}px, 0)`;
      leanEl.style.transform = `rotate(${clamp(vel.x * 1.1, CONFIG.maxLean)}deg)`;
      eyesEl.style.transform = `translate(${clamp((pointer.x - bot.x) * 0.04, 2.4)}px, ${clamp(
        (pointer.y - bot.y) * 0.04,
        2.4,
      )}px)`;

      let s: string;
      if (now < clickUntil) s = "click";
      else if (excited) s = "excited";
      else if (hoverType) s = "hover";
      else if (now - lastMove > CONFIG.sleepDelay) s = "sleeping";
      else if (now - lastMove > CONFIG.idleDelay) s = "idle";
      else s = "following";
      if (s !== state) {
        state = s;
        botEl.dataset.state = s;
      }

      if (botEl.dataset.say === "true" && now > sayUntil) botEl.dataset.say = "false";

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    document.addEventListener("visibilitychange", onVis);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      document.removeEventListener("visibilitychange", onVis);
      document.documentElement.classList.remove("robot-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      className="robot-layer"
      aria-hidden="true"
      data-visible="false"
      style={
        {
          "--robot-cursor-size": `${CONFIG.cursorSize}px`,
          "--robot-size": `${CONFIG.robotSize}px`,
        } as React.CSSProperties
      }
    >
      <div ref={cursorRef} className="robot-cursor">
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
          <circle cx="12" cy="12" r="2" fill="var(--accent)" />
          <g stroke="var(--accent)" strokeWidth="1" opacity="0.6">
            <line x1="12" y1="1.5" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="22.5" />
            <line x1="1.5" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="22.5" y2="12" />
          </g>
        </svg>
      </div>

      <div ref={trailRef} className="robot-trail">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="robot-trail-dot" />
        ))}
      </div>

      <div ref={botRef} className="robot-bot" data-state="following" data-say="false" data-bubble="above">
        <div ref={bubbleRef} className="robot-bubble" />
        <div ref={leanRef} className="robot-lean">
          <div className="robot-scale">
            <div className="robot-bob">
              <svg viewBox="0 0 40 40" width={CONFIG.robotSize} height={CONFIG.robotSize}>
                <ellipse className="robot-glow" cx="20" cy="34" rx="11" ry="3" fill="var(--accent)" />
                <rect
                  x="11"
                  y="18"
                  width="18"
                  height="15"
                  rx="6"
                  fill="oklch(0.26 0.006 255)"
                  stroke="oklch(0.42 0.01 240)"
                  strokeWidth="1"
                />
                <rect
                  x="9"
                  y="7"
                  width="22"
                  height="16"
                  rx="7"
                  fill="oklch(0.22 0.006 255)"
                  stroke="oklch(0.42 0.01 240)"
                  strokeWidth="1"
                />
                <rect x="12" y="10" width="16" height="10" rx="5" fill="oklch(0.15 0.004 255)" />
                <g ref={eyesRef} className="robot-eyes" fill="var(--accent)">
                  <circle cx="16.5" cy="15" r="1.8" />
                  <circle cx="23.5" cy="15" r="1.8" />
                </g>
                <line x1="20" y1="7" x2="20" y2="3" stroke="oklch(0.42 0.01 240)" strokeWidth="1" />
                <circle cx="20" cy="2.5" r="1.4" fill="var(--accent)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
