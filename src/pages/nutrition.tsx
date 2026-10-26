import React from "react";
import Head from "next/head";
import NutritionTracker from "../components/nutrition/NutritionTracker";

const Nutrition: React.FC = () => {
  return (
    <>
      <Head>
        <title>Nutrition</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NutritionTracker />
    </>
  );
};

export default Nutrition;
