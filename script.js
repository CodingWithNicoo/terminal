/* =====================
   THEMES
===================== */
const themes = [
  {
    bg:"#000",
    panel:"rgba(0,0,0,.85)",
    text:"#00ff88",
    border:"#00ff88",
    glow:"rgba(0,255,136,.4)"
  },
  {
    bg:"#020b16",
    panel:"rgba(2,11,22,.85)",
    text:"#00eaff",
    border:"#00eaff",
    glow:"rgba(0,234,255,.4)"
  },
  {
    bg:"#0b0216",
    panel:"rgba(11,2,22,.85)",
    text:"#c77dff",
    border:"#c77dff",
    glow:"rgba(199,125,255,.4)"
  }
];

let themeIndex = 0;
function applyTheme(t){
  document.documentElement.style.setProperty("--bg", t.bg);
  document.documentElement.style.setProperty("--panel", t.panel);
  document.documentElement.style.setProperty("--text", t.text);
  document.documentElement.style.setProperty("--border", t.border);
  document.documentElement.style.setProperty("--glow", t.glow);
  nodeColor = t.text;
}

/* =====================
   TERMINAL CORE
===================== */
const output = document.getElementById("output");
const input = document.getElementById("command-input");

const commands = {
  help: "about  skills  projects  contact  theme  clear",
  about: "Creative frontend developer focused on interactive experiences.",
  skills: "JS ██████████\nCSS ██████████\nReact █████████",
  projects: "Terminal Portfolio\nData Visualizer\nMini Game",
  contact: "email@example.com\nGitHub: github.com/username"
};

function print(text){
  const p = document.createElement("p");
  p.innerHTML = text.replace(/\n/g,"<br>");
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

input.addEventListener("keydown", e => {
  if(e.key === "Enter"){
    const cmd = input.value.trim();
    print(`&gt; ${cmd}`);
    run(cmd);
    input.value = "";
  }
});

function run(cmd){
  if(cmd === "clear"){ output.innerHTML=""; return; }
  if(cmd === "theme"){
    themeIndex = (themeIndex+1)%themes.length;
    applyTheme(themes[themeIndex]);
    print("Theme switched ✔");
    return;
  }
  if(commands[cmd]) print(commands[cmd]);
  else print("<span style='color:red'>command not found</span>");
}

/* =====================
   BOOT
===================== */
const boot = [
  "Booting system...",
  "Loading modules...",
  "Initializing UI...",
  "Ready.",
  "",
  "Welcome.",
  "Type 'help'"
];

(function bootSeq(i=0){
  if(i<boot.length){
    print(boot[i]);
    setTimeout(()=>bootSeq(i+1),300);
  }
})();

/* =====================
   NODE BACKGROUND
===================== */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let nodeColor = themes[0].text;
const nodes = Array.from({length:80},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  vx:(Math.random()-.5)*.6,
  vy:(Math.random()-.5)*.6
}));

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  nodes.forEach((a,i)=>{
    nodes.forEach((b,j)=>{
      if(i!==j){
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<140){
          ctx.strokeStyle=`${nodeColor}55`;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    });
    a.x+=a.vx; a.y+=a.vy;
    if(a.x<0||a.x>canvas.width)a.vx*=-1;
    if(a.y<0||a.y>canvas.height)a.vy*=-1;
    ctx.fillStyle=nodeColor;
    ctx.beginPath();
    ctx.arc(a.x,a.y,2,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

onresize=()=>{canvas.width=innerWidth;canvas.height=innerHeight};
