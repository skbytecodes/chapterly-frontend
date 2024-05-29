import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Phone } from "@mui/icons-material";
import Authentication from "../components/Authentication";
import LoginPage from "../components/LoginPage";
import { login } from "../redux/actions";
import { isTokenExpired } from "../utils/Utils";

function PersonalSetting() {
  const parentUrl = window.globalPrentUrl;

  const accessToken = useSelector((state) => state.authentication.acessToken);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    async function setUpdatedData() {
      try {
        const headers = {
          Authorization: "Bearer " + accessToken,
        };
        const data = await axios.get(
          parentUrl + "api/v1/user/personalDetails",
          {
            headers: headers,
          }
        );
        setFirstname(data?.data.firstName);
        setLastname(data?.data.lastName);
        setEmail(data?.data.email);
        setPhone(data?.data.phone);
  
      } catch (error) {
       const auth = {
          acessToken: "",
          isLoggedIn: false,
        };
        dispatch(login(auth));
        window.location.href = "/error";
      }
      
    }

    if (isLoggedIn && !isTokenExpired(accessToken)) {
      setUpdatedData();
    } else {
      const auth = {
        acessToken: "",
        isLoggedIn: false,
      };
      dispatch(login(auth));
    }
  }, [isLoggedIn]);

  const updatePerosnalDetails = async () => {
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
    };
    try {
      const response = await axios.put(
        parentUrl + "api/v1/user/updatePersonalSetting/" + email,
        data,
        { headers: headers }
      );
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="container">
          <Header />
          <div className="h-[10vh] w-[80%] lg:w-[45%] m-auto flex flex-col justify-end">
            <h1 className="md:text-2xl font-bold italic">Personal Settings</h1>
          </div>
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px] rounded-md md:shadow-md p-5">
              <form>
                <div class="mb-5">
                  <label
                    for="name"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
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
                    name="lname"
                    id="lname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="subject"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div>
                  <button
                    class="hover:shadow-form rounded-md bg-app-red py-3 px-8 text-base font-semibold text-white outline-none"
                    onClick={updatePerosnalDetails}
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

export default PersonalSetting;
