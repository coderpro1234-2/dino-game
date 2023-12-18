var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d")
img = document.getElementById("asset")
ctx.imageSmoothingEnabled = false
ctx.clearRect(0, 0, canvas.width, canvas.height)
keys = ["temporary"]
highScore = 1234
score = 0
state = 1
var pos_y = 0
var speed_y = 0
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
      state = 2
      speed_y += 0.1
    }
    else {
      if (!(state == 3)) {
        state = 1
      }
    }
  }
}
drawtexttoscr("HI "+highScore.toString().padStart(5,'0')+" "+score.toString().padStart(5,'0'),405,6.5,10,12,1)
document.addEventListener("keydown",function(e){
  if (keys.includes(e.key) == false) {
    keys.push(e.key)
  }
})
document.addEventListener("keyup",function(e){
  if (keys.includes(e.key)) {
    keys.splice(keys.indexOf(e.key),keys.indexOf(e.key))
  }
})
setInterval(function(e){
  score++
},100)
setInterval(function(e){
  check_keys()
  drawtexttoscr("HI "+highScore.toString().padStart(5,'0')+" "+score.toString().padStart(5,'0'),405,6.5,10,12,1)
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
    ctx.drawImage(img,1678+88*5,2,88,94,20,80,44,47)
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
  else {
    pos_y = 80
    speed_y  = 0
  }
},1)