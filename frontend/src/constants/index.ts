import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiExpress,
  SiNodedotjs,
  SiThreedotjs,
  SiGit,
  SiJira,
  SiSocketdotio,
} from "react-icons/si";

export const myProjects = [
  {
    id: 3,
    title: "TIC TAC TOE",
    description: "A lightweight game.",
    subDescription: [
      "Built a powerful rendering engine using OpenGL and C++.",
      "Developed a physics engine with collision detection and particle effects.",
      "Implemented a scripting system for easy game customization.",
      "Optimized performance with multi-threading and efficient memory management.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/cplusplus.svg",
      },
      {
        id: 2,
        name: "Typescript",
        path: "/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "WebScoket",
        path: "/assets/logos/git.svg",
      },
      {
        id: 4,
        name: "Express",
        path: "/assets/logos/git.svg",
      },
      {
        id: 5,
        name: "PostgreSQL",
        path: "/assets/logos/git.svg",
      },
      {
        id: 6,
        name: "Git",
        path: "/assets/logos/microsoft.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/pritam-thapa-20731614b/",
    icon: "/assets/socials/linkedIn.svg",
  },
];

export const experiences = [
  {
    company: "SonicBolt Technologies LLP",
    title: "Software Developer",
    job: "BIM (Building Integration Modeling)",
    date: "2021-2022",
    contents: [
      "Enhanced application security and developed new features, adhering to standards set by the Passive Defense Organization and National Cyberspace Center.",
      "Designed and implemented intuitive map interfaces using MapsUI, enhancing user experience and enabling seamless interactive map integration.",
      "Developed applications for industrial automation, leveraging C++ and the Fatek API for PLC communication.",
      "Enhanced responsiveness and usability of applications using Windows Forms and WPF frameworks.",
      "Executed XML to SVG conversions using X-DOM, ensuring dynamic and efficient data visualization.",
    ],
  },
  {
    company: "SonicBolt Technologies LLP",
    title: "Fullstack Developer",
    job: "Asset Management",
    date: "2023-Present",
    contents: [
      "Engineered systems for large-scale data ingestion and analysis, ensuring efficient data processing and storage.",
      "Developed back-end systems enabling vehicle-to-cloud communication for telemetry, diagnostics, and remote control:",
      "✅ Implemented secure APIs, following ISO 26262 automotive safety standards.",
      "✅ Ensured data privacy for customers and partners through industry-compliant protocols.",
      "✅ Delivered remote features like over-the-air updates, real-time tracking, and remote start capabilities.",
    ],
  },
];

export const myTechStack = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#61DAFB" },
  { name: "Express.js", Icon: SiExpress, color: "#FFFFFF" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Socket.IO", Icon: SiSocketdotio, color: "#FFFFFF" },
  { name: "three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Jira", Icon: SiJira, color: "#0052CC" },
];
