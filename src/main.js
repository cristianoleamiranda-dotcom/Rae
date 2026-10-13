import { initScene3D } from './scene3d.js';
import { initPixel } from './pixel.js';
import { initLottie } from './lottiefx.js';

// Escena 3D de fondo
const sceneRoot = document.querySelector('#scene-3d');
if (sceneRoot) initScene3D(sceneRoot);

// Sprite pixel con PixiJS
const pixelCanvas = document.querySelector('#pixel-canvas');
if (pixelCanvas) initPixel(pixelCanvas);

// Animación Lottie
const lottiePlayer = document.querySelector('#lottie-player');
if (lottiePlayer) initLottie(lottiePlayer);

// Revelado de tarjetas al hacer scroll (IntersectionObserver)
const cards = document.querySelectorAll('.card, .closing');
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
        );
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.18 },
);
cards.forEach((card) => observer.observe(card));
