import { Button, Rating } from "@mui/material";
import React from "react";
import "../styles/CustomerReviews.css";
import RatingBar from "./RatingBar";
import Review from "./Review";

function CustomerReviews({ bookRating, bookTitle }) {
  const ratingStyle = {
    color: "#d51912",

  };
  return (
    <div className="customerReviews">
      <h3 id="cust_rev_head" className="mb-2" >
        Customer Reviews
      </h3>
      <div className="rating_avg_div">
        <div className="ratings_avg flex space-x-2">
          <div>
            <Rating
              id="cust_rate"
              style={ratingStyle}
              name="read-only"
              value={bookRating.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div className="text-sm">
            <p> {bookRating.rating}</p>
          </div>
        </div>
        <p className="text-sm">
          10 out of 10(100%) reviewers recommend this product
        </p>
      </div>
      <div className="ratings_section ">
        <div className="ratings_section_btn flex items-center justify-between">
          <h4 style={{ color: "#d51912" }}>Top Reviews</h4>
          <Button
            className="w_rev"
            sx={{
              height: 40,
              width: "48%",
              fontSize: "10px",
              backgroundColor: "#d51912",
              color: "white",
            }}
          >
            Write a review
          </Button>
        </div>
      </div>

      <div className="rating_snapshot_div mt-10">
        <h3 id="rat_snap_head" style={{ marginBottom: "0.5em" }}>
          Rating Snapshot
        </h3>
      </div>
      <RatingBar
        className="rat_bar"
        num={5}
        receivedRatings={bookRating.five}
      />
      <RatingBar
        className="rat_bar"
        num={4}
        receivedRatings={bookRating.four}
      />
      <RatingBar
        className="rat_bar"
        num={3}
        receivedRatings={bookRating.three}
      />
      <RatingBar className="rat_bar" num={2} receivedRatings={bookRating.two} />
      <RatingBar className="rat_bar" num={1} receivedRatings={bookRating.one} />

      <div className="avg_cust_rat mt-10 flex flex-col  h-16 justify-evenly">
        <h3 id="avg_cust_rating">Average customer Ratings</h3>
        <div
          className="ratsum flex items-center gap-x-4"
        >
          <Rating
            id="star_icon"
            name="read-only"
            value={4}
            readOnly
            sx={{color:"#d51912"}}
          />
          <p > 4 | 10 Reviews</p>
        </div>
      </div>

      <div className="sort_rating_div h-28  flex flex-col justify-evenly items-center mt-3 mb-10">
        <p>
          <b>1 - 5 of 5 Reviews</b>
        </p>
        <div className="sort_container flex justify-around gap-x-3 ">
          <p>
            <b>Sort By</b>
          </p>
          <select className="sort_option outline-none bg-transparent">
            <option value="relavant">Most Relevant Rating</option>
            <option value="helpful">Most Helpful Rating</option>
            <option value="high to low">Highest to Howest Rating</option>
            <option value="low to high">Lowest to Highest Rating</option>
          </select>
        </div>
      </div>

      <Review bookTitle={bookTitle} />
    </div>
  );
}

export default CustomerReviews;
