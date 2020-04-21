import React from "react";
import Layout from "../../components/UI/Layout";
import PageTitle from "../PageTitle";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
  return (
    <Layout>
      <PageTitle title="Uloguj se" />
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
