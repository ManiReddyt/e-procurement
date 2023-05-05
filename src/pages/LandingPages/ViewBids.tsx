import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../Layout";
import { useState, useEffect } from "react";
import { TableTitle } from "./AdminLandingPage";
import { Button } from "@mui/material";

export type bidProps = {
  id: string;
  tenderid: string;
  description: string;
  createdon: string;
  quotingprice: string;
  deliveryon: string;
  deliveryterms: string;
  warrenty: string;
  warrentyterms: string;
  paymentterms: string;
  bidderid: string;
  rating: string;
};

const handleWinner = async (tenderId: string, userID: string) => {
  try {
    const post = await fetch(
      `http://127.0.0.1:3000/api/buyer/tender/${tenderId}/winner/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ tenderid: tenderId, winnerid: userID }),
      }
    );
    if (post.status === 200) console.log("winner set successfully");
  } catch (e) {
    console.log(e);
  }
};

export const ViewBids = () => {
  const [bids, setBids] = useState<bidProps[]>([]);
  const location = useLocation();
  const tenderId = location.state.TenderId;
  const userId = location.state.userId;
  console.log("userID", userId);
  useEffect(() => {
    fetch(`http://localhost:3000/api/buyer/tender/${tenderId}/bids`)
      .then((response) => response.json())
      .then((data) => setBids(data));
  }, []);

  return (
    <Layout buyer={true}>
      <TableTitle>Viewing Bids of Tender:-{tenderId}</TableTitle>
      <>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>id</th>
              <th>tender Id</th>
              <th>description Bids</th>
              <th>bidCreatedOn</th>
              <th>quotingprice</th>
              <th>deliveryon</th>
              <th>deliveryterms</th>
              <th>warranty</th>
              <th>warrantyterms</th>
              <th>paymentterms</th>
              <th>bidderId</th>
              <th>rating</th>
              <th>Award</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid.id}>
                <td>{bid.id}</td>
                <td>{bid.tenderid}</td>
                <td>{bid.description}</td>
                <td>{bid.createdon}</td>
                <td>{bid.quotingprice}</td>
                <td>{bid.deliveryon}</td>
                <td>{bid.deliveryterms}</td>
                <td>{bid.warrenty}</td>
                <td>{bid.warrentyterms}</td>
                <td>{bid.paymentterms}</td>
                <td>{bid.bidderid}</td>
                <td>{bid.rating}</td>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleWinner(bid.tenderid, userId)}
                  >
                    Award
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </Layout>
  );
};
