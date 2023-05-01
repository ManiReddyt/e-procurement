import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Layout } from "./Layout";
import { CenterContainer } from "./LoginOrRegister";

const HomeContainer = styled.div`
  background-color: white;
  color: #1976d2;
  width: 700px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;
const welcomeTitle = styled.div`
  color: red;
`;

export const Home = () => {
  return (
    <Layout bidder={true} buyer={true} admin={true}>
      <CenterContainer>
        <HomeContainer>
          <div style={{ fontSize: "30px" }}>
            Software for Easing Government Procurements
          </div>
        </HomeContainer>
      </CenterContainer>
    </Layout>
  );
};
