import { useState } from "react";
import UserSearchInfo from "./UserSearchInfo";
import UserSearchBar from "./UserSearchBar";
import UserSearchResult from "./UserSearchResult";
import { motion } from "framer-motion";
import { GlobalColor } from "../../services/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const UserSearchModal = ({ setIsModalOpen, projectName, isDark }) => {
  const [userName, setUserName] = useState("");
  const handleChange = (event) => {
    // 입력값이 변경될 때마다 호출되는 함수
    setUserName(event.target.value); // 입력값으로 username 상태를 업데이트
    // console.log(userName)
  };
  return (
    <motion.div
      onClick={() => setIsModalOpen(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        // display: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <motion.div
        className="shadow p-5 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          height: "90%",
          width: "40%",
          backgroundColor: isDark ? GlobalColor.colors.primary_purple : "white",
          borderRadius: "10px",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ width: "100%" }}>
          <UserSearchInfo isDark={isDark} projectName={projectName} />
          <UserSearchBar isDark={isDark} handleChange={handleChange} userName={userName} />
          <UserSearchResult isDark={isDark} />
          <motion.div
            whileHover={{ cursor: "pointer" }}
            style={{
              borderRadius: "1rem",
              display: "flex",
              width: "100%",
              padding: "1rem",
              backgroundColor: "#5255CC",
              marginTop: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "white" }}>초대</h3>
          </motion.div>
        </div>
        <motion.div
          whileHover={{ cursor: "pointer" }}
          onClick={() => setIsModalOpen(false)}
          style={{ height: "1.5rem", position: "absolute", right: "3rem" }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            size="2xl"
            color={isDark ? "white" : "#204FCF"}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserSearchModal;