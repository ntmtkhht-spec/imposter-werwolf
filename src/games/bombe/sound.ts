// Bomb audio, synthesized with WebAudio — no asset files needed.
//
// Mobile browsers only let audio start from a user gesture, and they are
// stricter than desktop: creating the context and calling resume() is not
// enough on iOS, a source has to actually run inside the gesture. unlock()
// does that; everything after it just plays.

type Ctor = typeof AudioContext;

let ctx: AudioContext | null = null;
let unlocked = false;

function ctor(): Ctor | null {
  // Safari before 14.1 only exposes the prefixed constructor.
  const w = window as unknown as { AudioContext?: Ctor; webkitAudioContext?: Ctor };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

/** The context, if this browser supports WebAudio at all. */
function audio(): AudioContext | null {
  if (ctx) return ctx;
  const C = ctor();
  if (!C) return null; // no WebAudio — game stays fully playable, just silent
  try {
    ctx = new C();
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Nudge a context that the OS parked back into life. iOS uses 'interrupted'
 * (e.g. after a phone call or the screen locking) on top of 'suspended'.
 */
function ensureRunning(ac: AudioContext) {
  if (ac.state !== 'running') void ac.resume();
}

/**
 * Must be called synchronously inside a tap handler. Creates the context,
 * resumes it and runs one silent sample, which is what actually lifts the
 * autoplay block on iOS.
 */
export function primeAudio() {
  const ac = audio();
  if (!ac) return;
  ensureRunning(ac);
  if (unlocked) return;
  try {
    const buffer = ac.createBuffer(1, 1, ac.sampleRate);
    const src = ac.createBufferSource();
    src.buffer = buffer;
    src.connect(ac.destination);
    src.start(0);
    unlocked = true;
  } catch {
    // Unlock failed; later sounds still try, they just may stay silent.
  }
}

// Coming back from the lock screen or another tab leaves the context parked.
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && ctx) ensureRunning(ctx);
  });
}

/** Short dry click, like a clock. */
export function playTick() {
  const ac = audio();
  if (!ac) return;
  ensureRunning(ac);
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.value = 900;
  gain.gain.setValueAtTime(0.08, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.05);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.06);
}

/** Noise burst with a falling boom underneath. */
export function playExplosion() {
  const ac = audio();
  if (!ac) return;
  ensureRunning(ac);

  const noiseLen = 0.9;
  const buffer = ac.createBuffer(1, ac.sampleRate * noiseLen, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const noise = ac.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.5, ac.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + noiseLen);
  noise.connect(noiseGain).connect(ac.destination);
  noise.start();

  const boom = ac.createOscillator();
  const boomGain = ac.createGain();
  boom.type = 'sine';
  boom.frequency.setValueAtTime(120, ac.currentTime);
  boom.frequency.exponentialRampToValueAtTime(30, ac.currentTime + 0.7);
  boomGain.gain.setValueAtTime(0.6, ac.currentTime);
  boomGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.8);
  boom.connect(boomGain).connect(ac.destination);
  boom.start();
  boom.stop(ac.currentTime + 0.85);
}

/** Whether audio is actually running, so the UI can warn when it is not. */
export function audioBlocked(): boolean {
  return !ctx || ctx.state !== 'running';
}
