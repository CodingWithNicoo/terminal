const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rainDrops = [];
let rainCount = window.innerWidth < 768 ? 200 : 500;

for(let i=0;i<rainCount;i++){
  rainDrops.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    length:Math.random()*20,
    speed:Math.random()*6+4,
    opacity:Math.random()
  });
}

function drawRain(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle="rgba(180,220,255,0.5)";
  ctx.lineWidth=1;

  rainDrops.forEach(drop=>{
    ctx.globalAlpha=drop.opacity;
    ctx.beginPath();
    ctx.moveTo(drop.x,drop.y);
    ctx.lineTo(drop.x,drop.y+drop.length);
    ctx.stroke();
    drop.y+=drop.speed;
    if(drop.y>canvas.height) drop.y=-20;
  });

  requestAnimationFrame(drawRain);
}
drawRain();

/* Parallax forest/fog on scroll */
window.addEventListener("scroll",()=>{
  const scroll = window.scrollY;
  document.querySelector(".forest").style.transform = `translateY(${scroll * 0.1}px)`;
  document.querySelector(".fog").style.transform = `translateY(${scroll * 0.05}px)`;
});

/* Resize canvas */
window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
