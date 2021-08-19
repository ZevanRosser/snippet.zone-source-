/// 3
/// Draw a Spiral with Resize
/// https://snippet.zone/2021/07/31/draw-a-spiral-with-resize/

const canvas = document.body.appendChild(
  document.createElement('canvas')
);
const c = canvas.getContext('2d');
 
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}
 
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'blue';
 
  const iter = 300,
        halfWidth = window.innerWidth / 2,
        halfHeight = window.innerHeight / 2;
  let rad = 0, theta = 0, x, y;
  for (let i = 0; i < iter; i++) {
    x = halfWidth + rad * Math.cos(theta);
    y = halfHeight + rad * Math.sin(theta);
    c.fillRect(x, y, 5, 5);
    rad += Math.min(window.innerWidth, window.innerHeight) * 0.0015;
    theta += .1;
  }
}
 
resize();
window.addEventListener('resize', resize);