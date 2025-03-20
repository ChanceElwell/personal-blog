window.addEventListener('scroll', () => {
  const layer = document.querySelector('.parallax-layer');
  let offset = window.scrollY * 0.3;
  layer.style.transform = `translateY(${offset}px)`;
});
