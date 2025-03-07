var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
c.lineWidth = 5;
c.globalAlpha = 0.5;

var mousex = 0;
var mousey = 0;

addEventListener("mousemove", function (event) {
  mousex = event.clientX;
  mousey = event.clientY;
});

var grav = 0.99;
c.strokeWidth = 5;

function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 30 + 20;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;
  this.update = function () {
    // Draw the ball
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();

    // Draw the darker border
    c.strokeStyle = "rgba(0, 0, 0, 0.7)"; // Darker border color
    c.lineWidth = 2; // Border width
    c.stroke();
    
    // Draw the eyes
    c.beginPath();
    c.arc(this.x - this.radius / 3, this.y - this.radius / 3, this.radius / 10, 0, Math.PI * 2);
    c.arc(this.x + this.radius / 3, this.y - this.radius / 3, this.radius / 10, 0, Math.PI * 2);
    c.fillStyle = "black";
    c.fill();

    // Draw the smile
    c.beginPath();
    c.arc(this.x, this.y, this.radius / 2, 0, Math.PI, false);
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();
  };
}

var bal = [];
for (var i = 0; i < 5; i++) {
  bal.push(new Ball());
}

function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);

  for (var i = 0; i < bal.length; i++) {
    for (var j = i + 1; j < bal.length; j++) {
      var dx = bal[i].x - bal[j].x;
      var dy = bal[i].y - bal[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < bal[i].radius + bal[j].radius) {
        // Simple collision response: swap velocities
        var tempDx = bal[i].dx;
        var tempDy = bal[i].dy;
        bal[i].dx = bal[j].dx;
        bal[i].dy = bal[j].dy;
        bal[j].dx = tempDx;
        bal[j].dy = tempDy;
        bal[i].color = randomColor();
        bal[j].color = randomColor();

        // Move balls apart to avoid overlapping
        var overlap = bal[i].radius + bal[j].radius - distance;
        var totalRadius = bal[i].radius + bal[j].radius;
        bal[i].x += (dx / distance) * (overlap * (bal[j].radius / totalRadius));
        bal[i].y += (dy / distance) * (overlap * (bal[j].radius / totalRadius));
        bal[j].x -= (dx / distance) * (overlap * (bal[i].radius / totalRadius));
        bal[j].y -= (dy / distance) * (overlap * (bal[i].radius / totalRadius));
      }
    }

    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= ty) {
      bal[i].dy = -bal[i].dy * grav;
    } else {
      bal[i].dy += bal[i].vel;
    }
    if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0) {
      bal[i].dx = -bal[i].dx;
    }
    if (
      mousex > bal[i].x - 20 &&
      mousex < bal[i].x + 20 &&
      mousey > bal[i].y - 50 &&
      mousey < bal[i].y + 50 &&
      bal[i].radius < 70
    ) {
      bal[i].radius += 5;
    } else {
      if (bal[i].radius > bal[i].startradius) {
        bal[i].radius -= 5;
      }
    }
  }
}

animate();

setInterval(function () {
  bal.push(new Ball());
}, 4000);
