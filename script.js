const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('alt');
  });
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
draw();
