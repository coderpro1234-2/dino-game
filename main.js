var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d")
img = document.getElementById("asset")
ctx.imageSmoothingEnabled = false
ctx.clearRect(0, 0, canvas.width, canvas.height)
keys = ["temporary"]
dino_values = [[44,47],[60,47],[44,47],[44,47]]
cactus_values = [[88,17,35]]
cactus = []
highScore = 1234
score = 0
timer = 0
tnow = 0
toff = 200
state = 1
pos_y = 0
speed_y = 0
old_pos = 0
function randint(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function drawnumtoscr(num,x,y,sx,sy,c) {
  if (c == 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  ctx.drawImage(img,(1294+(num*20)),2,18,21,x,y,sx,sy)
}
function drawtexttoscr(text,x,y,cx,cy,c) {
  if (c == 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  i = 0
  while (i < text.length) {
    if (text[i] == " ") {
      drawnumtoscr(12,x+(i*(cx*1.3)),y,cx,cy,0)
    }
    else if (text[i] == "I") {
      drawnumtoscr(11,x+(i*(cx*1.3)),y,cx,cy,0)
    }
    else if (text[i] == "H") {
      drawnumtoscr(10,x+(i*(cx*1.3)),y,cx,cy,0)
    }
    else {
      drawnumtoscr(parseInt(text[i]),x+(i*(cx*1.3)),y,cx,cy,0)
    }
    i ++
  }
}
function check_keys() {
  if (keys.includes("ArrowUp") && keys.includes("ArrowDown")) {
    if (keys.indexOf("ArrowUp") > keys.indexOf("ArrowDown")) {
      state = 2
    }
  }
  else {
    if (keys.includes("ArrowUp") && !(state == 3)) {
      state = 3
      speed_y = -8
      pos_y += speed_y
    }
    else if (keys.includes("ArrowDown")) {
      if (state == 3) {
        speed_y += 2
      }
      else {
        state = 2
      }
    }
    else {
      if (!(state > 2)) {
        state = 1
      }
    }
  }
}

function draw_cacti(type,x) {
  if (type == 1) {
    ctx.drawImage(img,446,2,34,70,x,88,17,35)
  }
}
function check_cactus_coll() {
  dino = dino_values[state-1]
  i = 0
  while (i != cactus.length) {
    cx = cactus[i][1]
    c = cactus_values[0]
    if (!(pos_y+dino[1]<c[0])) {
      if (((cx>20&&cx<20+dino[0])||(cx+c[1]>20&&cx+c[1]<20+dino[0]))||(cx<20&&cx+c[1]>20+dino[0])){
        state = 4
      }
    }
    i++
  }
}
function resetbutton() {
  score = 0
  cactus = []
  state = 1
  timer = 0
  tnow = 0
  toff = 200
}
function parseClick() {
  if (state == 4){
    resetbutton()
  }
  else {
    if (state == 1) {
      state = 3
      speed_y = -8
      pos_y += speed_y
    }
  }
}
drawtexttoscr("HI "+highScore.toString().padStart(5,'0')+" "+score.toString().padStart(5,'0'),405,6.5,10,12,1)
document.addEventListener("keydown",function(e){
  if (keys.includes(e.key) == false) {
    if ((e.key == " " || e.key == "Enter" || e.key == "ArrowUp")&& state == 4) {
      resetbutton()
    }
    else {
      keys.push(e.key)
    }
  }
})
document.addEventListener("keyup",function(e){
  if (keys.includes(e.key)) {
    keys.splice(keys.indexOf(e.key),keys.indexOf(e.key))
  }
})
setInterval(function(e){
  if (!(state == 4)) {
    score++
  }
},100)
setInterval(function(e){
  if (!(state == 4)) {
    timer++
  }
  k = 0
  while (!(k == cactus.length)) {
    if (!(state == 4)) {
      cactus[k][1] -= 6
    }
    k++
  }
  if (tnow+toff == timer) {
    cactus.push([randint(1,1),800])
    tnow = timer
    toff = randint(50,150)
  }
  k = 0
  while (!(k == cactus.length)) {
    if (cactus[k][1] < -100) {
      cactus.splice(k,1)
      k--
    }
    k++
  }
  check_cactus_coll()
},100)
setInterval(function(e){
  if (state != 4)
  check_keys()
  drawtexttoscr("HI "+highScore.toString().padStart(5,'0')+" "+score.toString().padStart(5,'0'),405,6.5,10,12,1)
  ctx.drawImage(img,0,103,2400,25,(0-(timer*6)) % 1200,110,1200,17)
  ctx.drawImage(img,0,103,2400,25,(0-(timer*6) % 1200)+1200,110,1200,17)
  j = 0
  while (!(j == cactus.length)) {
    tmpl = cactus[j]
    draw_cacti(tmpl[0],tmpl[1])
    j++
  }
  if (state == 1) {
    ctx.drawImage(img,(1678+(88*(2+(score % 2)))),2,88,94,20,80,44,47)
  }
  else if (state == 2) {
    ctx.drawImage(img,(1678+(88*6+(118*(score % 2)))),2,118,94,20,80,60,47)
  }
  else if (state == 3) {
    ctx.drawImage(img,1678,2,88,94,20,pos_y,44,47)
  }
  else if (state == 4) {
    ctx.drawImage(img,1678+88*5,2,88,94,20,pos_y,44,47)
  }
  if (state == 3) {
    pos_y += speed_y
    speed_y += 0.5
    if (pos_y > 80) {
      state = 1
      pos_y = 80
      speed_y  = 0
    }
  }
  else if (state == 4) {
    speed_y = 0
  }
  else {
  pos_y = 80
  speed_y  = 0 
  }
  if (state == 4) {
    ctx.drawImage(img,1294,30,382,64,204.5,35,191,32)
    ctx.drawImage(img,506,130,72,64,282,75,36,32)
  }
},1)
