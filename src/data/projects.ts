// See src/assets/projects/README.md for how to add screenshots for a project.
import projectOneImg1 from "../assets/projects/project-one/image-1.png";
import projectOneImg2 from "../assets/projects/project-one/image-2.png";
import projectOneImg3 from "../assets/projects/project-one/image-3.png";
import projectTwoImg1 from "../assets/projects/project-two/image-1.png";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string; // stable id used in the URL: /projects/:slug

  // --- Card fields (used by ProjectStage — unchanged) ---
  title: string;
  description: string;
  tags: string[];

  // --- Detail-page-only fields ---
  longDescription: string; // fuller narrative — not a repeat of `description`
  role: string;
  techStack: string[];
  keyFeatures: string[];
  challenges?: string; // omit when there isn't a genuinely interesting story
  images?: ProjectImage[]; // omit to skip the gallery entirely
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    description:
      "A short, concrete description of what this project does and the problem it solves.",
    tags: ["TypeScript", "React", "Node"],

    longDescription:
      "Expand here on the real problem this project solves, who it's for, and why you built it. Two or three sentences is usually enough — this is the place for context the card's one-liner doesn't have room for.",
    role: "Sole developer — design, frontend, backend, and deployment.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    keyFeatures: [
      "Describe the first thing a user notices or relies on.",
      "Describe a second feature that required real engineering effort.",
      "Describe anything that makes this project distinct from a tutorial clone.",
    ],
    challenges:
      "Describe one genuinely tricky problem you solved and how — this is the part interviewers actually ask about.",
    // Placeholder screenshots — swap these for real ones (see assets/projects/README.md).
    images: [
      { src: projectOneImg1, alt: "Project One — placeholder screenshot 1" },
      { src: projectOneImg2, alt: "Project One — placeholder screenshot 2" },
      { src: projectOneImg3, alt: "Project One — placeholder screenshot 3" },
    ],
    liveUrl: "https://your-deployed-app.vercel.app",
    githubUrl: "https://github.com/yourhandle/project-one",
  },
  {
    slug: "project-two",
    title: "Project Two",
    description:
      "A short, concrete description of what this project does and the problem it solves.",
    tags: ["Go", "Postgres", "Docker"],

    longDescription:
      "Expand here on the real problem this project solves, who it's for, and why you built it.",
    role: "Backend developer, working with one other engineer on the frontend.",
    techStack: ["Go", "PostgreSQL", "Docker", "Redis"],
    keyFeatures: [
      "Describe the first thing a user notices or relies on.",
      "Describe a second feature that required real engineering effort.",
    ],
    // A single image — the gallery renders it without arrows/dots.
    images: [{ src: projectTwoImg1, alt: "Project Two — placeholder screenshot" }],
    githubUrl: "https://github.com/yourhandle/project-two",
  },
  {
    slug: "project-three",
    title: "Project Three",
    description:
      "A short, concrete description of what this project does and the problem it solves.",
    tags: ["Python", "FastAPI"],

    longDescription:
      "Expand here on the real problem this project solves, who it's for, and why you built it.",
    role: "Sole developer.",
    techStack: ["Python", "FastAPI", "SQLite"],
    keyFeatures: [
      "Describe the first thing a user notices or relies on.",
      "Describe a second feature that required real engineering effort.",
      "Describe a third, if there genuinely is one.",
    ],
    challenges:
      "Describe one genuinely tricky problem you solved and how.",
    liveUrl: "https://your-deployed-app.vercel.app",
    githubUrl: "https://github.com/yourhandle/project-three",
  },
  {
    slug: "project-four",
    title: "Project Four",
    description:
      "A short, concrete description of what this project does and the problem it solves.",
    tags: ["React Native", "GraphQL"],

    longDescription:
      "Expand here on the real problem this project solves, who it's for, and why you built it.",
    role: "Mobile developer.",
    techStack: ["React Native", "GraphQL", "Apollo"],
    keyFeatures: [
      "Describe the first thing a user notices or relies on.",
      "Describe a second feature that required real engineering effort.",
    ],
    githubUrl: "https://github.com/yourhandle/project-four",
  },
  {
    slug: "project-five",
    title: "Project Five",
    description:
      "A short, concrete description of what this project does and the problem it solves.",
    tags: ["TypeScript", "AWS"],

    longDescription:
      "Expand here on the real problem this project solves, who it's for, and why you built it.",
    role: "Sole developer — architecture and implementation.",
    techStack: ["TypeScript", "AWS Lambda", "DynamoDB"],
    keyFeatures: [
      "Describe the first thing a user notices or relies on.",
      "Describe a second feature that required real engineering effort.",
      "Describe anything that makes this project distinct.",
    ],
    challenges:
      "Describe one genuinely tricky problem you solved and how.",
    liveUrl: "https://your-deployed-app.vercel.app",
    githubUrl: "https://github.com/yourhandle/project-five",
  },
];
