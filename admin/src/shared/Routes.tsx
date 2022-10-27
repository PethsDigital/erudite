import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Forum, Login, Signup } from "../pages";
// import LayoutRoutes from "./LayoutRoutes";
import AuthLayout from "./Auth/AuthLayout";
import PageLayout from "./UI/PageLayout";

export default function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/forum/*" element={<PageLayout Page={Forum} />} />

      <Route
        path="/login"
        element={
          <AuthLayout
            AuthElement={<Login />}
            buttonText="Sign Up"
            handleClick={() => navigate("signup")}
            heading="Are you a new user?"
            text="Get unlimited access to our services by clicking “Sign Up”"
          />
        }
      />

      <Route
        path="/signup"
        element={
          <AuthLayout
            AuthElement={<Signup />}
            buttonText="Login"
            heading="Welcome Back!"
            text="To be able to use our Services, 
  Please log in"
            handleClick={() => navigate("login")}
          />
        }
      />

      <Route path="/" element={<Navigate to={"login"} replace />} />
    </Routes>
  );
}
