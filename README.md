# Rae ◆

**Programa web de animación** — un solo lienzo que combina tres lenguajes de movimiento:

- **🧊 Motor 3D** — escena WebGL en tiempo real con [three.js](https://github.com/mrdoob/three.js) (materiales físicos, luces, partículas y parallax con el puntero)
- **👾 Pixel art vivo** — sprite procedural animado con [PixiJS v8](https://github.com/pixijs/pixijs) y rastro de partículas
- **✨ Motion design** — animación vectorial [Lottie](https://github.com/lottie/lottie-spec) con los principios de Disney aplicados a interfaces

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo (Vite) → http://localhost:5173
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
```

## Estructura

```
index.html          página principal (español)
src/scene3d.js      escena 3D de fondo (three.js)
src/pixel.js        sprite pixel art (PixiJS)
src/lottiefx.js     animación Lottie (lottie-web)
src/main.js         arranque y animaciones de scroll
docs/               documentación para desarrolladores
.agents/skills/     skills de agentes (PixiJS, motion-design, text-to-lottie, REA)
```

## Stack

`three` · `pixi.js` · `lottie-web` · `Vite`

📚 Guía técnica completa: [docs/desarrolladores.md](docs/desarrolladores.md)

## ORCID

ORCID: [0009-0003-9884-8666](https://orcid.org/0009-0003-9884-8666)
