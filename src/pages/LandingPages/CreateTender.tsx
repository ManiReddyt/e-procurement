import { Layout } from "../Layout";
import { CenterContainer } from "../LoginOrRegister";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { Tit } from "../LoginOrRegister";

const CreateTenderContainer = styled.div`
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

export const CreateTender = () => {
  return (
    <Layout buyer={true}>
      <CenterContainer>
        <CreateTenderContainer>
          <Tit>Create Tender</Tit>
          <TextField label="Title" style={{ margin: "20px", width: "75%" }} />
          <TextField
            label="Description"
            style={{ margin: "20px", width: "75%" }}
          />
          <TextField
            label="ExpiresOn"
            style={{ margin: "20px", width: "75%" }}
          />
          <TextField label="Budget" style={{ margin: "20px", width: "75%" }} />
          <TextField
            label="CategoryId"
            style={{ margin: "20px", width: "75%" }}
          />
          <TextField
            label="SubCategoryId"
            style={{ margin: "20px", width: "75%" }}
          />
          <TextField
            label="CreatedBy"
            style={{ margin: "20px", width: "75%" }}
          />
        </CreateTenderContainer>
      </CenterContainer>
    </Layout>
  );
};
