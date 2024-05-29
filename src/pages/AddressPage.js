import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Authentication from "../components/Authentication";
import LoginPage from "../components/LoginPage";
import { login } from "../redux/actions";
import { isTokenExpired } from "../utils/Utils";

function AddressPage() {
  const parentUrl = window.globalPrentUrl;

  const accessToken = useSelector((state) => state.authentication.acessToken);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useDispatch();
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const parentUrl = window.globalPrentUrl;
    async function setPersonalAddress() {
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      const data = await axios.get(
        parentUrl + "api/v1/address/personalAddress",
        {
          headers: headers,
        }
      );

      console.log("myyyy dataaaaaaaa ", data);

      setHouse(data?.data.houseNo);
      setStreet(data?.data.street);
      setCity(data?.data.city);
      setState(data?.data.state);
      setCountry(data?.data.country);
      setPincode(data?.data.pinCode);
    }

    // if (accessToken) {
    //   setPersonalAddress();
    // }
    if (isLoggedIn && !isTokenExpired(accessToken)) {
      setPersonalAddress();
    } else {
      const auth = {
        acessToken: "",
        isLoggedIn: false,
      };
      dispatch(login(auth));
    }
  }, [isLoggedIn]);

  const updatePerosnalAddress = async () => {
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    const data = {
      houseNo: house,
      street: street,
      city: city,
      state: state,
      country: country,
      pinCode: pincode,
    };
    try {
      const response = await axios.put(
        parentUrl + "api/v1/address/updatePersonalAddress",
        data,
        { headers: headers }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="container">
          <Header />
          <div className="h-[10vh] w-[80%] lg:w-[45%] m-auto flex flex-col justify-end">
            <h1 className="md:text-2xl font-bold italic">Update Address</h1>
          </div>
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px] rounded-md md:shadow-md p-5">
              <form>
                <div class="mb-5">
                  <label
                    for="name"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    House No
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="House No"
                    value={house}
                    onChange={(e) => {
                      setHouse(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="name"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="subject"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={state}
                    placeholder="State"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="subject"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                    }}
                    placeholder="Pincode"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="subject"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    placeholder="Country"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div>
                  <button
                    class="hover:shadow-form rounded-md bg-app-red py-3 px-8 text-base font-semibold text-white outline-none"
                    onClick={updatePerosnalAddress}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default AddressPage;
