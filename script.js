const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const plantLayer = document.getElementById('plantLayer');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('alt');
  });
}

function createLeaves() {
  if (!plantLayer) return;
  plantLayer.innerHTML = '';
  const amount = Math.min(38, Math.max(18, Math.floor(window.innerWidth / 42)));

  for (let i = 0; i < amount; i += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'leaf';
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.setProperty('--size', `${10 + Math.random() * 28}px`);
    leaf.style.setProperty('--speed', `${3.2 + Math.random() * 2.4}s`);
    leaf.style.setProperty('--rise', `${18 + Math.random() * 15}s`);
    leaf.style.setProperty('--delay', `${-Math.random() * 18}s`);
    plantLayer.appendChild(leaf);
  }
}

const canvas = document.getElementById('forestMist');
const ctx = canvas.getContext('2d');
const particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles.length = 0;
  const amount = Math.min(135, Math.floor(window.innerWidth / 10));

  for (let i = 0; i < amount; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: Math.random() * 0.34 + 0.06,
      alpha: 0.12 + Math.random() * 0.33,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.y > canvas.height + 16) {
      p.y = -16;
      p.x = Math.random() * canvas.width;
    }

    if (p.x < -16) p.x = canvas.width + 16;
    if (p.x > canvas.width + 16) p.x = -16;

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7);
    glow.addColorStop(0, `rgba(107, 255, 157, ${p.alpha})`);
    glow.addColorStop(1, 'rgba(107, 255, 157, 0)');

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  resize();
  createParticles();
  createLeaves();

const canvas = document.getElementById('forestMist');
const ctx = canvas.getContext('2d');
const particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles.length = 0;
  const amount = Math.min(100, Math.floor(window.innerWidth / 14));
  for (let i = 0; i < amount; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: Math.random() * 0.24 + 0.08,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.y > canvas.height + 10) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }

    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
    gradient.addColorStop(0, 'rgba(156, 255, 192, 0.35)');
    gradient.addColorStop(1, 'rgba(156, 255, 192, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  resize();
  createParticles();
});

resize();
createParticles();
createLeaves();
draw();
