import React from "react";
import PageTitle from "../PageTitle";
import Layout from "../UI/Layout";
import Services from "../Services";

const ServicesPage = () => {
  return (
    <Layout>
      <PageTitle title="Naše usluge" />
      <Services />
    </Layout>
  );
};

export default ServicesPage;
