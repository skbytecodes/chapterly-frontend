import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import "../styles/AuthorDetails.css";
import Header from "../components/Header";
import Footer1 from "../components/Footer1";
import Overlay from "../components/Overlay";

function AuthorDetails() {
  const parentUrl = window.globalPrentUrl;
  const { author } = useParams();
  const { isLoading, data, isError, error } = useQuery("fetch-author", () => {
    return axios.get(
      parentUrl + "api/v1/authors/authorByName/" + author
    );
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <Overlay />;
  }

  return (
    <>
      <Header />
      <div className="authorDetails pt-3 sm:pt-6">
        <p className="w-[90%] m-auto text-lg md:text-2xl font-semibold mb-5 sm:mb-10">
          Author
        </p>
        <div className="flex w-[90%] m-auto h-max ">
          <div className="">
            <img
              src={data?.data.imageUrl}
              className="w-full md:h-[10em] md:w-[20em] lg:h-[12em] xl:w-auto rounded-md hover:scale-105 hover:transition-all duration-300"
            />
          </div>
          <div className="ml-8 h-[95%]">
            <p className="font-semibold">{data?.data.name}</p>
          </div>
        </div>

        <div className="bigraphy  w-[90%] m-auto mt-10 italic">
          <p className="mt-3 italic">{data?.data.biography}</p>
        </div>
        <div className=" h-10 w-[90%] m-auto flex items-center">
          <span>Wesbite : </span>
          <a
            className="ml-4 text-app-red"
            target="_blank"
            href={data?.data.websiteURL}
          >
           {data?.data.websiteURL}
          </a>
        </div>
      </div>
      <Footer1 />
    </>
  );
}

export default AuthorDetails;
