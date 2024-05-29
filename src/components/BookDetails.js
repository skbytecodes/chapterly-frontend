import FavoriteIcon from "@mui/icons-material/Favorite";
import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addItem,
  addToWishlist,
  cartTotalValue,
  wishlistTotalValue
} from "../redux/actions";
import "../styles/BookDetails.css";
import BooksSection from "./BooksSection";
import CustomerReviews from "./CustomerReviews";
import Footer from "./Footer";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import Footer1 from "./Footer1";
import Overlay from "./Overlay";

function BookDetails() {
  const parentUrl = window.globalPrentUrl;
  const { id } = useParams();
  let wishlistItems = useSelector((state) => state.wishlist.items);
  let cartItems = useSelector((state) => state.cartItems.items);
  const [itemExists, setItemsExists] = useState(false);
  let wishlistTotalAmount = useSelector((state) => state.wishlistTotal);
  const dispatch = useDispatch();
  const totalCartValue = useSelector((state) => state.totalItemsAmount);
  const [totalBookToPurchase, setTotalBookToPurchase] = useState(1);
  let intArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [showGoTocartBtn, setShowGoToCartBtn] = useState(false);

  const addToWish = useRef(null);
  const addedToWish = useRef(null);

  const {
    isLoading: isLoadingBook,
    data: book,
    isError: isErrorBook,
    error: errorBook,
  } = useQuery("fetch-bookByName-" + id, () => {
    return axios.get(parentUrl+"api/v1/bookByName/" + id);
  });

  const {
    isLoading: isLoadingRating,
    data: bookRating,
    isError: isErrorRating,
    error: isError,
  } = useQuery("fetch-bookRating-" + id, () => {
    return axios.get(parentUrl+"api/v1/book/rating/" + id);
  });

  useEffect(() => {
    const checkIfItemExist = (id) => {
      const existingItemIndex = wishlistItems.findIndex(
        (item) => item.book.title === id
      );
      if (existingItemIndex != -1) {
        setItemsExists(true);
      } else {
        setItemsExists(false);
      }
    };

    const checkIfItemExistInCart = (id) => {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.book.title === id
      );
      if (existingItemIndex != -1) {
        setShowGoToCartBtn(true);
      } else {
        setShowGoToCartBtn(false);
      }
    };
    checkIfItemExist(id);
    checkIfItemExistInCart(id);
    scrollToTop();
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const addToCart = () => {
    const bookItem = {
      title: book?.data.title,
      image: book?.data.image_url,
      price: book?.data.price,
      author: book?.data.author.name,
    };
    dispatch(addItem({ book: bookItem, count: totalBookToPurchase }));
    dispatch(
      cartTotalValue(totalCartValue + bookItem.price * totalBookToPurchase)
    );
    setShowGoToCartBtn(true);
  };

  const addBookToWishlist = () => {
    const bookItem = {
      title: book?.data.title,
      image: book?.data.image_url,
      price: book?.data.price,
      author: book?.data.author.name,
    };
    dispatch(addToWishlist({ book: bookItem, count: totalBookToPurchase }));
    dispatch(wishlistTotalValue(wishlistTotalAmount + book?.data.price));
    setItemsExists(true);
  };

  return (
    <div className="bookdetails">
      {isLoadingBook ? <Overlay /> : ""}
      <Header />
      <div className="book_container ">
        <div className="book_nav text-sm h-8  mt-1 text-app-red w-[85%] m-auto">
          <span>Home</span>
          <span>&gt;</span>
          <span>Books</span>
          <span>&gt;</span>
          <spn>{id}</spn>
        </div>

        <div className="book_text_contain">
          <div className="book_desc_div md:flex md:w-[85%] md:m-auto justify-evenly items-start md:pt-5">
            <div className="book_img_div flex justify-center py-3 md:pt-0 w-[85%] md:w-[40%] md:mt-0 m-auto  md:justify-normal">
              {isLoadingBook ? (
                <p
                  style={{
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Image Loading...
                </p>
              ) : (
                <img
                  src={book?.data.image_url}
                  className="h-[13em] rounded-md"
                />
              )}
            </div>
            <div className="book_details_container mt-2 md:mt-0  w-[85%] md:w-[80%] m-auto ">
              <div className="book_details">
                <span
                  style={{
                    color: "#d51912",
                    fontWeight: "600",
                    fontSize: "1.5em",
                  }}
                >
                  {book?.data.title}
                </span>
                <span className="text-sm">
                  {" "}
                  ({book?.data.format}) | Released: {book?.data.publicationDate}
                </span>
                <Link to={`/author/${book?.data.authorName}`}>
                <p className="text-sm">
                  By:{" "}
                  <span style={{ color: "#d51912" }}>
                    {book?.data.authorName}{" "}
                  </span>
                  (Author)
                </p>
                </Link>
                <p className="text-sm">
                  |Publisher:{" "}
                  <span style={{ color: "#d51912" }}>
                    {book?.data.publisher}
                  </span>
                </p>
                <p className="text-sm">
                  Publisher Imprint: {book?.data.publisher}
                </p>
              </div>

              <div className="ratings flex gap-2 items-center text-sm">
                {isLoadingRating ? (
                  <p>Loading...</p>
                ) : (
                  <Rating
                    value={bookRating?.data.rating}
                    style={{ color: "#d51912", fontSize: "1em" }}
                    name="read-only"
                    precision={0.5}
                    readOnly
                  />
                )}

                <p className="text-sm">
                  {bookRating?.data.rating == 0
                    ? "No Review Yet"
                    : bookRating?.data.rating}
                </p>
              </div>

              <div className="rate_ship">
                <h2 style={{ color: "#d51912", marginBottom: ".5em" }}>
                  &#8377; {book?.data.price}
                </h2>
                <h3 className="text-sm">
                  <s>M.R.P &#8377; {book?.data.price + (book?.data.price * (10/100))}</s>
                </h3>
                <div style={{ marginTop: "1em" }}>
                  <p className="text-sm">International Edition</p>
                  <p className="text-sm">
                    Ships between <b>18-20 business Days</b>
                  </p>
                  <p className="text-sm" style={{ marginTop: ".5em" }}>
                    Free shipping in India and low cost Worldwide.
                  </p>
                </div>
              </div>
              <div
                id="book_count"
                className="text-sm  flex gap-2 mt-3 md:hidden"
              >
                <p>Quantity</p>
                <select
                  value={totalBookToPurchase}
                  style={{ marginLeft: "1em", padding: "2px" }}
                  onChange={(e) => {
                    setTotalBookToPurchase(e.target.value);
                  }}
                >
                  {intArray.map((val) => (
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="buy_wish_div my-8 md:my-0 flex justify-between items-center md:flex-col w-[85%] m-auto h-12 md:h-fit md:w-fit  md:p-5 rounded-md md:space-y-2 md:border-2">
              <div
                id="item_count"
                className=" hidden md:flex gap-2"
                style={{
                  textAlign: "left",
                }}
              >
                <p className="text-sm">Quantity</p>
                <select
                  className="border text-sm"
                  value={totalBookToPurchase}
                  style={{ marginLeft: "1em", padding: "2px" }}
                  onChange={(e) => {
                    setTotalBookToPurchase(e.target.value);
                  }}
                >
                  {intArray.map((val) => (
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </div>
              {showGoTocartBtn ? (
                <Link to="/cart" className="wish_btn bg-green-600 text-white text-sm w-[48%]  text-nowrap md:w-full py-3 px-3 lg:px-10 lg:py-2 rounded text-center hover:bg-green-700 hover:transition-all hover:duration-200 hover:ease-in-out hover:scale-105">
                  <button className="">Go to Cart</button>
                </Link>
              ) : (
                <button
                  className="wish_btn text-nowrap  bg-app-red text-sm w-[48%] hover:bg-red-500 hover:transition-all hover:scale-105 lg:px-6 lg:py-2 md:w-full text-white  py-3 px-3 rounded"

                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )}

              {itemExists ? (
                <>
                  <p ref={addedToWish} className="buy_btn">
                    <FavoriteIcon id="heartbtn" sx={{ fontSize: "2em", color: "#d51912"}} />
                  </p>
                </>
              ) : (
                <>
                  <button
                    ref={addToWish}
                    onClick={addBookToWishlist}
                    className="buy_btn text-nowrap text-black w-[48%] md:w-full text-sm border border-app-red py-3 px-3 rounded hover:bg-red-500 hover:transition-all hover:scale-105 hover:text-white lg:px-6 lg:py-2"
                  >
                    Add to Wishlist
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="about_book w-[85%] m-auto text-sm">
            <h4 style={{ color: "#d51912" }}>About the Book</h4>

            <h4 style={{ marginTop: "1em", marginBottom: "1em" }}>
              {book?.data.bookIntro}
            </h4>

            <div className="book_description leading-[1.7]">
              <p>{book?.data.description}</p>
            </div>
          </div>
          <div className="md:w-[92%] md:m-auto">
            <BooksSection title="Best Seller" />
          </div>
          <div className="w-[85%] m-auto my-8">
            <ProductDetails book={book?.data} />
          </div>

          <div className="md:w-[92%] md:m-auto">
            <BooksSection title="New Arrivals" />
          </div>
          {isLoadingRating ? (
            <p>Loading...</p>
          ) : (
            <div className="w-[85%] m-auto mt-8">
              <CustomerReviews bookRating={bookRating?.data} bookTitle={id} />
            </div>
          )}
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default BookDetails;
