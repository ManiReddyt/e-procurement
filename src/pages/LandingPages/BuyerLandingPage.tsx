import { Layout } from "../Layout";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import "./../../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { categoryPorps, subCategoriesProps } from "./CreateTender";

export type tenderProps = {
  id: string;
  title: string;
  description: string;
  createdon: string;
  expireson: string;
  budget: string;
  categoryid: string;
  subcategoryid: string;
  createdby: string;
  winner: string;
};

//todo
const getUserName = async (id: string) => {
  const fetchData = await fetch(
    `http://localhost:3000/api/admin/user/${id}/username`
  );
  const response = fetchData.json();
  return response;
  // fetch(`http://localhost:3000/api/admin/user/${id}/username`)
  //   .then((response) => response.json())
  //   .then((data) => data);
};

export const BuyerLandingPage = () => {
  const [createTender, setCreateTender] = useState(false);
  const [categories, setCategories] = useState<categoryPorps[]>([]);
  const [subCategories, setSubCategories] = useState<subCategoriesProps[][]>([
    [],
  ]);

  const [tenders, setTenders] = useState<tenderProps[]>([]);
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
    fetch(`http://localhost:3000/api/buyer/${userId}/tenders`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTenders(data);
      });
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
  }, []);

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
            navigate("/createTender", {
              state: { userId: userId },
            });
          }}
        >
          Create Tender
        </Button>
        <>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>description Bids</th>
                <th>budget</th>
                <th>category</th>
                <th>subcategory</th>
                <th>createdOn</th>
                <th>expireson</th>
                <th>winner</th>
                <th>Bids</th>
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
                  <td>
                    {new Date(tender.createdon).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    {new Date(tender.expireson).toLocaleDateString("en-GB")}
                  </td>

                  <td>{tender.winner}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ padding: "3px" }}
                      onClick={() =>
                        navigate("/viewBids", {
                          state: { TenderId: tender.id, userId: userId },
                        })
                      }
                    >
                      Bids
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    </Layout>
  );
};
