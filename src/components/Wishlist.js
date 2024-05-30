import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyWishlist from "../images/empty-wishlist.png";
import {
  addItem,
  addToWishlist,
  cartTotalValue,
  deleteBookFromWishlist,
  removeFromWishlist,
  wishlistTotalValue,
} from "../redux/actions";
import Header from "./Header";
import Footer1 from "./Footer1";

function Wishlist() {
  const fontStyle = { color: "#d51912", fontWeight: "600", fontSize: "1.4em" };
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  let wishlistTotalAmount = useSelector((state) => state.wishlistTotal);
  let wishlistItems = useSelector((state) => state.wishlist.items);
  let cartItems = useSelector((state) => state.cartItems.items);
  const totalCartValue = useSelector((state) => state.totalItemsAmount);
  const addToCartBtnWish = useRef(null);
  const addedToCartBtnWish = useRef(null);
  const [wishlistTotalCount, setWishlistTotalCount] = useState(0);

  useEffect(() => {
    setItems(wishlistItems);
    updateWishlistAmountAndCount(wishlistItems);
    scrollToTop();
  }, [wishlistItems]);

  const pushItemToWishlist = async (item) => {
    dispatch(addToWishlist({ book: item, count: 1 }));
    wishlistTotalAmount = wishlistTotalAmount + item.price;
    dispatch(wishlistTotalValue(wishlistTotalAmount));
  };

  // const pullItemFromWishlist = async (item) => {
  //   if (!wishlistTotalAmount <= 0) {
  //     dispatch(removeFromWishlist({ book: item }));
  //     wishlistTotalAmount = wishlistTotalAmount - item.price;
  //     dispatch(wishlistTotalValue(0));
  //     dispatch(wishlistTotalValue(wishlistTotalAmount));
  //   }
  // };


  const pullItemFromWishlist = async (item) => {
    const existingItemIndex = wishlistItems.findIndex(
      (obj) => obj.book.title === item.title
    );

    if (existingItemIndex != -1) {
      const existingItem = wishlistItems[existingItemIndex];
      if (existingItem && existingItem.count > 0) {
        dispatch(removeFromWishlist({ book: item }));
        wishlistTotalAmount = wishlistTotalAmount - item.price;
        if (wishlistTotalAmount < 0) {
          wishlistTotalAmount = 0;
        }
        dispatch(wishlistTotalValue(wishlistTotalAmount));
      }
    }

  };


  const addToCartFromWishlist = (item) => {
    const bookItem = {
      title: item.book.title,
      image: item.book.image,
      price: item.book.price,
      author: item.book.author,
    };
    dispatch(addItem({ book: bookItem, count: item.count }));
    dispatch(cartTotalValue(totalCartValue + bookItem.price * item.count));
  };

  const isItemInCart = (obj) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.book.title === obj.book.title
    );
    if (existingItemIndex == -1) {
      return false;
    } else {
      return true;
    }
  };

  const deleteItemFromWishlist = (item) => {
    const existingItemIndex = wishlistItems.findIndex(
      (obj) => obj.book.title === item.book.title
    );

    if (existingItemIndex != -1) {
      const itemToDelete = wishlistItems[existingItemIndex];
      const wishlistTotalAmountValue =
        wishlistTotalAmount - itemToDelete.book.price * itemToDelete.count;
      dispatch(deleteBookFromWishlist(item));
      dispatch(wishlistTotalValue(wishlistTotalAmountValue));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateWishlistAmountAndCount = (items) => {
    let itemsCount = 0;
    items.map((item) => {
      itemsCount = itemsCount + item.count;
    });

    setWishlistTotalCount(itemsCount);
  };

  return (
    <div className="cart">
      <Header />
      {items.length == 0 ? (
        <div
          className="flex items-center justify-center"
          style={{ height: "87vh" }}
        >
          <div className="flex flex-col items-center">
            <img src={EmptyWishlist} className="h-64" />
            <p className="font-semibold mt-5 mb-1 text-lg">
              Your Wishlist is empty
            </p>
            <p className="text-sm text-gray-600 mb-5">
              You can go to home page to view more books
            </p>
            <Link to="/">
              <p className="bg-orange-500 w-fit py-2 px-5 font-semibold text-white">
                SEE SOME BOOKS YOU MAY LIKE
              </p>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="scrolling_div py-4  text-sm">
            {items.map((item) => (
              <div className="cart_items_container bg-gray-100 h-64 flex  my-2 px-4 py-2 w-11/12 rounded-sm m-auto">
                <div className="cart_desc_div flex  w-full">
                  <div className="flex flex-col justify-between ">
                    <div id="prod_img_div" className="">
                      <img src={item.book.image} className="h-44 rounded-md" />
                    </div>
                    <div className="control_items_btns bg-gray-200 flex justify-evenly items-center h-8 rounded-sm">
                      <RemoveIcon
                        className="opt_btns"
                        id="rem_btn"
                        sx={{
                          "@media (max-width: 768px	)": {
                            fontSize: ".8em",
                          },

                          "@media (min-width: 769px	)": {
                            fontSize: ".8em",
                          },
                        }}
                        onClick={() => {
                          pullItemFromWishlist(item.book);
                        }}
                      />
                      <p className="opt_btns text-sm">{item.count}</p>
                      <AddIcon
                        id="add_btn"
                        className="opt_btns"
                        sx={{
                          "@media (max-width: 768px	)": {
                            fontSize: ".8em",
                          },

                          "@media (min-width: 769px	)": {
                            fontSize: ".8em",
                          },
                        }}
                        onClick={() => {
                          pushItemToWishlist(item.book);
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-8/12 md:w-9/12 lg:w-11/12 xl:w-11/12 2xl:w-12/12 flex flex-col justify-between ml-3 md:ml-7 lg:ml-11 xl:ml-14 2xl:ml-19">
                    <div className="prod_desc leading-10">
                      <p
                        id="book_title"
                        style={{ fontWeight: "600", color: "gray" }}
                      >
                        {item.book.title}
                      </p>
                      <p
                        id="book_author"
                        className="text-sm"
                        style={{ fontWeight: "500", color: "gray" }}
                      >
                        By: {item.book.author}{" "}
                      </p>
                      <span id="book_price_cart" style={fontStyle}>
                        &#8377; {item.book.price.toFixed(2)}
                      </span>{" "}
                      <span id="dashed_price" style={{ paddingLeft: "0.5em" }}>
                        <s>&#8377; {}</s>
                      </span>
                    </div>

                    <div className="other_btns flex text-nowrap text-sm">
                      <p
                        id="delete_itm_btn"
                        className="bg-gray-200 h-8 px-4 rounded-sm flex items-center hover:cursor-pointer"
                        onClick={() => {
                          deleteItemFromWishlist(item);
                        }}
                      >
                        Delete
                      </p>
                      {isItemInCart(item) ? (
                        <p
                          id="wish_added_cart_btn"
                          // style={{ backgroundColor: "#d51912", color: "white" }}
                          className="bg-app-red text-white hover:cursor-pointer w-fit px-3 rounded-sm ml-2 flex items-center h-8" // px-1
                          ref={addedToCartBtnWish}
                        >
                          Added To Cart
                        </p>
                      ) : (
                        <p
                          id="save_later_btn"
                          className="bg-gray-200  hover:cursor-pointer w-fit px-3 rounded-sm ml-2 flex items-center h-8" // px-1
                          onClick={(e) => {
                            addToCartFromWishlist(item);
                          }}
                          ref={addToCartBtnWish}
                        >
                          Add to Cart
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="subtotal_container px-4 flex flex-col justify-evenly h-64 bg-gray-100 md:px-12 lg:px-14">
            <div className="order_total_div flex  justify-between">
              <p className="font-bold">Order Total</p>
              <p>
                <b>&#8377; {parseFloat(wishlistTotalAmount.toFixed(2))}</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Total Items</p>
              <p>
                <b>&#8377; {wishlistTotalCount}</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Total Gross</p>
              <p>
                <b>&#8377; {parseFloat(wishlistTotalAmount.toFixed(2))}</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Shipping (in India)</p>
              <p>
                <b>FREE</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Amount Payable</p>
              <p>
                <b>&#8377; {parseFloat(wishlistTotalAmount.toFixed(2))}</b>
              </p>
            </div>
          </div>
        </>
      )}

      <Footer1 />
    </div>
  );
}

export default Wishlist;
