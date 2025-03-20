import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

async function loadParticles() {
  await loadSlim(tsParticles);

  tsParticles.load("particles-container", {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 100 },
      color: { value: "#C8A2C8" },
      shape: { type: "circle" },
      opacity: { value: 0.9 },
      size: { value: 10 },
      move: {
        enable: true,
        speed: 2,
        bounce: true    // ✅ Reflect off edges
      },
      collisions: { enable: true } // ✅ Particles bump off each other
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 100 },
        push: { quantity: 4 }
      }
    }
  });
}

loadParticles();
