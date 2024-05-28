import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import American from "../images/american-express.png";
import DinersClub from "../images/diners-club.png";
import Discover from "../images/discover.png";
import JCB from "../images/jcb.png";
import Logo from "../images/logo.png";
import Mastercard from "../images/mastercard.png";
import VisaCard from "../images/visacard.png";
import { login } from "../redux/actions";
import { isTokenExpired } from "../utils/Utils";
import Header from "./Header";
import LoginPage from "./LoginPage";
import Overlay from "./Overlay";

function Checkout() {
  const [showShippingForm, setShowShippingForm] = useState("block");
  const totalAmount = useSelector((state) => state.totalItemsAmount);
  const itemsToPurchase = useSelector((state) => state.cartItems.items);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const accessToken = useSelector((state) => state.authentication.acessToken);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const countryRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const AddressRef = useRef(null);
  const zipRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const checkIfUserIsAuthenticated = () => {
      if (isLoggedIn && !isTokenExpired(accessToken)) {
      } else {
        const auth = {
          acessToken: "",
          isLoggedIn: false,
        };
        dispatch(login(auth));
      }
    };

    checkIfUserIsAuthenticated();
  }, [isLoggedIn]);

  const submitShippingForm = (e) => {
    let isValidated = true;
    if (!(firstName.length > 3)) {
      firstNameRef.current.style.color = "#d51912";
      firstNameRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      firstNameRef.current.style.color = "gray";
      firstNameRef.current.style.borderColor = "black";
      isValidated = true;
    }
    if (!(lastName.length > 3)) {
      lastNameRef.current.style.color = "#d51912";
      lastNameRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      lastNameRef.current.style.color = "gray";
      lastNameRef.current.style.borderColor = "black";
      isValidated = true;
    }
    if (!(address.length > 5)) {
      AddressRef.current.style.color = "#d51912";
      AddressRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      AddressRef.current.style.color = "gray";
      AddressRef.current.style.borderColor = "black";
      isValidated = true;
    }
    if (!(street.length > 3)) {
      streetRef.current.style.color = "#d51912";
      streetRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      streetRef.current.style.color = "gray";
      streetRef.current.style.borderColor = "black";
      isValidated = true;
    }
    if (!(city.length > 3)) {
      cityRef.current.style.color = "#d51912";
      cityRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      cityRef.current.style.color = "gray";
      cityRef.current.style.borderColor = "black";
      isValidated = true;
    }

    if (!(state.length > 3)) {
      stateRef.current.style.color = "#d51912";
      stateRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      stateRef.current.style.color = "gray";
      stateRef.current.style.borderColor = "black";
      isValidated = true;
    }

    if (!(country.length > 3)) {
      countryRef.current.style.color = "#d51912";
      countryRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      countryRef.current.style.color = "gray";
      countryRef.current.style.borderColor = "black";
      isValidated = true;
    }
    if (!(zipcode.length > 3)) {
      zipRef.current.style.color = "#d51912";
      zipRef.current.style.borderColor = "#d51912";
      isValidated = false;
    } else {
      zipRef.current.style.color = "gray";
      zipRef.current.style.borderColor = "black";
      isValidated = true;
    }
    if (isValidated) setShowShippingForm("none");
  };

  // Payments

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    setIsLoading(true);
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // all the items to be purchased
      let notesArr = [];
      itemsToPurchase.forEach((itm) => {
        const item = {
          title: itm.book.title,
          price: itm.book.price,
          count: itm.count,
        };
        notesArr.push(item);
      });

      // shippingAddress

      const shippingAddress = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        street: street,
        city: city,
        state: state,
        country: country,
        pinCode: zipcode,
      };

      // creating a new order
      const data = {
        amount: totalAmount.toFixed(2),
        notes: notesArr,
        shippingAddress: shippingAddress,
      };

      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const result = await axios.post(
        "http://localhost:8080/api/v1/order/createOrder",
        data,
        { headers: headers }
      );

      if (result != null) {
        setIsLoading(false);
      }

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_ZEjXTEe2VFxVYo", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Chapterly",
        description: "Test Transaction",
        image: { Logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await axios.post(
            "http://localhost:8080/api/v1/payment/success",
            data,
            { headers: headers }
          );
          if (result.data == "SUCCESS") {
            window.location.href = "/";
          } else {
            window.location.href = "/error";
          }
        },
        prefill: {
          method: "card",
        },
        notes: {
          address: "Skbytecodes",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      if (error.response.status == "401" || error.response.status == "403") {
        window.location.href = "/login";
      } else {
        window.location.href = "/error";
      }
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="shipping relative">
          {isLoading ? <Overlay /> : ""}

          <Header />
          <div className="shipping_add_container px-5 lg:w-[90%] lg:m-auto text-sm md:max-h-[84vh]">
            <div className="w-[90%] m-auto md:flex md:w-[100%] md:justify-between">
              <div className="shipping_address text-sm  md:w-[40%]">
                <div className="">
                  <h4 className="font-semibold text-gray-600">
                    Shipping Address
                  </h4>
                </div>

                <div className=" " style={{ display: `${showShippingForm}` }}>
                  <form className="shipping_form min-h-[53vh] flex flex-col justify-evenly  xl:min-h-[60vh]">
                    {" "}
                    {/* md:min-h-[35vh] lg:min-h-[38vh] */}
                    <input
                      className="px-2 py-2 rounded-sm  bg-gray-100 outline-none"
                      ref={firstNameRef}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      type="text"
                      placeholder="First Name *"
                    />
                    <input
                      className="px-2 py-2 rounded-sm  bg-gray-100 outline-none"
                      ref={lastNameRef}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      type="text"
                      placeholder="Last Name *"
                    />
                    <input
                      className="px-2 py-2 rounded-sm  bg-gray-100 outline-none"
                      ref={AddressRef}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      type="text"
                      placeholder="Address *"
                    />
                    <input
                      className="px-2 py-2  bg-gray-100 outline-none"
                      ref={streetRef}
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                      type="text"
                      placeholder="Street Address *"
                    />
                    <input
                      className="px-2 py-2 rounded-sm  bg-gray-100 outline-none"
                      ref={cityRef}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      type="text"
                      placeholder="City *"
                    />
                    <input
                      className="px-2 py-2 rounded-sm  bg-gray-100 outline-none"
                      ref={stateRef}
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      type="text"
                      placeholder="State *"
                    />
                    <input
                      className="px-2 py-2 rounded-sm  bg-gray-100 outline-none"
                      ref={countryRef}
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      type="text"
                      placeholder="Country *"
                    />
                    <input
                      className="px-2 py-2 rounded-sm bg-gray-100 outline-none"
                      ref={zipRef}
                      value={zipcode}
                      onChange={(e) => {
                        setZipcode(e.target.value);
                      }}
                      type="text"
                      placeholder="Zip Code *"
                    />
                    {/* <input
                    ref={phoneRef}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="text"
                    placeholder="Phone Number *"
                  /> */}
                  </form>
                  <button
                    className="ship_add_continue px-2 py-2 rounded-sm mt-4 bg-green-800 text-white w-full hover:bg-green-700 hover:transition-all hover:duration-200 hover:ease-in-out hover:scale-105"
                    onClick={submitShippingForm}
                  >
                    <p>Continue</p>
                  </button>
                </div>

                {showShippingForm == "none" ? (
                  <div className="shipping_final_address">
                    <p>{`${firstName} ${lastName}`}</p>
                    <p>{`${address}`}</p>
                    <p>{street}</p>
                    <p>{`${city} ${country} ${zipcode}`}</p>
                    <p>{country}</p>
                    <p>{phone}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* <div className="order_details">
            <h4>2. Cart Items</h4>
              <div className="order_item_container">
                <div className="order_img_desc">
                  <div className="order_item_img">
                    <img src={LocalBook} />
                  </div>
                  <div className="order_item_desc">
                    <p style={{fontWeight:600}}>Book name</p>
                    <p>Qty : 2</p>
                    <p>Price : &#8377; 1000</p>
                  </div>
                </div>
                <div className="order_itm_total_div">
                  <p style={{fontWeight:600}}>Total</p>
                  <p>&#8377; 2000</p>
                </div>
              </div>
            </div> */}

              <div className="payment_details_div  md:w-[50%] md:max-h-[84vh] md:overflow-y-scroll">
                <div className="order_details mt-[10vh] md:mt-0">
                  <div className="md:mb-[3vh]">
                    <h4 className="font-semibold text-gray-600">
                      Order Details
                    </h4>
                  </div>
                  {itemsToPurchase.map((item) => (
                    <div className="order_item_container flex justify-between mb-5  ">
                      <div className="order_img_desc  flex gap-3">
                        <div className="order_item_img">
                          <img
                            src={item.book.image}
                            className="h-[5em] rounded-sm"
                          />
                        </div>
                        <div className="order_item_desc">
                          <p style={{ fontWeight: 600 }}>{item.book.title}</p>
                          <p>Qty : {item.count}</p>
                          <p>Price : &#8377; {item.book.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="order_itm_total_div">
                        <p style={{ fontWeight: 600 }}>Total</p>
                        <p>
                          &#8377; {(item.count * item.book.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="final_order  space-y-2 mt-[10vh] md:mt-[5vh] xl:mt-[7vh]">
                  <div
                    className="flex justify-between items-center"
                    style={{ fontWeight: 600 }}
                  >
                    <p className="">Subtotal</p>
                    <p>&#8377; {parseFloat(totalAmount).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <p>Delivery Fee</p>
                    <p>&#8377; {parseFloat(0).toFixed(2)}</p>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    style={{ fontWeight: 600 }}
                  >
                    <p>Total to pay</p>
                    <p>&#8377; {parseFloat(totalAmount).toFixed(2)}</p>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-500 mt-[10vh] md:mt-[5vh]">
                  Payment Details
                </h4>
                {/* {showShippingForm == "block" ? ( */}
                <div className="payment_div ">
                  <div className="card_type_div flex justify-evenly items-center  h-[6vh]">
                    <img className="h-[2em]" src={American} />
                    <img className="h-[1.5em]" src={JCB} />
                    <img className="h-[1.5em]" src={Mastercard} />
                    <img className="h-[1.5em]" src={VisaCard} />
                    <img className="h-[1.5em]" src={Discover} />
                    <img className="h-[1.5em]" src={DinersClub} />
                  </div>
                  <div className="card_details_div mb-10">
                    {/* <form className="card_details_form">
                        <input type="text" placeholder="Card Number *" />
                        <input type="text" placeholder="Name on Card *" />
                        <div className="card_exp_div">
                          <input
                            id="exp_month"
                            type="text"
                            placeholder="Exp. Month *"
                          />
                          <input
                            id="exp_year"
                            type="text"
                            placeholder="Exp. Year *"
                          />
                        </div>
                        <input
                          id="security_code"
                          type="text"
                          placeholder="Security Code *"
                        />
                      </form> */}
                    {showShippingForm == "none" ? (
                      <div
                        className="checkoutBtn bg-green-800 mt-7 hover:bg-green-700 hover:transition-all hover:duration-200 hover:ease-in-out hover:scale-105"
                        onClick={displayRazorpay}
                      >
                        <button className="p-2 py-2 w-full rounded-sm  text-white">
                          Checkout
                        </button>
                      </div>
                    ) : (
                      ""
                    )}

                    {/* <div className="other_ways_pay">
                    <div className="other_way_text_div">
                      <h5>OTHER WAYS TO PAY</h5>
                    </div>
                    <div className="paypal_visa_div">
                    <div className="paypal_way" onClick={displayRazorpay}>
                      <img src={Paypal} />
                      <span> Checkout</span>
                    </div>
                    <div className="visa_way">
                      <img src={Visa} />
                    </div>
                  </div>
                  </div> */}
                  </div>
                </div>
                {/* ) : (
                ""
              )} */}
              </div>
            </div>
            {/* <div className="order_total_final">
            <p>ORDER TOTAL</p>
            <p>&#8377; {totalAmount}</p>
          </div> */}
            {/* <Footer /> */}
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default Checkout;
