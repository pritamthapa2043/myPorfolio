import { lazy, Suspense, useRef } from "react";
import Card from "../components/Card/Card";
import { myTechStack } from "../constants";
import { useInView } from "framer-motion";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

const Astro = lazy(() => import("../components/Astro/Astro"));

const About = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const grid2Container = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: "0px 0px -10% 0px",
    once: false,
  });

  return (
    <section ref={ref} className="relative c-space section-spacing" id="about">
      <h2 className="text-heading text-center md:text-left">About Me</h2>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-4 mt-16">
        {/* Grid 1 */}
        <div className="flex flex-col justify-end p-6 relative overflow-hidden row-span-4 md:col-span-3 h-[20rem] md:h-full bg-gradient-to-b from-gray-800 to-gray-950 rounded-2xl">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext text-lg sm:text-xl">
              Hi, I'm Pritam Thapa - Module Lead
            </p>
            <p className="subtext text-sm sm:text-base">
              Full-stack Developer with 3 years of experience building scalable,
              real-time web applications using modern React/Node stacks. Focused
              on clean code architecture and performance-driven user experiences
              across the full development lifecycle.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>

        {/* Grid 2 */}
        <div className="p-4 relative overflow-hidden rounded-2xl bg-gradient-to-b from-storm to-indigo row-span-2 md:col-span-3 h-[20rem] md:h-full flex flex-col items-center justify-center">
          <p className="text-3xl sm:text-5xl text-gray-500 text-center mb-4">
            CODE IS CRAFT
          </p>
          <div className="relative w-full h-full hidden sm:block">
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
        <div className="relative overflow-hidden rounded-2xl row-span-2 md:col-span-2 h-[20rem] md:h-full bg-gradient-to-b from-gray-800 to-gray-950">
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
                  <Astro visible={inView} />
                </Float>
              )}
            </Suspense>
            <OrbitControls enablePan={false} />
          </Canvas>
        </div>

        {/* Grid 4 - Timezone */}
        <div className="grid-default-color row-span-1 md:col-span-1 p-4 flex flex-col justify-center rounded-2xl">
          <p className="text-lg font-semibold mb-2">My Time Zone</p>
          <div className="flex items-center space-x-2 text-indigo-300">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {isMobile && <span>India Standard Time (IST)</span>}
            <span className="text-sm">UTC +5:30</span>
          </div>
        </div>

        {/* Grid 4 - Resume */}
        <div className="grid-default-color row-span-1 md:col-span-1 p-4 flex flex-col justify-center rounded-2xl">
          <p className="text-lg font-semibold mb-2 text-white">Resume</p>
          <div className=" flex flex-col items-center justify-center">
            <a
              href="/public/assets/resume/PritamThapa-Resume.pdf"
              download
              className="download-button w-fit "
            >
              <HiOutlineDocumentDownload className="w-5 h-5" />
              <h1>{isMobile && "Download Resume"}</h1>
            </a>
          </div>
        </div>

        {/* Grid 5 */}
        <div className="grid-gray-color row-span-1 md:col-span-6 p-4 rounded-2xl">
          <p className="text-lg font-semibold mb-2">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-4 p-2">
            {myTechStack.map(({ name, Icon, color }) => (
              <div
                key={name}
                className="flex flex-col items-center w-16 sm:w-20"
              >
                <Icon size={35} color={color} />
                <span className="mt-2 text-xs text-center text-neutral-300">
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
