# Documentación para desarrolladores — Rae

Mapa de la documentación técnica disponible para el programa web **Rae**.
Generado el 2026-10-13 a partir de los repositorios clonados y las dependencias instaladas.

---

## 📦 Qué está instalado en este proyecto

| Tipo | Item | Versión / Origen |
|---|---|---|
| npm | `three` (3D WebGL/WebGPU) | ^0.186.1 |
| npm | `pixi.js` (2D WebGL/WebGPU) | ^8.22.0 |
| npm | `lottie-web` (reproductor Lottie) | ^5.13.0 |
| Skill | `reverse-engineer-anything` + 3 skills REA | morluto/rea |
| Skill | `motion-design` (principios Disney para UI/motion) | LottieFiles/motion-design-skill |
| Skill | `text-to-lottie` (generar Lottie con agentes) | diffusionstudio/lottie |
| Skills | 26 skills PixiJS v8 (una por subsistema) | pixijs/pixijs |

Instaladas en `.agents/skills/` con symlinks a `.claude/skills/` y `agent/skills/`.
Lockfile: `skills-lock.json` (actualizable con `npx skills update`).

---

## 🧊 three.js — Animación 3D

- **Repo:** https://github.com/mrdoob/three.js
- **Docs oficiales:** https://threejs.org/docs/ · Manual: https://threejs.org/manual/
- **API reference local:** `~/three.js/docs/pages/` (1.658 páginas de API, formato `.html` + `.html.md` en Markdown)
- **Manual local:** `~/three.js/manual/pages/` (60 guías: fundamentos, cámaras, luces, animación, materiales, carga de modelos, VR, post-procesado, desempeño…)
- **Ejemplos ejecutables:** `~/three.js/manual/examples/` y `~/three.js/examples/`
- **Guía para LLMs:** `~/three.js/docs/llms.txt` y `llms-full.txt` (patrones correctos de código, import maps, buenas prácticas)

### Puntos de entrada del manual
| Tema | Página local |
|---|---|
| Fundamentos | `manual/pages/fundamentals.html` |
| Crear una escena | `manual/pages/creating-a-scene.html` |
| Sistema de animación | `manual/pages/animation-system.html` |
| Cargar modelos 3D (glTF/OBJ) | `manual/pages/loading-3d-models.html`, `load-gltf.html` |
| Luces | `manual/pages/lights.html` |
| Post-procesado | `manual/pages/how-to-use-post-processing.html` |
| VR | `manual/pages/how-to-create-vr-content.html` |

### Arranque rápido (patrón moderno según `llms.txt`)
```html
<script type="importmap">
{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js" } }
</script>
<script type="module">
  import * as THREE from 'three';
</script>
```
> ⚠️ No usar el patrón antiguo `<script src=".../three.min.js">` (r128).

---

## 🎨 PixiJS — Render 2D (pixel art, sprites, texto)

- **Repo:** https://github.com/pixijs/pixijs
- **Docs oficiales:** https://pixijs.com/8.x/guides
- **Ejemplos locales:** `~/pixijs/examples/` (sprites animados, partículas, filtros, assets, texto…)
- **Skills = documentación por subsistema** (instaladas en `.agents/skills/pixijs-*`):

| Skill | Tema |
|---|---|
| `pixijs` | Visión general |
| `pixijs-core-concepts` | Pipeline de render (WebGL/WebGPU/Canvas), render loop |
| `pixijs-application` | Construcción y ciclo de vida de `Application` |
| `pixijs-scene-*` | Container, Graphics, Sprite, Text, Mesh, ParticleContainer, GIF, DOM |
| `pixijs-assets` | Carga de assets, manifests, bundles |
| `pixijs-graphics` / `pixijs-blend-modes` / `pixijs-filters` | Dibujo, mezcla, filtros |
| `pixijs-events` / `pixijs-ticker` / `pixijs-math` | Interacción, frame loop, matemática |
| `pixijs-performance` | Optimización |
| `pixijs-migration-v8` | Guía de migración a v8 |
| `pixijs-accessibility`, `pixijs-color`, `pixijs-environments`, `pixijs-html-source`, `pixijs-custom-rendering`, `pixijs-create` | Temas especializados |

### Arranque rápido (PixiJS v8)
```ts
import { Application } from 'pixi.js';

const app = new Application();
await app.init({ background: '#1a1a2e', resizeTo: window });
document.body.appendChild(app.canvas);
```

---

## ✨ Lottie — Animación vectorial (estilo motion graphics)

| Recurso | Dónde |
|---|---|
| `lottie-web` (reproductor, npm) | instalado en el proyecto |
| Especificación Lottie | https://github.com/lottie/lottie-spec |
| Skill `text-to-lottie` | `.agents/skills/text-to-lottie/` — genera Lottie con agentes |
| Player incluido (Vite) | `~/lottie-diffusion/` — sirve `public/projects/<proyecto>/<escena>/lottie.json` con live-update |
| Guía de prompts | `~/lottie-diffusion/README.md` (5 reglas: anclar con assets, terminología de motion, cámara, controles, FPS/duración) |

### Recipes incluidos en la skill `text-to-lottie/references/`
Logos, tipografía, SVG animado, lower-thirds, promo de producto, diagramas técnicos, data/stats, loaders/iconos, transiciones, cámara.

### Uso en web (vanilla)
```html
<script src="node_modules/lottie-web/build/player/lottie.min.js"></script>
<div id="anim" style="width:600px;height:400px"></div>
<script>
  lottie.loadAnimation({
    container: document.getElementById('anim'),
    renderer: 'svg', loop: true, autoplay: true,
    path: 'animacion.json'
  });
</script>
```

---

## 🎬 Motion Design — Principios Disney aplicados a UI

- **Repo:** https://github.com/LottieFiles/motion-design-skill
- **Skill instalada:** `.agents/skills/motion-design/`
- **Contenido (documentación de diseño técnico):**
  - `SKILL.md` — checklist de 8 pasos, arquetipos de personalidad de motion, tablas de duración/easing
  - `director/disney-principles.md` — los 12 principios de Disney adaptados a UI
  - `director/core-philosophy.md`, `emotion-mapping.md`, `choreography.md`, `narrative-structure.md`
  - `patterns/` — recetas: entrada/salida, feedback de estados (éxito, error, loading, hover), motion ambiental, coreografía multi-elemento
  - `reference/` — selección de propiedades, tablas timing/easing, checklist de calidad, troubleshooting
- **Agnóstico de implementación:** funciona con CSS, GSAP, Framer Motion, Lottie, springs…

---

## 🔍 REA — Ingeniería inversa (análisis de apps y binarios)

- **Repo:** https://github.com/morluto/rea · Web: https://rea.tools/
- **Skills:** `.agents/skills/reverse-engineer-anything/` (+ rea-tool-design, rea-ci-tests-audit, rea-changelog-update)
- **Docs del proyecto:** `~/rea-morluto/docs/` (mcp-contracts, javascript-recovery, native-investigation, web-runtime, etc.)
- **CLI sin MCP:** `npx -y rea-agents@latest analyze-javascript-application /ruta/app --json`
- Sirve para estudiar cómo otras apps web implementan features y reconstruirlas en Rae.

---

## 🔗 Enlaces rápidos

| Documentación | URL |
|---|---|
| three.js Docs | https://threejs.org/docs/ |
| three.js Manual | https://threejs.org/manual/ |
| PixiJS Guides v8 | https://pixijs.com/8.x/guides |
| PixiJS API | https://pixijs.com/8.x/docs/ |
| Lottie spec | https://github.com/lottie/lottie-spec |
| LottieFiles dev | https://docs.lottiefiles.com/ |
| skills.sh (registro de skills) | https://skills.sh |
| REA | https://rea.tools/ |

> 📌 **Nota de red:** el sandbox solo tiene acceso a github.com, registry.npmjs.org y pypi.org.
> La documentación local clonada (`~/three.js`, `~/pixijs`, `~/lottie-diffusion`, `~/motion-design-skill`,
> `~/rea-morluto`) es la fuente principal; los enlaces externos funcionan desde tu navegador.
