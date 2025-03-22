// Canvas setup for Aphorisms
const container = document.getElementById('aphorism-space');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
container.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Aphorism Texts
const aphorisms = [
  "Know thyself.",
  "Memento mori.",
  "What you seek is seeking you.",
  "The unexamined life is not worth living.",
  "Become who you are.",
  "Simplicity is the ultimate sophistication.",
  "The obstacle is the way.",
  "Amor fati.",
  "Fortune favors the bold.",
  "Time is the wisest counselor of all.",
  "Become ungovernable."
];

// Particles for aphorisms
const particles = [];

// Create a sound source from YouTube player
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });
}

// When the player is ready, set up the play/pause button
function onPlayerReady(event) {
  const playPauseButton = document.getElementById('play-pause-btn');
  playPauseButton.addEventListener('click', togglePlayPause);

  // Use setInterval to check music time and trigger aphorisms based on volume
  setInterval(syncAphorismsWithVolume, 100); // Check every 100ms
}

// Handle player state change
function onPlayerStateChange(event) {
  const playPauseButton = document.getElementById('play-pause-btn');
  
  if (event.data === YT.PlayerState.PLAYING) {
    playPauseButton.innerText = "Pause";
  } else if (event.data === YT.PlayerState.PAUSED) {
    playPauseButton.innerText = "Play";
  }
}

// Toggle Between Play and Pause
function togglePlayPause() {
  const playPauseButton = document.getElementById('play-pause-btn');
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    playPauseButton.innerText = "Play";
  } else {
    player.playVideo();
    playPauseButton.innerText = "Pause";
  }
}

// Sync aphorisms based on music volume (using player time and basic intervals)
function syncAphorismsWithVolume() {
  const currentTime = player.getCurrentTime(); // Get current time of the music
  const volume = Math.random() * 255;  // Simulate volume, replace with real audio analysis for more complex logic

  console.log("Current Time:", currentTime, "Simulated Volume:", volume); // Debugging log
  
  // Trigger aphorisms when volume exceeds a threshold
  if (volume > 100) {  // Adjust the threshold based on preference
    addAphorism(aphorisms[Math.floor(Math.random() * aphorisms.length)]);
  }
}

// Add aphorism with fade-in effect
function addAphorism(text) {
  particles.push({
    text: text,
    x: Math.random() * canvas.width,
    y: -50, // Start above the screen
    speedY: 0.2 + Math.random() * 0.5,
    alpha: 0, // Start transparent
  });
}

// Canvas animation loop for aphorisms
function animate() {
  ctx.fillStyle = '#EDD3C4'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#2C3E50'; 
  ctx.font = '24px Courier New';

  particles.forEach((p, i) => {
    p.alpha = Math.min(1, p.alpha + 0.02); // Fade-in effect
    ctx.globalAlpha = p.alpha;

    p.x += Math.sin(Date.now() * 0.001 + i) * 0.3;
    ctx.fillText(p.text, p.x, p.y);

    p.y += p.speedY;
    if (p.y > canvas.height + 50) {
      p.y = -50;
      p.x = Math.random() * canvas.width;
      p.text = aphorisms[Math.floor(Math.random() * aphorisms.length)];
      p.alpha = 0; // Reset alpha for fade-in
    }
  });

  requestAnimationFrame(animate);
}

animate();

console.log("Running with aphorism sync and YouTube controls.");
