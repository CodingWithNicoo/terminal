const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

class Raindrop {
  constructor(layer){
    this.layer = layer; // 1=fondo, 2=medio, 3=frente
    this.reset();
  }
  reset(){
    this.x = Math.random()*width;
    this.y = Math.random()*height;
    this.length = this.layer * (4 + Math.random()*6);
    this.speed = this.layer * (2 + Math.random()*3);
    this.opacity = 0.1 + Math.random()*0.3;
  }
  fall(){
    this.y += this.speed;
    if(this.y>height) this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.strokeStyle = `rgba(180,220,255,${this.opacity})`;
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y+this.length);
    ctx.lineWidth = this.layer;
    ctx.stroke();
  }
}

// Crear gotas
let rainDrops = [];
for(let i=0;i<200;i++) rainDrops.push(new Raindrop(1));
for(let i=0;i<150;i++) rainDrops.push(new Raindrop(2));
for(let i=0;i<100;i++) rainDrops.push(new Raindrop(3));

function animateRain(){
  ctx.clearRect(0,0,width,height);
  rainDrops.forEach(drop => {
    drop.fall();
    drop.draw();
  });
  requestAnimationFrame(animateRain);
}
animateRain();

// Parallax de bosque y niebla
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  document.querySelector(".forest").style.transform = `translateY(${scroll*0.1}px)`;
  document.querySelector(".fog").style.transform = `translateY(${scroll*0.05}px)`;
});

// Ajustar tamaño
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});
