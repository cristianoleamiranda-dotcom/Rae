import { Application, Graphics, Container } from 'pixi.js';

// Sprite pixel-art 16x16: un pequeño fantasma violeta.
// ' ' = vacío, letras = color de píxel.
const PALETTE = {
  '.': '#2b1e55', // contorno suave
  v: '#8b6cff', // cuerpo violeta
  l: '#b8a4ff', // brillo
  w: '#ffffff', // ojos
  k: '#1b1238', // pupila / boca
  c: '#4ce0ff', // detalle cyan
};

const FRAMES = [
  [
    '....vvvvvv....',
    '..vvvvvvvvvv..',
    '.vvvvvvvvvvvv.',
    '.vvllvvvvvvvv.',
    'vvllvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvwwkkvvwwkkvv',
    'vvwwkkvvwwkkvv',
    'vvvvvvvvvvvvvv',
    'vvvvvkkkkvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vv.vv.vv.vv.vv',
    'v...v..v..v..v',
  ],
  [
    '....vvvvvv....',
    '..vvvvvvvvvv..',
    '.vvvvvvvvvvvv.',
    '.vvllvvvvvvvv.',
    'vvllvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvwwkkvvwwkkvv',
    'vvwwkkvvwwkkvv',
    'vvvvvvvvvvvvvv',
    'vvvvvkkkkvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    'vvvvvvvvvvvvvv',
    '.vv..vv..vv...',
  ],
];

function drawFrame(g, frame, scale) {
  g.clear();
  for (let y = 0; y < frame.length; y++) {
    for (let x = 0; x < frame[y].length; x++) {
      const ch = frame[y][x];
      if (ch === ' ') continue;
      g.beginFill(PALETTE[ch] ?? PALETTE.v);
      g.drawRect(x * scale, y * scale, scale, scale);
      g.endFill();
    }
  }
}

/**
 * Lienzo PixiJS: sprite pixel animado + partículas de rastro.
 */
export async function initPixel(canvas) {
  const app = new Application();
  await app.init({
    canvas,
    background: '#0c0c1a',
    resizeTo: canvas.parentElement,
    antialias: false,
    resolution: Math.min(window.devicePixelRatio, 2),
  });

  const scale = Math.max(14, Math.floor(Math.min(app.screen.width, app.screen.height) / 20));
  const ghost = new Graphics();
  const wrap = new Container();
  wrap.addChild(ghost);
  wrap.x = (app.screen.width - 14 * scale) / 2;
  wrap.y = (app.screen.height - 16 * scale) / 2 - scale;
  app.stage.addChild(wrap);

  // Partículas de rastro (píxeles que caen)
  const trail = new Graphics();
  app.stage.addChild(trail);
  const dots = Array.from({ length: 26 }, () => ({
    x: Math.random() * app.screen.width,
    y: Math.random() * app.screen.height,
    v: 0.35 + Math.random() * 1.15,
    s: 2 + Math.random() * 4,
    color: [0x8b6cff, 0x4ce0ff, 0xff6cc9][Math.floor(Math.random() * 3)],
  }));

  let frame = 0;
  let tick = 0;

  app.ticker.add(() => {
    tick += 1;

    // Alterna frames cada ~24 ticks (2 pose), con bob vertical
    frame = Math.floor(tick / 24) % 2;
    drawFrame(ghost, FRAMES[frame], scale);
    wrap.y =
      (app.screen.height - 16 * scale) / 2 -
      scale +
      Math.sin(tick * 0.05) * scale * 0.6;

    // Rastro
    trail.clear();
    for (const d of dots) {
      d.y += d.v;
      if (d.y > app.screen.height + 6) {
        d.y = -6;
        d.x = Math.random() * app.screen.width;
      }
      trail.beginFill(d.color, 0.55);
      trail.fillRect(Math.round(d.x), Math.round(d.y), d.s, d.s);
      trail.endFill();
    }
  });
}
