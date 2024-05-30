import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/chaptlogo.png";

function NoNavHeader() {
  return (
    <Link to="/">
    <div className="no_nav_header flex-1 flex items-center  h-[10dvh] bg-white">

      <img src={Logo} className="size-10  ml-6" />
    </div>
    </Link>
  );
}

export default NoNavHeader;
