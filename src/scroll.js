const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      observer.unobserve(entry.target); // Animate once
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(section => {
  section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
  observer.observe(section);
});
