let ownedBrainrots = JSON.parse(localStorage.getItem("ownedBrainrots")) || [];
function saveOwnedBrainrots(){
  localStorage.setItem("ownedBrainrots", JSON.stringify(ownedBrainrots));
saveOwnedBrainrots();
}ownedBrainrots.push({...b, x:150 + Math.random()*200, y:150 + Math.random()*200});
const conveyor = {
  x: 0,
  y: 420,
  width: canvas.width,
  height: 60,
  speed: 2
};
setInterval(()=>{
  ownedBrainrots.forEach(b=>{
    score += b.value;
  });
b.x = newX;
b.y = newY;
saveOwnedBrainrots();
  localStorage.setItem("brainrotScore", score);
  document.getElementById("score").innerText="Brainrot: "+score;

}, 2000);
let shopBrainrots = [];
let ownedBrainrots = [];
const brainrotTypes = [
  {name:"common", chance:1, value:1, size:15, color:"#ff00ff"},
  {name:"uncommon", chance:0.6, value:2, size:16, color:"#ff66ff"},
  {name:"rare", chance:0.3, value:5, size:18, color:"#ffd700"},
  {name:"epic", chance:0.15, value:10, size:20, color:"#a855f7"},
  {name:"legendary", chance:0.07, value:25, size:23, color:"#00ffff"},
  {name:"mythic", chance:0.03, value:60, size:26, color:"#ff4500"},
  {name:"god", chance:0.01, value:150, size:30, color:"#ffffff"}
];
function saveBases(){
  baseSave.bases = bases.map(b=>({
    level: b.level || 1,
    spawnRate: b.spawnRate,
    luck: b.luck || 1
  }));

  localStorage.setItem("baseSave", JSON.stringify(baseSave));
}
let baseSave = JSON.parse(localStorage.getItem("baseSave")) || {
  bases: [
    { level:1, spawnRate:2000, luck:1 },
    { level:1, spawnRate:3000, luck:1 }
  ]
};
function spawnShopBrainrot(){

  const type = pickBrainrot(1);
shopBrainrots.forEach(b=>{
  b.x += conveyor.speed;
});shopBrainrots = shopBrainrots.filter(b=>b.x < canvas.width);
  canvas.addEventListener("click", e=>{
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  shopBrainrots.forEach((b,i)=>{
    const dx = mx - b.x;
    const dy = my - b.y;
    const dist = Math.sqrt(dx*dx+dy*dy);

    if(dist < b.size){

      if(score >= b.price){

        score -= b.price;
        localStorage.setItem("brainrotScore", score);
        document.getElementById("score").innerText="Brainrot: "+score;

        ownedBrainrots.push({
          ...b,
          x: 150 + Math.random()*200,
          y: 150 + Math.random()*200
        });

        shopBrainrots.splice(i,1);
      }
    }
  });
});
  shopBrainrots.push({
    x: 0,
    y: conveyor.y + 30,
    size: type.size,
    value: type.value,
    color: type.color,
    type: type.name,
    price: type.value * 5
  });
}

setInterval(spawnShopBrainrot, 3000);
const bases = [
  {x:50, y:50, w:200, h:150, color:"rgba(0,255,0,0.2)", spawnRate:2000},
  {x:550, y:300, w:200, h:150, color:"rgba(0,150,255,0.2)", spawnRate:3000}
];
let score = Number(localStorage.getItem("brainrotScore")) || 0;
document.getElementById("score").innerText = "Brainrot: " + score;const canvas = document.getElementById("game");
function upgradeBase(index){

  const base = bases[index];

  base.level = (base.level || 1) + 1;

  // faster spawning
  base.spawnRate *= 0.9;

  // more rare chance
  base.luck = (base.luck || 1) + 0.2;

  saveBases();
}
const ctx = canvas.getContext("2d");
bases.forEach((base,i)=>{
  const saved = baseSave.bases[i];
  if(saved){
    base.spawnRate = saved.spawnRate;
    base.level = saved.level;
    base.luck = saved.luck;
  }
});
canvas.width = 800;
canvas.height = 500;

let score = 0;

const player = {
  x: 400,
  y: 250,
  size: 20,
  speed: 4
};
function inBase(player, base){
  return (
    player.x > base.x &&
    player.x < base.x + base.w &&
    player.y > base.y &&
    player.y < base.y + base.h
  );
}
const brainrots = [];

function spawnBrainrot(){
function pickBrainrot(luck=1){

  const roll = Math.random();

  let total = 0;

  for(const type of brainrotTypes){
    total += type.chance * luck;

    if(roll < total){
      return type;
    }
  }

  return brainrotTypes[0];
}
  const roll = Math.random();

  let type = "common";
  let size = 15;
  let value = 1;
  let color = "magenta";

  if(roll < 0.15){
    type = "rare";
    size = 18;
    value = 5;
    color = "gold";
  }

  if(roll < 0.03){
    type = "legendary";
    size = 22;
    value = 20;
    color = "cyan";
  }

  brainrots.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size,
    value,
    color,
    type
  });
}

bases.forEach(base=>{
  setInterval(()=>{
    spawnBrainrotInBase(base);
  }, base.spawnRate);
});
let safe = false;

bases.forEach(base=>{
  if(inBase(player, base)) safe = true;
});
showPopup(b.type.toUpperCase());
function showPopup(text){
  const el = document.createElement("div");
  el.innerText = text;
  el.style.position="absolute";
  el.style.left="50%";
  el.style.top="80px";
  el.style.color="white";
  el.style.fontSize="24px";
  document.body.appendChild(el);
{name:"secret", chance:0.002, value:1000, size:35, color:"#39ff14"}
  setTimeout(()=>el.remove(),800);
}
player.safe = safe;
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
      
lscore += b.value;
localStorage.setItem("brainrotScore", score);
document.getElementById("score").innerText="Brainrot: "+score;
      
      brainrots.splice(i,1);
      document.getElementById("score").innerText="Brainrot: "+score;
    }
  }
}

function draw(){
ctx.fillStyle="#333";
ctx.fillRect(conveyor.x, conveyor.y, conveyor.width, conveyor.height);
  ctx.clearRect(0,0,canvas.width,canvas.height);
shopBrainrots.forEach(b=>{
  ctx.fillStyle = b.color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.size, 0, Math.PI*2);
  ctx.fill();
});
  ownedBrainrots.forEach(b=>{
  ctx.fillStyle = b.color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.size, 0, Math.PI*2);
  ctx.fill();
});
  ctx.fillStyle="cyan";
  ctx.beginPath();
 bases.forEach(base=>{
  ctx.fillStyle = base.color;
  ctx.fillRect(base.x, base.y, base.w, base.h);
});
  ctx.arc(player.x,player.y,player.size,0,Math.PI*2);
  ctx.fill();

brainrots.forEach(b=>{
  ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x,b.y,b.size,0,Math.PI*2);
    ctx.fill();
  });
}
function spawnBrainrotInBase(base){

  const type = pickBrainrot(base.luck || 1);

  brainrots.push({
    x: base.x + Math.random()*base.w,
    y: base.y + Math.random()*base.h,
    size: type.size,
    value: type.value,
    color: type.color,
    type: type.name
  });
}

  const roll = Math.random() / (base.luck || 1);

  let value = 1;
  let size = 15;
  let color = "magenta";

  if(roll < 0.15){
    value = 5;
    size = 18;
    color = "gold";
  }

  if(roll < 0.03){
    value = 20;
    size = 22;
    color = "cyan";
  }

  brainrots.push({
    x: base.x + Math.random()*base.w,
    y: base.y + Math.random()*base.h,
    size,
    value,
    color
  });
}
function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
