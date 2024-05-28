import { RemoveOutlined } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Logo from "../images/logo.png";
import { closeSideBar } from "../redux/actions";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const addIcon = useRef(null);
  const removeIcon = useRef(null);

  const dispatch = useDispatch();
  const closeSideMenu = () => {
    dispatch(closeSideBar());
  };

  const fontSize = {
    fontSize: "1em",
  };

  const addIconEvent = () => {
    addIcon.current.style.display = "none";
    removeIcon.current.style.display = "block";
    window.location.href = "/myaccount";
  };

  const removeIconEvent = () => {
    removeIcon.current.style.display = "none";
    addIcon.current.style.display = "block";
  };

  return (
    <div className="sidebar">
      <div className="side_head">
        <div onClick={closeSideMenu}>
          <CloseOutlinedIcon />
        </div>
        <div>
          <img src={Logo} id="log_img" />
        </div>
        <div>
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className="account_sec">
        <div className="acc_prof">
          <AccountCircleOutlinedIcon />
          <p>MY ACCOUNT</p>
        </div>
        <div ref={addIcon} onClick={addIconEvent}>
          <AddOutlinedIcon />
        </div>
        <div
          ref={removeIcon}
          onClick={removeIconEvent}
          style={{ display: "none" }}
        >
          <RemoveOutlined />
        </div>
      </div>

      <div className="side_cat">
        <Link to="/category/Best Seller" onClick={closeSideMenu}>
          <div className="cat">
            <p>Best Seller</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>

        <Link to="/category/Award Winners" onClick={closeSideMenu}>
          <div className="cat">
            <p>Award Winners</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>

        <Link to="/category/International Best Seller" onClick={closeSideMenu}>
          <div className="cat">
            <p>International Best Seller</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>

        <Link to="/category/New Arrivals" onClick={closeSideMenu}>
          <div className="cat">
            <p>New Arrivals</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>

        <Link to="/category/Fiction Books" onClick={closeSideMenu}>
          <div className="cat">
            <p>Fiction Books</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>

        <Link to="/category/Tarot Cards" onClick={closeSideMenu}>
          <div className="cat">
            <p>Tarot Cards</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>

        <Link to="/category/Box Sets" onClick={closeSideMenu}>
          <div className="cat">
            <p>Box Sets</p>
            <ArrowForwardIosOutlinedIcon style={fontSize} />
          </div>
        </Link>
      </div>

      <div className="side_footer">
        {/* <div className="side_foot_div">
          <LocationOnOutlinedIcon />
          <p>STORIES & EVENTS</p>
        </div>

        <div className="side_foot_div">
          <PodcastsOutlinedIcon />
          <p>BLOG & PODCASTS</p>
        </div>

        <div className="side_foot_div">
          <LoyaltyOutlinedIcon />
          <p>MEMBERSHIP</p>
        </div>

        <div className="side_foot_div">
          <LocalOfferOutlinedIcon />
          <p>Coupons & DEALS</p>
        </div>

        <div className="side_foot_div">
          <StarBorderOutlinedIcon />
          <p>BESTSELLARS</p>
        </div>

        <div className="side_foot_div">
          <CardGiftcardOutlinedIcon />
          <p>GIFT CARDS</p>
        </div> */}

        <Link to="/wishlist" onClick={closeSideMenu}>
          <div className="side_foot_div">
            <FavoriteBorderOutlinedIcon />
            <p>WISHLIST</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
