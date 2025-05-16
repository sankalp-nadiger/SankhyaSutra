import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Sankalp Nadiger",
  initials: "SN",
  location: "Mysuru, Karnataka, India",
  locationLink: "https://www.google.com/maps/place/Mysuru",
  description:
    "Engineering Student with a passion for learning and innovation. I thrive on solving problems and crafting elegant solutions.",
  summary:
    "I am a passionate software enthusiast on a perpetual journey of learning and innovation. I thrive on the excitement of solving problems and crafting elegant solutions that transcend traditional boundaries. From crafting scalable architectures to tackling complex algorithmic challenges, I thrive on solving problems and pushing boundaries.",
  avatarUrl: "/me.jpg",
  skills: [
    "NLP",
    "Node.js",
    "Express.js",
    "React",
    "MongoDB",
    "Java",
    "Python",
    "C",
    "JavaScript",
    "Git & GitHub",
    "Team Management",
    "Leadership",
    "Communication",
    "Collaboration",
    "Graphic Design",
    "Project Management",
    "Blockchain",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "sankalp.nss@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sankalp-nadiger",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sankalpnad003/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:sankalp.nss@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  education: [
    {
      school: "JSS Science & Technology University (SJCE)",
      href: "https://www.jssstuniv.in/#/",
      degree: "Bachelor of Engineering, Computer Science",
      logoUrl: "/jssstu.png",
      start: "2022",
      end: "2026 (expected)",
      description: "Grade: 9.26 (up to 4th semester)"
    },
    {
      school: "Vidyavardhaka Golden Jubilee PU College",
      href: "#",
      degree: "KSEEB, PCMC",
      logoUrl: "/vvs.jpg",
      start: "2020",
      end: "2022",
      description: "Grade: 96%, KCET Rank: 2010"
    }
  ],
  
  projects: [
    {
      title: "MindFull",
      href: "https://mindfullweb.netlify.app",
      dates: "2024",
      active: true,
      // video: "/mindfull.mp4",
      description:
        "A comprehensive mental health support platform designed to help students, parents, and educators foster better mental well-being through personalized content, peer support, and professional guidance from counselors. Features include real-time group chats, in-app video consultation, AI-assisted journal writing, vision board creation & to-do-list maker.",
      technologies: [
        "React",
        "Node.js",
        "AI",
        "Mental Health"
      ],
      links: [
        {
          type: "Website",
          href: "https://mindfullweb.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sankalp-nadiger/MindFull",
          icon: <Icons.github className="size-3" />,
        },
      ]
    },
    {
      title: "VoxBiz",
      href: "https://voxbiz-demo.netlify.app",
      dates: "2024",
      active: true,
      video: "/voxbiz.mp4",
      description:
        "A GenAI-powered analytics platform enabling non-technical users to query PostgreSQL databases using natural language and visualize real-time data through interactive charts. Built with React, Node.js, Express, and NLP-driven query generation, featuring voice input, query history, rule management, and guided customization for enhanced decision-making of executives & managers.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "NLP",
        "GenAI"
      ],
      links: [
        {
          type: "Website",
          href: "https://voxbiz-demo.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sankalp-nadiger/voxbiz",
          icon: <Icons.github className="size-3" />,
        },
      ]
    },
    {
      title: "CineGenie",
      href: "https://cinegenie-demo.netlify.app",
      dates: "2023",
      active: true,
      description:
        "An AI-powered movie recommendation platform that suggests personalized films based on mood, preferences, and viewing history. Features include custom watchlists, social sharing, and content discovery across multiple streaming platforms in one unified interface.",
      technologies: [
        "React",
        "Node.js",
        "Machine Learning",
        "Recommendation Engine"
      ],
      links: [
        {
          type: "Website",
          href: "https://cinegenie-demo.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sankalp-nadiger/CineGenie",
          icon: <Icons.github className="size-3" />,
        },
      ]
    },
    {
      title: "FoodLoop",
      href: "https://foodloopweb.netlify.app",
      dates: "2024",
      active: true,
      video: "/foodloopdemo.mov",
      description:
        "An AI-powered, blockchain-enabled food donation platform that enables real-time food recovery, transparency, and impact reporting. It connects donors, NGOs, and volunteers through smart logistics, packaging, and disposal suggestions—aligned with 5 UN SDGs.",
      technologies: [
        "AI",
        "Blockchain",
        "Food Recovery",
        "Sustainability"
      ],
      links: [
        {
          type: "Website",
          href: "https://foodloopweb.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sankalp-nadiger/FoodLoop",
          icon: <Icons.github className="size-3" />,
        },
      ]
    },
    {
      title: "SpendWise",
      href: "https://spendwiseweb.netlify.app",
      dates: "2023",
      active: true,
      description:
        "A MERN-based expense tracker with interactive dashboards, Telegram Ping support, and Face Authentication—designed for both individual users and organizations to manage expenses, budgets, and audits efficiently.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Face Authentication"
      ],
      links: [
        {
          type: "Website",
          href: "https://spendwiseweb.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sankalp-nadiger/SpendWise",
          icon: <Icons.github className="size-3" />,
        },
      ]
    },
    {
      title: "FitFull",
      href: "https://fitfull.netlify.app",
      dates: "2023",
      active: true,
      description:
        "A smart healthcare management system that ensures seamless access to personal medical records and family sharing with MFA, real-time health tracking, and AI-powered disease predictions. It integrates wearable devices, telemedicine, and AI models to enhance patient care.",
      technologies: [
        "Healthcare",
        "AI",
        "MFA",
        "Telemedicine" 
      ],
      links: [
        {
          type: "Website",
          href: "https://fitfull.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/sankalp-nadiger/fitfull",
          icon: <Icons.github className="size-3" />,
        },
      ]
    }
  ],
  
  experience: [
    {
      role: "Lead Organizer",
      organization: "HackElite '24 - Dept. of CS&E, JSSSTU",
      dates: "December 13-14, 2024",
      description: [
        "Led the successful organization of HackElite '24, a 24-hour national-level hackathon, managing planning, innovative promotion, and execution.",
        "Executed on-ground event management with 30+ volunteers, ensuring smooth operations, 100+ participant engagement, and additional activities during the event."
      ]
    },
    {
      role: "Innovation Lead",
      organization: "Developer Student Club & GDSC – JSSSTU",
      dates: "September 2024 - Present",
      description: [
        "Contributed to establishing and restructuring the club as the Lead & spearheaded the idealization and promotion of several events & workshops"
      ]
    },
    {
      role: "Event Coordinator",
      organization: "Developer Student Club & GDSC – JSSSTU",
      dates: "September 2023 - July 2024",
      description: [
        "Successfully organized DevFest 2023 with a diverse speaker lineup from Intel & OneAPI, resulting in 95% positive feedback from 300+ attendees",
        "Executed a large-scale cybersecurity event with 250+ attendees per day, spanning 3 days"
      ]
    },
    {
      role: "Event Management Lead",
      organization: "Project ReachOut",
      dates: "July 2023 - January 2025",
      description: [
        "Led the planning & execution of multiple events, including plantation & cleanup drives for which we received applause from the city corporation and fundraiser events for specially-abled kids"
      ]
    },
    {
      role: "Teacher-Volunteer",
      organization: "U&I",
      dates: "August 2023 - July 2024",
      location: "Mysuru, Karnataka",
      description: [
        "Dedicated to making a positive impact, I have volunteered with U&I, where we empower and educate disadvantaged children by teaching them English"
      ]
    }
  ],
  
  certifications: [
    {
      title: "Supervised Machine Learning: Regression & Classification",
      organization: "DeepLearning.AI: Coursera"
    },
    {
      title: "Python for Machine Learning & Data Science",
      organization: "Pierian Data: Udemy"
    },
    {
      title: "The Complete Python Bootcamp from Zero to Hero in Python",
      organization: "Udemy"
    }
  ],
  
 hackathons: [
  {
    title: "VVCE Infothon 4.0",
    result: "Winner",
    dates: "February 2025",
    location: "Mysuru, Karnataka",
    description: "Built a blockchain-powered transparency platform for charitable donations with real-time impact tracking",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/FitFull",
      },
    ],
  },
  {
    title: "Symbiot Hackathon 2025",
    dates: "April 2025",
    location: "Bengaluru, Karnataka",
    description: "Developed an IoT ecosystem for smart city waste management with predictive collection routes",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/AurisVue",
      },
    ],
  },
  {
    title: "Build India Hackathon",
    result: "Top 10 Finalist",
    dates: "March 2025",
    location: "New Delhi, Delhi",
    description: "Created a rural education platform connecting remote students with urban mentors through low-bandwidth solutions",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/build-india-education",
      },
    ],
  },
  {
    title: "Vertex Innovate 2025",
    result: "Top 5 Qualifier",
    dates: "February 2025",
    location: "Chennai, Tamil Nadu",
    description: "Developed an AI-powered accessibility tool for visually impaired users to navigate digital interfaces",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/vertex-accessibility",
      },
    ],
  },
  {
    title: "Sastra Daksh 2025",
    result: "Top 5 Qualifier",
    dates: "January 2025",
    location: "Thanjavur, Tamil Nadu",
    description: "Created a smart healthcare platform integrating wearable data with predictive analytics",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/sastra-healthtech",
      },
    ],
  },
  {
    title: "Sustain-AI-thon 2025, VIT Chennai",
    result: "Runner-Up",
    dates: "December 2024",
    location: "Chennai, Tamil Nadu",
    description: "Built an AI-powered solution for sustainable agriculture monitoring and optimization",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/MindFull",
      },
    ],
  },
  {
    title: "SJEC HackToFuture 3.0",
    result: "Participant",
    dates: "April 2025",
    location: "Mangaluru, Karnataka",
    description: "Worked on a real-time disaster response coordination platform with ML-based resource allocation",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/VoxBiz",
      },
    ],
  },
  {
    title: "KPRIET Hackxelerate",
    result: "Participant",
    dates: "April 2025",
    location: "Coimbatore, Tamil Nadu",
    description: "Developed an ML-based early disease detection system using wearable health data",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/FoodLoop",
      },
    ],
  },
  {
    title: "AIT Colossus 2.0",
    result: "Participant",
    dates: "April 2025",
    location: "Bengaluru, Karnataka",
    description: "Created an educational platform integrating AR/VR for immersive STEM learning",
    links: [
      {
        title: "Source",
        icon: <Icons.github className="size-3" />,
        href: "https://github.com/sankalp-nadiger/immersive-learning",
      },
    ],
  },
],
  
  awards: [
    {
      title: "Reliance Foundation Undergraduate Scholarship",
      date: "April 2023",
      organization: "Reliance Foundation Limited"
    }
  ],
  
  languages: [
    {
      language: "English",
      proficiency: "Fluent"
    },
    {
      language: "Kannada",
      proficiency: "Native"
    },
    {
      language: "Hindi",
      proficiency: "Conversational"
    }
  ]
} as const;