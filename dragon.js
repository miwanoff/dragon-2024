let canvas; // Для canvas
let context; // Для контекста canvas
let position_x = screen.width; // координата x для движущихся холмов, изначально они не видны
let position_y = 0; // координата y для движущихся холмов
let speed = 2; // скорость движения холмов(на сколько будет изменяться position_x)
let timer; // Для setTimeout()
let direction; // Направление движения, задается стрелками клавиатуры
let up = 0; // насколько дракон переместился вверх
let dragon_x = 100; // координата x дракона
let dragon_h = 46;
let dragon_y = 100;
let grass_y = 205;

// Направления движения, задаются стрелками клавиатуры
let directions = {
  ArrowLeft: "left",
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
};

let dragon_image = new Image();
dragon_image.src = "images/dragon.png";

function drawDragon(context, x, y) {
  dragon_y = y - 46 + up;
  context.drawImage(dragon_image, x, dragon_y);
}

// Трава
function drawGrass(context) {
  context.beginPath();
  context.strokeStyle = "#0f0";
  context.lineWidth = 1;
  context.moveTo(0, grass_y);
  context.lineTo(canvas.width, grass_y);
  context.stroke();
}

// Холмы
function drawHill(context, x, w, h) {
  checkCollision(dragon_x, x, w);
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 1;
  context.moveTo(x, grass_y);
  context.lineTo(x + w / 4, grass_y - h);
  context.lineTo(x + (w * 3) / 4, grass_y - h);
  context.lineTo(x + w, grass_y);
  context.stroke();
}

function animateDragon(context, canvas, speed) {
  //context = canvas.getContext("2d");
  // Очистить холст
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawDragon(context, dragon_x, grass_y); // Рисуем дракона
  drawGrass(context); // Рисуем траву
  // Рисуем холмы
  drawHill(context, position_x, 40, 35);
  drawHill(context, position_x + 220, 30, 25);
  drawHill(context, position_x + 490, 50, 45);

  if (position_x + 490 + 50 > 0) {
    // Если холмы еще видны, уменьшаем координату x
    position_x -= speed;
  } else {
    // Если холмы уже не видны, "перемещаем" их опять направо за холст
    //stop();
    position_x = canvas.width;
  }
  console.log(position_x);
}
function stop() {
  clearInterval(timer);
}

function start(canvas, context) {
  stop();
  // timer = setInterval(animateDragon.bind(this, context, canvas), 1000);
  timer = setInterval(animateDragon, 10, context, canvas, speed);
}

function checkCollision(coord1, coord2, width) {
  if (coord1 > coord2 && coord1 < coord2 + width && up == 0) {
    alert("collision");
    stop();
    return;
  }
}

window.onload = function () {
  canvas = document.getElementById("dragon");
  let context = canvas.getContext("2d");
  canvas.width = screen.width;
  if (canvas && context) {
    // start();
    // drawDragon(context, 200, grass_y);
    // drawGrass(context);
    // drawHill(context, 300, 100, 30);
    // drawHill(context, 700, 50, 30);
    // drawHill(context, 1200, 200, 80);
    //animateDragon(context, speed);
    start(canvas, context);
  }
};

// Задаємо обробник події keydown
addEventListener("keydown", function (event) {
  direction = directions[event.key];
  if (direction == "up") {
    up = -80;
    setTimeout(function () {
      up = 0;
    }, 600);
  }
});
