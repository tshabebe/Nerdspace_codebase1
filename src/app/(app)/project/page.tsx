import LeftNavbar from "@/components/navbar/left-navbar";
import MobileNavBar from "@/components/navbar/mobile-nav-bar";
import ProjectsPage from "@/components/project/project-component";

const Project = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-row items-start">
      <LeftNavbar />
      <div className="my-5 min-h-fit flex-1 px-[.3px] flex flex-row items-start">
        <ProjectsPage />
      </div>
      <MobileNavBar />
    </div>
  );
};

export default Project;
