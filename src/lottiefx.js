import lottie from 'lottie-web';

// Animación Lottie artesanal: anillo que pulsa + destello central.
// Los principios de Disney aplicados: squash & stretch, anticipation y timing suave.
const pulseAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 150,
  w: 320,
  h: 320,
  nm: 'rae-pulse',
  ddd: 0,
  assets: [],
  layers: [
    // Anillo exterior — escala 70% -> 110% con easing suave
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'ring-outer',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [90], i: { x: [0.45], y: [1] }, o: { x: [0.55], y: [0] } },
            { t: 75, s: [35], i: { x: [0.45], y: [1] }, o: { x: [0.55], y: [0] } },
            { t: 150, s: [90] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [160, 160, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [68, 68, 100], i: { x: [0.45, 0.45, 0.45], y: [1, 1, 1] }, o: { x: [0.55, 0.55, 0.55], y: [0, 0, 0] } },
            { t: 150, s: [112, 112, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [190, 190] }, nm: 'el' },
            { ty: 'st', c: { a: 0, k: [0.545, 0.424, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 5 }, lc: 2, lj: 2, nm: 'st' },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
          nm: 'ring-outer-gr',
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
    },
    // Anillo interior cyan — fase desplazada (coreografía multi-elemento)
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'ring-inner',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [25], i: { x: [0.45], y: [1] }, o: { x: [0.55], y: [0] } },
            { t: 75, s: [85], i: { x: [0.45], y: [1] }, o: { x: [0.55], y: [0] } },
            { t: 150, s: [25] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [160, 160, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [108, 108, 100], i: { x: [0.45, 0.45, 0.45], y: [1, 1, 1] }, o: { x: [0.55, 0.55, 0.55], y: [0, 0, 0] } },
            { t: 150, s: [62, 62, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [150, 150] }, nm: 'el' },
            { ty: 'st', c: { a: 0, k: [0.298, 0.878, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2, nm: 'st' },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
          nm: 'ring-inner-gr',
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
    },
    // Núcleo: diamante que respira (squash & stretch sutil)
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'core',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 150, s: [180] },
          ],
        },
        p: { a: 0, k: [160, 160, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [86, 86, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
            { t: 75, s: [112, 112, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
            { t: 150, s: [86, 86, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sr',
              sy: 1,
              d: 1,
              pt: { a: 0, k: 4 },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              ir: { a: 0, k: 0 },
              or: { a: 0, k: 62 },
              os: { a: 0, k: 0 },
              nm: 'star',
            },
            { ty: 'fl', c: { a: 0, k: [0.545, 0.424, 1, 1] }, o: { a: 0, k: 92 }, nm: 'fl' },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 45 }, o: { a: 0, k: 100 } },
          ],
          nm: 'core-gr',
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
    },
  ],
};

/**
 * Reproductor Lottie en el contenedor indicado.
 */
export function initLottie(container) {
  return lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: pulseAnimation,
  });
}
