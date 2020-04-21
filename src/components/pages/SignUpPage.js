import React from "react";
import Layout from "../../components/UI/Layout";
import PageTitle from "../PageTitle";
import SignUpForm from "../forms/SignUpForm";

const SignUpPage = () => {
  return (
    <Layout>
      <PageTitle title="Registruj se" />
      <SignUpForm />
    </Layout>
  );
};

export default SignUpPage;
