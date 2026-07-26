
const MEMORIES = [
  { src: "images/memory-1.svg",  caption: "Our first selfie" },
  { src: "images/memory-2.svg",  caption: "The day we laughed the hardest" },
  { src: "images/memory-3.svg",  caption: "My favourite smile" },
  { src: "images/memory-4.svg",  caption: "You made this day unforgettable" },
  { src: "images/memory-5.svg",  caption: "That random Tuesday that felt like magic" },
  { src: "images/memory-6.svg",  caption: "Rainy day, warm hearts" },
  { src: "images/memory-7.svg",  caption: "The trip we still talk about" },
  { src: "images/memory-8.svg",  caption: "Midnight conversations" },
  { src: "images/memory-9.svg",  caption: "You, mid-laugh, unaware I was staring" },
  { src: "images/memory-10.svg", caption: "Right here, right now" },
];

// Typed one at a time in the Wishes section.
const WISHES = [
  { label: "Dear Love,", text: "Thank you for making these years the most beautiful chapter of my life. I did not know a person could feel like home until I met you." },
  { label: "On patience,", text: "Thank you for staying gentle with me on the days I made it hard to. You have taught me what real, quiet love looks like." },
  { label: "On laughter,", text: "You have a way of making ordinary moments feel like the best part of my day. I hope I give you even a fraction of that back." },
  { label: "On small things,", text: "The Naughtyness, the inside jokes, the way you say my name. I notice all of it, and I keep every single piece." },
  { label: "On today,", text: "Twenty-three looks good on you. So does every year that comes after it, and I intend to be there for each one." },
  { label: "On us,", text: "We have built something soft and steady in a world that is rarely either. I do not take that for granted, not for a second." },
  { label: "On forever,", text: "If today is any indication of the years ahead, I am the luckiest person alive. Here's to more birthdays, more memories, more us." },
  { label: "On you,", text: "You are, quite simply, my favourite person. I hope today reminds you of that every single hour." },
  { label: "Always,", text: "Happy birthday, my love. This is only the beginning of the adventure, keep reading." },
];

// The 23 missions. `icon` is any emoji, `text` is the instruction shown on the card.
const MISSIONS = [
  { icon: "🤗", text: "Give me the warmest hug you can. Don't let go for 10 minutes." },
  { icon: "🤗", text: "Let me hold you in my arms for the next 20 minutes." },
  { icon: "💋", text: "Your mission: Give me the weirdest kiss you can think of!" },
  { icon: "🤫", text: "Tell me one secret." },
  { icon: "🫣", text: "Let's play a game! The loser has to take off one piece of clothing." },
  { icon: "💃", text: "Song is yours, Dance is mine." },
  { icon: "💆‍♀️", text: "Give me a Massage" },
  { icon: "😂", text: "Take a funny or secret selfie." },
  { icon: "📍", text: "Choose our next date place, we will go.." },
  { icon: "🏋️‍♂️", text: "Put me on your shoulders and do 5 push-ups. No cheating!🏋️‍♂️" },
  { icon: "🎧", text: "Sing a song, my fav one." },
  { icon: "🍰", text: "Feed me one bite of cake, but not by hand." },
  { icon: "🥰", text: "Give a nickname that only you can call me, and will use it all day." },
  { icon: "🕯️", text: "Make a birthday wish." },
  { icon: "🏇", text: "Take me for a horse ride.." },
  { icon: "✍️", text: "Write down one goal for this new year." },
  { icon: "🎁", text: "Give me a challenge.." },
  { icon: "💌", text: "I think it's time for Envelope #2" },
  { icon: "🫣", text: "Give me a Kiss anywhere, except lips." },
  { icon: "💭", text: "Tell me a dream you haven't said out loud." },
  { icon: "🖐️", text: "Teach me one dance move... even if it's completely random." },
  { icon: "😘", text: "Give me a kiss on the cheek." },
  { icon: "✨", text: "Let's Dance together" },
];

// The handwritten letter revealed inside the gift box.
const LETTER_LINES =
`My love,

Twenty-three little adventures, and you still showed up for every one of them.

I built this whole strange, glowing little world just to say the simple things I sometimes forget to say out loud: thank you, I'm proud of you, and I love the life we're building together.

Here's to this year, and every one after it.

Forever yours.`;

// Ending slideshow reuses the memory photos by default.
const ENDING_SLIDES = MEMORIES.map(m => m.src);


/* ============================== UTILITIES ============================== */

const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function rand(min, max) { return Math.random() * (max - min) + min; }


/* ============================== PRELOADER ============================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    qs("#preloader").classList.add("loaded");
    startHeroSequence();
  }, 900);
});


/* ============================== FX CANVAS (confetti / fireworks / sparkles) ============================== */

const fxCanvas = qs("#fx-canvas");
const fxCtx = fxCanvas.getContext("2d");
let fxParticles = [];

function resizeFxCanvas() {
  fxCanvas.width = window.innerWidth;
  fxCanvas.height = window.innerHeight;
}
resizeFxCanvas();
window.addEventListener("resize", resizeFxCanvas);

const CONFETTI_COLORS = ["#e0839c", "#ff6f91", "#ffd2de", "#ffd6e0", "#a84f68"];

function spawnConfetti(count = 80, originX = null, originY = -20) {
  for (let i = 0; i < count; i++) {
    fxParticles.push({
      type: "confetti",
      x: originX !== null ? originX : rand(0, fxCanvas.width),
      y: originY,
      vx: rand(-2.2, 2.2),
      vy: rand(1.5, 4.5),
      size: rand(5, 10),
      color: CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))],
      rotation: rand(0, 360),
      vr: rand(-8, 8),
      life: 0,
      maxLife: rand(180, 260),
    });
  }
}

function spawnPopper(fromLeft = true) {
  const originX = fromLeft ? 0 : fxCanvas.width;
  const dir = fromLeft ? 1 : -1;
  for (let i = 0; i < 60; i++) {
    fxParticles.push({
      type: "confetti",
      x: originX,
      y: fxCanvas.height * rand(0.5, 0.8),
      vx: dir * rand(4, 10),
      vy: rand(-9, -3),
      size: rand(4, 8),
      color: CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))],
      rotation: rand(0, 360),
      vr: rand(-10, 10),
      life: 0,
      maxLife: rand(140, 200),
      gravity: 0.18,
    });
  }
}

function spawnFirework(x = null, y = null) {
  const fx = x !== null ? x : rand(fxCanvas.width * 0.2, fxCanvas.width * 0.8);
  const fy = y !== null ? y : rand(fxCanvas.height * 0.15, fxCanvas.height * 0.45);
  const color = CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))];
  const count = 44;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = rand(2, 5.5);
    fxParticles.push({
      type: "spark",
      x: fx, y: fy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: rand(1.5, 3),
      color,
      life: 0,
      maxLife: rand(50, 80),
      gravity: 0.04,
    });
  }
}

function spawnSparkles(count = 25) {
  for (let i = 0; i < count; i++) {
    fxParticles.push({
      type: "sparkle",
      x: rand(0, fxCanvas.width),
      y: rand(0, fxCanvas.height),
      size: rand(1, 2.6),
      color: "#ffd2de",
      life: 0,
      maxLife: rand(60, 120),
      vx: 0, vy: rand(0.2, 0.6),
    });
  }
}

function goldBurstAt(x, y) {
  spawnFirework(x, y);
  spawnConfetti(50, x, y);
}

function animateFx() {
  fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
  fxParticles = fxParticles.filter(p => p.life < p.maxLife);

  for (const p of fxParticles) {
    p.life++;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += (p.gravity !== undefined ? p.gravity : 0.05);
    if (p.rotation !== undefined) p.rotation += p.vr;

    const fade = 1 - p.life / p.maxLife;
    fxCtx.globalAlpha = Math.max(fade, 0);

    if (p.type === "confetti") {
      fxCtx.save();
      fxCtx.translate(p.x, p.y);
      fxCtx.rotate((p.rotation * Math.PI) / 180);
      fxCtx.fillStyle = p.color;
      fxCtx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      fxCtx.restore();
    } else if (p.type === "spark") {
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fxCtx.fillStyle = p.color;
      fxCtx.fill();
    } else if (p.type === "sparkle") {
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fxCtx.fillStyle = p.color;
      fxCtx.shadowColor = p.color;
      fxCtx.shadowBlur = 6;
      fxCtx.fill();
      fxCtx.shadowBlur = 0;
    }
  }
  fxCtx.globalAlpha = 1;
  requestAnimationFrame(animateFx);
}
animateFx();


/* ============================== BALLOONS ============================== */

function spawnBalloons(count = 10) {
  const field = qs("#balloon-field");
  const colors = ["#e0839c", "#ff6f91", "#ffd2de", "#a84f68"];
  for (let i = 0; i < count; i++) {
    const b = el("div", "balloon");
    b.style.left = rand(2, 92) + "%";
    b.style.background = colors[Math.floor(rand(0, colors.length))];
    b.style.animationDuration = rand(9, 16) + "s";
    b.style.animationDelay = rand(0, 6) + "s";
    field.appendChild(b);
  }
}


/* ============================== FLOATING HEARTS (ambient) ============================== */

function spawnFloatingHeart(container = qs("#floating-hearts-layer")) {
  const h = el("div", "floating-heart-particle", "❤");
  h.style.left = rand(2, 96) + "%";
  h.style.setProperty("--drift", rand(-40, 40) + "px");
  h.style.animationDuration = rand(6, 11) + "s";
  h.style.fontSize = rand(12, 22) + "px";
  container.appendChild(h);
  setTimeout(() => h.remove(), 12000);
}

let ambientHeartsInterval = null;
function startAmbientHearts() {
  if (ambientHeartsInterval) return;
  ambientHeartsInterval = setInterval(() => spawnFloatingHeart(), 900);
}
function stopAmbientHearts() {
  clearInterval(ambientHeartsInterval);
  ambientHeartsInterval = null;
}


/* ============================== MUSIC TOGGLE ============================== */

const bgMusic = qs("#bg-music");
const musicBtn = qs("#music-toggle");

musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      // No audio file present yet, or browser blocked it — fail silently.
    });
    musicBtn.classList.add("playing");
    qs(".music-label", musicBtn).textContent = "Playing";
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
    qs(".music-label", musicBtn).textContent = "Play Our Song";
  }
});


/* ============================== HERO SEQUENCE ============================== */

function startHeroSequence() {
  spawnBalloons(10);

  // 1s after load: big celebration burst
  setTimeout(() => {
    spawnPopper(true);
    spawnPopper(false);
    spawnConfetti(120);
    spawnSparkles(40);
    spawnFirework();
    setTimeout(() => spawnFirework(), 400);
    setTimeout(() => spawnFirework(), 900);

    // reveal hero words, staggered
    const words = qsa(".hero-title .reveal-word");
    words.forEach((w, i) => setTimeout(() => w.classList.add("in"), i * 220));

    const eyebrow = qs(".hero-eyebrow");
    setTimeout(() => eyebrow.classList.add("in"), 0);

    const lines = qsa(".hero-subtitle .reveal-line");
    lines.forEach((l, i) => {
      setTimeout(() => { l.style.opacity = 1; l.style.transform = "translateY(0)"; }, 1400 + i * 500);
    });
  }, 1000);

  // After 5s total, reveal the CTA button
  setTimeout(() => {
    qs("#begin-journey-btn").classList.add("ready");
  }, 5200);

  // gentle ongoing sparkle ambience
  setInterval(() => spawnSparkles(6), 2200);
}

qs("#begin-journey-btn").addEventListener("click", () => {
  qs("#memories").scrollIntoView({ behavior: "smooth" });
});


/* ============================== SCROLL REVEAL (generic) ============================== */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.2 });

qsa(".reveal-on-scroll").forEach(node => revealObserver.observe(node));


/* ============================== MEMORIES GRID ============================== */

function buildMemories() {
  const grid = qs("#memories-grid");
  MEMORIES.forEach((mem, i) => {
    const card = el("div", "memory-card");
    card.style.transitionDelay = (i * 90) + "ms";
    card.style.animationDelay = rand(0, 2).toFixed(2) + "s";

    const photoWrap = el("div", "memory-photo-wrap");
    const img = el("img");
    img.src = mem.src;
    img.alt = mem.caption;
    img.loading = "lazy";
    photoWrap.appendChild(img);

    const caption = el("p", "memory-caption", mem.caption);
    const ring = el("div", "memory-glow-ring");

    photoWrap.appendChild(caption);
    card.appendChild(photoWrap);
    card.appendChild(ring);
    grid.appendChild(card);

    // tilt effect (desktop only)
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(0) rotateX(${-py * 10}deg) rotateY(${px * 10}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    revealObserver.observe(card);
  });
}


/* ============================== WISHES (typewriter, one at a time) ============================== */

function buildWishesSkeleton() {
  const container = qs("#wishes-container");
  WISHES.forEach((wish, i) => {
    const item = el("div", "wish-item");
    item.dataset.index = i;
    const label = el("span", "wish-label", wish.label);
    const body = el("span", "wish-body");
    const cursor = el("span", "wish-cursor", "&nbsp;");
    item.appendChild(label);
    item.appendChild(body);
    item.appendChild(cursor);
    container.appendChild(item);
  });
}

let wishesStarted = false;

function typeWish(index) {
  const items = qsa(".wish-item");
  if (index >= items.length) return;

  const item = items[index];
  const body = qs(".wish-body", item);
  const cursor = qs(".wish-cursor", item);
  const text = WISHES[index].text;
  item.classList.add("is-active");

  let charIndex = 0;
  const speed = 22; // ms per character

  function typeChar() {
    if (charIndex <= text.length) {
      body.textContent = text.slice(0, charIndex);
      charIndex++;
      setTimeout(typeChar, speed);
    } else {
      cursor.style.display = "none";
      item.classList.add("is-done");
      setTimeout(() => typeWish(index + 1), 500);
    }
  }
  typeChar();
}

const wishesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !wishesStarted) {
      wishesStarted = true;
      typeWish(0);
    }
  });
}, { threshold: 0.15 });


/* ============================== MISSIONS (23-step game) ============================== */

// Deliberately NOT persisted to localStorage — every fresh visit / refresh
// starts the mission game over from Mission 1, so it's replayable and never
// gets "stuck" showing the final gift on reload.
let missionState = MISSIONS.map(() => false);

function buildMissions() {
  const grid = qs("#missions-grid");
  MISSIONS.forEach((mission, i) => {
    const card = el("div", "mission-card");
    card.dataset.index = i;
    card.dataset.icon = mission.icon;
    card.dataset.text = mission.text;

    const top = el("div", "mission-top");
    top.appendChild(el("span", "mission-number", "Mission " + (i + 1)));
    top.appendChild(el("span", "mission-icon", "❓"));

    const text = el("p", "mission-text", "Complete the current mission to unlock this one.");
    const btn = el("button", "mission-complete-btn", "Complete");
    const tick = el("div", "mission-tick", "✓");
    const burst = el("div", "mission-burst");

    btn.addEventListener("click", () => completeMission(i));

    card.appendChild(top);
    card.appendChild(text);
    card.appendChild(btn);
    card.appendChild(tick);
    card.appendChild(burst);
    grid.appendChild(card);
  });
  renderMissions();
}

function renderMissions() {
  const cards = qsa(".mission-card");
  let firstIncompleteFound = false;

  cards.forEach((card, i) => {
    card.classList.remove("is-active", "is-done", "is-locked");
    const iconEl = qs(".mission-icon", card);
    const textEl = qs(".mission-text", card);
    const btnEl = qs(".mission-complete-btn", card);

    if (missionState[i]) {
      // Completed — reveal what it was, with a tick.
      card.classList.add("is-done");
      iconEl.textContent = card.dataset.icon;
      textEl.textContent = card.dataset.text;
      btnEl.style.display = "none";
    } else if (!firstIncompleteFound) {
      // The one active, playable card.
      card.classList.add("is-active");
      iconEl.textContent = card.dataset.icon;
      textEl.textContent = card.dataset.text;
      btnEl.style.display = "";
      firstIncompleteFound = true;
    } else {
      // Still locked — keep it a mystery with a big "?" instead of the task.
      card.classList.add("is-locked");
      iconEl.textContent = "❓";
      textEl.textContent = "Complete the current mission to unlock this one.";
      btnEl.style.display = "none";
    }
  });

  const doneCount = missionState.filter(Boolean).length;
  qs("#missions-count").textContent = `${doneCount} / ${MISSIONS.length}`;
  qs("#missions-progress-fill").style.width = `${(doneCount / MISSIONS.length) * 100}%`;

  if (doneCount === MISSIONS.length) {
    unlockFinaleGiftStage();
  }
}

function miniBurst(card) {
  const burst = qs(".mission-burst", card);
  burst.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const dot = el("span");
    const angle = rand(0, Math.PI * 2);
    const dist = rand(30, 70);
    dot.style.setProperty("--bx", Math.cos(angle) * dist + "px");
    dot.style.setProperty("--by", Math.sin(angle) * dist + "px");
    dot.style.background = CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))];
    dot.style.animationDelay = rand(0, 0.12) + "s";
    burst.appendChild(dot);
  }
  setTimeout(() => { burst.innerHTML = ""; }, 900);
}

function completeMission(index) {
  if (missionState[index]) return;
  missionState[index] = true;

  const card = qsa(".mission-card")[index];
  miniBurst(card);

  const rect = card.getBoundingClientRect();
  goldBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

  renderMissions();
}


/* ============================== FINALE SEQUENCE ============================== */

let finaleUnlocked = false;

function buildStars(count = 90) {
  const layer = qs("#stars-layer");
  for (let i = 0; i < count; i++) {
    const star = el("div", "star-dot");
    star.style.left = rand(0, 100) + "%";
    star.style.top = rand(0, 100) + "%";
    star.style.animationDelay = rand(0, 3) + "s";
    star.style.animationDuration = rand(2, 5) + "s";
    layer.appendChild(star);
  }
}

function unlockFinaleGiftStage() {
  if (finaleUnlocked) return;
  finaleUnlocked = true;
  const btn = qs("#open-gift-btn");
  btn.disabled = false;
  setTimeout(() => {
    qs("#finale").scrollIntoView({ behavior: "smooth" });
  }, 900);
}

// gift stays disabled until all 23 missions are complete
qs("#open-gift-btn").disabled = true;

qs("#open-gift-btn").addEventListener("click", () => {
  if (!finaleUnlocked) return;
  const box = qs("#gift-box");
  const rect = box.getBoundingClientRect();
  box.classList.add("opened");
  goldBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  spawnFirework();
  setTimeout(() => spawnFirework(), 350);
  spawnSparkles(30);

  setTimeout(() => {
    qs("#finale-gift-stage").classList.add("hidden");
    qs("#finale-letter-stage").classList.remove("hidden");
    typeLetter();
  }, 900);
});

function typeLetter() {
  const target = qs("#letter-text");
  const cursor = qs("#letter-cursor");
  const continueBtn = qs("#letter-continue-btn");
  const text = LETTER_LINES;
  let i = 0;
  const speed = 26;
  function step() {
    if (i <= text.length) {
      target.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else {
      // Typing done — let the cursor blink and reveal a Continue button.
      // No auto-advance here on purpose, so there's as much time to read
      // the letter as the person wants.
      cursor.style.display = "none";
      continueBtn.classList.remove("hidden");
    }
  }
  step();
}

qs("#letter-continue-btn").addEventListener("click", () => {
  qs("#finale-letter-stage").classList.add("hidden");
  qs("#finale-countdown-stage").classList.remove("hidden");
  runCountdown();
});

function runCountdown() {
  const numEl = qs("#countdown-number");
  let count = 3;
  numEl.textContent = count;
  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      numEl.textContent = count;
      numEl.style.animation = "none";
      void numEl.offsetWidth; // restart animation
      numEl.style.animation = "";
    } else {
      clearInterval(timer);
      qs("#finale-countdown-stage").classList.add("hidden");
      qs("#finale-loveyou-stage").classList.remove("hidden");
      runLoveYouStage();
    }
  }, 1000);
}

function runLoveYouStage() {
  drawHeartParticles();
  spawnFirework();
  setTimeout(() => spawnFirework(), 300);

  setTimeout(() => {
    qs("#finale-loveyou-stage").classList.add("hidden");
    qs("#finale-question-stage").classList.remove("hidden");
  }, 3600);
}

// Heart-shaped particle formation on its own small canvas
function drawHeartParticles() {
  const canvas = qs("#heart-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const particles = [];
  const total = 260;
  for (let i = 0; i < total; i++) {
    const t = rand(0, Math.PI * 2);
    const scale = w / 34;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    particles.push({
      targetX: w / 2 + hx * scale * 0.5,
      targetY: h / 2 + hy * scale * 0.5,
      x: rand(0, w),
      y: rand(0, h),
      size: rand(2, 4),
      color: Math.random() > 0.5 ? "#ff6f91" : "#e0839c",
      speed: rand(0.04, 0.09),
    });
  }

  let frame = 0;
  function animateHeart() {
    frame++;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += (p.targetX - p.x) * p.speed;
      p.y += (p.targetY - p.y) * p.speed;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    if (frame < 260) requestAnimationFrame(animateHeart);
  }
  animateHeart();
}

// Question buttons — both lead to the same happy ending
qsa(".finale-answer-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    qs("#finale-question-stage").classList.add("hidden");
    qs("#finale-ending-stage").classList.remove("hidden");
    triggerHappyEnding();
  });
});

function buildEndingSlideshow() {
  const wrap = qs("#ending-slideshow");
  ENDING_SLIDES.forEach((src, i) => {
    const img = el("img");
    img.src = src;
    img.loading = "lazy";
    img.style.animationDelay = (i * 2) + "s";
    wrap.appendChild(img);
  });
}

function triggerHappyEnding() {
  qs("#finale").classList.add("romantic-ending");
  spawnConfetti(150);
  spawnPopper(true);
  spawnPopper(false);
  spawnFirework();
  setTimeout(() => spawnFirework(), 300);
  setTimeout(() => spawnFirework(), 700);
  startAmbientHearts();
  setTimeout(() => stopAmbientHearts(), 15000);

  // if music is playing, nothing to change technically — the same track
  // keeps looping; swap `audio/background-music.mp3` for a joyful cue if
  // you'd like a literal mood shift here.
}


/* ============================== INIT ============================== */

document.addEventListener("DOMContentLoaded", () => {
  buildMemories();
  buildWishesSkeleton();
  buildMissions();
  buildStars();
  buildEndingSlideshow();

  wishesObserver.observe(qs("#wishes"));

  // ambient ~3-4 floating hearts per minute across whole site for atmosphere
  setInterval(() => { if (Math.random() > 0.5) spawnFloatingHeart(); }, 4000);
});
