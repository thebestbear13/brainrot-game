let score = Number(localStorage.getItem("brainrotScore")) || 0;
document.getElementById("score").innerText = "Brainrot: " + score;const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let score = 0;

const player = {
  x: 400,
  y: 250,
  size: 20,
  speed: 4
};

const brainrots = [];

function spawnBrainrot(){
  brainrots.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: 15
  });
}

setInterval(spawnBrainrot, 2000);

const keys = {};
window.addEventListener("keydown",e=>keys[e.key]=true);
window.addEventListener("keyup",e=>keys[e.key]=false);

function update(){

  if(keys["w"]) player.y -= player.speed;
  if(keys["s"]) player.y += player.speed;
  if(keys["a"]) player.x -= player.speed;
  if(keys["d"]) player.x += player.speed;

  for(let i=brainrots.length-1;i>=0;i--){
    const b = brainrots[i];

    const dx = player.x - b.x;
    const dy = player.y - b.y;
    const dist = Math.sqrt(dx*dx+dy*dy);

    if(dist < player.size + b.size){
      score++;
      brainrots.splice(i,1);
      document.getElementById("score").innerText="Brainrot: "+score;
    }
  }
}

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="cyan";
  ctx.beginPath();
  ctx.arc(player.x,player.y,player.size,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle="magenta";
  brainrots.forEach(b=>{
    ctx.beginPath();
    ctx.arc(b.x,b.y,b.size,0,Math.PI*2);
    ctx.fill();
  });
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
