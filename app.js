const arenaSection = document.querySelector(".arena-section");
const arena = document.getElementById("arena");
const arenaTools = document.getElementById("arena-tools");
const settingsForm = document.getElementById("settings-form");
const durationInput = document.getElementById("duration-input");
const durationPresets = document.getElementById("duration-presets");
const difficultyBtns = document.getElementById("difficulty-btns");
const difficultyButtons = Array.from(document.querySelectorAll(".difficulty-btn"));
const introOverlay = document.getElementById("intro-overlay");
const resultOverlay = document.getElementById("result-overlay");
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownValue = document.getElementById("countdown-value");
const restartButton = document.getElementById("restart-button");
const stopButton = document.getElementById("stop-button");
const overlayStartButton = document.getElementById("overlay-start-button");
const langEnButton = document.getElementById("lang-en");
const langRuButton = document.getElementById("lang-ru");
const presetButtons = Array.from(document.querySelectorAll(".preset-btn"));
const muteBtn = document.getElementById("mute-btn");

const bgMusic = new Audio("assets/audio/battle-theme.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.35;

const resultScore = document.getElementById("result-score");
const resultDuration = document.getElementById("result-duration");
const resultDifficulty = document.getElementById("result-difficulty");

const uiText = {
  brandEyebrow: document.getElementById("brand-eyebrow"),
  brandTitle: document.getElementById("brand-title"),
  settingsEyebrow: document.getElementById("settings-eyebrow"),
  settingsTitle: document.getElementById("settings-title"),
  durationLabel: document.getElementById("duration-label"),
  durationSuffix: document.getElementById("duration-suffix"),
  preset30: document.getElementById("preset-30"),
  preset60: document.getElementById("preset-60"),
  preset90: document.getElementById("preset-90"),
  preset120: document.getElementById("preset-120"),
  preset150: document.getElementById("preset-150"),
  preset180: document.getElementById("preset-180"),
  preset240: document.getElementById("preset-240"),
  preset300: document.getElementById("preset-300"),
  difficultyLabel: document.getElementById("difficulty-label"),
  introEyebrow: document.getElementById("intro-eyebrow"),
  introTitle: document.getElementById("intro-title"),
  introNote: document.getElementById("intro-note"),
  resultEyebrow: document.getElementById("result-eyebrow"),
  resultTitle: document.getElementById("result-title"),
  resultScoreLabel: document.getElementById("result-score-label"),
  resultDurationLabel: document.getElementById("result-duration-label"),
  resultDifficultyLabel: document.getElementById("result-difficulty-label"),
  scoreLegendTitle: document.getElementById("score-legend-title"),
  scoreLegendNormal: document.getElementById("score-legend-normal"),
  scoreLegendArmored: document.getElementById("score-legend-armored"),
  scoreLegendFlying: document.getElementById("score-legend-flying"),
};

const translations = {
  en: {
    documentTitle: "Click Training",
    brandEyebrow: "Reaction Warmup",
    brandTitle: "Click Training",
    settingsEyebrow: "Session Setup",
    settingsTitle: "Training Settings",
    durationLabel: "Duration",
    durationSuffix: "sec",
    preset30: "30 sec",
    preset60: "1 min",
    preset90: "1.5 min",
    preset120: "2 min",
    preset150: "2.5 min",
    preset180: "3 min",
    preset240: "4 min",
    preset300: "5 min",
    presetsAriaLabel: "Quick time presets",
    difficultyLabel: "Difficulty",
    diffEasy: "Easy",
    diffMedium: "Medium",
    diffHard: "Hard",
    difficultyAriaLabel: "Difficulty",
    arenaLabel: "Game field",
    arenaToolsLabel: "Game controls",
    introEyebrow: "Ready Check",
    introTitle: "Click Warmup Before the Match.",
    introNote:
      "Great for warming up before VALORANT, Counter-Strike 2, Apex Legends, Call of Duty, Fortnite, Dota 2, and League of Legends.",
    startSession: "Start Session",
    stop: "Stop",
    resultEyebrow: "Session Complete",
    resultTitle: "Training Results",
    resultScoreLabel: "Score",
    resultDurationLabel: "Round",
    resultDifficultyLabel: "Difficulty",
    scoreLegendTitle: "How Points Work",
    scoreLegendNormal: "Normal target",
    scoreLegendArmored: "Armored target",
    scoreLegendFlying: "Flying target",
    scoreLegendHit: "on hit",
    scoreLegendDestroy: "on destroy",
    scoreLegendMiss: "on miss",
    langSwitcherLabel: "Language switcher",
  },
  ru: {
    documentTitle: "Тренировка клика",
    brandEyebrow: "Разогрев реакции",
    brandTitle: "Тренировка клика",
    settingsEyebrow: "Параметры Сессии",
    settingsTitle: "Настройки тренировки",
    durationLabel: "Длительность",
    durationSuffix: "сек",
    preset30: "30 сек",
    preset60: "1 мин",
    preset90: "1.5 мин",
    preset120: "2 мин",
    preset150: "2.5 мин",
    preset180: "3 мин",
    preset240: "4 мин",
    preset300: "5 мин",
    presetsAriaLabel: "Быстрые значения времени",
    difficultyLabel: "Сложность",
    diffEasy: "Лёгкий",
    diffMedium: "Средний",
    diffHard: "Тяжёлый",
    difficultyAriaLabel: "Сложность",
    arenaLabel: "Игровое поле",
    arenaToolsLabel: "Игровые элементы управления",
    introEyebrow: "Готовность",
    introTitle: "Разминка на клики перед игрой.",
    introNote:
      "Подходит для разминки (раскликаться) перед: VALORANT, Counter-Strike 2, Apex Legends, Call of Duty, Fortnite, Dota 2 и League of Legends.",
    startSession: "Начать сессию",
    stop: "Стоп",
    resultEyebrow: "Сессия завершена",
    resultTitle: "Результат тренировки",
    resultScoreLabel: "Счёт",
    resultDurationLabel: "Раунд",
    resultDifficultyLabel: "Сложность",
    scoreLegendTitle: "Как начисляются очки",
    scoreLegendNormal: "Обычная цель",
    scoreLegendArmored: "Бронированная цель",
    scoreLegendFlying: "Летающая цель",
    scoreLegendHit: "за попадание",
    scoreLegendDestroy: "за уничтожение",
    scoreLegendMiss: "за промах",
    langSwitcherLabel: "Переключение языка",
  },
};

const GROW_DURATION_MS = 1350;
const SHRINK_DURATION_MS = 1350;
const HIT_REACTION_MS = 220;
const MISS_MARKER_MS = 100;
const SESSION_COUNTDOWN_STEPS = [3, 2, 1];
const SESSION_COUNTDOWN_MS = 1000;
const ARMORED_SPAWN_INTERVAL_MS = 6000;
const ARMORED_HITS_REQUIRED = 5;
const ARMORED_HOLD_MS = 4000;
const FLYING_SPAWN_INTERVAL_MS = 9000;
const FLYING_SPEED_PX_S = 260;
const FLYING_SIZE = 66;

const DIFFICULTY_PRESETS = {
  easy:   { spawn: 900,  hold: 1500, concurrent: 1, flyingLifetime: 4000 },
  medium: { spawn: 500,  hold: 1000, concurrent: 1, flyingLifetime: 2500 },
  hard:   { spawn: 300,  hold: 800,  concurrent: 1, flyingLifetime: 1200 },
};

const state = {
  language: "en",
  difficulty: "medium",
  muted: false,
  running: false,
  totalSeconds: 120,
  spawnInterval: 500,
  holdDuration: 1000,
  maxTargets: 1,
  clicks: 0,
  hits: 0,
  armoredKills: 0,
  flyingKills: 0,
  missedTargets: 0,
  missedArmored: 0,
  missedFlying: 0,
  startTime: 0,
  remainingMs: 120000,
  elapsedMs: 0,
  countdownTimerId: null,
  spawnTimerId: null,
  armoredSpawnTimerId: null,
  flyingSpawnTimerId: null,
  startSequenceTimerIds: [],
  preparing: false,
  activeTargets: new Map(),
  nextTargetId: 1,
  audioContext: null,
  audioMasterGain: null,
  audioCompressor: null,
  noiseBuffer: null,
  audioKeepAliveId: null,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(totalMilliseconds) {
  const safeMs = Math.max(0, totalMilliseconds);
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getElapsedSeconds() {
  if (state.running) {
    return (Date.now() - state.startTime) / 1000;
  }

  return state.elapsedMs > 0 ? state.elapsedMs / 1000 : state.totalSeconds;
}

function getTotalClicks() {
  return state.clicks;
}

function getScore() {
  return (
    state.hits * 20 +
    state.armoredKills * 50 +
    state.flyingKills * 50 -
    state.missedTargets * 20 -
    state.missedArmored * 200 -
    state.missedFlying * 200
  );
}


function updateLanguageButtons() {
  langEnButton.classList.toggle("is-active", state.language === "en");
  langRuButton.classList.toggle("is-active", state.language === "ru");
}

function applyLanguage() {
  const copy = translations[state.language];

  document.documentElement.lang = state.language;
  document.title = copy.documentTitle;

  Object.entries(uiText).forEach(([key, element]) => {
    if (element && copy[key]) {
      element.textContent = copy[key];
    }
  });

  durationPresets.setAttribute("aria-label", copy.presetsAriaLabel);
  difficultyBtns.setAttribute("aria-label", copy.difficultyAriaLabel);
  arena.setAttribute("aria-label", copy.arenaLabel);
  arenaTools.setAttribute("aria-label", copy.arenaToolsLabel);
  document.querySelector(".lang-switch")?.setAttribute("aria-label", copy.langSwitcherLabel);

  overlayStartButton.textContent = copy.startSession;
  restartButton.textContent = copy.startSession;
  stopButton.textContent = copy.stop;

  document.getElementById("diff-easy").textContent = copy.diffEasy;
  document.getElementById("diff-medium").textContent = copy.diffMedium;
  document.getElementById("diff-hard").textContent = copy.diffHard;

  document.getElementById("score-legend-hit").textContent = copy.scoreLegendHit;
  document.getElementById("score-legend-hit-flying").textContent = copy.scoreLegendHit;
  document.getElementById("score-legend-destroy").textContent = copy.scoreLegendDestroy;
  document.getElementById("score-legend-miss-normal").textContent = copy.scoreLegendMiss;
  document.getElementById("score-legend-miss-armored").textContent = copy.scoreLegendMiss;
  document.getElementById("score-legend-miss-flying").textContent = copy.scoreLegendMiss;

  updateLanguageButtons();
}

function setLanguage(language) {
  if (!translations[language] || state.language === language) {
    return;
  }

  state.language = language;
  applyLanguage();
}

function updatePresetButtons(selectedSeconds) {
  presetButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.duration) === selectedSeconds);
  });
}

function updateControls() {
  stopButton.disabled = !state.running && !state.preparing;
}


function clearSpawnLoop() {
  if (state.spawnTimerId !== null) {
    window.clearInterval(state.spawnTimerId);
    state.spawnTimerId = null;
  }
  if (state.armoredSpawnTimerId !== null) {
    window.clearInterval(state.armoredSpawnTimerId);
    state.armoredSpawnTimerId = null;
  }
  if (state.flyingSpawnTimerId !== null) {
    window.clearInterval(state.flyingSpawnTimerId);
    state.flyingSpawnTimerId = null;
  }
}

function clearCountdownLoop() {
  if (state.countdownTimerId !== null) {
    window.clearInterval(state.countdownTimerId);
    state.countdownTimerId = null;
  }
}

function clearStartSequenceTimers() {
  state.startSequenceTimerIds.forEach((timerId) => {
    window.clearTimeout(timerId);
  });
  state.startSequenceTimerIds = [];
}

function hideCountdownOverlay() {
  countdownOverlay.classList.add("hidden");
}

function showCountdownOverlay(value) {
  countdownValue.textContent = String(value);
  countdownOverlay.classList.remove("hidden");
}

function clearTargetTimers(record) {
  record.timerIds.forEach((timerId) => {
    window.clearTimeout(timerId);
  });
}

function getAudioContext() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;

  if (!AudioCtor) {
    return null;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioCtor();
    state.audioMasterGain = state.audioContext.createGain();
    state.audioCompressor = state.audioContext.createDynamicsCompressor();

    state.audioMasterGain.gain.value = 2.24;
    state.audioCompressor.threshold.value = -24;
    state.audioCompressor.knee.value = 12;
    state.audioCompressor.ratio.value = 14;
    state.audioCompressor.attack.value = 0.001;
    state.audioCompressor.release.value = 0.05;

    state.audioMasterGain.connect(state.audioCompressor);
    state.audioCompressor.connect(state.audioContext.destination);
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume().catch(() => {});
  }

  return state.audioContext;
}

function playSilent() {
  const audioContext = getAudioContext();
  if (!audioContext) return;
  const silentBuffer = audioContext.createBuffer(1, 1, audioContext.sampleRate);
  const source = audioContext.createBufferSource();
  source.buffer = silentBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}

function prewarmAudio() {
  playSilent();
}

function startAudioKeepAlive() {
  stopAudioKeepAlive();
  // Every 5 seconds play a silent buffer to prevent AudioContext auto-suspension
  state.audioKeepAliveId = window.setInterval(playSilent, 5000);
}

function stopAudioKeepAlive() {
  if (state.audioKeepAliveId !== null) {
    window.clearInterval(state.audioKeepAliveId);
    state.audioKeepAliveId = null;
  }
}

function getAudioOutputNode(audioContext) {
  return state.audioMasterGain || audioContext.destination;
}

function getNoiseBuffer(audioContext) {
  if (state.noiseBuffer) {
    return state.noiseBuffer;
  }

  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.25, audioContext.sampleRate);
  const channelData = buffer.getChannelData(0);

  for (let index = 0; index < channelData.length; index += 1) {
    channelData[index] = Math.random() * 2 - 1;
  }

  state.noiseBuffer = buffer;
  return buffer;
}

function playTone({
  frequency,
  duration,
  type = "sine",
  volume = 1,
  endFrequency = frequency,
  attack = 0.0001,
  decay = 0.08,
  delay = 0,
}) {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  const startAt = audioContext.currentTime + delay;
  const stopAt = startAt + duration;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const outputNode = getAudioOutputNode(audioContext);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), stopAt);

  const peakVolume = Math.max(0.0001, volume);
  gainNode.gain.setValueAtTime(peakVolume, startAt);
  gainNode.gain.exponentialRampToValueAtTime(peakVolume, startAt + Math.max(0.0001, attack));
  gainNode.gain.exponentialRampToValueAtTime(0.0001, stopAt + decay);

  oscillator.connect(gainNode);
  gainNode.connect(outputNode);
  oscillator.start(startAt);
  oscillator.stop(stopAt + decay);
}

function playNoiseBurst({
  duration,
  volume,
  attack = 0.0001,
  decay = 0.05,
  delay = 0,
  highpassFrequency = 120,
  lowpassFrequency = 2400,
}) {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  const startAt = audioContext.currentTime + delay;
  const stopAt = startAt + duration;
  const noiseSource = audioContext.createBufferSource();
  const gainNode = audioContext.createGain();
  const highpassFilter = audioContext.createBiquadFilter();
  const lowpassFilter = audioContext.createBiquadFilter();

  noiseSource.buffer = getNoiseBuffer(audioContext);

  highpassFilter.type = "highpass";
  highpassFilter.frequency.setValueAtTime(highpassFrequency, startAt);

  lowpassFilter.type = "lowpass";
  lowpassFilter.frequency.setValueAtTime(lowpassFrequency, startAt);

  gainNode.gain.setValueAtTime(Math.max(0.0001, volume), startAt);
  gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), startAt + Math.max(0.0001, attack));
  gainNode.gain.exponentialRampToValueAtTime(0.0001, stopAt + decay);

  noiseSource.connect(highpassFilter);
  highpassFilter.connect(lowpassFilter);
  lowpassFilter.connect(gainNode);
  gainNode.connect(getAudioOutputNode(audioContext));

  noiseSource.start(startAt);
  noiseSource.stop(stopAt + decay);
}

function playShotSound() {
  // Main "pew" sweep — sine wave descending fast, gives the classic sci-fi shot feel
  playTone({
    frequency: 880,
    endFrequency: 160,
    duration: 0.14,
    type: "sine",
    volume: 1.1,
    attack: 0.0001,
    decay: 0.06,
  });
  // Slightly detuned second layer for body and fullness
  playTone({
    frequency: 760,
    endFrequency: 140,
    duration: 0.12,
    type: "triangle",
    volume: 0.55,
    attack: 0.0001,
    decay: 0.05,
  });
  // Short high-freq click for attack crispness
  playNoiseBurst({
    duration: 0.012,
    volume: 0.6,
    attack: 0.0001,
    decay: 0.01,
    highpassFrequency: 3000,
    lowpassFrequency: 8000,
  });
}

function playHitSound() {
  // Sharp transient crack — gives the "impact" feel
  playNoiseBurst({
    duration: 0.015,
    volume: 1.8,
    attack: 0.0001,
    decay: 0.012,
    highpassFrequency: 2000,
    lowpassFrequency: 8000,
  });
  // Mid-range noise body — the "whomp" of the explosion
  playNoiseBurst({
    duration: 0.1,
    volume: 1.2,
    attack: 0.0001,
    decay: 0.28,
    highpassFrequency: 100,
    lowpassFrequency: 1200,
  });
  // Deep sine boom — sine (not square!) gives a clean low-end "bwoom"
  playTone({
    frequency: 130,
    endFrequency: 32,
    duration: 0.22,
    type: "sine",
    volume: 1.8,
    attack: 0.0001,
    decay: 0.32,
  });
}

function playArmoredHitSound() {
  playNoiseBurst({
    duration: 0.018,
    volume: 1.3,
    attack: 0.0001,
    decay: 0.04,
    highpassFrequency: 1800,
    lowpassFrequency: 5500,
  });
  playTone({
    frequency: 380,
    endFrequency: 300,
    duration: 0.09,
    type: "triangle",
    volume: 0.65,
    attack: 0.0001,
    decay: 0.06,
  });
}

function playArmoredKillSound() {
  playNoiseBurst({
    duration: 0.025,
    volume: 2.0,
    attack: 0.0001,
    decay: 0.022,
    highpassFrequency: 2000,
    lowpassFrequency: 7000,
  });
  playNoiseBurst({
    duration: 0.14,
    volume: 1.5,
    attack: 0.0001,
    decay: 0.38,
    highpassFrequency: 80,
    lowpassFrequency: 900,
  });
  playTone({
    frequency: 220,
    endFrequency: 38,
    duration: 0.3,
    type: "sine",
    volume: 2.0,
    attack: 0.0001,
    decay: 0.44,
  });
}

function createArenaEffect(className, x, y, duration) {
  const effect = document.createElement("span");
  effect.className = className;
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  arena.appendChild(effect);

  window.setTimeout(() => {
    effect.remove();
  }, duration);
}

function getArenaCoordinates(clientX, clientY) {
  const rect = arena.getBoundingClientRect();

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function createMissMarker(clientX, clientY) {
  const { x, y } = getArenaCoordinates(clientX, clientY);
  createArenaEffect("miss-marker", x, y, MISS_MARKER_MS);
}

function createImpactBurst(x, y) {
  createArenaEffect("impact-burst", x, y, 260);
}

function createArmoredBurst(x, y) {
  createArenaEffect("armored-burst", x, y, 340);
}

function createFlyingBurst(x, y) {
  createArenaEffect("flying-burst", x, y, 400);
}

function playFlyingKillSound() {
  playNoiseBurst({
    duration: 0.032,
    volume: 2.3,
    attack: 0.0001,
    decay: 0.028,
    highpassFrequency: 1600,
    lowpassFrequency: 7000,
  });
  playNoiseBurst({
    duration: 0.2,
    volume: 1.9,
    attack: 0.0001,
    decay: 0.46,
    highpassFrequency: 55,
    lowpassFrequency: 1200,
  });
  playTone({
    frequency: 180,
    endFrequency: 28,
    duration: 0.38,
    type: "sine",
    volume: 2.3,
    attack: 0.0001,
    decay: 0.52,
  });
}

function removeTarget(targetId, reason = "cleanup") {
  const record = state.activeTargets.get(targetId);

  if (!record) {
    return;
  }

  clearTargetTimers(record);
  if (record.rafId !== null) {
    cancelAnimationFrame(record.rafId);
  }
  state.activeTargets.delete(targetId);

  if (reason === "armored-kill") {
    record.element.classList.remove("is-arriving", "is-holding", "is-departing");
    record.element.classList.add("is-hit");
    createArmoredBurst(record.position.x, record.position.y);
    playArmoredKillSound();

    window.setTimeout(() => {
      record.element.remove();
    }, HIT_REACTION_MS);

    return;
  }

  if (reason === "flying-kill") {
    if (record.rafId !== null) {
      cancelAnimationFrame(record.rafId);
    }
    // record.x / record.y are always the current visual center (updated by rAF)
    createFlyingBurst(record.x, record.y);
    playFlyingKillSound();
    record.element.remove();
    return;
  }

  if (reason === "hit") {
    record.element.classList.remove("is-arriving", "is-holding", "is-departing");
    record.element.classList.add("is-hit");
    createImpactBurst(record.position.x, record.position.y);
    playHitSound();

    window.setTimeout(() => {
      record.element.remove();
    }, HIT_REACTION_MS);

    return;
  }

  if (reason === "timeout" && state.running) {
    if (record.hitsLeft !== undefined) {
      state.missedArmored += 1;
    } else if (record.isFlying) {
      state.missedFlying += 1;
    } else {
      state.missedTargets += 1;
    }

  }

  record.element.remove();
}

function clearArenaTargets() {
  const targetIds = Array.from(state.activeTargets.keys());

  targetIds.forEach((targetId) => {
    removeTarget(targetId, "cleanup");
  });
}

function getRandomTargetSize() {
  const minSize = 28;
  const maxSize = 92;
  return Math.round(minSize + Math.random() * (maxSize - minSize));
}

function getRandomPosition(size) {
  const rect = arena.getBoundingClientRect();
  const padding = 16;
  const minX = size / 2 + padding;
  const minY = size / 2 + padding;
  const maxX = Math.max(minX, rect.width - size / 2 - padding);
  const maxY = Math.max(minY, rect.height - size / 2 - padding);

  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
  };
}

function createTarget() {
  if (!state.running) {
    return;
  }

  const target = document.createElement("button");
  const targetId = state.nextTargetId++;
  const size = getRandomTargetSize();
  const position = getRandomPosition(size);
  const growDuration = GROW_DURATION_MS;
  const shrinkDuration = SHRINK_DURATION_MS;
  const holdDuration = state.holdDuration;
  const totalLife = growDuration + holdDuration + shrinkDuration;

  target.type = "button";
  target.className = "target";
  target.dataset.targetId = String(targetId);
  target.style.width = `${size}px`;
  target.style.height = `${size}px`;
  target.style.left = `${position.x}px`;
  target.style.top = `${position.y}px`;
  target.style.setProperty("--grow-duration", `${growDuration}ms`);
  target.style.setProperty("--shrink-duration", `${shrinkDuration}ms`);
  target.setAttribute("aria-label", "Target");

  target.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    event.stopPropagation();

    if (!state.running) {
      return;
    }

    state.hits += 1;

    removeTarget(targetId, "hit");
  });

  arena.appendChild(target);

  const timerIds = [
    window.setTimeout(() => {
      if (!state.activeTargets.has(targetId)) {
        return;
      }

      target.classList.add("is-arriving");
    }, 20),
    window.setTimeout(() => {
      if (!state.activeTargets.has(targetId)) {
        return;
      }

      target.classList.remove("is-arriving");
      target.classList.add("is-holding");
    }, growDuration),
    window.setTimeout(() => {
      if (!state.activeTargets.has(targetId)) {
        return;
      }

      target.classList.remove("is-holding");
      target.classList.add("is-departing");
    }, growDuration + holdDuration),
    window.setTimeout(() => {
      removeTarget(targetId, "timeout");
    }, totalLife),
  ];

  state.activeTargets.set(targetId, {
    element: target,
    timerIds,
    position,
  });
}

function createArmoredTarget() {
  if (!state.running) {
    return;
  }

  const target = document.createElement("button");
  const targetId = state.nextTargetId++;
  const size = Math.round(52 + Math.random() * 32); // 52–84px, slightly bigger than regular
  const position = getRandomPosition(size);
  const growDuration = GROW_DURATION_MS;
  const shrinkDuration = SHRINK_DURATION_MS;
  const totalLife = growDuration + ARMORED_HOLD_MS + shrinkDuration;

  target.type = "button";
  target.className = "target target--armored";
  target.dataset.targetId = String(targetId);
  target.dataset.hitsLeft = String(ARMORED_HITS_REQUIRED);
  target.style.width = `${size}px`;
  target.style.height = `${size}px`;
  target.style.left = `${position.x}px`;
  target.style.top = `${position.y}px`;
  target.style.setProperty("--grow-duration", `${growDuration}ms`);
  target.style.setProperty("--shrink-duration", `${shrinkDuration}ms`);
  target.style.setProperty("--target-font-size", `${Math.floor(size * 0.3)}px`);
  target.setAttribute("aria-label", "Armored Target");

  target.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    event.stopPropagation();

    if (!state.running) {
      return;
    }

    const record = state.activeTargets.get(targetId);
    if (!record) {
      return;
    }

    record.hitsLeft -= 1;
    target.dataset.hitsLeft = String(record.hitsLeft);

    if (record.hitsLeft <= 0) {
      state.armoredKills += 1;
  
      removeTarget(targetId, "armored-kill");
    } else {
      target.classList.remove("is-armored-hit");
      // Force reflow to restart animation
      void target.offsetWidth;
      target.classList.add("is-armored-hit");
      playArmoredHitSound();
    }
  });

  arena.appendChild(target);

  const timerIds = [
    window.setTimeout(() => {
      if (!state.activeTargets.has(targetId)) return;
      target.classList.add("is-arriving");
    }, 20),
    window.setTimeout(() => {
      if (!state.activeTargets.has(targetId)) return;
      target.classList.remove("is-arriving");
      target.classList.add("is-holding");
    }, growDuration),
    window.setTimeout(() => {
      if (!state.activeTargets.has(targetId)) return;
      target.classList.remove("is-holding");
      target.classList.add("is-departing");
    }, growDuration + ARMORED_HOLD_MS),
    window.setTimeout(() => {
      removeTarget(targetId, "timeout");
    }, totalLife),
  ];

  state.activeTargets.set(targetId, {
    element: target,
    timerIds,
    position,
    hitsLeft: ARMORED_HITS_REQUIRED,
  });
}

function createFlyingTarget() {
  if (!state.running) {
    return;
  }

  const flyingLifetime = DIFFICULTY_PRESETS[state.difficulty].flyingLifetime;

  const rect = arena.getBoundingClientRect();
  const padding = 40;
  const startX = padding + Math.random() * Math.max(1, rect.width - padding * 2);
  const startY = padding + Math.random() * Math.max(1, rect.height - padding * 2);

  const initialAngle = Math.random() * Math.PI * 2;

  const target = document.createElement("button");
  const targetId = state.nextTargetId++;

  target.type = "button";
  target.className = "target target--flying";
  target.dataset.targetId = String(targetId);
  target.style.width = `${FLYING_SIZE}px`;
  target.style.height = `${FLYING_SIZE}px`;
  target.style.left = `${startX}px`;
  target.style.top = `${startY}px`;
  target.style.transform = `translate(-50%, -50%) rotate(${initialAngle * (180 / Math.PI) + 90}deg)`;
  target.setAttribute("aria-label", "Flying Target");

  target.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    event.stopPropagation();

    if (!state.running) {
      return;
    }

    state.flyingKills += 1;

    removeTarget(targetId, "flying-kill");
  });

  arena.appendChild(target);

  const record = {
    element: target,
    timerIds: [],
    position: { x: startX, y: startY },
    isFlying: true,
    x: startX,
    y: startY,
    angle: initialAngle,
    rafId: null,
  };

  state.activeTargets.set(targetId, record);

  // Start rAF loop after a brief delay (so element is in DOM)
  const showTimerId = window.setTimeout(() => {
    if (!state.activeTargets.has(targetId)) {
      return;
    }

    target.classList.add("is-flying");

    const speedPxMs = FLYING_SPEED_PX_S / 1000;
    let lastTime = performance.now();
    let angularVel = (Math.random() - 0.5) * 0.003; // rad/ms — turning rate
    let nextTurnMs = 600 + Math.random() * 700;      // time until next direction change

    function frame(now) {
      if (!state.running || !state.activeTargets.has(targetId)) {
        return;
      }

      const dt = Math.min(now - lastTime, 50); // cap to avoid huge jumps on tab switch
      lastTime = now;

      // Randomly change turning rate every 0.6–1.3 seconds
      nextTurnMs -= dt;
      if (nextTurnMs <= 0) {
        angularVel = (Math.random() - 0.5) * 0.003;
        nextTurnMs = 600 + Math.random() * 700;
      }

      record.angle += angularVel * dt;

      record.x += Math.cos(record.angle) * speedPxMs * dt;
      record.y += Math.sin(record.angle) * speedPxMs * dt;

      // Reflect off arena walls so jet stays visible the whole lifetime
      const arenaW = arena.clientWidth;
      const arenaH = arena.clientHeight;
      const wall = FLYING_SIZE / 2 + 4;

      if (record.x < wall) {
        record.x = wall;
        record.angle = Math.PI - record.angle;
      } else if (record.x > arenaW - wall) {
        record.x = arenaW - wall;
        record.angle = Math.PI - record.angle;
      }

      if (record.y < wall) {
        record.y = wall;
        record.angle = -record.angle;
      } else if (record.y > arenaH - wall) {
        record.y = arenaH - wall;
        record.angle = -record.angle;
      }

      const rotDeg = record.angle * (180 / Math.PI) + 90;
      target.style.left = `${record.x}px`;
      target.style.top = `${record.y}px`;
      target.style.transform = `translate(-50%, -50%) rotate(${rotDeg}deg)`;

      record.rafId = requestAnimationFrame(frame);
    }

    record.rafId = requestAnimationFrame(frame);
  }, 20);

  const removeTimerId = window.setTimeout(() => {
    removeTarget(targetId, "timeout");
  }, flyingLifetime);

  record.timerIds = [showTimerId, removeTimerId];
}

function spawnTick() {
  if (!state.running) {
    return;
  }

  for (let i = 0; i < state.maxTargets; i++) {
    createTarget();
  }
}

function renderTimeLeft() {
  if (!state.running) {
    return;
  }

  state.remainingMs = Math.max(0, state.startTime + state.totalSeconds * 1000 - Date.now());

  if (state.remainingMs <= 0) {
    finishSession();
  }
}

function collectSettings() {
  const duration = clamp(Number(durationInput.value) || 30, 10, 1800);
  durationInput.value = String(duration);

  const preset = DIFFICULTY_PRESETS[state.difficulty] || DIFFICULTY_PRESETS.medium;

  return {
    duration,
    spawn: preset.spawn,
    hold: preset.hold,
    concurrent: preset.concurrent,
  };
}

function syncPreviewTime() {
  if (state.running || state.preparing) {
    return;
  }

  const previewDuration = clamp(Number(durationInput.value) || 30, 10, 1800);
  state.remainingMs = previewDuration * 1000;
}

function resetStats() {
  state.clicks = 0;
  state.hits = 0;
  state.armoredKills = 0;
  state.flyingKills = 0;
  state.missedTargets = 0;
  state.missedArmored = 0;
  state.missedFlying = 0;
  state.elapsedMs = 0;
  state.remainingMs = state.totalSeconds * 1000;
  renderTimeLeft();
  updateControls();
}

async function exitArenaFullscreen() {
  if (document.fullscreenElement !== arenaSection || !document.exitFullscreen) {
    return;
  }

  try {
    await document.exitFullscreen();
  } catch (error) {
    console.error("Fullscreen exit failed", error);
  }
}

async function finishSession() {
  if (!state.running && !state.preparing) {
    return;
  }

  if (state.preparing && !state.running) {
    state.preparing = false;
    clearStartSequenceTimers();
    clearSpawnLoop();
    clearCountdownLoop();
    clearArenaTargets();
    hideCountdownOverlay();
    stopAudioKeepAlive();
    bgMusic.pause();
    bgMusic.currentTime = 0;
    arena.classList.remove("is-running");
    introOverlay.classList.remove("hidden");
    resultOverlay.classList.add("hidden");
    updateControls();
    syncPreviewTime();
    return;
  }

  const elapsedMs = Math.min(state.totalSeconds * 1000, Date.now() - state.startTime);

  state.running = false;
  state.preparing = false;
  state.elapsedMs = elapsedMs;
  state.remainingMs = Math.max(0, state.totalSeconds * 1000 - elapsedMs);

  clearStartSequenceTimers();
  clearSpawnLoop();
  clearCountdownLoop();
  clearArenaTargets();
  hideCountdownOverlay();
  stopAudioKeepAlive();
  bgMusic.pause();
  bgMusic.currentTime = 0;
  arena.classList.remove("is-running");

  const score = getScore();

  resultScore.textContent = String(score);
  resultDuration.textContent = formatTime(elapsedMs);
  resultDifficulty.textContent = translations[state.language][`diff${state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)}`];

  renderTimeLeft();
  updateControls();

  const timeupOverlay = document.getElementById("timeup-overlay");
  const timeupValue = document.getElementById("timeup-value");
  timeupValue.textContent = state.language === "ru" ? "ВРЕМЯ ВЫШЛО" : "TIME UP";
  timeupOverlay.classList.remove("hidden");
  await new Promise((resolve) => window.setTimeout(resolve, 1000));
  timeupOverlay.classList.add("hidden");

  await exitArenaFullscreen();

  resultOverlay.classList.remove("hidden");
  introOverlay.classList.add("hidden");
}

function beginSession() {
  const settings = collectSettings();

  state.totalSeconds = settings.duration;
  state.spawnInterval = settings.spawn;
  state.holdDuration = settings.hold;
  state.maxTargets = settings.concurrent;
  state.startTime = Date.now();
  state.running = true;
  state.preparing = false;
  state.nextTargetId = 1;

  clearStartSequenceTimers();
  clearSpawnLoop();
  clearCountdownLoop();
  clearArenaTargets();
  resetStats();

  resultOverlay.classList.add("hidden");
  introOverlay.classList.add("hidden");
  hideCountdownOverlay();
  arena.classList.add("is-running");
  arena.focus();
  updateControls();

  spawnTick();

  state.spawnTimerId = window.setInterval(() => {
    spawnTick();
  }, state.spawnInterval);

  state.armoredSpawnTimerId = window.setInterval(() => {
    createArmoredTarget();
  }, ARMORED_SPAWN_INTERVAL_MS);

  state.flyingSpawnTimerId = window.setInterval(() => {
    createFlyingTarget();
  }, FLYING_SPAWN_INTERVAL_MS);

  state.countdownTimerId = window.setInterval(() => {
    renderTimeLeft();

  }, 100);

  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
  startAudioKeepAlive();
}

function startCountdown(onComplete) {
  clearStartSequenceTimers();
  showCountdownOverlay(SESSION_COUNTDOWN_STEPS[0]);

  SESSION_COUNTDOWN_STEPS.forEach((value, index) => {
    const timerId = window.setTimeout(() => {
      showCountdownOverlay(value);
    }, index * SESSION_COUNTDOWN_MS);

    state.startSequenceTimerIds.push(timerId);
  });

  const completeTimerId = window.setTimeout(() => {
    hideCountdownOverlay();
    state.startSequenceTimerIds = [];
    onComplete();
  }, SESSION_COUNTDOWN_STEPS.length * SESSION_COUNTDOWN_MS);

  state.startSequenceTimerIds.push(completeTimerId);
}

async function enterArenaFullscreen() {
  if (document.fullscreenElement === arenaSection) {
    return;
  }

  if (!arenaSection.requestFullscreen) {
    return;
  }

  try {
    await arenaSection.requestFullscreen();
    arena.focus();
  } catch (error) {
    console.error("Fullscreen request failed", error);
  }
}

async function startSession() {
  if (state.running || state.preparing) {
    return;
  }

  prewarmAudio();

  state.preparing = true;
  resultOverlay.classList.add("hidden");
  introOverlay.classList.add("hidden");
  clearArenaTargets();
  clearSpawnLoop();
  clearCountdownLoop();
  hideCountdownOverlay();
  updateControls();

  await enterArenaFullscreen();
  startCountdown(() => {
    beginSession();
  });
}

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startSession();
});

overlayStartButton.addEventListener("click", () => {
  startSession();
});

restartButton.addEventListener("click", () => {
  startSession();
});

langEnButton.addEventListener("click", () => {
  setLanguage("en");
});

langRuButton.addEventListener("click", () => {
  setLanguage("ru");
});

function setMute(muted) {
  state.muted = muted;
  bgMusic.muted = muted;
  if (state.audioMasterGain) {
    state.audioMasterGain.gain.value = muted ? 0 : 2.8;
  }
  muteBtn.classList.toggle("is-muted", muted);
}

muteBtn.addEventListener("click", () => {
  setMute(!state.muted);
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.running || state.preparing) {
      return;
    }
    state.difficulty = button.dataset.difficulty;
    difficultyButtons.forEach((b) => b.classList.toggle("is-active", b === button));
  });
});


stopButton.addEventListener("click", () => {
  finishSession();
});

arena.addEventListener(
  "pointerdown",
  (event) => {
    if (!state.running || event.button !== 0) {
      return;
    }

    playShotSound();
  },
  true,
);

arena.addEventListener("pointerdown", (event) => {
  if (!state.running || event.button !== 0 || event.target !== arena) {
    return;
  }

  state.clicks += 1;
  createMissMarker(event.clientX, event.clientY);
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const duration = Number(button.dataset.duration);
    durationInput.value = String(duration);
    updatePresetButtons(duration);
    syncPreviewTime();
  });
});

durationInput.addEventListener("input", () => {
  updatePresetButtons(Number(durationInput.value));
  syncPreviewTime();
});

window.addEventListener("resize", () => {
  if (!state.running) {
    return;
  }

  clearArenaTargets();
  spawnTick();
});

document.addEventListener("fullscreenchange", () => {
  updateControls();

  if (document.fullscreenElement === arenaSection) {
    arena.focus();
  }
});

resetStats();
applyLanguage();
updatePresetButtons(Number(durationInput.value));
syncPreviewTime();
