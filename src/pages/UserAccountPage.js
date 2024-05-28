import React from "react";
import Header from "../components/Header";
import PSettings from "../images/psetting.jpg";
import Address from "../images/myaddress.jpg";
import MyOrders from "../images/myorders.jpg";
import MyWishlist from "../images/mywishlist.jpg";
import MyGift from "../images/gift.jpg";
import Password from "../images/changepassword.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../components/LoginPage";

function UserAccountPage() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Header />
          <div className="flex-col flex justify-end w-[80%] m-auto mt-8 mb-4 lg:mb-0 sm:mt-[5vh] ">
            <h1 class="text-lg md:text-2xl font-bold italic">My Account</h1>
          </div>
          <section class="bg-white  py-24 px-4 lg:px-16">
            <div class="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
              <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
                <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <Link to="/personalSetting" class="block">
                    <div class="h-28">
                      <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                        <img
                          src={PSettings}
                          class="w-20 h-20  mt-12 m-auto"
                          alt="Automotive"
                          title="Automotive"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                    </div>
                    <div class="p-6   z-10 w-full   ">
                      <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                        Personal Settings
                      </p>
                    </div>
                  </Link>
                </div>

                <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <Link to="/myorders" class="block">
                    <div class="h-28">
                      <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                        <img
                          src={MyOrders}
                          class="w-20 h-20  mt-12 m-auto"
                          alt="Toys and Baby Products"
                          title="Toys and Baby Products"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                    </div>
                    <div class="p-6   z-10 w-full   ">
                      <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                        My Orders
                      </p>
                    </div>
                  </Link>
                </div>

                <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <Link to="/wishlist" class="block">
                    <div class="h-28">
                      <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                        <img
                          src={MyWishlist}
                          class="w-20 h-20  mt-12 m-auto"
                          alt="Medical"
                          title="Medical"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                    </div>
                    <div class="p-6   z-10 w-full   ">
                      <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                        My Wishlist
                      </p>
                    </div>
                  </Link>
                </div>

                <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <a href="#" class="block">
                    <div class="h-28">
                      <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                        <img
                          src={MyGift}
                          class="w-20 h-20  mt-12 m-auto"
                          alt="Glass"
                          title="Glass"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                    </div>
                    <div class="p-6   z-10 w-full   ">
                      <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                        My Gift Certificates
                      </p>
                    </div>
                  </a>
                </div>

                <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <Link to="/updateAddress" class="block">
                    <div class="h-28">
                      <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                        <img
                          src={Address}
                          class="w-20 h-20  mt-12 m-auto"
                          alt="Jewelry Coins and Medallions"
                          title="Jewelry Coins and Medallions"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                    </div>
                    <div class="p-6   z-10 w-full   ">
                      <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                        My Address
                      </p>
                    </div>
                  </Link>
                </div>

                <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <a href="/changePassword" class="block">
                    <div class="h-28">
                      <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                        <img
                          src={Password}
                          class="w-20 h-20  mt-12 m-auto"
                          alt="Electric"
                          title="Electric"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                      </div>
                    </div>
                    <div class="p-6   z-10 w-full   ">
                      <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                        Change Password
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default UserAccountPage;
