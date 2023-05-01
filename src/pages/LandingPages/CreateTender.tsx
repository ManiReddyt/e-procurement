import { Layout } from "../Layout";
import { CenterContainer, Tit } from "../LoginOrRegister";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select/Select";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { useLocation } from "react-router-dom";

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
export type categoryPorps = {
  id: string;
  categoryname: string;
};

export type subCategoriesProps = {
  id: string;
  subcategoryname: string;
};

export const changeDateFormat = (date: string) => {
  const arr = date.split("-");
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

const handleCreateTender = async (object: any) => {
  try {
    const post = await fetch("http://127.0.0.1:3000/api/buyer/tender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(object),
    });
    if (post.status === 200) console.log("Tender Created Successfully");
  } catch (e) {
    console.log(e);
  }
};

export const CreateTender = () => {
  const [categories, setCategories] = useState<categoryPorps[]>([]);
  const [subCategories, setSubCategories] = useState<subCategoriesProps[][]>([
    [],
  ]);
  const [expiresOn, setExpiresOn] = useState("");
  const location = useLocation();

  const [createTender, setCreateTender] = useState({
    Title: "",
    Description: "",
    CategoryId: "",
    SubCategoryId: "",
    ExpiresOn: new Date().toJSON(),
    Budget: "",
    CreatedBy: location.state.userId,
  });

  const getIndexofCategory = (id: string) => {
    const category = categories.findIndex((x) => x.id === id);
    return category;
  };

  useEffect(() => {
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
    console.log(subCategories);
  }, []);
  return (
    <Layout buyer={true}>
      <CenterContainer>
        <CreateTenderContainer>
          <Tit>Create Tender</Tit>
          <TextField
            label="Title"
            value={createTender.Title}
            onChange={(e) =>
              setCreateTender({ ...createTender, Title: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />
          <FormControl style={{ width: "75%", margin: "10px" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createTender.CategoryId}
              label="Category"
              onChange={(e) => {
                setCreateTender({
                  ...createTender,
                  CategoryId: e.target.value,
                });
              }}
            >
              {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.categoryname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "75%", margin: "10px" }}>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createTender.SubCategoryId}
              label="Sub-Category"
              onChange={(e) => {
                setCreateTender({
                  ...createTender,
                  SubCategoryId: e.target.value,
                });
              }}
            >
              {subCategories[
                getIndexofCategory(createTender.CategoryId) - 1
              ]?.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.subcategoryname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Description"
            value={createTender.Description}
            onChange={(e) =>
              setCreateTender({ ...createTender, Description: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />

          <TextField
            label="Expires On"
            type="date"
            value={expiresOn}
            onChange={(e) => {
              setExpiresOn(e.target.value);
              setCreateTender({
                ...createTender,
                ExpiresOn: new Date(changeDateFormat(e.target.value)).toJSON(),
              });
            }}
            style={{ margin: "10px", width: "75%" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Budget"
            value={createTender.Budget}
            onChange={(e) =>
              setCreateTender({ ...createTender, Budget: e.target.value })
            }
            style={{ margin: "10px", width: "75%" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              console.log(createTender);
              handleCreateTender(createTender);
            }}
            style={{ margin: "20px" }}
          >
            Create
          </Button>
        </CreateTenderContainer>
      </CenterContainer>
    </Layout>
  );
};
