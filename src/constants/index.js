import { byoe, monash, mdn, viziou, uniplan } from "../assets/images";
import {
  css,
  git,
  github,
  html,
  javascript,
  mongodb,
  nextjs,
  nodejs,
  react,
  tailwindcss,
  typescript,
  C,
  cpp,
  python,
  verilog,
} from "../assets/icons";

export const skills = [
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },
  //todos:
  /* 
  C, C++, Java, Verilog, Python, MATLAB, Go, PyTorch, RxJS, NumPy
  */
];

export const skillMap = {
  languages: [
    {
      imageUrl: typescript,
      name: "TypeScript",
    },
    {
      imageUrl: C,
      name: "C",
    },
    {
      imageUrl: cpp,
      name: "C++",
    },
    {
      imageUrl: python,
      name: "Python",
    },
    {
      imageUrl: verilog,
      name: "Verilog",
    },
    {
      imageUrl: typescript,
      name: "Go",
    },
    {
      imageUrl: typescript,
      name: "MATLAB",
    },


  ],
  frameworks: [
    {
      imageUrl: react,
      name: "React",
    },
    {
      imageUrl: react,
      name: "PyTorch",
    },
    {
      imageUrl: react,
      name: "RxJS",
    },
    {
      imageUrl: react,
      name: "TensorFlow",
    },
    {
      imageUrl: react,
      name: "ThreeJS",
    },
    {
      imageUrl: react,
      name: "React",
    },


  ],
};

export const experiences = [
  {
    title: "Teaching Associate (Engineering, Computer Science)",
    company_name: "Monash University",
    icon: monash,
    iconBg: "#48ACF4",
    date: "Jan 2022 - Present",
    points: [
      `Provided <b>academic support</b> to students across a range of settings, including via helpdesks, forums, workshops
      and in person laboratory classes`,
      `<b>Managed</b> teams of 2-5 student engineers as they undertook a range of electronics, embedded systems, and software based projects`,
      `<b>Graded</b> and <b>provided feedback</b> to student assignments, presentations, and work, to assist in their academic development.`,
    ],
  },

  {
    title: "AI Engineer",
    company_name: "Deep Neuron",
    icon: mdn,
    iconBg: "#8F88F7",
    date: "Aug 2022 - Present",
    points: [
      `Designed and implemented <b>Deep Q-Learning</b> algorithms to autonomously pilot drones in simulation environment.`,
      `Enhanced <b>accuracy</b> of deep-learning models for morphology analysis using <b>Wavelet Transforms</b>`,
      `Implemented <b>novel GAN architectures</b> for generating musical audio melodies`,
      `Developed an <b>intuitive web-interface</b> to integrate robot arm camera with a <b>NeRF-based 3D digitisation system</b>, 
      using Flask and ThreeJS for seamless collaboration.`,
      "Facilitated and participated in <b>code reviews</b> and providing <b>constructive feedback</b> to fellow developers.",
    ],
  },

  {
    title: "Developer",
    company_name: "Monash University",
    icon: monash,
    iconBg: "#48ACF4",
    date: "Jul 2022 - Present",
    points: [
      `Designed a sophisticated <b>automated testing system</b>, enabling SSH access to remote virtual machines, 
      comprehensive <b>program evaluation</b>, and streamlined <b>feedback reporting</b>.`,
      `Assisted in the design, development and optimisation of <b>scalable teaching</b> tools and delivery.`,
      `<b>Authored</b> comprehensive lessons on programming (C, C++, MIPS), digital systems (Verilog, digital circuits), probability, 
      and neural networks, ensuring <b>clarity</b> and <b>engagement</b> for diverse audiences.`,
      `<b>Researched</b> and <b>designed</b> innovative activities and <b>projects</b> for programming, digital and embedded systems, 
      and smart engineering systems.`,
      `<b>Designed</b> and implemented an <b>extensive testing framework</b> for the MIPS assembly language, streamlining the testing 
      process and ensuring exhaustive evaluation.`,
    ],
  },

  {
    title: "Recruitment Officer",
    company_name: "Deep Neuron",
    icon: mdn,
    iconBg: "#8F88F7",
    date: "Dec 2023 - Nov 2024",
    points: [
      "Reviewed applications of potential recruits to the organisation's <b>Artificial Intelligence</b> branch.",
      "Conducted <b>technical interviews</b> with potential members, focusing on <b>machine learning</b> concepts and <b>interpersonal skills</b>.",
    ],
  },
];

// export const socialLinks = [
//   {
//     name: "Contact",
//     iconUrl: contact,
//     link: "/contact",
//   },
//   {
//     name: "GitHub",
//     iconUrl: github,
//     link: "https://github.com/rates37",
//   },
//   {
//     name: "LinkedIn",
//     iconUrl: linkedin,
//     link: "https://www.linkedin.com/in/satya-jhaveri-4a31b4288/",
//   },
// ];

export const projects = [
  {
    iconUrl: byoe,
    theme: "btn-back-green",
    name: "Build Your Own Embedding",
    description:
      "Designed and currently maintain a Python library to support the generation and analysis of synthetic neural responses, in order to assist with neuroscience research.",
    links: [
      {
        linkText: "GitHub",
        link: "https://github.com/rates37/Build-Your-Own-Embedding",
      },
      {
        linkText: "PyPI",
        link: "https://pypi.org/project/BuildYourOwnEmbedding/",
      },
      {
        linkText: "Docs",
        link: "https://rates37.github.io/build_your_own_embedding/BuildYourOwnEmbedding.html/",
      },
    ],
  },
  {
    iconUrl: viziou,
    theme: "btn-back-red",
    name: "Viziou",
    description:
      "Created an online a tool for calculating and visualising the Intersection over Union (IoU) metric for 2D and 3D convex polytopes.",
    links: [
      {
        linkText: "Live Site",
        link: "https://viziou.com",
      },
      {
        linkText: "GitHub",
        link: "https://github.com/viziou/viziou/",
      },
    ],
  },
  {
    iconUrl: uniplan,
    theme: "btn-back-blue",
    name: "uniplan",
    description:
      "Developed a course planning tool for Monash University students in a period due to a period of downtime in the university's official course planning tool.",
    links: [
      {
        linkText: "Live Site",
        link: "https://rates37.github.io/uniplan/",
      },
      {
        linkText: "GitHub",
        link: "https://github.com/rates37/uniplan/",
      },
    ],
  },
];
