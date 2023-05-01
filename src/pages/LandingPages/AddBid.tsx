import { useLocation } from "react-router-dom";
import { Layout } from "../Layout";
import { CenterContainer } from "../LoginOrRegister";
import { useState } from "react";
import { Tit } from "../LoginOrRegister";
import { TextField, Button } from "@mui/material";
import { changeDateFormat } from "./CreateTender";
import styled from "styled-components";

const AddBidContainer = styled.div`
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

const handleAddBid = async (object: any) => {
  try {
    const post = await fetch("http://127.0.0.1:3000/api/bidder/bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(object),
    });
    if (post.status === 200) console.log("Bid Successfull");
  } catch (e) {
    console.log(e);
  }
};

export const AddBid = () => {
  const location = useLocation();
  const tenderId = location.state.TenderId;
  const bidderId = location.state.BidderId;
  const [addBid, setAddBid] = useState({
    tenderId: tenderId,
    description: "",
    quotingPrice: "",
    deliveryOn: new Date().toJSON(),
    deliveryTerms: "",
    warrenty: "",
    warrentyTerms: "",
    paymentTerms: "",
    bidderId: bidderId,
  });
  const [deliversOn, setDeliversOn] = useState("");

  return (
    <Layout bidder={true}>
      <CenterContainer>
        <AddBidContainer>
          <Tit>Bid for Tender: {tenderId}</Tit>
          <TextField
            label="Description"
            value={addBid.description}
            onChange={(e) =>
              setAddBid({ ...addBid, description: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />
          <TextField
            label="QuotingPrice"
            value={addBid.quotingPrice}
            // type="number"
            onChange={(e) =>
              setAddBid({ ...addBid, quotingPrice: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />

          <TextField
            label="Delivery On"
            type="date"
            value={deliversOn}
            onChange={(e) => {
              setDeliversOn(e.target.value);
              setAddBid({
                ...addBid,
                deliveryOn: new Date(changeDateFormat(e.target.value)).toJSON(),
              });
            }}
            style={{ margin: "10px", width: "75%" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Delivery Terms"
            value={addBid.deliveryTerms}
            onChange={(e) =>
              setAddBid({ ...addBid, deliveryTerms: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />
          <TextField
            label="Warrenty"
            value={addBid.warrenty}
            onChange={(e) => setAddBid({ ...addBid, warrenty: e.target.value })}
            style={{ margin: "10px", width: "75%" }}
          />
          <TextField
            label="Warrenty Terms"
            value={addBid.warrentyTerms}
            onChange={(e) =>
              setAddBid({ ...addBid, warrentyTerms: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />
          <TextField
            label="Payment Terms"
            value={addBid.paymentTerms}
            onChange={(e) =>
              setAddBid({ ...addBid, paymentTerms: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              console.log(addBid);
              handleAddBid(addBid);
            }}
            style={{ margin: "20px" }}
          >
            BID
          </Button>
        </AddBidContainer>
      </CenterContainer>
    </Layout>
  );
};
