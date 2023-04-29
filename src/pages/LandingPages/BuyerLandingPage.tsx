import { Layout } from "../Layout";
import { Button } from "@mui/material";
import { useState } from "react";
import "./../../App.css";
import { useNavigate } from "react-router-dom";

export const BuyerLandingPage = () => {
  const [createTender, setCreateTender] = useState(false);
  const [viewTenders, setViewTenders] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout buyer={true}>
      <div
        style={{
          margin: "10px",
          boxShadow: "rgba(14, 30, 37, 0.3) 0px 2px 4px 0px",
        }}
      >
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          onClick={() => {
            setCreateTender(!createTender);
            navigate("/createTender");
          }}
        >
          Create Tender
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setViewTenders(!viewTenders);
          }}
        >
          View Your Tenders
        </Button>
      </div>
    </Layout>
  );
};
