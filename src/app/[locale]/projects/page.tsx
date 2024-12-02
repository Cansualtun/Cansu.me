import { useTranslations } from "next-intl";
import ProjectCard from "../components/projectCard";



const ProjectsPage = () => {
    const t = useTranslations("projects")
    const projects = [
        {
          index: "0",
          name: t("budget_tracker.name"),
          description: t("budget_tracker.description"),
          image: "/assets/budgetTracker.png",
          githubUrl: "https://github.com/Cansualtun/BudgetTracker",
        },
        {
          index: "1",
          name: t("draggable_store.name"),
          description: t("draggable_store.description"),
          image: "/assets/draggable.png",
          githubUrl: "https://github.com/Cansualtun/DraggableStore",
        },
      ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-4 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-3">
            {t("my_project")}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {t("project_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
