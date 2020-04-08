import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <main className="pb-4" style={{ minHeight: "90vH" }}>
      {children}
    </main>
  );
};

export default HomeLayout;
