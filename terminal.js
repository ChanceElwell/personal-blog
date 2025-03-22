const terminal = document.getElementById('terminal');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()-_=+[]{}|;:,.<>?';
const lines = 20; // Number of lines in the terminal
const maxLineLength = 80; // Max characters per line

function generateRandomLine() {
  let line = '';
  for (let i = 0; i < maxLineLength; i++) {
    line += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return line;
}

function updateTerminal() {
  const existingLines = terminal.innerText.split('\n');
  if (existingLines.length > lines) {
    existingLines.shift(); // Remove top line
  }
  existingLines.push(generateRandomLine());
  terminal.innerText = existingLines.join('\n');
}

setInterval(updateTerminal, 100); // Speed of the "hack" effect
