import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Authentication from "../components/Authentication";
import axios from "axios";
import LoginPage from "../components/LoginPage";

function ChangePassword() {
  const parentUrl = window.globalPrentUrl;

  const [oldPassword, setOldPasssword] = useState("");
  const [newPassword, setNewPasssword] = useState("");
  const [confirmPassword, setConfirmPasssword] = useState("");

  const accessToken = useSelector((state) => state.authentication.acessToken);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const changePassword = async () => {
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const response = await axios.post(
        parentUrl + "api/v1/auth/changePassword",
        data,
        { headers: headers }
      );
      
    } catch (error) {
      
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="md:bg-gray-100">
          <Header />
          <div class="container mx-auto py-8">
            <h1 class="text-2xl font-bold mb-6 text-center">Change Password</h1>
            <form class="w-full max-w-sm mx-auto bg-white p-8 rounded-md md:shadow-md">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Old Password
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-app-red"
                  type="password"
                  id="oldpassword"
                  name="oldpassword"
                  placeholder="********"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPasssword(e.target.value);
                  }}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  New Password
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-app-red"
                  type="password"
                  id="newpassword"
                  name="newpassword"
                  placeholder="********"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPasssword(e.target.value);
                  }}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-app-red"
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPasssword(e.target.value);
                  }}
                />
              </div>
              <button
                class="w-full bg-app-red text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-app-orange transition duration-300"
                type="button"
                onClick={changePassword}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default ChangePassword;
