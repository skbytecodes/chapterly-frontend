import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer1 from "../components/Footer1";
import Header from "../components/Header";
import Overlay from "../components/Overlay";

function SearchedBooks() {
  const { key } = useParams();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true)
    const searchKey = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/search/books/" + key
        );
        setBooks(response.data);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        window.location.href = "/error";
      }
    };
    searchKey();
  }, [key]);

  // const {isLoading, data : books} = useQuery("search-book-key", () => {
  //   return axios.get("http://localhost:8080/api/v1/search/books/" + key);
  // },{
  //   staleTime: 2,
  // })

  if (isLoading) {
    return <Overlay />;
  }

  return (
    <div className="searched_books">
      <Header />
      <div className=" h-[10dvh] flex justify-center items-end font-semibold">
        <p id="category_desc">{`Search Results for "${key}"`}</p>
      </div>
      <div className="books_grid_container  w-[90%] m-auto grid grid-cols-3 md:gap-10 md:grid-cols-5 mb-14 mt-10">
        {books?.map((book) => (
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
                className="author min-h-6 md:text-lg"
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
      <Footer1 />
    </div>
  );
}

export default SearchedBooks;
