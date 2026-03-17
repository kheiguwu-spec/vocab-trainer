// ─── PALABRAS ────────────────────────────────────────────────────────────────
let words = [
  {eng: "improve",           spa: "mejorar / perfeccionar"},
  {eng: "checks",            spa: "revisar / comprobar / cheques"},
  {eng: "fortune telling",   spa: "adivinación / predicción"},
  {eng: "advice seeking",    spa: "búsqueda de consejos"},
  {eng: "sources",           spa: "fuentes / orígenes"},
  {eng: "outlook",           spa: "perspectiva / panorama / pronóstico"},
  {eng: "each",              spa: "cada / cada uno"},
  {eng: "otherwise",         spa: "de lo contrario / si no"},
  {eng: "least",             spa: "al menos / mínimo"},
  {eng: "might",             spa: "podría / quizás"},
  {eng: "awfully",           spa: "tremendamente / terriblemente"},
  {eng: "roller coaster",    spa: "montaña rusa"},
  {eng: "enjoy the ride",    spa: "disfruta el viaje"},
  {eng: "tall",              spa: "alto"},
  {eng: "either",            spa: "cualquiera / tampoco"},
  {eng: "which",             spa: "cuál / el cual"},
  {eng: "sorting",           spa: "clasificación / ordenamiento"},
  {eng: "statement",         spa: "declaración / sentencia / estado de cuenta"},
  {eng: "dusk",              spa: "anochecer / ocaso"},
  {eng: "wise",              spa: "sabio / juicioso"},
  {eng: "bold",              spa: "audaz / atrevido / negrita"},
  {eng: "kind",              spa: "amable / tipo / clase"},
  {eng: "drum",              spa: "tambor / bidón"},
  {eng: "pleases",           spa: "agrada / complace"},
  {eng: "further",           spa: "más / adicional / promover"},
  {eng: "nested",            spa: "anidado"},
  {eng: "dive",              spa: "sumergirse / bucear"},
  {eng: "sneak peek",        spa: "adelanto / vistazo previo"},
  {eng: "however",           spa: "sin embargo / no obstante"},
  {eng: "attempt",           spa: "intento / intentar"},
  {eng: "reached",           spa: "alcanzado / llegado a"},
  {eng: "actually",          spa: "de hecho / en realidad"},
  {eng: "annoying",          spa: "molesto / irritante"},
  {eng: "achieve",           spa: "lograr / alcanzar una meta"},
  {eng: "avoid",             spa: "evitar / esquivar"},
  {eng: "become",            spa: "llegar a ser / convertirse en"},
  {eng: "deal with",         spa: "lidiar con / encargarse de"},
  {eng: "deliver",           spa: "entregar / cumplir"},
  {eng: "develop",           spa: "desarrollar / fomentar"},
  {eng: "feedback",          spa: "retroalimentación / comentarios"},
  {eng: "fill out",          spa: "rellenar / completar un formulario"},
  {eng: "focus on",          spa: "enfocarse en / centrarse en"},
  {eng: "get used to",       spa: "acostumbrarse a"},
  {eng: "handle",            spa: "manejar / gestionar / manipular"},
  {eng: "knowledge",         spa: "conocimiento / saber"},
  {eng: "look for",          spa: "buscar"},
  {eng: "main",              spa: "principal / lo más importante"},
  {eng: "manage",            spa: "administrar / gestionar / lograr"},
  {eng: "notice",            spa: "notar / darse cuenta / aviso"},
  {eng: "overcome",          spa: "superar / vencer un obstáculo"},
  {eng: "purpose",           spa: "propósito / finalidad"},
  {eng: "reliable",          spa: "confiable / fiable"},
  {eng: "schedule",          spa: "horario / programar / calendario"},
  {eng: "skills",            spa: "habilidades / destrezas"},
  {eng: "undergo",           spa: "someterse a / pasar por un proceso"},
  {eng: "update",            spa: "actualizar / poner al día"},
  {eng: "as soon as",        spa: "tan pronto como"},
  {eng: "at the end",        spa: "al final"},
  {eng: "at the moment",     spa: "por el momento / ahora mismo"},
  {eng: "currently",         spa: "actualmente / en este momento"},
  {eng: "daily",             spa: "diariamente"},
  {eng: "weekly",            spa: "semanalmente"},
  {eng: "earlier",           spa: "más temprano / antes"},
  {eng: "hardly",            spa: "apenas / casi no"},
  {eng: "instead",           spa: "en su lugar / en vez de eso"},
  {eng: "latest",            spa: "lo último / lo más reciente"},
  {eng: "mainly",            spa: "principalmente / sobre todo"},
  {eng: "maybe",             spa: "quizás / tal vez"},
  {eng: "perhaps",           spa: "tal vez / quizás"},
  {eng: "recently",          spa: "recientemente / hace poco"},
  {eng: "seldom",            spa: "rara vez / casi nunca"},
  {eng: "since",             spa: "desde / ya que"},
  {eng: "still",             spa: "todavía / aún"},
  {eng: "until",             spa: "hasta"},
  {eng: "while",             spa: "mientras / mientras que"},
  {eng: "yet",               spa: "aún / todavía"},
  {eng: "as well as",        spa: "así como / también / además de"},
  {eng: "by the way",        spa: "por cierto / a propósito"},
  {eng: "even if",           spa: "incluso si / aunque"},
  {eng: "in fact",           spa: "de hecho / en realidad"},
  {eng: "in order to",       spa: "para / con el fin de"},
  {eng: "on the other hand", spa: "por otro lado / en cambio"},
  {eng: "regardless",        spa: "sin importar / independientemente de"},
  {eng: "so far",            spa: "hasta ahora / por ahora"},
  {eng: "such a",            spa: "tal... / un... tan..."},
  {eng: "therefore",         spa: "por lo tanto / por lo cual"},
  {eng: "unless",            spa: "a menos que / salvo que"},
  {eng: "whether",           spa: "si (para elegir entre dos)"},
  {eng: "furthermore",       spa: "es más / además / asimismo"},
  {eng: "interview",         spa: "entrevista / entrevistar"},
  {eng: "countless",         spa: "innumerables / incontables"}
];

// ─── ESTADO ──────────────────────────────────────────────────────────────────
let currentWord  = null;
let total        = 0;
let correct      = 0;
let answered     = false;
let queue        = [];

// Cache de traducciones de la API: { "improve": ["mejorar","perfeccionar", ...], ... }
const apiCache = {};
// Estado de precarga
let preloadDone    = false;
let preloadTotal   = 0;
let preloadLoaded  = 0;

// ─── MYMEMORY API ─────────────────────────────────────────────────────────────

/**
 * Consulta MyMemory para obtener traducciones EN→ES de una palabra/frase.
 * Devuelve array de strings normalizados, o [] si falla.
 */
async function fetchTranslations(engWord) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(engWord)}&langpair=en|es`;
    const res  = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();

    const results = new Set();

    // Traducción principal
    if (data.responseData && data.responseData.translatedText) {
      splitAndAdd(data.responseData.translatedText, results);
    }

    // Traducciones alternativas (matches)
    if (Array.isArray(data.matches)) {
      data.matches.forEach(m => {
        if (m.translation) splitAndAdd(m.translation, results);
      });
    }

    return [...results].filter(t => t.length > 0);
  } catch {
    return [];
  }
}

/**
 * Divide una traducción en partes individuales y las agrega al Set.
 * Maneja separadores: "/", ",", ";", " - "
 */
function splitAndAdd(text, set) {
  text.split(/[\/,;]| - /)
    .map(t => normalize(t))
    .filter(t => t.length > 1)
    .forEach(t => set.add(t));
}

/**
 * Precarga traducciones de todas las palabras en segundo plano,
 * mostrando barra de progreso en el botón de inicio.
 */
async function preloadAllTranslations() {
  preloadTotal  = words.length;
  preloadLoaded = 0;
  updatePreloadUI();

  // Lanzar en lotes de 5 en paralelo para no saturar la API
  const BATCH = 5;
  for (let i = 0; i < words.length; i += BATCH) {
    const batch = words.slice(i, i + BATCH);
    await Promise.all(batch.map(async w => {
      const key = w.eng.toLowerCase();
      if (!apiCache[key]) {
        const translations = await fetchTranslations(w.eng);
        apiCache[key] = translations;
      }
      preloadLoaded++;
      updatePreloadUI();
    }));
    // Pequeña pausa entre lotes para respetar rate limit
    if (i + BATCH < words.length) {
      await sleep(300);
    }
  }

  preloadDone = true;
  updatePreloadUI();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function updatePreloadUI() {
  const btn = document.getElementById("startBtn");
  if (!btn) return;
  if (preloadDone) {
    btn.textContent = "Comenzar →";
    btn.disabled = false;
    btn.style.opacity = "1";

    // Mostrar indicador de que la API está lista
    const apiStatus = document.getElementById("apiStatus");
    if (apiStatus) {
      apiStatus.textContent = "🌐 Validación ampliada activa";
      apiStatus.className = "api-status ready";
    }
  } else {
    const pct = Math.round((preloadLoaded / preloadTotal) * 100);
    btn.textContent = `Cargando traducciones… ${pct}%`;
    btn.disabled = true;
    btn.style.opacity = "0.7";
  }
}

// ─── NORMALIZACIÓN Y COMPARACIÓN ─────────────────────────────────────────────

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

/**
 * Obtiene todas las respuestas válidas para una palabra:
 * las hardcodeadas + las de la API (si están en cache).
 */
function getAllAccepted(word) {
  const set = new Set();

  // 1. Hardcodeadas
  word.spa.split("/").forEach(p => {
    const n = normalize(p.trim());
    if (n) set.add(n);
    // también agregar cada token individual para palabras simples
    n.split(/\s+/).filter(t => t.length > 2).forEach(t => set.add(t));
  });

  // 2. De la API (si ya se precargó)
  const key = word.eng.toLowerCase();
  if (apiCache[key]) {
    apiCache[key].forEach(t => set.add(t));
  }

  return [...set];
}

/**
 * Compara la respuesta del usuario contra todas las aceptadas.
 * Estrategias (en orden de permisividad):
 *  1. Coincidencia exacta
 *  2. La respuesta del usuario está contenida en una aceptada
 *  3. Una aceptada está contenida en la respuesta del usuario
 *  4. Coincidencia de al menos una palabra clave (>3 chars)
 */
function isCorrect(userInput, word) {
  const userNorm = normalize(userInput);
  if (!userNorm || userNorm.length < 2) return false;

  const accepted = getAllAccepted(word);

  for (const ans of accepted) {
    // Exacta
    if (userNorm === ans) return true;
    // Contención mutua (para frases)
    if (ans.includes(userNorm) && userNorm.length >= 4) return true;
    if (userNorm.includes(ans) && ans.length >= 4) return true;
  }

  // Palabra clave compartida (>3 chars)
  const userWords = userNorm.split(/\s+/);
  for (const ans of accepted) {
    const ansWords = ans.split(/\s+/);
    if (ansWords.some(w => w.length > 3 && userWords.includes(w))) return true;
  }

  return false;
}

/**
 * Si la respuesta fue marcada como incorrecta pero queremos re-validar
 * contra la API en tiempo real (por si la precarga falló para esa palabra).
 */
async function revalidateWithAPI(userInput, word) {
  const key = word.eng.toLowerCase();
  if (!apiCache[key] || apiCache[key].length === 0) {
    // Intentar obtener traducciones ahora
    const translations = await fetchTranslations(word.eng);
    if (translations.length > 0) {
      apiCache[key] = translations;
      return isCorrect(userInput, word);
    }
  }
  return false;
}

// ─── COLA SIN REPETICIÓN ─────────────────────────────────────────────────────

function buildQueue() {
  queue = [...words];
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
}

// ─── UI ───────────────────────────────────────────────────────────────────────

function updateScore() {
  document.getElementById("cTotal").textContent   = total;
  document.getElementById("cCorrect").textContent = correct;
  document.getElementById("cWrong").textContent   = total - correct;

  if (total === 0) {
    document.getElementById("scorePct").textContent    = "—";
    document.getElementById("scoreFill").style.width   = "0%";
  } else {
    const pct = Math.round((correct / total) * 100);
    document.getElementById("scorePct").textContent  = pct + "%";
    document.getElementById("scoreFill").style.width = pct + "%";
  }
}

function updateWordCount() {
  document.getElementById("wordCountDisplay").textContent = words.length;
  document.getElementById("totalWordsLabel").textContent  = words.length + " palabras en total";
}

function showResult(type, userInput, word) {
  const resultEl  = document.getElementById("result");
  const correctAns = word.spa;

  // Construir pills con todos los significados aceptados de la lista hardcoded
  const pills = correctAns
    .split("/")
    .map(m => `<span class="meaning-pill">${m.trim()}</span>`)
    .join("");

  if (type === "correct") {
    resultEl.className = "correct";
    resultEl.innerHTML = `✓ ¡Correcto!<span class="correct-ans">Significados: ${pills}</span>`;
  } else {
    resultEl.className = "wrong";
    resultEl.innerHTML =
      `✗ Incorrecto — escribiste: <strong>${userInput}</strong>` +
      `<span class="correct-ans">✓ Significados correctos:<br>${pills}</span>`;
  }
}

function nextWord() {
  answered = false;

  const resultEl  = document.getElementById("result");
  resultEl.className   = "";
  resultEl.style.display = "none";
  resultEl.textContent = "";

  const answerEl = document.getElementById("answer");
  answerEl.value = "";
  answerEl.classList.remove("shake", "pulse");
  answerEl.focus();

  if (queue.length === 0) {
    buildQueue();
    const wordEl = document.getElementById("word");
    wordEl.textContent = "🔄 ¡Nueva ronda!";
    setTimeout(pickFromQueue, 900);
    return;
  }
  pickFromQueue();
}

function pickFromQueue() {
  currentWord = queue.pop();

  const done = words.length - queue.length;
  document.getElementById("roundProgress").textContent = `Palabra ${done} de ${words.length}`;

  const wordEl = document.getElementById("word");
  wordEl.style.animation = "none";
  requestAnimationFrame(() => {
    wordEl.style.animation = "wordIn 0.35s cubic-bezier(.4,0,.2,1)";
    const w = currentWord.eng;
    wordEl.textContent = w.charAt(0).toUpperCase() + w.slice(1);
  });
}

// ─── LÓGICA PRINCIPAL ────────────────────────────────────────────────────────

async function checkAnswer() {
  if (answered) { nextWord(); return; }

  const answerEl = document.getElementById("answer");
  const userInput = answerEl.value.trim();
  if (!userInput) { answerEl.focus(); return; }

  // Bloquear mientras procesamos
  answered = true;
  total++;

  const resultEl = document.getElementById("result");

  // Verificación inicial (hardcoded + cache API)
  if (isCorrect(userInput, currentWord)) {
    correct++;
    answerEl.classList.add("pulse");
    showResult("correct", userInput, currentWord);
    updateScore();
    return;
  }

  // Si falla: re-validar con API en tiempo real (por si la precarga falló)
  // Mostrar estado "validando…" brevemente
  resultEl.style.display = "block";
  resultEl.className = "";
  resultEl.innerHTML = `<span style="color:var(--muted)">🌐 Verificando con API…</span>`;

  const recheck = await revalidateWithAPI(userInput, currentWord);

  if (recheck) {
    correct++;
    answerEl.classList.add("pulse");
    showResult("correct", userInput, currentWord);
  } else {
    answerEl.classList.add("shake");
    setTimeout(() => answerEl.classList.remove("shake"), 400);
    showResult("wrong", userInput, currentWord);
  }

  updateScore();
}

function addWord() {
  const engEl = document.getElementById("engWord");
  const spaEl = document.getElementById("spaWord");
  const eng   = engEl.value.trim().toLowerCase();
  const spa   = spaEl.value.trim().toLowerCase();

  if (eng && spa) {
    words.push({ eng, spa });
    engEl.value = "";
    spaEl.value = "";
    engEl.focus();
    updateWordCount();

    // Pre-cargar traducciones de la nueva palabra también
    fetchTranslations(eng).then(translations => {
      if (translations.length > 0) apiCache[eng] = translations;
    });

    const btn = document.querySelector(".btn-add");
    btn.textContent = "✓";
    btn.style.background = "var(--green)";
    setTimeout(() => { btn.textContent = "+"; btn.style.background = ""; }, 1000);
  }
}

function resetScore() {
  total   = 0;
  correct = 0;
  buildQueue();
  updateScore();
  nextWord();
}

// ─── TECLADO ─────────────────────────────────────────────────────────────────

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const quizVisible = !document.getElementById("quizScreen").classList.contains("hidden");
    if (!quizVisible) return;
    if (!answered) checkAnswer();
    else nextWord();
  }
});

// ─── INICIO ───────────────────────────────────────────────────────────────────

document.getElementById("startBtn").onclick = function() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  buildQueue();
  nextWord();
};

// Al cargar la página: mostrar conteo e iniciar precarga en background
updateWordCount();
preloadAllTranslations();