import { Layout } from "../Layout";
import { useEffect } from "react";

export const BidderLandingPage = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/bidder/activetenders")
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
  return (
    <Layout bidder={true}>
      <div>Bidder Landing Page</div>
    </Layout>
  );
};
