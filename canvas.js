document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-container');
  const ctx = canvas.getContext('2d');
  let particles = [];

  // Adjust canvas size on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.opacity = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= 0.02;  // Fade the particle out

      if (this.opacity <= 0) {
        this.size = 0;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
      ctx.fill();
      ctx.closePath();
    }
  }

  // Add particles on mousemove
  canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.x;
    const mouseY = e.y;

    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }
  });

  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();

      // Remove particles that are no longer visible
      if (particle.opacity <= 0) {
        particles.splice(index, 1);
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();  // Start the animation
});
