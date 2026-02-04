/* =====================
   THEMES
===================== */
const themes = [
  {
    bg:"#000",
    panel:"rgba(0,0,0,.85)",
    text:"#00ff88",
    border:"#00ff88",
    glow:"rgba(0,255,136,.35)"
  },
  {
    bg:"#020b16",
    panel:"rgba(2,11,22,.85)",
    text:"#00eaff",
    border:"#00eaff",
    glow:"rgba(0,234,255,.35)"
  },
  {
    bg:"#0b0216",
    panel:"rgba(11,2,22,.85)",
    text:"#c77dff",
    border:"#c77dff",
    glow:"rgba(199,125,255,.35)"
  }
];

let themeIndex = 0;
let nodeColor = themes[0].text;

function applyTheme(t) {
  document.documentElement.style.setProperty("--bg", t.bg);
  document.documentElement.style.setProperty("--panel", t.panel);
  document.documentElement.style.setProperty("--text", t.text);
  document.documentElement.style.setProperty("--border", t.border);
  document.documentElement.style.setProperty("--glow", t.glow);
  nodeColor = t.text;
}

applyTheme(themes[0]);

/* Botón de tema */
document.getElementById("theme-btn").addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  applyTheme(themes[themeIndex]);
});

/* =====================
   TERMINAL
===================== */
const terminal = document.getElementById("terminal");
const output = document.getElementById("output");
const input = document.getElementById("command-input");

const commands = {
  help: "about  skills  projects  contact  clear",
  about: ".",
  skills: "",
  projects: "",
  contact: "nmalaguti@ies-eugeni.cat\nGitHub: github.com/codingwithnicoo"
};

let history = [];
let historyIndex = 0;

function print(text) {
  const p = document.createElement("p");
  p.innerHTML = text.replace(/\n/g, "<br>");
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

terminal.addEventListener("click", () => input.focus());

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const raw = input.value.trim();
    if (raw !== "") {
      history.push(raw);
      historyIndex = history.length;
    }
    print(`&gt; ${raw}`);
    run(raw.toLowerCase());
    input.value = "";
  }

  if (e.key === "ArrowUp") {
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex] || "";
  }

  if (e.key === "ArrowDown") {
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || "";
  }

  if (e.key === "Tab") {
    e.preventDefault();
    const match = Object.keys(commands).find(c =>
      c.startsWith(input.value.toLowerCase())
    );
    if (match) input.value = match;
  }
});

function run(cmd) {
  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commands[cmd]) {
    print(commands[cmd]);
  } else {
    print("<span style='color:red'>command not found</span>");
  }
}

/* =====================
   BOOT
===================== */
const bootLines = [
  "Booting system...",
  "Loading modules...",
  "Initializing interface...",
  "System ready.",
  "",
  "Welcome.",
  "Type 'help' to begin."
];

(function boot(i = 0) {
  if (i < bootLines.length) {
    print(bootLines[i]);
    setTimeout(() => boot(i + 1), 300);
  } else {
    input.focus();
  }
})();

/* =====================
   NODE BACKGROUND
===================== */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

const nodes = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (i !== j) {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 140) {
          ctx.strokeStyle = nodeColor + "55";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    });

    a.x += a.vx;
    a.y += a.vy;

    if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
    if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

    ctx.fillStyle = nodeColor;
    ctx.beginPath();
    ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
