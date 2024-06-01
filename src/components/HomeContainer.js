import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import BannerSection from "./BannerSection";
import BooksSection from "./BooksSection";
import CategoryList from "./CategoryList";
import FeaturedAuthors from "./FeaturedAuthors";
import Footer1 from "./Footer1";
import Header from "./Header";
import Overlay from "./Overlay";

function HomeContainer() {
  const parentUrl = window.globalPrentUrl;
  const { isLoading, data, isError, error } = useQuery("fetch-categories", () => {
    return axios.get(
      parentUrl + "api/v1/categories"
    );
  });

  if(isError){
    window.location.href = "/error";
  }
  // const reversedCategories = data?.data?.reverse();
  const reversedCategories = data?.data;

  return (
    <>
    {isLoading ? <Overlay /> : ""}
      <Header />
      <BannerSection />
      <CategoryList categories={data}/>

      {reversedCategories?.map((cat) => (
        <BooksSection title={cat.categoryName} key={cat.categoryName}/>
      ))}

      <FeaturedAuthors />
      <Footer1 />
    </>
  );
}

export default HomeContainer;
