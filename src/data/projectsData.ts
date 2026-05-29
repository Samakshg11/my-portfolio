export type Project = {
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
  githubLink: string;
  description: string;
};

export const projects: Project[] = [
  {
    title: "Vital",
    category: "Real-Time Health Monitoring System",
    tools: "MongoDB, Express.js, React, Node.js, Socket.IO, REST APIs",
    image: "/images/vitalwatch.png",
    link: "https://health-monitor-p8jz.onrender.com",
    githubLink: "https://github.com/Samakshg11/health-monitor",
    description:
      "Tracks live health metrics with instant socket updates and clean monitoring dashboards.",
  },
  {
    title: "DevTinder",
    category: "Developer Networking Platform",
    tools: "MongoDB, Express.js, React, Node.js, JWT Auth, REST APIs",
    image: "/images/devtinder.png",
    link: "https://devtinder.site",
    githubLink: "https://github.com/Samakshg11/DevTinder-web",
    description:
      "Connects developers by skills and interests with smooth profile discovery and matching flows.",
  },
  {
    title: "QuickFix",
    category: "Real-Time Mechanic Finder",
    tools: "MongoDB, Express.js, React, Node.js, Socket.IO, JWT Auth",
    image: "/images/quickfix.png",
    link: "https://quickfix-client.onrender.com",
    githubLink: "https://github.com/Samakshg11/quickfix-client",
    description:
      "Helps users quickly find nearby mechanics, request support, and get updates in real time.",
  },
  {
    title: "YouTube Clone",
    category: "Video Streaming App",
    tools: "MongoDB, Express.js, React, Node.js, JWT Auth, REST APIs",
    image: "/images/youtube.png",
    link: "https://youtube-clone-459hed950-ssmaksh-gargs-projects.vercel.app",
    githubLink: "https://github.com/Samakshg11/youtube-clone",
    description:
      "A full-stack streaming experience with auth, upload flows, and dynamic feed interactions.",
  },
  {
    title: "TaskFlow",
    category: "Smarter Task Management",
    tools: "PHP, MySQL, JavaScript, HTML, CSS, Bootstrap",
    image: "/images/taskflow.png",
    githubLink: "https://github.com/Samakshg11/taskflow",
    description:
      "Organizes personal and team workflows with simple task tracking and productivity-focused UX.",
  },
];
