/**
 * Narrator voice for Werwolf. Prefers pre-produced MP3 clips (consistent,
 * high quality) from src/assets/werwolf/voice/<id>.mp3; falls back to the
 * Web Speech API with the best available German voice when a clip is missing.
 */

export type NarratorClipId =
  | 'night-falls'
  | 'werewolves-wake'
  | 'werewolves-sleep'
  | 'seer-wake'
  | 'seer-sleep'
  | 'witch-wake'
  | 'witch-sleep'
  | 'day-breaks'
  | 'someone-died'
  | 'nobody-died'
  | 'vote'
  | 'hunter'
  | 'village-wins'
  | 'werewolves-win';

/** Spoken fallback text per clip (Web Speech API). */
const LINES: Record<NarratorClipId, string> = {
  'night-falls': 'Die Nacht bricht an. Alle schließen die Augen.',
  'werewolves-wake': 'Werwölfe, öffnet die Augen und wählt euer Opfer.',
  'werewolves-sleep': 'Werwölfe, schließt die Augen.',
  'seer-wake': 'Seherin, öffne die Augen.',
  'seer-sleep': 'Seherin, schließe die Augen.',
  'witch-wake': 'Hexe, öffne die Augen.',
  'witch-sleep': 'Hexe, schließe die Augen.',
  'day-breaks': 'Es wird hell. Das Dorf erwacht.',
  'someone-died': 'Die Nacht hat ein Opfer gefordert.',
  'nobody-died': 'Alle haben die Nacht überlebt.',
  vote: 'Das Dorf berät sich und stimmt ab.',
  hunter: 'Der Jäger feuert seinen letzten Schuss ab.',
  'village-wins': 'Das Dorf hat gewonnen.',
  'werewolves-win': 'Die Werwölfe haben gewonnen.',
};

// Bundled clips (drop <id>.mp3 files into src/assets/werwolf/voice/).
const clipModules = import.meta.glob('../../assets/werwolf/voice/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const clips: Partial<Record<NarratorClipId, string>> = {};
for (const [path, url] of Object.entries(clipModules)) {
  const id = path.replace(/^.*\//, '').replace(/\.mp3$/, '') as NarratorClipId;
  clips[id] = url;
}

let audio: HTMLAudioElement | null = null;
let unlocked = false;

/** Pick the best-sounding German voice available on this device. */
function pickGermanVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const german = voices.filter((v) => v.lang.toLowerCase().startsWith('de'));
  if (german.length === 0) return null;
  // Quality heuristics: prefer known good engines over generic defaults.
  const preferred = [/natural/i, /neural/i, /google/i, /anna/i, /petra/i, /markus/i];
  for (const re of preferred) {
    const hit = german.find((v) => re.test(v.name));
    if (hit) return hit;
  }
  return german[0];
}

/**
 * Must be called from a user gesture (e.g. the start button) once, so that
 * mobile browsers allow later programmatic playback.
 */
export function unlockNarrator() {
  if (unlocked) return;
  unlocked = true;
  try {
    audio = new Audio();
    // Play a silent moment to satisfy autoplay policies.
    audio.muted = true;
    audio.src =
      'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7v/////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCgAAAAAAAAAGGkNzXKAAAAAAAAAAAAAAAAAAAAP/7EGQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    void audio.play().catch(() => {});
    audio.muted = false;
  } catch {
    // Narrator is best-effort; never block the game.
  }
  // Warm the speech voices list (some browsers populate it lazily).
  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
}

/** Stop whatever is currently being spoken. */
export function stopNarrator() {
  try {
    audio?.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  } catch {
    // best-effort
  }
}

/** Speak a narrator line. No-op when disabled or unsupported. */
export function narrate(id: NarratorClipId, enabled: boolean) {
  if (!enabled) return;
  stopNarrator();
  const clip = clips[id];
  if (clip) {
    try {
      if (!audio) audio = new Audio();
      audio.src = clip;
      void audio.play().catch(() => speakFallback(id));
      return;
    } catch {
      // fall through to speech synthesis
    }
  }
  speakFallback(id);
}

function speakFallback(id: NarratorClipId) {
  if (!('speechSynthesis' in window)) return;
  try {
    const utter = new SpeechSynthesisUtterance(LINES[id]);
    utter.lang = 'de-DE';
    utter.rate = 0.92;
    utter.pitch = 0.85; // slightly darker storyteller tone
    const voice = pickGermanVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  } catch {
    // best-effort
  }
}
