import TuneIcon from "@mui/icons-material/Tune";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer1 from "./Footer1";
import Header from "./Header";
import Overlay from "./Overlay";

function Category() {
  const { cat } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function getBooksByCategory() {
      const response = await axios.get(
        "http://localhost:8080/api/v1/books/category/" + cat
      );
      if (response.data != null) {
        setIsLoading(false);
      }
      setBooks(response.data);
      console.log(cat, response.data);
    }
    getBooksByCategory();
      scrollToTop();
  }, [cat]);

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
    <div className="category">
      <Header />
      <div className="header_section_container">
        <div className="header_section  flex items-center w-[90%] m-auto h-[10vh] font-bold ">
          <TuneIcon id="tuneIcon" className="text-app-red"/>
          <p id="cat_title" className="ml-5 text-lg italic text-app-red">
            {cat}
          </p>
        </div>
        {/* <p id="category_desc">The Best Bites of Horror</p> */}
        <div className="books_grid_container w-[90%] m-auto grid grid-cols-3 gap-3 md:gap-10 md:grid-cols-5 mb-14 sm:mt-10">
          {books.map((book) => (
            <Link
              to={`/book/${book.title}`}
              style={{ textDecoration: "none" }}
              className="bg-gray-100 py-5 hover:transition-all hover:scale-105 duration-500"
            >
              <div
                key={book.title}
                className="book_container flex flex-col justify-center items-center"
              >
                <img src={book.image_url} className="h-24 md:h-32" />
                <p className="book_title min-h-10 pt-1 text-sm">
                  {book.title.length > 13
                    ? book.title.substring(0, 13) + "..."
                    : book.title}
                </p>
                <p
                  className="author author min-h-6 md:text-lg"
                  style={{ fontSize: ".8em" }}
                >
                  {book.author.name.length > 10
                    ? book.author.name.substring(0, 10) + "..."
                    : book.author.name}
                </p>
                <p className="price md:font-semibold">&#8377; {book.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default Category;
