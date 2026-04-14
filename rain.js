const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

/* GOTAS */
class Raindrop {
  constructor(layer){
    this.layer = layer;
    this.reset();
  }

  reset(){
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.length = this.layer * (4 + Math.random() * 6);
    this.speed = this.layer * (2 + Math.random() * 3);
    this.opacity = 0.1 + Math.random() * 0.3;
  }

  fall(){
    this.y += this.speed;

    if(this.y > height){
      this.y = -10;
      this.x = Math.random() * width;
    }
  }

  draw(){
    ctx.beginPath();
    ctx.strokeStyle = `rgba(180,220,255,${this.opacity})`;

    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(180,220,255,0.6)";

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.lineWidth = this.layer;

    ctx.stroke();

    ctx.shadowBlur = 0;
  }
}

/* LLUVIA */
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

/* VIENTO + PARALLAX */
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const wind = Math.sin(scroll * 0.01) * 6;

  document.querySelector(".layer1").style.transform =
    `translate(${wind * 0.2}px, ${scroll*0.05}px) scale(1.05)`;

  document.querySelector(".layer2").style.transform =
    `translate(${wind * 0.5}px, ${scroll*0.08}px) scale(1.1)`;

  document.querySelector(".layer3").style.transform =
    `translate(${wind}px, ${scroll*0.12}px) scale(1.2)`;
});

/* RELÁMPAGOS */
function lightning(){
  const flash = document.querySelector(".flash");

  setInterval(() => {
    if(Math.random() > 0.92){
      flash.style.opacity = "0.8";

      setTimeout(() => {
        flash.style.opacity = "0";
      }, 120);
    }
  }, 2000);
}

lightning();

/* RESIZE */
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
});
