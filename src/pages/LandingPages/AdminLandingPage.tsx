import { Layout } from "../Layout";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

interface UserProps {
  id: string;
  username: string;
  email: string;
  password: string;
  designationorcompanyname: string;
  experience: number;
  successfulbids: number;
  usertype: string;
  status: string | null;
}

export const TableTitle = styled.div`
  align-self: flex-start;
  color: black;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
`;

const handleApproveOrReject = async (user: UserProps, status: string) => {
  try {
    const post = await fetch(
      "http://127.0.0.1:3000/api/admin/processRegistration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ id: user.id, status: status }),
      }
    );
    if (post.status === 200) console.log("post success");
  } catch (e) {
    console.log(e);
  }
};

const ApproveOrReject = ({ user }: any) => {
  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        size="small"
        style={{ margin: "5px", padding: "3px" }}
        onClick={() => handleApproveOrReject(user, "approved")}
      >
        Approve
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        style={{ margin: "5px", padding: "3px" }}
        onClick={() => handleApproveOrReject(user, "rejected")}
      >
        Reject
      </Button>
    </div>
  );
};

const UserTable = ({ users }: any) => {
  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Designation/Company Name</th>
            <th>Experience</th>
            <th>Successful Bids</th>
            <th>User Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserProps) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.designationorcompanyname}</td>
              <td>{user.experience}</td>
              <td>{user.successfulbids}</td>
              <td>{user.usertype}</td>
              <td
                style={{
                  color: `${user.status === "approved" ? "#47d147" : "red"}`,
                }}
              >
                {user.status ? user.status : <ApproveOrReject user={user} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const AdminLandingPage = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [pending, setPending] = useState<UserProps[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/admin/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.filter((x: UserProps) => x.status !== null));
        setPending(data.filter((x: UserProps) => x.status === null));
        console.log("fetch");
      });
  });
  return (
    <Layout admin={true}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <TableTitle>Pending Approvals:-</TableTitle>
        <UserTable users={pending} />
        <TableTitle>Approved/Rejected:-</TableTitle>
        <UserTable users={users} />
      </div>
    </Layout>
  );
};
