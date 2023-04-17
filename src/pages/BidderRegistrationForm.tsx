import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Layout } from "./Layout";

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

export const BidderRegistrationForm = () => {
  return (
    <Layout buyer={true} bidder={true} admin={true}>
      <BidderRegistrationFormContainer>
        <Tit>Bidder Registration Form</Tit>
        <TextField label="Name" style={{ margin: "10px", width: "75%" }} />
        <TextField
          label="Company Name"
          style={{ margin: "10px", width: "75%" }}
        />
        <TextField
          label="No. of Years of Experience"
          style={{ margin: "10px", width: "75%" }}
        />
        <TextField
          label="No. of Successful Tenders"
          style={{ margin: "10px", width: "75%" }}
        />
        <TextField label="Email" style={{ margin: "10px", width: "75%" }} />
        <TextField
          label="Password"
          type={"password"}
          style={{ margin: "10px", width: "75%" }}
        />
        <Button variant="contained" style={{ margin: "20px" }}>
          Login
        </Button>
      </BidderRegistrationFormContainer>
    </Layout>
  );
};
