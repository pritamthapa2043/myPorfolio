import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiExpress,
  SiNodedotjs,
  SiThreedotjs,
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
    nda: "🚧 Work In Progress: Hosting Server for Online mode, User Login and User Register",
    isViewProject: true,
    navigate: "/game/tictactoe",
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
    navigate: "",
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
        name: "R3F",
      },
      {
        id: 6,
        name: "Express",
        Icon: SiExpress,
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
    navigate: "",
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
    id: 1,
    company: "SonicBolt Technologies LLP",
    title: "Fullstack Developer",
    date: "2021-Present",
    contents: [
      {
        id: 1,
        projectName: "Asset Management",
        work: [
          "Led end-to-end development of Asset Management module, including REST API design, database schema, and interactive React UI deployment",
          "Reduced query latency by 60% by designing optimized PostgreSQL data models, REST APIs, and indexing strategies",
          "Developed WebSocket APIs for real-time CSV import of over 2,000 assets data with live progress tracking",
          "Developed core UI framework with 10+ reusable components (tables, filters, export tools, CSV importers). adopted across multiple modules",
          "Conducted rigorous load testing using JMeter, validating system stability and performance under load (200+ concurrent users).",
        ],
      },
      {
        id: 2,
        projectName: "BIM (Building Information Modeling)",
        work: [
          "Led the end-to-end development of the BIM module, including REST API design, database schema, and interactive React UI deployment",
          "Developed interactive 3D model visualization within the React application using React Three Fiber (R3F) and Three.js.",
          "Optimized 3D model loading through LOD techniques and mesh compression, improving render speed by 45%",
        ],
      },
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
