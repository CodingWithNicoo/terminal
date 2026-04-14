const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;

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
    ctx.strokeStyle = "rgba(180,220,255,0.4)";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.len);
    ctx.stroke();
  }
}

let drops = [];
for(let i = 0; i < 200; i++) drops.push(new Drop());

function animate(){
  ctx.clearRect(0,0,w,h);

  drops.forEach(d => {
    d.update();
    d.draw();
  });

  requestAnimationFrame(animate);
}

animate();

/* RESIZE */
window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});
