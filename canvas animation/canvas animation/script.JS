var cnv = document.getElementById("myCanvas");
var ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 600;

let mouseX;
let mouseY;

// mouse movement listener
cnv.addEventListener("mousemove", mousemoveHandler);

//Math helper Fuctions
function mousemoveHandler(event) {
  let rect = cnv.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  console.log("X: " + mouseX + "  Y: " + mouseY);
}

// smoke
function addSmoke() {
  let oneSmoke = {
    x: 400,
    y: 240,
    rad: Math.floor(Math.random() * (30 - 8) + 8),
    xspeed: Math.floor(Math.random() * 5) - 2,
    yspeed: Math.random() * 4,
  };

  return oneSmoke;
}

let smokes = [];
for (let i = 0; i < 100; i++) {
  smokes.push(addSmoke());
}

requestAnimationFrame(draw);

// draw
function draw(event) {
  let key = event.code;
  // clear canvas
  ctx.fillStyle = "rgb(0, 96, 205)";
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  for (let i = 0; i < smokes.length; i++) {
    circle("rgba(41, 49, 83, 0.692)", smokes[i].x, smokes[i].y, smokes[i].rad);
    smokes[i].x += smokes[i].xspeed;
    smokes[i].y -= smokes[i].yspeed;
    if (smokes[i].x < 260) {
      smokes[i].xspeed = -smokes[i].xspeed;
      if (key == "KeyU") {
        smokes[i].xspeed++;
      }
    }
  }

  // HOUSE
  // house body
  rect("#6bc5e8", 350, 380, 330, 427);
  // door frame
  rect("#fcf649", 531, 461, 90, 139);
  // door
  rect("#ba813f", 541, 471, 70, 129);
  // door knob
  circle("#d1cecb", 598, 545, 5);
  // chimney
  rect("#5c2511", 425, 355, -49, -95);
  rect("#3b3330", 373, 255, 55, 15);
  // roof
  tri("#1b283b", 305, 380, 515, 275, 715, 380);

  // add remove
  document.addEventListener("keypress", addRemove);
  function addRemove(event) {
    console.log(event.key);
    let key = event.code;
    if (key == "KeyR") {
      smokes.push(addSmoke());
    } else if (key == "KeyA") {
      smokes.pop();
    }
    // } else if (key == "KeyU") {
    //   changeSpeed(addSmoke);
    //   function changeSpeed(zoom) {
    //     zoom.xspeed++;
    //     zoom.yspeed++;
    //     console.log(zoom.xpeed);
    //   }
    // }

    // speed control
    // if (key == "Space") {
    // }
  }

  requestAnimationFrame(draw);
}

function circle(colour, X, Y, rad) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(X, Y, rad, 0, 2 * Math.PI);
  ctx.fill();
}

function rect(colour, X, Y, W, H) {
  ctx.fillStyle = colour;
  ctx.fillRect(X, Y, W, H);
}

function tri(colour, X1, Y1, X2, Y2, X3, Y3) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.moveTo(X1, Y1);
  ctx.lineTo(X2, Y2);
  ctx.lineTo(X3, Y3);
  ctx.fill();
}

// let aNewSmoke = oneSmoke();
// let aSmokeArray = [];

// aSmokeArray.push(aNewSmoke);
