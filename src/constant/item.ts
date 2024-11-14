interface Experience {
  key: string;
  period: string;
  company: string;
  description: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    key: "hexaworks",
    period: "2024",
    company: "Hexaworks",
    description: "hexaworks.description",
    technologies: [
      "Micro Frontend",
      "Typescript",
      "Javascript",
      "HTML",
      "CSS",
      "TailwindCss",
      "ReactJs",
      "NextJs",
      "Mantine",
      "Ant Design",
    ],
  },
  {
    key: "primetech",
    period: "2022 - 2023",
    company: "PrimeTech",
    description: "primetech.description",
    technologies: [
      "Typescript",
      "Javascript",
      "HTML",
      "CSS",
      "TailwindCss",
      "ReactJs",
      "NextJs",
      "Material UI",
      "Ant Design",
    ],
  },
  {
    key: "kolayyolculuk",
    period: "2022",
    company: "Kolay Yolculuk",
    description: "kolayyolculuk.description",
    technologies: ["Javascript", "HTML", "CSS", "Bootstrap", "React"],
  },
];

export default experiences;
