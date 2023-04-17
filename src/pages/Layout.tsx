import styled from "styled-components";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import "./../App.css";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: auto 3fr;
  grid-template-rows: auto 3fr;
  grid-template-areas:
    "header header"
    "sidebar content";
  height: 100vh;

  .header {
    grid-area: header;
    box-sizing: border-box;
    z-index: 2;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  }
  .sidebar {
    grid-area: sidebar;
    box-sizing: border-box;
    z-index: 2;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    background: white;
  }
  .children {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

type LayoutProps = {
  bidder?: boolean;
  buyer?: boolean;
  admin?: boolean;
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  bidder = false,
  buyer = false,
  admin = false,
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <LayoutContainer>
      <div className="header" style={{ fontSize: "30px", textAlign: "center" }}>
        e-Procurement Application
      </div>
      <div
        className="sidebar"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {buyer && (
          <div
            className="hover-effect"
            style={{ display: "flex", padding: "20px" }}
            onClick={() =>
              navigate("/LoginOrRegister", {
                state: {
                  from: "BUYER",
                },
              })
            }
          >
            <ShoppingCartOutlinedIcon
              style={{ color: "grey", marginRight: "5px" }}
            />
            <div>BUYER</div>
          </div>
        )}
        {bidder && (
          <div
            className="hover-effect"
            style={{ display: "flex", padding: "20px" }}
            onClick={() =>
              navigate("/LoginOrRegister", {
                state: {
                  from: "BIDDER",
                },
              })
            }
          >
            <GavelOutlinedIcon style={{ color: "grey", marginRight: "5px" }} />
            <div>BIDDER</div>
          </div>
        )}
        {admin && (
          <div
            className="hover-effect"
            style={{ display: "flex", padding: "20px" }}
            onClick={() =>
              navigate("/LoginOrRegister", {
                state: {
                  from: "ADMIN",
                },
              })
            }
          >
            <AdminPanelSettingsOutlinedIcon
              style={{ color: "grey", marginRight: "5px" }}
            />
            <div>ADMIN</div>
          </div>
        )}
      </div>
      <div className="children">{children}</div>
    </LayoutContainer>
  );
};
