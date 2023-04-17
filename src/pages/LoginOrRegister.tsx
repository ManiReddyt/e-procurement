import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Layout } from "./Layout";

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

const Tit = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 20px;
`;

export const LoginOrRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state.from;
  const x = type.toLowerCase();

  return (
    <Layout buyer={true} bidder={true} admin={true}>
      <LoginOrRegisterContainer>
        <Tit>{type} lOGIN</Tit>
        <TextField label="UserName" style={{ margin: "20px", width: "75%" }} />
        <TextField
          label="Password"
          type={"password"}
          style={{ margin: "20px", width: "75%" }}
        />
        <div>
          <Button
            variant="contained"
            style={{ margin: "20px" }}
            onClick={() => {
              if (type === "BUYER") navigate("/BuyerLandingPage");
              else if (type === "BIDDER") navigate("/BidderLandingPage");
              else navigate("/AdminLandingPage");
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
    </Layout>
  );
};
