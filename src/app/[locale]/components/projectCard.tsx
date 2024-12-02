"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProjectProps {
  project: {
    name: string;
    image: string;
    description: string;
    githubUrl: string;
  };
}
const ProjectCard = ({ project }: ProjectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("projects");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
          {project.name}
        </h3>

        <div className="mb-4">
          <p className={`text-gray-600 ${!isExpanded ? "line-clamp-3" : ""}`}>
            {project.description}
          </p>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-500 hover:text-orange-600 text-sm mt-2 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                {t("show_less")} <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                {t("see_more")} <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
        >
          <Github className="w-5 h-5" />
          GitHub
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
