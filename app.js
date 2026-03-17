const arenaSection = document.querySelector(".arena-section");
const arena = document.getElementById("arena");
const arenaTools = document.getElementById("arena-tools");
const settingsForm = document.getElementById("settings-form");
const durationInput = document.getElementById("duration-input");
const spawnInput = document.getElementById("spawn-input");
const lifetimeInput = document.getElementById("lifetime-input");
const concurrentInput = document.getElementById("concurrent-input");
const durationPresets = document.getElementById("duration-presets");
const scoreDisplay = document.getElementById("score-display");
const timeDisplay = document.getElementById("time-display");
const hitsDisplay = document.getElementById("hits-display");
const clicksDisplay = document.getElementById("clicks-display");
const speedDisplay = document.getElementById("speed-display");
const introOverlay = document.getElementById("intro-overlay");
const resultOverlay = document.getElementById("result-overlay");
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownValue = document.getElementById("countdown-value");
const restartButton = document.getElementById("restart-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const stopButton = document.getElementById("stop-button");
const overlayStartButton = document.getElementById("overlay-start-button");
const overlayFullscreenButton = document.getElementById("overlay-fullscreen-button");
const langEnButton = document.getElementById("lang-en");
const langRuButton = document.getElementById("lang-ru");
const presetButtons = Array.from(document.querySelectorAll(".preset-btn"));

const resultHits = document.getElementById("result-hits");
const resultClicks = document.getElementById("result-clicks");
const resultAccuracy = document.getElementById("result-accuracy");
const resultScore = document.getElementById("result-score");
const resultSpeed = document.getElementById("result-speed");
const resultDuration = document.getElementById("result-duration");

const uiText = {
  brandEyebrow: document.getElementById("brand-eyebrow"),
  brandTitle: document.getElementById("brand-title"),
  hudScoreLabel: document.getElementById("hud-score-label"),
  hudTimeLabel: document.getElementById("hud-time-label"),
  hudHitsLabel: document.getElementById("hud-hits-label"),
  hudClicksLabel: document.getElementById("hud-clicks-label"),
  hudSpeedLabel: document.getElementById("hud-speed-label"),
  settingsEyebrow: document.getElementById("settings-eyebrow"),
  settingsTitle: document.getElementById("settings-title"),
  durationLabel: document.getElementById("duration-label"),
  durationSuffix: document.getElementById("duration-suffix"),
  preset60: document.getElementById("preset-60"),
  preset120: document.getElementById("preset-120"),
  preset300: document.getElementById("preset-300"),
  spawnLabel: document.getElementById("spawn-label"),
  spawnSuffix: document.getElementById("spawn-suffix"),
  lifetimeLabel: document.getElementById("lifetime-label"),
  lifetimeSuffix: document.getElementById("lifetime-suffix"),
  concurrentLabel: document.getElementById("concurrent-label"),
  concurrentSuffix: document.getElementById("concurrent-suffix"),
  tipLabel: document.getElementById("tip-label"),
  tipLine1: document.getElementById("tip-line-1"),
  tipLine2: document.getElementById("tip-line-2"),
  tipLine3: document.getElementById("tip-line-3"),
  tipLine4: document.getElementById("tip-line-4"),
  tipLine5: document.getElementById("tip-line-5"),
  introEyebrow: document.getElementById("intro-eyebrow"),
  introTitle: document.getElementById("intro-title"),
  introCopy: document.getElementById("intro-copy"),
  introNote: document.getElementById("intro-note"),
  resultEyebrow: document.getElementById("result-eyebrow"),
  resultTitle: document.getElementById("result-title"),
  resultScoreLabel: document.getElementById("result-score-label"),
  resultHitsLabel: document.getElementById("result-hits-label"),
  resultClicksLabel: document.getElementById("result-clicks-label"),
  resultAccuracyLabel: document.getElementById("result-accuracy-label"),
  resultSpeedLabel: document.getElementById("result-speed-label"),
  resultDurationLabel: document.getElementById("result-duration-label"),
  resultsInfoTitle: document.getElementById("results-info-title"),
  resultsInfoLine1: document.getElementById("results-info-line-1"),
  resultsInfoLine2: document.getElementById("results-info-line-2"),
  resultsInfoLine3: document.getElementById("results-info-line-3"),
  resultsInfoLine4: document.getElementById("results-info-line-4"),
  resultsInfoLine5: document.getElementById("results-info-line-5"),
};

const translations = {
  en: {
    documentTitle: "Click Training",
    brandEyebrow: "Reaction Warmup",
    brandTitle: "Click Training",
    hudScoreLabel: "Score",
    hudTimeLabel: "Time",
    hudHitsLabel: "Accurate Clicks",
    hudClicksLabel: "Free Clicks",
    hudSpeedLabel: "Speed",
    settingsEyebrow: "Session Setup",
    settingsTitle: "Training Settings",
    durationLabel: "Duration",
    durationSuffix: "sec",
    preset60: "1 min",
    preset120: "2 min",
    preset300: "5 min",
    presetsAriaLabel: "Quick time presets",
    spawnLabel: "Spawn Interval",
    spawnSuffix: "ms",
    lifetimeLabel: "Hold at Full Size",
    lifetimeSuffix: "ms",
    concurrentLabel: "Targets at Once",
    concurrentSuffix: "pcs",
    tipLabel: "Tip",
    tipLine1: "For a more aggressive warmup, try this setup:",
    tipLine2: "— spawn interval: 120 ms",
    tipLine3: "— hold at full size: 120 ms",
    tipLine4: "— targets at once: 12",
    tipLine5: "This mode gives you a faster pace and works well for maximum-aggression warmups.",
    arenaLabel: "Game field",
    arenaToolsLabel: "Game controls",
    introEyebrow: "Ready Check",
    introTitle: "Click Warmup Before the Match.",
    introCopy:
      "Your score grows from accurate clicks on targets and free clicks between them. This training values both precision and tempo.",
    introNote:
      "Great for warming up before VALORANT, Counter-Strike 2, Apex Legends, Call of Duty, and Fortnite.",
    startSession: "Start Session",
    fullscreen: "Fullscreen",
    fullscreenExit: "Press Esc to Exit",
    stop: "Stop",
    resultEyebrow: "Session Complete",
    resultTitle: "Training Results",
    resultScoreLabel: "Score",
    resultHitsLabel: "Accurate Clicks",
    resultClicksLabel: "Free Clicks",
    resultAccuracyLabel: "Accuracy",
    resultSpeedLabel: "Speed",
    resultDurationLabel: "Round",
    resultsInfoTitle: "How Score Works",
    resultsInfoLine1: "Your score is built from two kinds of clicks:",
    resultsInfoLine2: "— accurate clicks are direct hits on targets",
    resultsInfoLine3: "— free clicks are extra clicks between targets",
    resultsInfoLine4: "Both categories add to your total score.",
    resultsInfoLine5:
      "The goal is not only accuracy, but also overall click activity, so you can warm up your hand and get up to speed before a game.",
    speedUnit: "c/s",
    langSwitcherLabel: "Language switcher",
  },
  ru: {
    documentTitle: "Тренировка клика",
    brandEyebrow: "Разогрев реакции",
    brandTitle: "Тренировка клика",
    hudScoreLabel: "Счёт",
    hudTimeLabel: "Время",
    hudHitsLabel: "Точные клики",
    hudClicksLabel: "Свободные клики",
    hudSpeedLabel: "Скорость",
    settingsEyebrow: "Параметры Сессии",
    settingsTitle: "Настройки тренировки",
    durationLabel: "Длительность",
    durationSuffix: "сек",
    preset60: "1 мин",
    preset120: "2 мин",
    preset300: "5 мин",
    presetsAriaLabel: "Быстрые значения времени",
    spawnLabel: "Интервал появления",
    spawnSuffix: "мс",
    lifetimeLabel: "Пауза на полном размере",
    lifetimeSuffix: "мс",
    concurrentLabel: "Целей одновременно",
    concurrentSuffix: "шт",
    tipLabel: "Подсказка",
    tipLine1: "Также для более агрессивной разминки попробуйте:",
    tipLine2: "— интервал появления: 120 мс",
    tipLine3: "— пауза на полном размере: 120 мс",
    tipLine4: "— целей одновременно: 12",
    tipLine5:
      "Этот режим даёт более высокий темп и подходит для максимальной агрессивной разминки.",
    arenaLabel: "Игровое поле",
    arenaToolsLabel: "Игровые элементы управления",
    introEyebrow: "Готовность",
    introTitle: "Разминка на клики перед игрой.",
    introCopy:
      "Счёт растёт за точные клики по целям и за свободные клики между ними. В этой тренировке важны и точность, и темп.",
    introNote:
      "Подходит для разминки перед VALORANT, Counter-Strike 2, Apex Legends, Call of Duty и Fortnite.",
    startSession: "Начать сессию",
    fullscreen: "Полный экран",
    fullscreenExit: "Нажмите Esc для выхода",
    stop: "Стоп",
    resultEyebrow: "Сессия завершена",
    resultTitle: "Результат тренировки",
    resultScoreLabel: "Счёт",
    resultHitsLabel: "Точные клики",
    resultClicksLabel: "Свободные клики",
    resultAccuracyLabel: "Точность",
    resultSpeedLabel: "Скорость",
    resultDurationLabel: "Раунд",
    resultsInfoTitle: "Как считается счёт",
    resultsInfoLine1: "Счёт складывается из двух типов кликов:",
    resultsInfoLine2: "— точные клики — это попадания по целям",
    resultsInfoLine3: "— свободные клики — это дополнительные клики между целями",
    resultsInfoLine4: "Обе категории идут в плюс к общему счёту.",
    resultsInfoLine5:
      "Смысл тренировки не только в точности, но и в общей активности кликов, чтобы быстрее раскликаться и разогревать руку перед игрой.",
    speedUnit: "к/с",
    langSwitcherLabel: "Переключение языка",
  },
};

const GROW_DURATION_MS = 1350;
const SHRINK_DURATION_MS = 1350;
const HIT_REACTION_MS = 220;
const MISS_MARKER_MS = 100;
const SESSION_COUNTDOWN_STEPS = [3, 2, 1];
const SESSION_COUNTDOWN_MS = 1000;

const state = {
  language: "en",
  running: false,
  totalSeconds: 30,
  spawnInterval: 500,
  holdDuration: 500,
  maxTargets: 5,
  clicks: 0,
  hits: 0,
  misses: 0,
  startTime: 0,
  remainingMs: 30000,
  elapsedMs: 0,
  countdownTimerId: null,
  spawnTimerId: null,
  startSequenceTimerIds: [],
  preparing: false,
  activeTargets: new Map(),
  nextTargetId: 1,
  audioContext: null,
  audioMasterGain: null,
  audioCompressor: null,
  noiseBuffer: null,
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

function getMissClicks() {
  return state.clicks;
}

function getTotalAttempts() {
  return state.hits + getMissClicks();
}

function getScore() {
  return state.hits * 20 + getMissClicks();
}

function formatSpeed(speed) {
  return `${speed.toFixed(2)} ${translations[state.language].speedUnit}`;
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
  arena.setAttribute("aria-label", copy.arenaLabel);
  arenaTools.setAttribute("aria-label", copy.arenaToolsLabel);
  document.querySelector(".lang-switch")?.setAttribute("aria-label", copy.langSwitcherLabel);

  overlayStartButton.textContent = copy.startSession;
  restartButton.textContent = copy.startSession;
  stopButton.textContent = copy.stop;

  updateLanguageButtons();
  updateFullscreenButtons();
  updateHud();

  if (!state.running) {
    const speed = state.elapsedMs > 0 ? state.hits / Math.max(1, state.elapsedMs / 1000) : 0;
    resultSpeed.textContent = formatSpeed(speed);
  }
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

function updateFullscreenButtons() {
  const isFullscreen = document.fullscreenElement === arenaSection;
  const copy = translations[state.language];
  const label = isFullscreen ? copy.fullscreenExit : copy.fullscreen;

  fullscreenButton.textContent = label;
  if (overlayFullscreenButton) {
    overlayFullscreenButton.textContent = label;
  }
}

function updateControls() {
  stopButton.disabled = !state.running && !state.preparing;
  updateFullscreenButtons();
}

function updateHud() {
  const elapsedSeconds = getElapsedSeconds();
  const speed = elapsedSeconds > 0 ? state.hits / elapsedSeconds : 0;
  const score = getScore();
  const missClicks = getMissClicks();

  scoreDisplay.textContent = String(score);
  hitsDisplay.textContent = String(state.hits);
  clicksDisplay.textContent = String(missClicks);
  speedDisplay.textContent = formatSpeed(speed);
}

function clearSpawnLoop() {
  if (state.spawnTimerId !== null) {
    window.clearInterval(state.spawnTimerId);
    state.spawnTimerId = null;
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

    state.audioMasterGain.gain.value = 2.8;
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
  playNoiseBurst({
    duration: 0.05,
    volume: 1.08,
    attack: 0.0001,
    decay: 0.03,
    highpassFrequency: 120,
    lowpassFrequency: 1500,
  });
  playTone({
    frequency: 140,
    endFrequency: 48,
    duration: 0.06,
    type: "square",
    volume: 1.18,
    attack: 0.0001,
    decay: 0.032,
  });
  playTone({
    frequency: 980,
    endFrequency: 260,
    duration: 0.024,
    type: "sawtooth",
    volume: 0.42,
    attack: 0.0001,
    decay: 0.022,
  });
  playTone({
    frequency: 72,
    endFrequency: 38,
    duration: 0.08,
    type: "triangle",
    volume: 0.4,
    attack: 0.0001,
    decay: 0.05,
  });
}

function playHitSound() {
  playNoiseBurst({
    duration: 0.075,
    volume: 0.98,
    attack: 0.0001,
    decay: 0.06,
    highpassFrequency: 280,
    lowpassFrequency: 2200,
  });
  playTone({
    frequency: 620,
    endFrequency: 170,
    duration: 0.055,
    type: "triangle",
    volume: 0.78,
    attack: 0.0001,
    decay: 0.045,
  });
  playTone({
    frequency: 110,
    endFrequency: 52,
    duration: 0.07,
    type: "square",
    volume: 0.82,
    attack: 0.0001,
    decay: 0.055,
    delay: 0.004,
  });
  playNoiseBurst({
    duration: 0.03,
    volume: 0.34,
    attack: 0.0001,
    decay: 0.028,
    delay: 0.006,
    highpassFrequency: 900,
    lowpassFrequency: 3200,
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

function removeTarget(targetId, reason = "cleanup") {
  const record = state.activeTargets.get(targetId);

  if (!record) {
    return;
  }

  clearTargetTimers(record);
  state.activeTargets.delete(targetId);

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
    state.misses += 1;
    updateHud();
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
  if (!state.running || state.activeTargets.size >= state.maxTargets) {
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
    updateHud();
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

function spawnTick() {
  if (!state.running || state.activeTargets.size >= state.maxTargets) {
    return;
  }

  createTarget();
}

function renderTimeLeft() {
  if (!state.running) {
    timeDisplay.textContent = formatTime(state.remainingMs);
    return;
  }

  state.remainingMs = Math.max(0, state.startTime + state.totalSeconds * 1000 - Date.now());
  timeDisplay.textContent = formatTime(state.remainingMs);

  if (state.remainingMs <= 0) {
    finishSession();
  }
}

function collectSettings() {
  const duration = clamp(Number(durationInput.value) || 30, 10, 1800);
  const spawn = clamp(Number(spawnInput.value) || 500, 120, 2500);
  const hold = clamp(Number(lifetimeInput.value) || 500, 100, 5000);
  const concurrent = clamp(Number(concurrentInput.value) || 5, 1, 12);

  durationInput.value = String(duration);
  spawnInput.value = String(spawn);
  lifetimeInput.value = String(hold);
  concurrentInput.value = String(concurrent);

  return {
    duration,
    spawn,
    hold,
    concurrent,
  };
}

function syncPreviewTime() {
  if (state.running || state.preparing) {
    return;
  }

  const previewDuration = clamp(Number(durationInput.value) || 30, 10, 1800);
  state.remainingMs = previewDuration * 1000;
  timeDisplay.textContent = formatTime(state.remainingMs);
}

function resetStats() {
  state.clicks = 0;
  state.hits = 0;
  state.misses = 0;
  state.elapsedMs = 0;
  state.remainingMs = state.totalSeconds * 1000;
  updateHud();
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
  arena.classList.remove("is-running");

  const totalAttempts = getTotalAttempts();
  const missClicks = getMissClicks();
  const accuracy = totalAttempts > 0 ? (state.hits / totalAttempts) * 100 : 0;
  const score = getScore();
  const speed = elapsedMs > 0 ? state.hits / (elapsedMs / 1000) : 0;

  resultScore.textContent = String(score);
  resultHits.textContent = String(state.hits);
  resultClicks.textContent = String(missClicks);
  resultAccuracy.textContent = `${accuracy.toFixed(1)}%`;
  resultSpeed.textContent = formatSpeed(speed);
  resultDuration.textContent = formatTime(elapsedMs);

  updateHud();
  renderTimeLeft();
  updateControls();

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

  for (let index = 0; index < Math.min(2, state.maxTargets); index += 1) {
    spawnTick();
  }

  state.spawnTimerId = window.setInterval(() => {
    spawnTick();
  }, state.spawnInterval);

  state.countdownTimerId = window.setInterval(() => {
    renderTimeLeft();
    updateHud();
  }, 100);
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

fullscreenButton.addEventListener("click", () => {
  enterArenaFullscreen();
});

if (overlayFullscreenButton) {
  overlayFullscreenButton.addEventListener("click", () => {
    enterArenaFullscreen();
  });
}

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
  state.misses += 1;
  updateHud();
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

  const targetCount = Math.min(state.activeTargets.size || 1, state.maxTargets);
  clearArenaTargets();

  for (let index = 0; index < targetCount; index += 1) {
    spawnTick();
  }
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
