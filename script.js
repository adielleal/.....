/* =====================================================================
   PARA TI — script.js
   Controla: caída de flores/rosas/pétalos, destellos brillantes
   y las transiciones (fade + zoom) entre los tres apartados.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPetals();
  initSparkles();
  initStageNavigation();
});

/* =====================================================================
   1. FLORES, ROSAS Y PÉTALOS CAYENDO
   ===================================================================== */
function initPetals() {
  const layer = document.getElementById('petalsLayer');
  if (!layer) return;

  // Emojis que representan flores, rosas y pétalos
  const petalTypes = ['🌸', '🌹', '💮', '🌺', '🏵️'];

  // Cantidad de elementos cayendo simultáneamente (ajustado para rendimiento)
  const isMobile = window.innerWidth <= 640;
  const petalCount = isMobile ? 16 : 26;

  for (let i = 0; i < petalCount; i++) {
    createPetal(layer, petalTypes);
  }
}

function createPetal(layer, petalTypes) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];

  // Variación de tamaño para dar sensación de profundidad
  const size = 14 + Math.random() * 22; // entre 14px y 36px
  petal.style.fontSize = `${size}px`;

  // Posición horizontal inicial aleatoria
  const startLeft = Math.random() * 100;
  petal.style.left = `${startLeft}vw`;

  // Velocidad de caída variable (más grande = más lento, más natural)
  const duration = 8 + Math.random() * 10; // entre 8s y 18s
  petal.style.animationDuration = `${duration}s`;

  // Retraso aleatorio para que no caigan todas a la vez
  const delay = Math.random() * duration;
  petal.style.animationDelay = `-${delay}s`;

  // Deriva horizontal (balanceo) y rotación total al caer
  const drift = (Math.random() * 220 - 110).toFixed(0) + 'px';
  const spin = (Math.random() > 0.5 ? 1 : -1) * (280 + Math.random() * 360);
  petal.style.setProperty('--drift', drift);
  petal.style.setProperty('--spin', `${spin.toFixed(0)}deg`);

  // Opacidad base ligeramente distinta por elemento
  petal.style.opacity = (0.65 + Math.random() * 0.35).toFixed(2);

  layer.appendChild(petal);
}

/* =====================================================================
   2. DESTELLOS BRILLANTES DISTRIBUIDOS POR TODA LA PÁGINA
   ===================================================================== */
function initSparkles() {
  const layer = document.getElementById('sparklesLayer');
  if (!layer) return;

  const isMobile = window.innerWidth <= 640;
  const sparkleCount = isMobile ? 18 : 32;

  for (let i = 0; i < sparkleCount; i++) {
    createSparkle(layer);
  }
}

function createSparkle(layer) {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';

  sparkle.style.top = `${Math.random() * 100}vh`;
  sparkle.style.left = `${Math.random() * 100}vw`;

  const size = 4 + Math.random() * 6;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;

  const duration = 1.8 + Math.random() * 2.6;
  sparkle.style.animationDuration = `${duration}s`;
  sparkle.style.animationDelay = `-${Math.random() * duration}s`;

  layer.appendChild(sparkle);
}

/* =====================================================================
   3. NAVEGACIÓN ENTRE APARTADOS (transición fade + zoom)
   ===================================================================== */
function initStageNavigation() {
  const stage1 = document.getElementById('stage1');
  const stage2 = document.getElementById('stage2');
  const stage3 = document.getElementById('stage3');

  const btnContinuar = document.getElementById('btnContinuar');
  const btnSigue = document.getElementById('btnSigue');

  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => goToStage(stage1, stage2));
  }

  if (btnSigue) {
    btnSigue.addEventListener('click', () => goToStage(stage2, stage3));
  }
}

function goToStage(fromStage, toStage) {
  if (!fromStage || !toStage) return;

  // Evita doble clic mientras la transición ocurre
  const activeButtons = fromStage.querySelectorAll('button');
  activeButtons.forEach((btn) => (btn.disabled = true));

  // Inicia la salida elegante del apartado actual
  fromStage.classList.add('stage--leaving');
  fromStage.classList.remove('stage--active');

  // Activa el nuevo apartado (fade + zoom controlado por CSS)
  requestAnimationFrame(() => {
    toStage.classList.add('stage--active');
  });

  // Reinicia las animaciones de entrada del nuevo apartado
  restartEntranceAnimations(toStage);
}

/* Reinicia las animaciones "fade-in-up" y "card-appear" cada vez
   que se entra a un apartado, para que se vean nuevamente al navegar. */
function restartEntranceAnimations(stage) {
  const animatedElements = stage.querySelectorAll('.fade-in-up, .card-appear');
  animatedElements.forEach((el) => {
    el.style.animation = 'none';
    // Forzar reflow para poder reiniciar la animación
    void el.offsetWidth;
    el.style.animation = '';
  });
}