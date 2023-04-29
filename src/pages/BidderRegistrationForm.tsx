import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Layout } from "./Layout";
import { useState } from "react";
import { CenterContainer } from "./LoginOrRegister";

const BidderRegistrationFormContainer = styled.div`
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

export type registerProps = {
  userName: string;
  email: string;
  password: string;
  designationOrCompanyName: string;
  experience: number;
  successfulBids: number;
  userType: string;
};

export const handleRegister = async (register: registerProps) => {
  try {
    const post = await fetch(
      "http://127.0.0.1:3000/api/admin/registerrequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(register),
      }
    );
    if (post.status === 200) console.log("post success");
  } catch (e) {
    console.log(e);
  }
};

export const BidderRegistrationForm = () => {
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    designationOrCompanyName: "",
    experience: 0,
    successfulBids: 0,
    userType: "bidder",
  });
  return (
    <Layout buyer={true} bidder={true} admin={true}>
      <CenterContainer>
        <BidderRegistrationFormContainer>
          <Tit>Bidder Registration Form</Tit>
          <TextField
            label="Name"
            style={{ margin: "10px", width: "75%" }}
            value={register.userName}
            onChange={(e) =>
              setRegister({ ...register, userName: e.target.value })
            }
          />
          <TextField
            label="Company Name"
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
            label="No. of Years of Experience"
            style={{ margin: "10px", width: "75%" }}
            value={register.experience}
            onChange={(e) =>
              setRegister({ ...register, experience: Number(e.target.value) })
            }
          />
          <TextField
            label="No. of Successful Tenders"
            style={{ margin: "10px", width: "75%" }}
            value={register.successfulBids}
            onChange={(e) =>
              setRegister({
                ...register,
                successfulBids: Number(e.target.value),
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
            type="password"
            style={{ margin: "10px", width: "75%" }}
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            style={{ margin: "20px" }}
            onClick={() => {
              handleRegister(register);
            }}
          >
            Register
          </Button>
        </BidderRegistrationFormContainer>
      </CenterContainer>
    </Layout>
  );
};
