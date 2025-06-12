import { lazy, Suspense, useRef } from "react";
import Card from "../components/Card/Card";
import { myTechStack } from "../constants";
import { useInView } from "framer-motion";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";

const LazyModel = lazy(() => import("../components/Astro/Astro"));

const About = () => {
  const grid2Container = useRef<HTMLDivElement>(null);

  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: "0px 0px -10% 0px",
    once: false,
  });
  return (
    <section
      ref={ref}
      className="relative c-space section-spacing  "
      id="about"
    >
      <h2 className="text-heading">About Me</h2>

      <div className="relative grid grid-cols-4 gap-4 md:grid-cols-6 md:grid-rows-4 mt-16">
        {/* Grid 1 */}
        <div className="flex items-end grid-gray-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Pritam Thaoa - Module Lead</p>
            <p className="subtext">
              Full-stack Developer with 3 years of experience building scalable,
              real-time web applications using modern React/Node stacks. Focused
              on clean code architecture and performance-driven user experiences
              across the full development lifecycle.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="GRASP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="SRP"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-3">
          <figure
            className="absolute inset-0"
            style={{ width: "100%", height: "100%" }}
          >
            <Canvas camera={{ position: [0, 1, 3] }}>
              <ambientLight intensity={3} />
              <Stars
                radius={50}
                depth={50}
                count={500}
                factor={3}
                saturation={0}
                fade
                speed={1}
              />
              <Suspense fallback={null}>
                {inView && (
                  <Float>
                    <LazyModel visible={inView} />
                  </Float>
                )}
              </Suspense>
              <OrbitControls enablePan={false} />
            </Canvas>
          </figure>
        </div>

        {/* Grid 4 */}
        <div className="grid-default-color grid-4 ">
          <p className="text-xl  mb-4">My Time Zone</p>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              {/* <p className="text-lg font-medium">India Standard Time (IST)</p> */}
              <p className="text-sm text-indigo-300">UTC +5:30</p>
            </div>
          </div>
        </div>

        {/* Grid 4 */}
        <div className="grid-default-color grid-4">
          <p className="text-xl  mb-4 text-white">Resume</p>
          <a
            href="/assets/Pritam_Thapa_Resume.pdf"
            download
            className="download-button"
          >
            <span>
              <HiOutlineDocumentDownload className="w-6 h-6" />
            </span>
            {/* <span className="text-base  font-medium">Download Resume</span> */}
          </a>
        </div>

        {/* Grid 5 */}
        <div className="grid-gray-color grid-5">
          <p className="text-xl  mb-2 text-white">Tech Stack</p>
          <div className="flex  justify-center gap-8 p-4">
            {myTechStack.map(({ name, Icon, color }) => (
              <div key={name} className="flex flex-col items-center w-20">
                <Icon size={45} color={color} />
                <span className="mt-2 text-xs text-center text-neutral-300 ">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
