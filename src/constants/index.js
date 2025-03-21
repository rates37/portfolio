import {
  byoe,
  monash,
  mdn,
  viziou,
  uniplan,
  mips_tester,
} from "../assets/images";
import {
  github,
  react,
  typescript,
  C,
  cpp,
  python,
  verilog,
  go,
  matlab,
  pytorch,
  rxjs,
  tensorflow,
  threejs,
  linkedin,
} from "../assets/icons";

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
      imageUrl: go,
      name: "Go",
    },
    {
      imageUrl: matlab,
      name: "MATLAB",
    },
  ],
  frameworks: [
    {
      imageUrl: react,
      name: "React",
    },
    {
      imageUrl: pytorch,
      name: "PyTorch",
    },
    {
      imageUrl: rxjs,
      name: "RxJS",
    },
    {
      imageUrl: tensorflow,
      name: "TensorFlow",
    },
    {
      imageUrl: threejs,
      name: "ThreeJS",
    },
  ],
};

export const experiences = [
  {
    title: "Teaching Associate (Engineering, Computer Science)",
    company_name: "Monash University",
    icon: monash,
    iconBg: "#48ACF4",
    date: "Jan 2022 - Dec 2024",
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

  {
    title: "Deputy Unit Coordinator",
    company_name: "Monash University",
    icon: monash,
    iconBg: "#48ACF4",
    date: "Jan 2025 - Present",
    points: [
      "Coordinated and <b>streamlined communication</b> between teaching staff, students, and administrative staff, ensuring effective dissemination of information.",
      "Managed the <b>onboarding and mentoring</b> of new academic staff, ensuring they were well-equipped for duties.",
      "Analysed feedback and implemented improvements to ensure increased student satisfaction and engagement.",
    ],
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/rates37",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/satya-jhaveri-4a31b4288/",
  },
];

export const projects = [
  {
    iconUrl: mips_tester,
    theme: "btn-back-pink",
    name: "MIPS Tester",
    description:
      "Designed and implemented a Python library to support the automated testing / unittesting of MIPS assembly programs and subroutines.",
    links: [
      {
        linkText: "GitHub",
        link: "https://github.com/rates37/mips-tester",
      },
    ],
  },
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
        link: "https://rates37.github.io/build_your_own_embedding/",
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
      "Developed a course planning tool for Monash University students due to a period of downtime in the university's official course planning tool.",
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

export const socials = {
  github: {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/rates37",
  },
  linkedin: {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/satya-jhaveri-4a31b4288/",
  },
};

export const recentWork = [
  {
    title: "Build Your Own Embedding",
    desc: "Python library for generating synthetic neural responses",
    link: "/projects",
  },
  {
    title: "Viziou",
    desc: "Web tool for calculating & visualizing IoU for 2D/3D convex polytopes",
    link: "/projects",
  },
  {
    title: "Mips Test Library",
    desc: "Python library for automating tests of MIPS assembly programs",
    link: "/projects",
  },
];
