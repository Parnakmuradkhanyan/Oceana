const container = document.querySelector('.container-for-drawing');
const canvas = document.createElement('canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;
container.appendChild(canvas);

const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentTool = 'brush';
let currentColor = '#000000';
let startX = 0, startY = 0;

// Зміна кольору
document.querySelectorAll('.color-to-choose').forEach(button => {
  button.addEventListener('click', () => {
    currentColor = getComputedStyle(button).backgroundColor;
    document.querySelector('.current-color').style.backgroundColor = currentColor;
    document.querySelector('.color-palette-to-choose-container').style.visibility = 'hidden';
  });
});

// Перемикання інструментів
document.querySelector('#brush-tool').addEventListener('click', () => currentTool = 'brush');
document.querySelector('#rubber-tool').addEventListener('click', () => currentTool = 'rubber');
document.querySelector('#text-tool').addEventListener('click', () => currentTool = 'text');
document.querySelector('#clear-all-tool').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
document.querySelector('#curren-color-tool').addEventListener('click', () => {
  document.querySelector('.color-palette-to-choose-container').style.visibility = 'visible';
});

// Малювання мишею
canvas.addEventListener('mousedown', (e) => {
  if (currentTool === 'text') return;
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing || (currentTool !== 'brush' && currentTool !== 'rubber')) return;
  ctx.strokeStyle = currentTool === 'rubber' ? '#FFFFFF' : currentColor;
  ctx.lineWidth = currentTool === 'rubber' ? 20 : 2;
  ctx.lineCap = 'round';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Малювання на сенсорному екрані
canvas.addEventListener('touchstart', (e) => {
    if (currentTool === 'text') return;
    isDrawing = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
  });
  
  canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing || (currentTool !== 'brush' && currentTool !== 'rubber')) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = currentTool === 'rubber' ? '#FFFFFF' : currentColor;
    ctx.lineWidth = currentTool === 'rubber' ? 20 : 2;
    ctx.lineCap = 'round';
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
    e.preventDefault();
  });
  
  canvas.addEventListener('touchend', () => {
    isDrawing = false;
  });
// Додавання тексту
canvas.addEventListener('click', (e) => {
  if (currentTool !== 'text') return;
  const input = document.createElement('input');
  input.type = 'text';
  input.style.position = 'absolute';
  input.style.left = `${e.offsetX}px`;
  input.style.top = `${e.offsetY}px`;
  input.style.background = 'transparent';
  input.style.border = '0px solid transparent';
  input.style.color = currentColor;
  input.style.fontSize = '16px';
  input.style.zIndex = '4';
  container.appendChild(input);

  input.addEventListener('blur', () => {
    ctx.font = '16px Arial';
    ctx.fillStyle = currentColor;
    ctx.fillText(input.value, e.offsetX, e.offsetY);
    input.remove();
  });
  input.focus();
});

// Адаптація до зміни розміру екрану
window.addEventListener('resize', () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  ctx.putImageData(imageData, 0, 0);
});
