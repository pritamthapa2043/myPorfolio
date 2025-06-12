import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { lazy, Suspense, useRef } from "react";
import IntroText from "../components/IntroText/IntroText";
import ParallaxBackground from "../components/ParallaxBackground/ParallaxBackground";

import { useInView } from "framer-motion";
const LazyModel = lazy(() => import("../components/HotAirBallon/HotAirBallon"));

interface RigProps {
  active?: boolean;
}

const Intro = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: "0px 0px -10% 0px",
    once: false,
  });

  return (
    <section
      ref={ref}
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      <IntroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={3} />
          <Suspense fallback={null}>
            {inView && (
              <Float>
                <LazyModel
                  scale={isMobile && 0.7}
                  position={isMobile && [0, -1.5, 0]}
                  visible={inView}
                />
              </Float>
            )}
            <Rig active={inView} />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

const Rig: React.FC<RigProps> = ({ active = true }) => {
  useFrame((state, delta) => {
    if (!active) return;

    easing.damp3(
      state.camera.position,
      [state.pointer.x / 5, 1 + state.pointer.y / 5, 3],
      0.5,
      delta
    );
  });

  return null;
};

export default Intro;
