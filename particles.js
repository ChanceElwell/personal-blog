window.onload = function() {
  const latticeContainer = document.getElementById('lattice-container');
  const dotCount = 500;  // Total number of dots to generate
  const dots = [];

  // Create random dots and place them on the screen
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    // Random position for each dot
    dot.style.position = 'absolute';
    dot.style.width = '5px';
    dot.style.height = '5px';
    dot.style.backgroundColor = 'rgba(0, 0, 255, 0.6)';
    dot.style.borderRadius = '50%';
    
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;

    // Add each dot to the body
    latticeContainer.appendChild(dot);
    dots.push(dot);
  }

  // Handle mouse movement
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Iterate through each dot
    dots.forEach((dot) => {
      const dotRect = dot.getBoundingClientRect();
      const dotX = dotRect.left + dotRect.width / 2;
      const dotY = dotRect.top + dotRect.height / 2;
      
      // Calculate distance from the mouse
      const distX = mouseX - dotX;
      const distY = mouseY - dotY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      
      // Repel dots from the mouse if close, but limit the movement to a small distance
      if (dist < 100) {
        const repulsionFactor = 1 - dist / 100;  // Stronger repulsion the closer the mouse is
        dot.style.left = `${dotX + distX * repulsionFactor}px`;
        dot.style.top = `${dotY + distY * repulsionFactor}px`;
      }
    });
  });
};
