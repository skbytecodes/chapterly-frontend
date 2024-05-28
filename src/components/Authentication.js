import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../images/booklogo.png";
import FaceboookLogo from "../images/facebook.png";
import GoogleLogo from "../images/google-logo.png";
import { login } from "../redux/actions";
import "../styles/Authentication.css";
import NoNavHeader from "./NoNavHeader";

function Authentication() {
  const dispatch = useDispatch();
  const registerPage = useRef(null);
  const loginPage = useRef(null);
  const loginEmailRef = useRef(null);
  const registerEmailRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const loginPasswordText = useRef(null);
  const invalidCredentialsRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  const showRegisrationPage = () => {
    registerPage.current.style.display = "block";
    loginPage.current.style.display = "none";
  };
  const showLoginPage = () => {
    registerPage.current.style.display = "none";
    loginPage.current.style.display = "block";
  };

  const validateEmail = (val) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailCorrect = regex.test(email);
    if (!isEmailCorrect) {
      loginEmailRef.current.style.color = "red";
      setEmail(val);
      return false;
    } else {
      loginEmailRef.current.style.color = "black";
      setEmail(val);
      return true;
    }
  };

  // const validatePassword = (password) => {

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordCorrect = regex.test(password);
    if (!isPasswordCorrect) {
      loginPasswordText.current.style.display = "block";
      loginPasswordText.current.style.color = "red";
      // setPassword(password);
      return false;
    } else {
      loginPasswordText.current.style.display = "none";
      // setPassword(password);
      return true;
    }
  };

  const userLogin = async () => {
    if (!validatePassword()) {
      return;
    }
    invalidCredentialsRef.current.style.display = "none";
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/authenticate",
          {
            email: email,
            password: password,
          }
        );
        const auth = {
          acessToken: response.data.access_token,
          isLoggedIn: true,
        };
        console.log("Auth ", auth);
        dispatch(login(auth));
      } catch (error) {
        invalidCredentialsRef.current.style.display = "block";
        invalidCredentialsRef.current.style.color = "red";
      }
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

  const userRegistration = async () => {
    if (
      validateRegisterEmail(email) &&
      validateRegisterPassword(password) &&
      validateFirstName(firstname) &&
      validateLastName(lastname)
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/register",
          {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }
        );
        console.log("access token ", response);
        dispatch(
          login({ acessToken: response.access_token, isLoggedIn: true })
        );
      } catch (error) {
        invalidCredentialsRef.current.style.display = "block";
        invalidCredentialsRef.current.style.color = "red";
      }
    }
  };

  return (
    <div className="authentication">
      <NoNavHeader />
      <div className="auth_container h-[90vh]  flex justify-center items-center">
        <div
          className="login_container bg-white w-[90%] sm:w-[65%] md:w-[50%] lg:w-[35%] xl:w-[25%] m-auto px-3 py-7 rounded-md text-sm"
          ref={loginPage}
        >
          <div className="login_heading  text-center  flex items-center justify-center pr-12 ">
            <div className="">
              <img src={Logo} id="log_img " className="size-10" />
            </div>
            <p className="text-xl font-semibold pl-3">Login</p>
          </div>
          <div className="login_inp_container  flex flex-col h-[18vh] justify-evenly">
            <input
              className="p-2 rounded-sm outline-none bg-gray-100"
              ref={loginEmailRef}
              type="text"
              value={email}
              onChange={(e) => {
                validateEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              className="p-2 rounded-sm outline-none bg-gray-100"
              type="password"
              value={password}
              onChange={(e) => {
                // validatePassword(e.target.value);
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <div className="log_div ">
            <p className="hidden" ref={loginPasswordText}>
              * one lowercase letter, one uppercase letter, one number, and one
              special character with length of 8 characters
            </p>
            <p ref={invalidCredentialsRef} style={{ display: "none" }}>
              {" "}
              *Invalid credentials
            </p>
          </div>
          <div
            className="forgot_password mt-4 mb-2 text-center"
            style={{ color: "#d51912" }}
          >
            <p>Forgot password?</p>
          </div>
          <div className="login_btn" onClick={userLogin}>
            <button className="bg-app-red px-3 py-2 text-white w-full rounded hover:duration-200 hover:bg-red-500 hover:ease-in-out">
              Login
            </button>
          </div>
          <div className="goto_register_div text-center mt-2">
            <p>
              Don't have an account?{" "}
              <span
                id="changeToSingup"
                style={{ color: "#d51912" }}
                onClick={showRegisrationPage}
              >
                Signup
              </span>
            </p>
          </div>
          <div className="or_div ">
            <p className="text-center mt-2">Or</p>
          </div>
          <div className="Oauth_containe min-h-[15vh] flex flex-col justify-evenly">
            <button
              className="fb_auth_login auth_login px-3 py-2 space-x-1"
              style={{ backgroundColor: "#1877f2" }}
            >
              <img className="h-[2em]" src={FaceboookLogo} />
              <p id="loginfb" className="">
                Login with Facebook
              </p>
            </button>

            <button
              className="google_auth_login auth_login px-3 py-2 mt-3 space-x-1"
              style={{ backgroundColor: "#ffc107" }}
            >
              <img className="h-[1.7em]" src={GoogleLogo} />
              <p id="logingoogle" className="">
                Login with Google
              </p>
            </button>
          </div>
        </div>

        <div
          ref={registerPage}
          // className="register_container bg-white w-[90%] sm:w-[65%] md:w-[50%] lg:w-[35%] xl:w-[25%] m-auto px-3 py-7 rounded-md text-sm"
          className="register_container bg-white w-[90%] sm:w-[65%] md:w-[50%] xl:w-[25%] m-auto px-3 py-7 rounded-md text-sm"
          style={{ display: "none" }}
        >
          <div className="login_heading  text-center  flex items-center justify-center pr-12 ">
            <div className="">
              <img src={Logo} id="log_img " className="size-10" />
            </div>
            <p className="text-xl font-semibold pl-3">Login</p>
          </div>

          <div className="register_inp_container flex flex-col h-[30vh] justify-evenly ">
            <input
              className="p-2 rounded-sm outline-none bg-gray-100"
              ref={firstnameRef}
              type="text"
              placeholder="Firstname"
              onChange={(e) => {
                validateFirstName(e.target.value);
              }}
            />
            <input
              className="p-2 rounded-sm outline-none bg-gray-100"
              ref={lastnameRef}
              type="text"
              placeholder="Lastname"
              onChange={(e) => {
                validateLastName(e.target.value);
              }}
            />
            {/* <input
              ref={username}
              type="text"
              placeholder="Username"
              onChange={(e) => {
                validateUsername(e.target.value);
              }}
            /> */}
            <input
              className="p-2 rounded-sm outline-none bg-gray-100"
              ref={registerEmailRef}
              type="text"
              placeholder="Email"
              onChange={(e) => {
                validateRegisterEmail(e.target.value);
              }}
            />
            <input
              className="p-2 rounded-sm outline-none bg-gray-100"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                validateRegisterPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <p
              className="text-sm hidden"
              ref={registerPasswordRef}
              style={{ display: "none" }}
            >
              * one lowercase letter, one uppercase letter, one number, and one
              special character with length of 8 characters
            </p>
          </div>
          <div
            className="forgot_password mt-4 mb-2 text-center"
            style={{ color: "#d51912" }}
          >
            <p>Forgot password?</p>
          </div>
          <div className="login_btn text-sm" onClick={userRegistration}>
            <button className="bg-app-red px-3 py-2 text-white w-full rounded hover:duration-200 hover:bg-red-500 hover:ease-in-out">
              Sign up
            </button>
          </div>
          <div className="goto_register_div text-center mt-2">
            <p>
              Existing User?{" "}
              <span
                id="gotologinpage"
                style={{ color: "#d51912" }}
                onClick={showLoginPage}
              >
                Login
              </span>
            </p>
          </div>

          <div className="or_div text-center">
            <p className="text-center mt-2">Or</p>
          </div>


          <div className="Oauth_container min-h-[15vh] flex flex-col justify-evenly">
            <button
              className="fb_auth_login auth_login px-3 py-2 space-x-1"
              style={{ backgroundColor: "#ffc107" }}
            >
              <img className="h-[2em]" src={FaceboookLogo} />
              <p id="loginfb" className="">
                Login with Facebook
              </p>
            </button>

            <button
              className="google_auth_login auth_login px-3 py-2 mt-3 space-x-1"
              style={{ backgroundColor: "#1877f2" }}
            >
              <img className="h-[1.7em]" src={GoogleLogo} />
              <p id="logingoogle" className="">
                Login with Google
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
