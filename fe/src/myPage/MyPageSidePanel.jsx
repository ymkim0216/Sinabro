import React, { useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
const MyPageSidePanelContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 30%;
  flex-direction: column;
  align-items: center;
`;

const SkillArea = styled.span`
  background-color: #8fdd89;
  padding: 0.2rem;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 2rem;
  font-weight: 1.6rem;
  border-radius: 1rem;
`;
const MyImage = styled.img`
  height: 10rem;
  border-radius: 5rem;
`;

const MyName = styled.div`
  height: 2rem;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

const WithOur = styled.div`
  height: 3rem;
  font-size: 1rem;
  color: #696969;
  display: flex;
  align-items: center;
`;

const EditButton = styled.label`
  background-color: #4f61bb;
  color: white;
  width: 90%;
  font-size: 1.2rem;
  padding: 0.4rem;
  display: flex;
  justify-content: end;
  padding-right: 1.2rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.01);
  }
  cursor: pointer;
`;

const MyInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  width: 90%;
  padding-top: 2.5rem;
  gap: 1rem;
`;

const MyInfoInnerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const SmallImage = styled.img`
  height: 2rem;
  width: 2rem;
`;

const InfoTag = styled.div`
  font-weight: 5%;
  display: flex;
  flex-wrap: wrap;
`;

const MyPageSidePanel = ({ isDark }) => {
  const [selectedImage, setSelectedImage] = useState(
    "/images/default_my_image.png"
  );

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    // Firebase Storage에 이미지 업로드
    const storage = getStorage(app);
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);

    // 업로드된 이미지의 다운로드 URL 받아오기
    const imageUrl = await getDownloadURL(storageRef);

    // 다운로드 URL을 state에 저장
    setSelectedImage(imageUrl);
  };

  return (
    <MyPageSidePanelContainer
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.3 }}
    >
      <SkillArea>Fix Plz</SkillArea>
      <MyImage src={selectedImage} />
      <MyName style={{ color: isDark ? "white" : "black" }}>Fix Plz</MyName>
      <WithOur>Fix Plz</WithOur>
      <EditButton>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        E D I T
      </EditButton>
      <MyInfoBox>
        <MyInfoInnerBox>
          <FontAwesomeIcon
            icon={faGithub}
            size="2xl"
            color={isDark ? "white" : "black"}
          />
          <InfoTag style={{ color: isDark ? "white" : "black" }}>
            https://github.com/fixplz
          </InfoTag>
        </MyInfoInnerBox>
        <MyInfoInnerBox>
          <FontAwesomeIcon icon={faAt} size="2xl" color={isDark ? "white" : "black"} />
          <InfoTag style={{ color: isDark ? "white" : "black" }}>
            fixplz@fix.plz
          </InfoTag>
        </MyInfoInnerBox>
      </MyInfoBox>
    </MyPageSidePanelContainer>
  );
};

export default MyPageSidePanel;