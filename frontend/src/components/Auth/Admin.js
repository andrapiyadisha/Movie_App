import React from "react";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import AuthForm from "./AuthForm";

const Admin = () => {
  const navigate = useNavigate();

  const onResReceived = (data) => {
    console.log(data);
    localStorage.setItem("adminId", data.id);
    navigate("/");
  };

  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch(err => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Login</h2>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
