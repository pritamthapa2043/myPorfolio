import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiExpress,
  SiNodedotjs,
  SiThreedotjs,
  SiGit,
  SiSocketdotio,
  SiCss3,
  SiTailwindcss,
} from "react-icons/si";

export const myProjects = [
  {
    id: 1,
    title: "TIC TAC TOE",
    description: "A lightweight game.",
    subDescription:
      "An interactive, real-time Tic-Tac-Toe game with online multiplayer support. Built with React, WebSocket, and PostgreSQL, it allows players to join or create private game rooms, play competitively, and view a live leaderboard showcasing player rankings, wins, losses, and draws. The game features smooth animations, responsive design, and real-time synchronization between players for a seamless experience.",

    isViewProject: true,
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        Icon: SiReact,
      },
      {
        id: 2,
        name: "Typescript",
        Icon: SiTypescript,
      },
      {
        id: 3,
        name: "WebScoket",
        Icon: SiSocketdotio,
      },
      {
        id: 4,
        name: "Express",
        Icon: SiExpress,
      },
      {
        id: 5,
        name: "PostgreSQL",
        Icon: SiPostgresql,
      },
      {
        id: 6,
        name: "Git",
        Icon: SiGit,
      },
    ],
  },
  {
    id: 2,
    title: "BIM (Building Information Modeling)",
    description: "A Web Application.",
    subDescription:
      "BIM is a digital representation of a building’s physical and functional characteristics, used to visualize asset placement, support maintenance, and ensure spatial coordination throughout construction and operation.",
    nda: "(Work done under NDA at Sonicbolt Technologies LLP. Details simplified for confidentiality.)",
    isViewProject: false,
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        Icon: SiReact,
      },
      {
        id: 2,
        name: "Typescript",
        Icon: SiTypescript,
      },
      {
        id: 3,
        name: "Three.js",
        Icon: SiThreedotjs,
      },
      {
        id: 4,
        name: "React Three Fiber",
      },
      {
        id: 5,
        name: "GSAP",
      },
      {
        id: 6,
        name: "Express",
        Icon: SiExpress,
      },
      {
        id: 7,
        name: "PostgreSQL",
        Icon: SiPostgresql,
      },
      {
        id: 8,
        name: "Git",
        Icon: SiGit,
      },
    ],
  },
  {
    id: 3,
    title: "Asset Management",
    description: "A Web Application.",
    subDescription:
      "A secure, scalable platform for tracking physical assets with real-time updates. Features include inventory management, audit logs, reporting, and role-based access control. Built with React, Express.js, and PostgreSQL for robust data integrity, with SSE (Server-Sent Events) and WebSocket for live tracking and notifications. Optimized for performance and real-time analytics.",
    nda: "(Work done under NDA at Sonicbolt Technologies LLP. Details simplified for confidentiality.)",
    isViewProject: false,
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        Icon: SiReact,
      },
      {
        id: 2,
        name: "Typescript",
        Icon: SiTypescript,
      },
      {
        id: 3,
        name: "WebScoket",
        Icon: SiSocketdotio,
      },
      {
        id: 4,
        name: "Express",
        Icon: SiExpress,
      },

      {
        id: 5,
        name: "PostgreSQL",
        Icon: SiPostgresql,
      },
      {
        id: 6,
        name: "Git",
        Icon: SiGit,
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
    job: "BIM (Building Information Modeling)",
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
  { name: "CSS", Icon: SiCss3, color: "#1572B6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", Icon: SiExpress, color: "#FFFFFF" },
  { name: "Socket.IO", Icon: SiSocketdotio, color: "#FFFFFF" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "React Three Fiber", Icon: SiThreedotjs, color: "#FFFFFF" },
];
