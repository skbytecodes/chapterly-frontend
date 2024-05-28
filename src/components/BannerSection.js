import axios from "axios";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import PhoneBanner from "../images/28804_Quote_B2_Wandering-Stars_02_27_24-mobile.jpg";
import Banner from "../images/banner2.jpg";
// import Chapterly_banner from "../images/chapter_banner.jpg";
import Chapterly_banner from "../images/background_app.jpg";

function BannerSection() {
  const [bannerState, setBannerState] = useState(0);
  const { isLoading, data } = useQuery("fetch-banner", () => {
    return axios.get("http://localhost:8080/api/v1/banners");
  });

  const rightBtnRef = useRef(null);
  const leftBtnRef = useRef(null);

  const slideToRight = () => {
    const rightBtn = rightBtnRef.current;
    const leftBtn = leftBtnRef.current;

    if (bannerState != data?.data.length - 2) {
      setBannerState(bannerState + 1);
      leftBtn.style.display = "block";
    } else {
      setBannerState(bannerState + 1);
      rightBtn.style.display = "none";
      leftBtn.style.display = "block";
    }
  };

  const slideToLeft = () => {
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;

    if (bannerState != 1) {
      setBannerState(bannerState - 1);
      rightBtn.style.display = "block";
    } else {
      setBannerState(0);
      leftBtn.style.display = "none";
    }
  };

  return (
    <>
      <div
        className="banner_section h-fit"
        style={{ borderBottom: "1px solid black" }}
      >
        <div className="banner_container h-full w-full">
          <picture>
            {/* <source srcSet={Chapterly_banner} media="(min-width: 640px)" />     */}
            <source srcSet={Chapterly_banner} media="(min-width: 640px)" />    
              
            <source srcSet="https://img.freepik.com/premium-vector/colorful-poster-about-books_95404-46.jpg?w=360" />
            <img
              className="h-[69dvh] w-full md:h-[32dvh] lg:h-[40dvh] xl:h-[65dvh]"
              id="banner"
              src="https://img.freepik.com/premium-vector/colorful-poster-about-books_95404-46.jpg?w=360"
              alt="Description of the image"
            />
          </picture>
        </div>

        <div className="banner_text_container h-44 md:h-[14dvh] lg:h-[15dvh] xl:h-[20dvh] px-2 flex flex-col justify-evenly items-center">
          <p id="text-head" className=" text-center">
            FIND YOUR PLACE AT CHAPTERLY ONLINE BOOKSTORE{" "}
          </p>
          <p id="text-desc" className="text-center">
            Over 5 million books ready to ship, 3.6 million eBooks and 300,000
            audiobooks to download right now! Curbside pickup is available in
            most stores!
          </p>
        </div>
      </div>
    </>
  );
}

export default BannerSection;
