import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer1 from "../components/Footer1";

function Contact() {

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    
    scrollToTop();
  },[])

  
  

  return (
    <>
    <Header />
      <div class="px-6 py-8 sm:py-24 md:pt-10 pb-10 lg:px-8 bg-white">
        <div class="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Let's Talk
          </h1>
          <p class="mt-3 text-lg text-gray-600">
            Feature request? Suggestion? or maybe you'd like to be our critic!
            Here's a form just for that.
          </p>
        </div>
        <form class="mx-auto mt-16 max-w-xl sm:mt-20">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                for="first-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5 outline-none">
                <input
                  required=""
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  placeholder="Your First Name"
                  className="block w-full outline-none rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label
                for="last-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name
              </label>
              <div class="mt-2.5">
                <input
                  required=""
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  placeholder="Your Last Name"
                  class="block w-full outline-none rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="company"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Company
              </label>
              <div class="mt-2.5">
                <input
                  required=""
                  type="text"
                  name="company"
                  id="company"
                  autocomplete="organization"
                  placeholder="Your Company Name"
                  class="block w-full outline-none rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="email"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div class="mt-2.5">
                <input
                  required=""
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  placeholder="Your Email Address"
                  class="block w-full outline-none rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="phone"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div class="mt-2.5">
                <input
                  required=""
                  type="tel"
                  name="phone"
                  id="phone"
                  autocomplete="tel"
                  placeholder="Your Phone Number"
                  class="block w-full outline-none rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div class="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Share your thoughts..."
                  class="block w-full outline-none rounded-md border border-gray-200 px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <button
              type="submit"
              class="bg-app-red text-white rounded-sm py-2 w-full block"
            >
              Submit →
            </button>
          </div>
        </form>
      </div>
      <Footer1 />
    </>
  );
}

export default Contact;
