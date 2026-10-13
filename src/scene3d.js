import * as THREE from 'three';

/**
 * Escena 3D de fondo: esfera orgánica + partículas con parallax de puntero.
 */
export function initScene3D(container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // --- Objeto central: knot con material físico ---
  const geometry = new THREE.TorusKnotGeometry(1.55, 0.52, 220, 36);
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#6c4dff'),
    metalness: 0.35,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.35,
    emissive: new THREE.Color('#2a1670'),
    emissiveIntensity: 0.55,
  });
  const knot = new THREE.Mesh(geometry, material);
  knot.position.set(2.35, 0.35, 0);
  scene.add(knot);

  // --- Luces ---
  scene.add(new THREE.AmbientLight(0x2a2450, 1.6));

  const keyLight = new THREE.DirectionalLight(0x9d7bff, 2.6);
  keyLight.position.set(4, 3, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x4ce0ff, 55, 30);
  rimLight.position.set(-5, -2, 3);
  scene.add(rimLight);

  const pinkLight = new THREE.PointLight(0xff6cc9, 35, 25);
  pinkLight.position.set(6, -3, -2);
  scene.add(pinkLight);

  // --- Campo de partículas ---
  const count = 900;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    speeds[i] = 0.15 + Math.random() * 0.55;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xb9a7ff,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // --- Interacción: parallax con puntero ---
  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    const t = clock.getElapsedTime();

    knot.rotation.x = t * 0.16;
    knot.rotation.y = t * 0.22;
    knot.position.y = 0.35 + Math.sin(t * 0.7) * 0.18;

    stars.rotation.y = t * 0.014;
    const pos = stars.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * 0.0045;
      if (pos[i * 3 + 1] > 8) pos[i * 3 + 1] = -8;
    }
    stars.geometry.attributes.position.needsUpdate = true;

    // Cámara con easing hacia el puntero
    camera.position.x += (pointer.x * 0.65 - camera.position.x) * 0.035;
    camera.position.y += (-pointer.y * 0.45 - camera.position.y) * 0.035;
    camera.lookAt(1.2, 0.2, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
