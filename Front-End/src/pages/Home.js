import React from "react";
import CategoryList from "../component/CategoryList";
import BannerProduct from "../component/BannerProduct";
import HorizontalCardProduct from "../component/HorizontalCardProduct";
import VerticalCardProduct from "../component/VerticalCardProduct";

const Home = () => {
  return (
    <>
      <BannerProduct />
      <CategoryList />
      <HorizontalCardProduct Category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct Category={"watches"} heading={"Trending Watches"}/>
      <VerticalCardProduct Category={"mobiles"} heading={"On affordable price's"}/>
      <VerticalCardProduct Category={"glasses"} heading={"On affordable price's"}/>
      <VerticalCardProduct Category={"jeans"} heading={"On affordable price's"}/>
      <VerticalCardProduct Category={"shirt"} heading={"On affordable price's"}/>
    </>
  );
};

export default Home;
