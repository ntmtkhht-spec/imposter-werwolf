// Bomb audio, synthesized with WebAudio — no asset files needed.
// The context is created lazily on first use (must follow a user gesture).

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null; // no audio support — game stays fully playable
  }
}

/** Create/resume the context inside a user gesture so later sounds may play. */
export function primeAudio() {
  audio();
}

/** Short dry click, like a clock. */
export function playTick() {
  const ac = audio();
  if (!ac) return;
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
