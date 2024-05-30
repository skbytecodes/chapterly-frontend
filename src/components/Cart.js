import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyCart from "../images/empty-cart.png";
import {
  addItem,
  cartTotalValue,
  deleteBookFromCart,
  removeItem,
} from "../redux/actions";
import Header from "./Header";
import Footer1 from "./Footer1";

function Cart() {
  const fontStyle = { color: "#d51912", fontWeight: "600" };
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  let itemsTotalAmount = useSelector((state) => state.totalItemsAmount);
  let itemsState = useSelector((state) => state.cartItems.items);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTotalCount, setCartTotalCount] = useState(0);

  useEffect(() => {
    setItems(itemsState);
    updateCartAmountAndCount(itemsState);
  }, [itemsState]);

  const pushItem = async (item) => {
    dispatch(addItem({ book: item, count: 1 }));
    itemsTotalAmount = itemsTotalAmount + item.price;
    dispatch(cartTotalValue(itemsTotalAmount));
  };

  // const pullItem = async (item) => {
  //   if (!itemsTotalAmount <= 0) {
  //     dispatch(removeItem({ book: item }));
  //     itemsTotalAmount = itemsTotalAmount - item.price;

  //     dispatch(cartTotalValue(0));
  //     dispatch(cartTotalValue(itemsTotalAmount));
  //   }
  // };

  const pullItem = async (item) => {
    const existingItemIndex = itemsState.findIndex(
      (obj) => obj.book.title === item.title
    );

    if (existingItemIndex != -1) {
      const existingItem = itemsState[existingItemIndex];
      if (existingItem && existingItem.count > 0) {
        dispatch(removeItem({ book: item }));
        itemsTotalAmount = itemsTotalAmount - item.price;
        if (itemsTotalAmount < 0) {
          itemsTotalAmount = 0;
        }
        dispatch(cartTotalValue(itemsTotalAmount));
      }
    }
  };

  const deleteItemFromCart = (item) => {
    const existingItemIndex = itemsState.findIndex(
      (obj) => obj.book.title === item.book.title
    );

    if (existingItemIndex != -1) {
      const itemToDelete = itemsState[existingItemIndex];
      const cartTotalAmount =
        itemsTotalAmount - itemToDelete.book.price * itemToDelete.count;
      dispatch(deleteBookFromCart(item));
      dispatch(cartTotalValue(cartTotalAmount));
    }
  };

  const updateCartAmountAndCount = (items) => {
    let itemsCount = 0;
    items.map((item) => {
      itemsCount = itemsCount + item.count;
    });

    setCartTotalCount(itemsCount);
    setCartTotal(itemsTotalAmount);
    // dispatch(cartTotalValue(cartTotalAmount));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
            <img src={EmptyCart} className="h-64" />
            <p className="font-semibold mt-5 mb-1 text-lg">
              Your cart is empty
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
          <div className="scrolling_div py-4  ">
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
                          pullItem(item.book);
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
                          pushItem(item.book);
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
                        <s>&#8377; {(item.book.price + (item.book.price * (10/100))).toFixed(2)}</s>
                      </span>
                    </div>

                    <div className="other_btns flex text-nowrap text-sm">
                      <p
                        id="delete_itm_btn"
                        className="bg-gray-200 h-8 px-4 rounded-sm flex items-center hover:cursor-pointer"
                        onClick={() => {
                          deleteItemFromCart(item);
                        }}
                      >
                        Delete
                      </p>
                      <p
                        id="save_later_btn"
                        className="bg-gray-200  hover:cursor-pointer w-fit px-1 rounded-sm ml-2 flex items-center h-8"
                      >
                        Save for later
                      </p>
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
                <b>&#8377; {parseFloat(itemsTotalAmount).toFixed(2)}</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Total Items</p>
              <p>
                <b>{cartTotalCount}</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Total Gross</p>
              <p>
                <b>&#8377; {parseFloat(itemsTotalAmount).toFixed(2)}</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Shipping (in India)</p>
              <p>
                {/* <b>&#8377; {parseFloat(100).toFixed(2)}</b> */}
                <b>FREE</b>
              </p>
            </div>
            <div className="order_total_div flex justify-between">
              <p>Amount Payable</p>
              <p>
                <b>&#8377; {parseFloat((cartTotal).toFixed(2))}</b>
              </p>
            </div>
            <div className="cont_check_container   text-white h-10 md:flex md:justify-end">
              <Link
                to="/checkout"
                style={{ textDecoration: "none", display: "block" }}
                className="cont_checkout h-10"
              >
                <div className="checkout-divider h-full bg-app-red md:px-4 flex justify-center items-center hover:transition-all hover:duration-200 hover:ease-in-out hover:scale-105 ">
                  <button className="checkout-text">
                    CONTINUE TO CHECKOUT
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      <Footer1 />
    </div>
  );
}

export default Cart;
