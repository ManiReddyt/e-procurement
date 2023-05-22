import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, skeletonClasses } from "@mui/material";
import { Layout } from "./Layout";
import { CenterContainer } from "./LoginOrRegister";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

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

export const CustomisedSnackBar = ({ open, onClose, type, children }: any) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={type}
        sx={{ width: "100%" }}
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
};

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
