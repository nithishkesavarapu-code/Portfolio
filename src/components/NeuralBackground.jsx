import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    const icons = [
      "/icons/react.png",
      "/icons/node.png",
      "/icons/python.png",
      "/icons/js.png",
      "/icons/tailwind.png",
    ];

    const particlesCount = 40;
    const sprites = [];
    const velocities = [];

    for (let i = 0; i < particlesCount; i++) {
      const texture =
        textureLoader.load(icons[i % icons.length]);

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });

      const sprite = new THREE.Sprite(material);

      sprite.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      sprite.scale.set(6, 6, 1);

      scene.add(sprite);
      sprites.push(sprite);

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      );
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
    });

    let mouse = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    function animate() {
      requestAnimationFrame(animate);

      scene.children = scene.children.filter(
        (obj) => obj.type !== "Line"
      );

      sprites.forEach((sprite, i) => {
        sprite.position.add(velocities[i]);

        ["x", "y", "z"].forEach((axis) => {
          if (Math.abs(sprite.position[axis]) > 50) {
            velocities[i][axis] *= -1;
          }
        });
      });

      for (let i = 0; i < sprites.length; i++) {
        for (let j = i + 1; j < sprites.length; j++) {
          const dist = sprites[i].position.distanceTo(
            sprites[j].position
          );

          if (dist < 20) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
              sprites[i].position,
              sprites[j].position,
            ]);

            const line = new THREE.Line(lineGeo, lineMaterial);
            scene.add(line);
          }
        }
      }

      camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 bg-black" />;
}