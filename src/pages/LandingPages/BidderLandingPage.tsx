import { Layout } from "../Layout";
import { useEffect, useState } from "react";
import { tenderProps } from "./BuyerLandingPage";
import { TableTitle } from "./AdminLandingPage";
import { categoryPorps, subCategoriesProps } from "./CreateTender";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { bidProps } from "./ViewBids";

export const BidderLandingPage = () => {
  const [tenders, setTenders] = useState<tenderProps[]>([]);
  const [categories, setCategories] = useState<categoryPorps[]>([]);
  const [subCategories, setSubCategories] = useState<subCategoriesProps[][]>([
    [],
  ]);
  const [bids, setBids] = useState<bidProps[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  const categoryName = (id: string) => {
    const category = categories.find((x) => x.id === id);
    return category?.categoryname;
  };
  const subCategoryName = (id: string) => {
    for (let i = 0; i < subCategories.length; i++) {
      for (let j = 0; j < subCategories[i].length; j++) {
        if (subCategories[i][j].id === id)
          return subCategories[i][j].subcategoryname;
      }
    }
    return null;
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/bidder/activetenders")
      .then((response) => response.json())
      .then((data) => setTenders(data));

    fetch("http://localhost:3000/api/buyer/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        const subCategoryPromises = data.map((category: categoryPorps) =>
          fetch(
            `http://localhost:3000/api/buyer/category/${category.id}/subcategories`
          ).then((response) => response.json())
        );
        Promise.all(subCategoryPromises).then((subCategoryData) =>
          setSubCategories(subCategoryData)
        );
      });
    fetch(`http://localhost:3000/api/bidder/${userId}/bids`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBids(data);
      });
  }, []);
  return (
    <Layout bidder={true}>
      <TableTitle>Viewing Active Tenders:-</TableTitle>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>Description</th>
            <th>budget</th>
            <th>category</th>
            <th>subcategory</th>
            <th>createdOn</th>
            <th>expireson</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.id}</td>
              <td>{tender.title}</td>
              <td>{tender.description}</td>
              <td>{tender.budget}</td>
              <td>{categoryName(tender.categoryid)}</td>
              <td>{subCategoryName(tender.subcategoryid)}</td>
              <td>{new Date(tender.createdon).toLocaleDateString("en-GB")}</td>
              <td>{new Date(tender.expireson).toLocaleDateString("en-GB")}</td>
              <td>
                <Button
                  variant="contained"
                  color="success"
                  style={{ padding: "3px" }}
                  onClick={() =>
                    navigate("/addBid", {
                      state: { TenderId: tender.id, BidderId: userId },
                    })
                  }
                >
                  Bid
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TableTitle>Viewing Your Bids:-</TableTitle>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>tenderid</th>
            <th>description</th>
            <th>submitted on</th>
            <th>quotingprice</th>
            <th>deliveryon</th>
            <th>deliveryterms</th>
            <th>warranty in months</th>
            <th>warrantyterms</th>
            <th>paymentterms</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td>{bid.tenderid}</td>
              <td>{bid.description}</td>
              <td>{bid.createdon}</td>
              <td>{bid.quotingprice}</td>
              <td>{bid.deliveryon}</td>
              <td>{bid.deliveryterms}</td>
              <td>{bid.warrenty}</td>
              <td>{bid.warrentyterms}</td>
              <td>{bid.paymentterms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
