import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Layout } from "./Layout";
import { useState } from "react";

const LoginOrRegisterContainer = styled.div`
  background-color: white;
  color: #1976d2;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

export const CenterContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Tit = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 20px;
`;

type loginProps = { username: string; password: string; usertype: string };

export const LoginOrRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state.from;
  const x = type.toLowerCase();
  const [login, setLogin] = useState({
    username: "",
    password: "",
    usertype: x,
  });

  const handleLogin = (login: loginProps) => {
    if (
      login.username === "Admin" &&
      login.password === "Admin" &&
      login.usertype === "admin"
    ) {
      navigate("/AdminLandingPage");
    } else {
      handleAuthentication(login);
    }
  };
  const handleAuthentication = async (login: loginProps) => {
    try {
      const post = await fetch("http://127.0.0.1:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(login),
      });
      if (post.status === 200) {
        const responseData = await post.json();
        if (responseData.length === 1) {
          if (responseData[0].status === "approved") {
            if (login.usertype === "bidder")
              navigate("/BidderLandingPage", {
                state: { userId: responseData[0].id },
              });
            if (login.usertype === "buyer")
              navigate("/BuyerLandingPage", {
                state: { userId: responseData[0].id },
              });
          } else if (responseData[0].status === "rejected") {
            console.log("waiting for approval");
          }
        } else {
          console.log("register yourself");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout buyer={true} bidder={true} admin={true}>
      <CenterContainer>
        <LoginOrRegisterContainer>
          <Tit>{type} lOGIN</Tit>
          <TextField
            label="UserName"
            style={{ margin: "20px", width: "75%" }}
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
          <TextField
            label="Password"
            type={"password"}
            style={{ margin: "20px", width: "75%" }}
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <div>
            <Button
              variant="contained"
              style={{ margin: "20px" }}
              onClick={() => {
                handleLogin(login);
              }}
            >
              Login
            </Button>
            {type != "ADMIN" && (
              <Button
                variant="contained"
                onClick={() => navigate(`/${type}Registration`)}
                style={{ margin: "20px" }}
              >
                SignUp
              </Button>
            )}
          </div>
        </LoginOrRegisterContainer>
      </CenterContainer>
    </Layout>
  );
};
