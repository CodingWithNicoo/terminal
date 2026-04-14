const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;

/* GOTAS */
class Drop {
  constructor(){
    this.reset();
  }

  reset(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.len = 10 + Math.random() * 10;
    this.speed = 3 + Math.random() * 5;
  }

  update(){
    this.y += this.speed;

    if(this.y > h){
      this.y = -10;
      this.x = Math.random() * w;
    }
  }

  draw(){
    ctx.beginPath();
    ctx.strokeStyle = "rgba(180,220,255,0.35)";
    ctx.lineWidth = 1;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.len);
    ctx.stroke();
  }
}

/* LLUVIA */
let drops = [];
for(let i = 0; i < 220; i++) drops.push(new Drop());

function animate(){
  ctx.clearRect(0,0,w,h);

  drops.forEach(d => {
    d.update();
    d.draw();
  });

  requestAnimationFrame(animate);
}

animate();

/* RELÁMPAGOS */
setInterval(() => {
  if(Math.random() > 0.93){
    const flash = document.querySelector(".flash");
    flash.style.opacity = 0.7;

    setTimeout(() => flash.style.opacity = 0, 120);
  }
}, 2000);

/* PARALLAX SUAVE */
window.addEventListener("scroll", () => {
  const s = window.scrollY;

  document.querySelector(".back").style.transform =
    `translateY(${s * 0.03}px) scale(0.8)`;

  document.querySelector(".mid").style.transform =
    `translateY(${s * 0.06}px) scale(1)`;

  document.querySelector(".front").style.transform =
    `translateY(${s * 0.1}px) scale(1.2)`;
});

/* RESIZE */
window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});
