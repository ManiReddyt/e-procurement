import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "../Layout";
import { useState, useEffect } from "react";
import { TableTitle } from "./AdminLandingPage";
import { Button } from "@mui/material";
import { CustomisedSnackBar } from "../Home";

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

const handleWinner = async (
  tenderId: string,
  userID: string,
  setSuccess: any,
  setError: any
) => {
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
    if (post.status === 200) {
      setSuccess(true);
      console.log("winner set successfully");
      return true;
    } else {
      setError(true);
      return false;
    }
  } catch (e) {
    console.log(e);
    setError(true);
  }
};

export const ViewBids = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarOpenError, setSnackBarOpenError] = useState(false);
  const [bids, setBids] = useState<bidProps[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
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
                    onClick={async () => {
                      const x = await handleWinner(
                        bid.tenderid,
                        userId,
                        setSnackBarOpen,
                        setSnackBarOpenError
                      );
                      if (x) {
                        setTimeout(() => {
                          navigate("/BuyerLandingPage", {
                            state: { userId: location.state.userId },
                          });
                        }, 3000);
                      }
                    }}
                  >
                    Award
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomisedSnackBar
          open={snackBarOpen}
          onClose={() => setSnackBarOpen(false)}
          type={"success"}
        >
          Awarded SuccessFully
        </CustomisedSnackBar>
        <CustomisedSnackBar
          open={snackBarOpenError}
          onClose={() => setSnackBarOpenError(false)}
          type={"error"}
        >
          Award UnSuccessFul
        </CustomisedSnackBar>
      </>
    </Layout>
  );
};
