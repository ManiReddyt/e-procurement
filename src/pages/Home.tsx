import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Layout } from "./Layout";

const HomeContainer = styled.div`
  background-color: white;
  color: #1976d2;
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout bidder={true} buyer={true} admin={true}>
      <div>Add a welcome card here</div>
    </Layout>
  );
};
