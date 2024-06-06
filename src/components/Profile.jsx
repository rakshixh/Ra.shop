import React from "react";
import { toast } from "react-toastify";
import ProfileCSS from "../css/profile.module.css";
import userProfileBack from "../assets/userBackground.jpg";
import guestProfileBack from "../assets/guestBackground.jpg";
import userProfileImg from "../assets/User.png";
import guestProfileImg from "../assets/Guest.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Profile = ({ userType, handleLogout }) => {
  const address = localStorage.getItem("Address");

  const handleLogoutClick = () => {
    handleLogout();
    toast.warn("You logged out successfully!");
  };

  return (
    <div className={ProfileCSS.profileContainer}>
      <img
        src={userType === "user" ? userProfileBack : guestProfileBack}
        className={ProfileCSS.profileBack}
        alt="Profile Background"
      />
      <div className={ProfileCSS.profileContent}>
        <img
          src={userType === "user" ? userProfileImg : guestProfileImg}
          className={ProfileCSS.profileImg}
          alt="Profile"
        />
        <div className={ProfileCSS.userDataDiv}>
          <h2 className={ProfileCSS.name}>
            {userType === "user" ? "Alex Cartman" : "Guest User ra3hh62shr3f"}
          </h2>
          <p className={ProfileCSS.bio}>
            {userType === "user"
              ? "Passionate shopper exploring every aisle for the perfect find."
              : "No bio for guest user"}
          </p>
          <div className={ProfileCSS.addressDiv}>
            <LocationOnIcon fontSize="small" />
            <p className={ProfileCSS.address}>
              <b>{userType === "user" ? "Address:" : "No Address:"}</b>{" "}
              {userType === "user" ? address : ""}
            </p>
          </div>
        </div>
      </div>
      <button onClick={handleLogoutClick} className={ProfileCSS.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
