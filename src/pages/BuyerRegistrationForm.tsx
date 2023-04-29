import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Layout } from "./Layout";
import { handleRegister } from "./BidderRegistrationForm";
import { useState } from "react";
import { CenterContainer } from "./LoginOrRegister";

const BuyerRegistrationFormContainer = styled.div`
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

// const handleRegister;

export const BuyerRegistrationForm = () => {
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    designationOrCompanyName: "",
    experience: 0,
    successfulBids: 0,
    userType: "buyer",
  });
  return (
    <Layout buyer={true} bidder={true} admin={true}>
      <CenterContainer>
        <BuyerRegistrationFormContainer>
          <Tit>Buyer Registration Form</Tit>
          <TextField
            label="Name"
            style={{ margin: "10px", width: "75%" }}
            value={register.userName}
            onChange={(e) =>
              setRegister({ ...register, userName: e.target.value })
            }
          />
          <TextField
            label="Designation"
            style={{ margin: "10px", width: "75%" }}
            value={register.designationOrCompanyName}
            onChange={(e) =>
              setRegister({
                ...register,
                designationOrCompanyName: e.target.value,
              })
            }
          />
          <TextField
            label="Email"
            style={{ margin: "10px", width: "75%" }}
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type={"password"}
            style={{ margin: "10px", width: "75%" }}
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            style={{ margin: "20px" }}
            onClick={() => handleRegister(register)}
          >
            Register
          </Button>
        </BuyerRegistrationFormContainer>
      </CenterContainer>
    </Layout>
  );
};
