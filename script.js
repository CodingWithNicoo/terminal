/* ======================
   FONDO NODOS (igual)
====================== */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let themeColor = "#00ff00";

const nodes = [];
for (let i = 0; i < 90; i++) {
  nodes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx:(Math.random()-.5)*.6,
    vy:(Math.random()-.5)*.6
  });
}

let mouse={x:null,y:null};
canvas.onmousemove=e=>{mouse.x=e.clientX;mouse.y=e.clientY};

function bg(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  nodes.forEach((a,i)=>{
    nodes.forEach((b,j)=>{
      if(i!==j){
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<140){
          ctx.strokeStyle=`rgba(0,255,0,${1-d/140})`.replace("0,255,0",themeColor.slice(1));
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    });
    if(mouse.x){
      const d=Math.hypot(a.x-mouse.x,a.y-mouse.y);
      if(d<120){a.vx+=(a.x-mouse.x)*.0004;a.vy+=(a.y-mouse.y)*.0004;}
    }
    a.x+=a.vx;a.y+=a.vy;
    if(a.x<0||a.x>canvas.width)a.vx*=-1;
    if(a.y<0||a.y>canvas.height)a.vy*=-1;
    ctx.fillStyle=themeColor;
    ctx.beginPath();ctx.arc(a.x,a.y,2,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(bg);
}
bg();

onresize=()=>{canvas.width=innerWidth;canvas.height=innerHeight};

/* ======================
   TERMINAL CORE
====================== */
const output=document.getElementById("output");
const input=document.getElementById("command-input");
const inputLine=document.getElementById("input-line");

const commands={
  help:`about  skills  projects  contact  theme  clear`,
  about:`Web developer focused on creative interfaces and clean code.`,
  skills:`JS ██████████ 90%\nReact █████████ 85%\nCSS ██████████ 95%`,
  projects:`▶ Terminal Portfolio\n▶ Data Visualizer\n▶ Mini Game`,
  contact:`email@example.com\nGitHub: github.com/username`,
};

const history=[];
let historyIndex=-1;

function line(text,color=themeColor){
  const p=document.createElement("p");
  p.style.color=color;
  p.innerHTML=text.replace(/\n/g,"<br>");
  output.appendChild(p);
}

function type(text,i=0,p=null){
  if(!p){p=document.createElement("p");output.appendChild(p);}
  if(i<text.length){
    p.innerHTML+=text[i]==="\n"?"<br>":text[i];
    setTimeout(()=>type(text,i+1,p),15);
  }
}

input.onkeydown=e=>{
  if(e.key==="Enter"){
    const cmd=input.value.trim();
    history.push(cmd); historyIndex=history.length;
    line(`> ${cmd}`);
    run(cmd);
    input.value="";
  }
  if(e.key==="ArrowUp"){
    historyIndex=Math.max(0,historyIndex-1);
    input.value=history[historyIndex]||"";
  }
  if(e.key==="ArrowDown"){
    historyIndex=Math.min(history.length,historyIndex+1);
    input.value=history[historyIndex]||"";
  }
  if(e.key==="Tab"){
    e.preventDefault();
    const match=Object.keys(commands).find(c=>c.startsWith(input.value));
    if(match) input.value=match;
  }
};

function run(cmd){
  if(cmd==="clear"){output.innerHTML="";return;}
  if(cmd==="theme"){switchTheme();return;}
  if(cmd==="sudo make me hire"){
    type("Access granted.\nYou should definitely hire this developer 😎");
    return;
  }
  if(commands[cmd]) type(commands[cmd]);
  else line("command not found","red");
}

/* ======================
   THEMES
====================== */
function switchTheme(){
  const t=[
    "#00ff00","#00eaff","#ffffff"
  ][Math.floor(Math.random()*3)];
  document.documentElement.style.setProperty("--main",t);
  themeColor=t;
  line("Theme switched ✔");
}

/* ======================
   BOOT SEQUENCE
====================== */
const bootLines=[
  "Initializing system...",
  "Loading kernel modules...",
  "Mounting file system...",
  "Starting network services...",
  "Boot sequence complete.",
  "",
  "Welcome to Tu Nombre OS",
  "Type 'help' to get started"
];

function boot(i=0){
  if(i<bootLines.length){
    type(bootLines[i]+"\n");
    setTimeout(()=>boot(i+1),400);
  }else{
    inputLine.style.display="flex";
    input.focus();
  }
}

boot();
