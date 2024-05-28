import React from "react";

function Overlay() {
  return (
    <>
      {/* opaque */}

      {/* <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div class="h-10 w-10 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-10 w-10 rounded-full border-t-8 border-b-8 border-app-red animate-spin"></div> 
        </div>
      </div> */}

      {/* transparent */}

      <div class="absolute bg-white bg-opacity-50 z-50 h-full w-full flex items-center justify-center">
      <span class="text-2xl mr-4">Loading</span>
        <div class="flex items-center relative">
          <div class="h-8 w-8 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-8 w-8 rounded-full border-t-8 border-b-8 border-app-red animate-spin"></div>
        </div>
      </div>
    </>
  );
}

export default Overlay;
