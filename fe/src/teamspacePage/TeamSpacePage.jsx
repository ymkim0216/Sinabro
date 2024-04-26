import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Projectname from "../components/teamspaceComponents/Projectname";
import ProjectInfo from "../components/teamspaceComponents/ProjectInfo";
import ProjectInvite from "../components/teamspaceComponents/ProjectInvite";
import { useState } from "react";
import UserSearchModal from "../components/teamspaceComponents/UserSearchModal";
import { AnimatePresence } from "framer-motion";
import ProjectGitConnect from "../components/teamspaceComponents/ProjectGitConnect";
import Navbar from "../components/navs/Navbar";


const TeamSpacePage = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projectinfo, setProjectInfo] = useState(null);
  const hadlebutton = () => {
    setIsModalOpen(() => !IsModalOpen);
    console.log(IsModalOpen);
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column"
        style={{
          width: "100vw",
          
          alignItems: "center",
          paddingTop: "7rem",
          backgroundColor: "rgba(212, 223, 255, 0.2)",
        }}
      >
        <Projectname
          setProjectName={setProjectName}
          projectName={projectName}
        />
        <ProjectInfo
          setProjectInfo={setProjectInfo}
          projectinfo={projectinfo}
        />

        <ProjectInvite
          hadlebutton={hadlebutton}
          setIsModalOpen={setIsModalOpen}
          IsModalOpen={IsModalOpen}
        />
        <AnimatePresence>
          {IsModalOpen && (
            <UserSearchModal
              projectName={projectName}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </AnimatePresence>
        <ProjectGitConnect />
      </div>
    </>
  );
};

export default TeamSpacePage;