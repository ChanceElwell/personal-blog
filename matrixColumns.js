const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 18;
const aphorismWidth = 300; // width of each aphorism "column"
const columns = Math.max(2, Math.floor(canvas.width / aphorismWidth)); // prevent 0 columns
const drops = Array(columns).fill(1);

const aphorisms = [
  "Know thyself.",
  "Memento mori.",
  "What you seek is seeking you.",
  "The unexamined life is not worth living.",
  "Become who you are.",
  "Happiness is a byproduct of virtue.",
  "He who has a why can bear any how.",
  "Do or do not. There is no try.",
  "Man is condemned to be free.",
  "Time is the wisest counselor of all.",
  "The obstacle is the way.",
  "We suffer more in imagination than in reality.",
  "Amor fati.",
  "All is flux.",
  "Fortune favors the bold.",
  "To be is to do.",
  "Simplicity is the ultimate sophistication.",
  "Absorb what is useful.",
  "The way out is through.",
  "Become ungovernable."
];

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00FF00';
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, index) => {
    const aphorism = aphorisms[Math.floor(Math.random() * aphorisms.length)];
    const x = index * aphorismWidth;
    const verticalShift = (index % 2 === 0)
      ? Math.sin(Date.now() / 300 + index) * 10
      : Math.cos(Date.now() / 300 + index) * 10;

    ctx.fillText(aphorism, x, y * fontSize + verticalShift);

    if (y * fontSize > canvas.height * 1.5 && Math.random() > 0.975) {
      drops[index] = 0;
    } else {
      drops[index]++;
    }
  });
}

// ✅ Slow draw speed — update every 250ms
setInterval(drawMatrix, 250);
