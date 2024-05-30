import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../images/chaptlogo.png";
import { openSideBar } from "../redux/actions";
import DropDownMenu from "./DropDownMenu";

function Header() {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  // const [searchedItem, setSeacrhedItem] = useState("");
  const searchOptionDiv = useRef(null);
  const searchInputBtn = useRef(null);
  const [searchingItem, setSearchingItem] = useState("");

  const openSidebar = (e) => {
    dispatch(openSideBar());
  };

  const handleSearch = (e) => {
    if(searchingItem == ""){
      e.preventDefault();
    }
  }

  // const searchingItem = async (item) => {
  //   if (!item == "") {
  //     setSeacrhedItem(item);
  //     const response = await axios.get(
  //       "http://localhost:8080/api/v1/search/" + item
  //     );
  //     setSearchData(response.data.searchResults);
  //   }
  // };

  return (
    <div className="header bg-[#2A3132]  md:h-[10vh] lg:h-[12vh] xl:h-[15vh] md:flex md:justify-around items-center md:text-white shadow-md">

      <div className="nav_bar flex h-14 md:h-auto">
        
        <div className="ham_loc flex-1 flex justify-around items-center md:hidden" >
          <div className="menuBtn" onClick={openSidebar}>
            <MenuIcon style={{color:"white"}}/>
          </div>
          <Link to="/wishlist">
            <div className="wishlistBtn">
              <FavoriteBorderOutlinedIcon style={{color:"white"}}/>
            </div>
          </Link>
        </div>

        <Link className="log_img_div  flex-1 flex justify-center items-center " to="/">
          <div className="">
            <img src={Logo} id="log_img " className="size-10" />
          </div>
        </Link>

        <div className="fav_cart flex-1  flex justify-around items-center md:hidden">
          <div className="notificationBtn">
            <NotificationsNoneIcon style={{color:"white"}}/>
          </div>
          <Link to="/cart">
            <div className="cartBtn">
              <ShoppingCartOutlinedIcon style={{color:"white"}}/>
            </div>
          </Link>
        </div>

      </div>

      <div className="search_container flex justify-between h-9 text-white md:w-[45%]">
        <input
          ref={searchInputBtn}
          className="text_input flex-1 pl-4 outline-none text-sm bg-transparent"
          type="text"
          placeholder="Search by Title, Author, keyword or ISBN"
          onChange={(e) => {
            setSearchingItem(e.target.value);
          }}

          style={{borderTop:"1px solid gray", borderBottom:"1px solid gray", borderLeft:"1px solid gray"}}
        />
        <Link to={`/search/${searchingItem}`} onClick={handleSearch}  className="search_div  w-10 flex justify-center items-center px-6 bg-green-500 text-white">
          <div>
            <SearchOutlinedIcon />
          </div>
        </Link>
      </div>





      <div className="favourite_cart hidden md:flex md:justify-between md:w-[30%] lg:w-[25%] ">
        <Link to="/wishlist" id="nav_wish_div">
          <div className="wish_button">
            <FavoriteIcon />
          </div>
        </Link>
        <Link to="/cart" id="nav_cart_div">
          <div className="cart_buttn">
            <ShoppingCartIcon />
          </div>
        </Link>

        <div className="nav_account_div flex md:w-[60%] md:justify-end ">
          <DropDownMenu />
          {/* <div className="user_icon">
            <AccountCircleIcon /> 
          </div> */}
        </div>
      </div>


    </div>
  );
}

export default Header;
