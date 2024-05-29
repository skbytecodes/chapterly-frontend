import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Review.css";

function Review({bookTitle}) {
  const [bookName, setBookName] = useState(bookTitle);
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const parentUrl = window.globalPrentUrl;
    async function getAllReviewsForBook() {
      const response = await axios.get(
        parentUrl + "api/v1/reviews/book/" + bookTitle
      );

      setReviewsData(response.data);
      setBookName(bookTitle);
    }
    getAllReviewsForBook();
  }, [bookName]);

  const ratingStyle = {
    color: "#d51912",
  };

  const marginStyle = { marginBottom: "0.5em", textAlign:"left"};

  return (
    <>
      {reviewsData.map((review) => (
        <div className="review text-pretty mb-10">
          <h3 className="font-sans text-pretty font-semibold" style={marginStyle}>{review.userName}</h3>
          <div className="rate_time_div flex justify-between mb-3 ">
            <Rating id="review_rate_star" name="read-only" value={review.rating} readOnly sx={ratingStyle} />
            <p className="text-sm">Posted 2 months ago</p>
          </div>
          <h3 style={marginStyle}>{review.title}</h3>
          <p className="review_desc">
            {review.body}
          </p>
        </div>
      ))}
    </>
  );
}

export default Review;
