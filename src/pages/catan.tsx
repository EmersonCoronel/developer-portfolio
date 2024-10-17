import React from "react";
import Header from "../components/general/Header";
import { CatanPage } from "catan-board-generator";

const Catan: React.FC = () => {
  return (
    <>
      <Header />
      <CatanPage />
    </>
  );
};

export default Catan