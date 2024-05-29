import StarIcon from "@mui/icons-material/Star";
import { Box, Grid, Rating, Skeleton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectedBook } from "../redux/actions";

export function SkeletonCard() {
  const parentUrl = window.globalPrentUrl;
  return (
    <div className="flex flex-col space-y-3 w-[95%] md-[90%] m-auto">
      <Grid container wrap="nowrap" overflow="hidden">
        <Box sx={{ width: 150, marginRight: 2, my: 5 }} className="md:h-[20em] overflow-x-scroll items-center">
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>
        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>

        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>


        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>



        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>


        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>

        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>

        <Box sx={{ width: 150, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={150} height={118} />
          <Skeleton width={"35%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"65%"} style={{ margin: "auto" }} />
          <Skeleton width={"70%"} style={{ margin: "auto" }} />
          <Skeleton width={"55%"} style={{ margin: "auto" }} />
        </Box>
      </Grid>
    </div>
  );
}

function BooksSection({ title }) {
  const parentUrl = window.globalPrentUrl;
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery("fetch-books" + title, () => {
    return axios.get(parentUrl+"api/v1/books/category/" + title);
  });

  if (isLoading) {
    return <SkeletonCard />;
  }

  async function userSelectedBook(title) {
    dispatch(selectedBook({ bookName: title }));
  }

  return (
    <div className="books_section ">
      <div className="trending pt-3">
        <div className="trend_see_all px-4 h-9  flex justify-between text-sm md:w-[95%] md:m-auto lg:m-auto">
          <p className="cat_title" style={{ color: "#d51912" }}>
            {title}
          </p>
          <Link to={`category/${title}`}>
          <p className="see_all" style={{ color: "#d51912" }}>
            See All
          </p>
          </Link>
        </div>
        <div className=" w-[95%] md-[90%] m-auto">
          <ul className="trending_ul flex h-64 md:h-[20em] overflow-x-scroll items-center ">
            {data?.data.map((book) => (
              <Link
                to={`/book/${book.title}`}
                key={book.title}
                className="book_sec_link mx-2 lg:mx-4 hover:transition-all hover:scale-105 duration-500"
                onClick={() => {
                  userSelectedBook(book.title);
                }}
              >
                <li className="book_li h-60 md:h-full min-w-[7em] mx-1 flex flex-col justify-between items-center text-center">
                  <img className="book_img h-24 md:h-32" src={book.image_url} />

                  <div className="book_info_container">
                    <p className="book_title min-h-10 w-32 text-wrap pt-1 text-sm font-bold text-gray-500">
                      {book.title.length > 30
                        ? book.title.substring(0, 30) + "..."
                        : book.title}
                    </p>
                    <p
                      className="author w-32 min-h-6 md:text-lg"
                      style={{ fontSize: ".8em" }}
                    >
                      {book.author.name.length > 20
                        ? book.author.name.substring(0, 20) + "..."
                        : book.author.name}
                    </p>
                    <Rating
                      value={book.rating.rating}
                      style={{ color: "#d51912", fontSize: ".8em" }}
                      name="read-only"
                      precision={0.5}
                      readOnly
                      className=" min-h-6"
                    />
                    <div
                      className="book_rating h-5"
                      style={{ fontSize: ".8em" }}
                    >
                      {book.rating.rating ? (
                        <div
                          id="book_rate"
                          className=" flex justify-center items-center bg-green-900 text-white text-center"
                        >
                          {" "}
                          <p>{book.rating.rating}</p>{" "}
                          <StarIcon
                            className="ml-1"
                            style={{ fontSize: "1em", color: "white" }}
                          />{" "}
                        </div>
                      ) : (
                        <p id="no_review">No Review Yet</p>
                      )}
                    </div>
                    <div className=" h-7 flex justify-center items-end">
                      <p className="price md:font-semibold">
                        &#8377; {book.price}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BooksSection;
