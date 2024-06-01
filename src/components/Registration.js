import React, { useEffect, useRef, useState } from "react";
import NoNavHeader from "./NoNavHeader";
import "../styles/Authentication.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/Utils";

function Registration() {
  const parentUrl = window.globalPrentUrl;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  const loginPasswordText = useRef(null);
  const invalidCredentialsRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const registerEmailRef = useRef(null);

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const accessToken = useSelector((state) => state.authentication.acessToken);
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkIfUserIsAuthenticated = () => {
  //     if (isLoggedIn && !isTokenExpired(accessToken)) {
  //       navigate(-1);
  //     } else {
  //       const auth = {
  //         acessToken: "",
  //         isLoggedIn: false,
  //       };
  //       dispatch(login(auth));
  //     }
  //   };
    
  //   checkIfUserIsAuthenticated();
  // }, [isLoggedIn]);



  const validateRegisterEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailCorrect = regex.test(email);
    if (!isEmailCorrect) {
      registerEmailRef.current.style.color = "red";
      setEmail(email);
      
      return false;
    } else {
      registerEmailRef.current.style.color = "black";
      setEmail(email);
      
      return true;
    }
  };

  const validateRegisterPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordCorrect = regex.test(password);
    if (!isPasswordCorrect) {
      loginPasswordText.current.style.display = "block";
      loginPasswordText.current.style.color = "red";
      setPassword(password);
      
      return false;
    } else {
      loginPasswordText.current.style.display = "none";
      setPassword(password);
      
      return true;
    }
  };

  const validateFirstName = (firstname) => {
    if (firstname != null && firstname.length >= 3) {
      firstnameRef.current.style.color = "black";
      setFirstname(firstname);
      
      return true;
    } else {
      firstnameRef.current.style.color = "red";
     
      setFirstname(firstname);
      return false;
    }
  };

  const validateLastName = (lastname) => {
    if (lastname != null && lastname.length >= 3) {
      lastnameRef.current.style.color = "black";
      setLastname(lastname);
     
      return true;
    } else {
      lastnameRef.current.style.color = "red";
      
      setLastname(lastname);
      return false;
    }
  };

  const validateIndianPhoneNumber = (phoneNumber) => {
    const regex = /^(?:0)?[6-9]\d{9}$/;
    const isPhoneNumberCorrect = regex.test(phoneNumber);
    if (!isPhoneNumberCorrect) {
      setPhone(phoneNumber);
      
      return false;
    } else {
      
      setPhone(phoneNumber);
      return true;
    }
  };

  const validateIndianPincode = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    if (
      pincode !== null &&
      pincode !== undefined &&
      pincodeRegex.test(pincode)
    ) {
      setPincode(pincode);
      
      return true;
    } else {
      
      setPincode(pincode);
      return false;
    }
  };

  const validateStreet = (text) => {
    if (text !== null && text !== undefined && text.trim().length >= 3) {
      setStreet(text);
      return true;
    } else {
      setStreet(text);
      return false;
    }
  };

  const validateHouse = (text) => {
    if (text !== null && text !== undefined && text.trim().length >= 3) {
      setHouse(text);
      
      return true;
    } else {
      
      setHouse(text);
      return false;
    }
  };

  const validateState = (text) => {
    if (text !== null && text !== undefined && text.trim().length >= 3) {
      setState(text);
      
      return true;
    } else {
      
      setState(text);
      return false;
    }
  };

  const validateCity = (text) => {
    if (text !== null && text !== undefined && text.trim().length >= 3) {
      setCity(text);
      
      return true;
    } else {
     
      setCity(text);
      return false;
    }
  };

  const validateCountry = (text) => {
    if (text !== null && text !== undefined && text.trim().length >= 3) {
      setCountry(text);
     
      return true;
    } else {
      
      setCountry(text);
      return false;
    }
  };

  const userRegistration = async (e) => {
    if (
      validateRegisterEmail(email) &&
      validateRegisterPassword(password) &&
      validateFirstName(firstname) &&
      validateLastName(lastname) &&
      validateIndianPhoneNumber(phone) &&
      validateIndianPincode(pincode) &&
      validateHouse(house) &&
      validateStreet(street)
    ) {
      try {
        const data = {
          firstName: firstname,
          lastName: lastname,
          email: email,
          pwd: password,
          phone: phone,
          address : {
            houseNo : house,
            street : street,
            city : city,
            state : state,
            country : country,
            pinCode : pincode
          }
        }

        let formaData = new FormData();
        formaData.append("data", JSON.stringify(data));

        const response = await axios.post(
          parentUrl + "api/v1/register",
          formaData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        dispatch(
          login({ acessToken: response.access_token, isLoggedIn: true })
        );
        navigate(-1);
      } catch (error) {
        invalidCredentialsRef.current.style.display = "block";
        invalidCredentialsRef.current.style.color = "red";
      }
    } else {
      alert("error");
    }
  };

  return (
    <div>
      <NoNavHeader />
      <div className="registration">
        <div className="h-20 flex items-center justify-center text-2xl font-semibold">
          <p className="text-blue-950">Sign Up</p>
        </div>
        <div class="flex items-center justify-center">
          <div class="mx-5 md:mx-auto w-full max-w-[550px] bg-white rounded-md p-5 md:p-16 mb-10">
            <div>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  ref={firstnameRef}
                  onChange={(e) => {
                    validateFirstName(e.target.value);
                  }}
                  placeholder="First Name"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  ref={lastnameRef}
                  onChange={(e) => {
                    validateLastName(e.target.value);
                  }}
                  placeholder="Last Name"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="name"
                  id="name"
                  ref={registerEmailRef}
                  onChange={(e) => {
                    validateRegisterEmail(e.target.value);
                  }}
                  placeholder="Email"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    validateRegisterPassword(e.target.value);
                  }}
                  placeholder="Password"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              {/* password alert */}
              <div className="log_div ">
                <p className="hidden" ref={loginPasswordText}>
                  * one lowercase letter, one uppercase letter, one number, and
                  one special character with length of 8 characters
                </p>
                <p ref={invalidCredentialsRef} style={{ display: "none" }}>
                  {" "}
                  *Invalid credentials
                </p>
              </div>

              {/*  */}

              <div class="mb-5">
                <label
                  for="phone"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={(e) => {
                    validateIndianPhoneNumber(e.target.value);
                  }}
                  placeholder="Enter your phone number"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="mb-5 pt-3">
                <label class="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Address Details
                </label>
                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <input
                        type="text"
                        name="area"
                        id="area"
                        placeholder="House"
                        onChange={(e) => {
                          validateHouse(e.target.value);
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Street"
                        onChange={(e) => {
                          validateStreet(e.target.value);
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <input
                        type="text"
                        name="state"
                        id="city"
                        placeholder="City"
                        onChange={(e) => {
                          validateCity(e.target.value);
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <input
                        type="text"
                        name="post-code"
                        id="post-code"
                        placeholder="State"
                        onChange={(e) => {
                          validateState(e.target.value);
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <input
                        type="text"
                        name="post-code"
                        id="post-code"
                        placeholder="Country"
                        onChange={(e) => {
                          validateCountry(e.target.value);
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <input
                        type="text"
                        name="post-code"
                        id="post-code"
                        placeholder="Pincode"
                        onChange={(e) => {
                          validateIndianPincode(e.target.value);
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div onClick={userRegistration}>
                <button class="hover:shadow-form w-full rounded-md bg-app-red py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Sign Up
                </button>
              </div>


              <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Already have an account?</span>
              <Link to="/login">
              <p
                class="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign In
              </p>
              </Link>
            </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
