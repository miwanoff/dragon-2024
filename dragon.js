let canvas; // Для canvas
let context; // Для контекста canvas
let position_x = screen.width; // координата x для движущихся холмов, изначально они не видны
let position_y = 0; // координата y для движущихся холмов
let speed = 2; // скорость движения холмов(на сколько будет изменяться position_x)
let timer; // Для setTimeout()
let direction; // Направление движения, задается стрелками клавиатуры
let up = 0; // насколько дракон переместился вверх
let dragon_x = 100; // координата x дракона

// Направления движения, задаются стрелками клавиатуры
let directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

let dragon_image = new Image();
dragon_image.src = "images/dragon.png";

function drawDragon(context, x, y) {
  context.drawImage(dragon_image, x, y);
}

window.onload = function () {
  canvas = document.getElementById("dragon");
  let context = canvas.getContext("2d");
  canvas.width = screen.width;
  if (canvas && context) {
    // start();
    drawDragon(context, 200, 100);
  }
};


