/* ============================================================
   AUDIO — tout est synthétisé en Web Audio (aucun fichier,
   aucune musique sous droits). SFX de menu + BGM « funk » en boucle.
   ============================================================ */
const Sound = (() => {
  let ctx = null, master = null, sfxBus = null, bgmBus = null;
  let sfxOn = true;
  let bgmOn = false, bgmTimer = null, nextNoteTime = 0, step = 0;
  let volume = 0.45;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* stockage indisponible */ } },
  };
  volume = Math.min(1, Math.max(0, Number(store.get("kbp-vol", 0.45)) || 0.45));
  sfxOn = store.get("kbp-sfx", "1") === "1";

  function ensure() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return ctx; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.55; sfxBus.connect(master);
    bgmBus = ctx.createGain(); bgmBus.gain.value = 0; bgmBus.connect(master);
    return ctx;
  }

  function noiseBuffer(dur) {
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function tone({ type = "square", f0, f1, t = 0, dur = 0.08, gain = 0.2, bus }) {
    const now = ctx.currentTime + t;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, now);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, now + dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g); g.connect(bus || sfxBus);
    o.start(now); o.stop(now + dur + 0.02);
  }

  function noise({ t = 0, dur = 0.2, gain = 0.3, freq = 1200, q = 0.8, type = "bandpass", bus, sweepTo }) {
    const now = ctx.currentTime + t;
    const s = ctx.createBufferSource(); s.buffer = noiseBuffer(dur + 0.05);
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, now); f.Q.value = q;
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, now + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    s.connect(f); f.connect(g); g.connect(bus || sfxBus);
    s.start(now); s.stop(now + dur + 0.05);
  }

  /* --- SFX --- */
  function select() {
    if (!sfxOn || !ensure()) return;
    tone({ type: "square", f0: 880, f1: 1320, dur: 0.06, gain: 0.08 });
    tone({ type: "triangle", f0: 1760, dur: 0.05, t: 0.03, gain: 0.05 });
  }
  function confirm() {
    if (!sfxOn || !ensure()) return;
    tone({ type: "sawtooth", f0: 220, f1: 55, dur: 0.22, gain: 0.22 });
    noise({ dur: 0.18, gain: 0.35, freq: 2400, q: 0.6, sweepTo: 300 });
    tone({ type: "square", f0: 660, f1: 990, dur: 0.1, t: 0.05, gain: 0.07 });
  }
  function back() {
    if (!sfxOn || !ensure()) return;
    tone({ type: "square", f0: 990, f1: 440, dur: 0.12, gain: 0.08 });
  }
  /* « Menacing » : grondement grave pour les transitions */
  function menace() {
    if (!sfxOn || !ensure()) return;
    noise({ dur: 0.7, gain: 0.25, freq: 160, q: 1.2, type: "lowpass", sweepTo: 60 });
    tone({ type: "sawtooth", f0: 70, f1: 45, dur: 0.6, gain: 0.12 });
    for (let i = 0; i < 4; i++) tone({ type: "square", f0: 110, f1: 90, dur: 0.06, t: i * 0.09, gain: 0.05 });
  }
  /* Rafale de coups (ORA / MUDA) */
  function barrage() {
    if (!sfxOn || !ensure()) return;
    for (let i = 0; i < 7; i++) {
      noise({ t: i * 0.055, dur: 0.07, gain: 0.22, freq: 900 + Math.random() * 900, q: 1.4 });
      tone({ type: "sine", f0: 140, f1: 60, t: i * 0.055, dur: 0.07, gain: 0.18 });
    }
  }

  /* --- BGM : boucle funk originale, 112 BPM --- */
  const BPM = 112, SPB = 60 / BPM / 4; // double-croches
  // Basse (Hz) sur 32 pas — progression Em → C → D → B
  const N = { E2: 82.41, G2: 98.0, A2: 110.0, B2: 123.47, C3: 130.81, D3: 146.83, E3: 164.81, Fs2: 92.5, Ds3: 155.56 };
  const BASS = [
    "E2", 0, "E2", "E3", 0, "E2", "G2", 0, "A2", 0, "E2", 0, "B2", "A2", "G2", 0,
    "C3", 0, "C3", "G2", 0, "D3", 0, "D3", "B2", 0, "Fs2", 0, "Ds3", 0, "B2", "Fs2",
  ];
  const LEAD = { 0: 659.25, 3: 783.99, 6: 987.77, 10: 880, 14: 783.99, 16: 659.25, 19: 783.99, 22: 739.99, 26: 622.25, 30: 739.99 };

  function scheduleStep(s, t) {
    const n = BASS[s % 32];
    if (n) {
      const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = "sawtooth"; o.frequency.value = N[n];
      f.type = "lowpass"; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(180, t + 0.14); f.Q.value = 6;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.28, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(f); f.connect(g); g.connect(bgmBus); o.start(t); o.stop(t + 0.2);
    }
    // Kick sur les temps, snare sur 2 et 4, charleston
    if (s % 4 === 0) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
      g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g); g.connect(bgmBus); o.start(t); o.stop(t + 0.18);
    }
    if (s % 8 === 4) {
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.15);
      const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 1500;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      src.connect(f); f.connect(g); g.connect(bgmBus); src.start(t); src.stop(t + 0.15);
    }
    if (s % 2 === 1) {
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.05);
      const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 7000;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
      src.connect(f); f.connect(g); g.connect(bgmBus); src.start(t); src.stop(t + 0.05);
    }
    const bar = Math.floor(s / 32) % 4;
    if (bar % 2 === 1 && LEAD[s % 32]) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "square"; o.frequency.value = LEAD[s % 32];
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.045, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(g); g.connect(bgmBus); o.start(t); o.stop(t + 0.25);
    }
  }

  function scheduler() {
    while (nextNoteTime < ctx.currentTime + 0.12) {
      scheduleStep(step, nextNoteTime);
      nextNoteTime += SPB; step++;
    }
  }

  function startBgm() {
    if (!ensure()) return false;
    if (bgmOn) return true;
    bgmOn = true; step = 0; nextNoteTime = ctx.currentTime + 0.05;
    bgmBus.gain.cancelScheduledValues(ctx.currentTime);
    bgmBus.gain.setValueAtTime(0.0001, ctx.currentTime);
    bgmBus.gain.linearRampToValueAtTime(volume * 0.6, ctx.currentTime + 0.45);
    bgmTimer = setInterval(scheduler, 25);
    store.set("kbp-bgm", "1");
    return true;
  }
  function stopBgm() {
    if (!ctx || !bgmOn) return;
    bgmOn = false;
    bgmBus.gain.cancelScheduledValues(ctx.currentTime);
    bgmBus.gain.setValueAtTime(bgmBus.gain.value, ctx.currentTime);
    bgmBus.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.45);
    setTimeout(() => { if (!bgmOn) clearInterval(bgmTimer); }, 500);
    store.set("kbp-bgm", "0");
  }
  function setVolume(v) {
    volume = v; store.set("kbp-vol", String(v));
    if (ctx && bgmOn) bgmBus.gain.setTargetAtTime(v * 0.6, ctx.currentTime, 0.05);
  }
  function setSfx(on) { sfxOn = on; store.set("kbp-sfx", on ? "1" : "0"); }

  return {
    select, confirm, back, menace, barrage, startBgm, stopBgm, setVolume, setSfx, ensure,
    get bgmOn() { return bgmOn; }, get sfxOn() { return sfxOn; }, get volume() { return volume; },
    wantsBgm: () => store.get("kbp-bgm", "0") === "1",
  };
})();
