/* ============================================================
   FOND ANIMÉ — lignes de vitesse rotatives + « ゴゴゴ » flottants
   ============================================================ */
const BG = (() => {
  const cvs = document.getElementById("bgCanvas");
  const c = cvs.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0, H = 0, DPR = 1, t = 0, boost = 0, focus = { x: 0.68, y: 0.45 };
  const GLYPHS = ["ゴ", "ゴ", "ゴ", "ド", "ド", "メ"];
  const COLORS = ["#c77dff", "#ff4fa3", "#ffd23f", "#9d4edd"];
  let parts = [];

  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = cvs.width = Math.floor(innerWidth * DPR);
    H = cvs.height = Math.floor(innerHeight * DPR);
    cvs.style.width = innerWidth + "px"; cvs.style.height = innerHeight + "px";
    const count = innerWidth < 700 ? 9 : 18;
    parts = Array.from({ length: count }, () => spawn(true));
  }

  function spawn(initial) {
    const size = (26 + Math.random() * 70) * DPR;
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + size,
      size,
      vy: (0.15 + Math.random() * 0.5) * DPR,
      ph: Math.random() * Math.PI * 2,
      rot: (-0.35 + Math.random() * 0.2),
      g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
      col: COLORS[(Math.random() * COLORS.length) | 0],
      a: 0.1 + Math.random() * 0.35,
    };
  }

  function speedLines() {
    const cx = focus.x * W, cy = focus.y * H;
    const R = Math.hypot(W, H);
    const rays = 72;
    c.save();
    c.translate(cx, cy);
    c.rotate(t * 0.0006);
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * Math.PI * 2;
      const w = (0.006 + ((i * 7919) % 13) / 1000) * (1 + boost * 1.5);
      const inner = R * (0.12 + ((i * 31) % 10) / 60) * (1 - boost * 0.6);
      c.beginPath();
      c.moveTo(Math.cos(a - w) * inner, Math.sin(a - w) * inner);
      c.lineTo(Math.cos(a) * R, Math.sin(a) * R);
      c.lineTo(Math.cos(a + w) * inner, Math.sin(a + w) * inner);
      c.closePath();
      c.fillStyle = i % 3 === 0 ? `rgba(255,210,63,${0.05 + boost * 0.15})` : `rgba(0,0,0,${0.18 + boost * 0.15})`;
      c.fill();
    }
    c.restore();
  }

  function glyphs() {
    c.textAlign = "center"; c.textBaseline = "middle";
    for (const p of parts) {
      p.y -= p.vy * (1 + boost * 6);
      const wob = Math.sin(t * 0.02 + p.ph);
      const x = p.x + wob * 6 * DPR;
      const s = p.size * (1 + Math.sin(t * 0.08 + p.ph) * 0.05);
      c.save();
      c.translate(x, p.y);
      c.rotate(p.rot + wob * 0.04);
      c.font = `${s}px "Dela Gothic One", sans-serif`;
      c.globalAlpha = Math.min(1, p.a + boost * 0.4);
      c.lineWidth = s * 0.12; c.strokeStyle = "#0b0214"; c.lineJoin = "round";
      c.strokeText(p.g, 0, 0);
      c.fillStyle = p.col; c.fillText(p.g, 0, 0);
      c.restore();
      if (p.y < -p.size) Object.assign(p, spawn(false));
    }
  }

  function frame() {
    t++;
    boost *= 0.94;
    c.clearRect(0, 0, W, H);
    speedLines();
    glyphs();
    if (!reduce) requestAnimationFrame(frame);
  }

  addEventListener("resize", resize);
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => frame());
  else frame();

  return {
    pulse(v = 1) { boost = Math.min(1.2, boost + v); },
    setFocus(x, y) { focus = { x, y }; },
  };
})();
