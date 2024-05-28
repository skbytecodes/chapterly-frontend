import React from "react";
import Header from "../components/Header";

function About() {
  return (
    <>
    <Header />
      <div class="sm:flex items-center max-w-screen-xl">
        <div class="sm:w-1/2 p-10">
          <div class="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div class="sm:w-1/2 p-5">
          <div class="text">
            <span class="text-app-red uppercase">
              About us
            </span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span class="text-app-red">Our Company</span>
            </h2>
            <p class="text-gray-700">
              Our company is more than just an online bookstore; we're a
              passionate community of book lovers dedicated to spreading the joy
              of reading far and wide. Founded with the mission to make
              literature accessible to all, we strive to connect readers with
              their next favorite book while championing authors and stories
              from diverse backgrounds. Our commitment to excellence extends
              beyond our curated selection of titles to our personalized
              customer service, ensuring that every interaction leaves a lasting
              impression. As we continue to grow, our vision remains steadfast:
              to foster a love of reading that transcends borders and inspires
              lifelong learning. Join us on this literary journey as we turn
              pages and create meaningful connections, one book at a time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
