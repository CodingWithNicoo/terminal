const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;

/* LLUVIA */
class Drop {
  constructor(layer){
    this.layer = layer;
    this.reset();
  }

  reset(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.len = 5 + this.layer * 5;
    this.speed = 2 + this.layer * 2;
    this.opacity = 0.15 + Math.random() * 0.3;
  }

  move(){
    this.y += this.speed;
    if(this.y > h){
      this.y = -10;
      this.x = Math.random() * w;
    }
  }

  draw(){
    ctx.beginPath();
    ctx.strokeStyle = `rgba(180,220,255,${this.opacity})`;
    ctx.lineWidth = this.layer;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.len);
    ctx.stroke();
  }
}

let drops = [];
for(let i=0;i<180;i++) drops.push(new Drop(1));
for(let i=0;i<120;i++) drops.push(new Drop(2));
for(let i=0;i<80;i++) drops.push(new Drop(3));

function animate(){
  ctx.clearRect(0,0,w,h);

  drops.forEach(d => {
    d.move();
    d.draw();
  });

  requestAnimationFrame(animate);
}
animate();

/* VIENTO + PARALLAX LIMPIO */
window.addEventListener("scroll", () => {
  const s = window.scrollY;
  const wind = Math.sin(s * 0.01) * 4;

  document.querySelector(".layer1").style.transform =
    `translate(${wind * 0.2}px, ${s * 0.05}px) scale(1.05)`;

  document.querySelector(".layer2").style.transform =
    `translate(${wind * 0.5}px, ${s * 0.08}px) scale(1.1)`;

  document.querySelector(".layer3").style.transform =
    `translate(${wind}px, ${s * 0.12}px) scale(1.2)`;
});

/* RELÁMPAGOS SUAVES */
setInterval(() => {
  if(Math.random() > 0.93){
    const flash = document.querySelector(".flash");
    flash.style.opacity = 0.7;

    setTimeout(() => flash.style.opacity = 0, 120);
  }
}, 2000);

/* RESIZE */
window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});
