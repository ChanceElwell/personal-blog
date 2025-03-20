document.addEventListener('DOMContentLoaded', () => {
  // Get all sections for snapping
  const sections = document.querySelectorAll('.snap-section');
  const introScreen = document.getElementById('intro-screen');
  let hasGlidedAway = false;

  // Fade-in activation for sections
  function activateSection() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // Add 'active' class when the section is in view (0.8 of viewport height)
      if (rect.top >= 0 && rect.top < window.innerHeight * 0.8) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }

  // Function for smooth scroll snapping
  let scrollTimeout;
  function snapToClosest() {
    let closest = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < closestDistance) {
        closest = section;
        closestDistance = distance;
      }
    });

    // Scroll to the closest section
    if (closest) {
      closest.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Single scroll event listener for glide away and snapping behavior
  window.addEventListener('scroll', () => {
    // Glide away the intro screen after first scroll
    if (!hasGlidedAway && window.scrollY > 10) {
      introScreen.style.transform = 'translateY(-100vh)'; // Glide effect
      introScreen.style.transition = 'transform 0.5s ease-out'; // Ensure smooth transition
      hasGlidedAway = true; // Ensure it only happens once
    }

    // Activate the fade-in effect for the sections
    activateSection();

    // Smooth snap logic (debounced with setTimeout)
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => snapToClosest(), 150);  // Delay tweakable
  });

  // Initialize on load as well
  window.addEventListener('load', activateSection);
});
