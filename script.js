// Abrir/cerrar cards
const cards = document.querySelectorAll('.card');
cards.forEach(card=>{
  card.addEventListener('click', ()=>{
    card.classList.toggle('open');
  });
});

// Cambiar tema
const themeBtn = document.getElementById('theme-btn');
let darkMode = false;
themeBtn.addEventListener('click', ()=>{
  darkMode = !darkMode;
  if(darkMode){
    document.documentElement.style.setProperty('--bg','#111');
    document.documentElement.style.setProperty('--text','#f0f0f0');
    document.documentElement.style.setProperty('--card-bg','rgba(255,255,255,0.05)');
    document.documentElement.style.setProperty('--card-border','rgba(255,255,255,0.15)');
    document.documentElement.style.setProperty('--accent','#ff9800');
  } else{
    document.documentElement.style.setProperty('--bg','#0b0c10');
    document.documentElement.style.setProperty('--text','#f0f0f0');
    document.documentElement.style.setProperty('--card-bg','rgba(255,255,255,0.1)');
    document.documentElement.style.setProperty('--card-border','rgba(255,255,255,0.2)');
    document.documentElement.style.setProperty('--accent','#4caf50');
  }
});

// Fondo animado nodos (Liquid Glass estilo)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let mouse = {x:null,y:null};
function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener('resize',resize);

canvas.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener('mouseleave', ()=>{mouse.x=null; mouse.y=null;});

// Crear nodos
for(let i=0;i<80;i++){
  nodes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*0.6,
    vy: (Math.random()-0.5)*0.6
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<nodes.length;i++){
    const a = nodes[i];
    a.x += a.vx;
    a.y += a.vy;
    if(a.x<0||a.x>canvas.width) a.vx*=-1;
    if(a.y<0||a.y>canvas.height) a.vy*=-1;

    // dibujar nodo
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.beginPath();
    ctx.arc(a.x,a.y,3,0,Math.PI*2);
    ctx.fill();

    // conectar con otros
    for(let j=i+1;j<nodes.length;j++){
      const b = nodes[j];
      const d = Math.hypot(a.x-b.x,a.y-b.y);
      if(d<150){
        ctx.strokeStyle = "rgba(255,255,255,"+(1-d/150)*0.2+")";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }

    // conectar con mouse
    if(mouse.x!==null){
      const dMouse = Math.hypot(a.x-mouse.x,a.y-mouse.y);
      if(dMouse<120){
        ctx.strokeStyle = "rgba(255,255,255,"+(1-dMouse/120)*0.2+")";
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(mouse.x,mouse.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();
