import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import IntroText from "../components/IntroText/IntroText";
import ParallaxBackground from "../components/ParallaxBackground/ParallaxBackground";
import { Model } from "../components/Model/Model";

const Intro = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <IntroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={3} />
          <Suspense fallback={null}>
            <Float>
              <Model
                scale={isMobile && 0.7}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x / 5, 1 + state.pointer.y / 5, 3],
      0.5,
      delta
    );
  });
}

export default Intro;
