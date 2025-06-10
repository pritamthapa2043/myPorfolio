import React, { useState } from "react";

const Logo = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleMouseEnter = () => {
    const randomNum = Math.floor(Math.random() * 100);
    if (randomNum % 2 === 0) {
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed top-5 left-5 z-50">
      <a
        href="/"
        aria-label="Home"
        className="group relative flex items-center justify-center w-[60px] h-[60px] rounded-lg backdrop-blur-sm bg-white/10 overflow-visible"
        onMouseEnter={handleMouseEnter}
      >
        {/* Tooltip */}
        <h1 className="absolute left-0 top-1/2 translate-x-0 -translate-y-1/2 opacity-0 scale-90 group-hover:opacity-100 group-hover:translate-x-[80%] group-hover:scale-100 transition-all duration-500 ease-in-out text-white text-3xl font-semibold whitespace-nowrap pointer-events-none h-10 flex items-center">
          Pritam
          <img
            src="/assets/pritam.jpeg"
            alt="Pritam"
            className="absolute left-[calc(90%+1.5rem)] top-1/2 -translate-y-1/2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-in-out w-10 h-10 rounded-full object-cover pointer-events-none"
          />
        </h1>

        {/* Circular Image next to tooltip */}

        {/* SVG with conditional shake */}
        <img
          src="/assets/logos/triangle.svg"
          alt="Logo"
          className={`w-[40px] h-[30px] invert transition-transform duration-500 ease-in-out transform group-hover:rotate-90 group-hover:scale-150 ${
            isShaking ? "shake" : ""
          }`}
        />
      </a>
    </div>
  );
};

export default Logo;
