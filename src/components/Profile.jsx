import React from 'react'
import { toast } from 'react-toastify'
import ProfileCSS from '../css/profile.module.css'
import userProfileBack from '../assets/userBackground.jpg'
import guestProfileBack from '../assets/guestBackground.jpg'
import userProfileImg from '../assets/Rakshith Acharya.jpg'
import guestProfileImg from '../assets/Guest.jpg'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Profile = ({ userType, handleLogout }) => {
  const address = localStorage.getItem('Address')

  const handleLogoutClick = () => {
    handleLogout();
    toast.warn('You logged out successfully!')
  };
  return (
    <>
      {userType === 'user' ? (
      <>
      <img src={userProfileBack} className={ProfileCSS.userProfileBack} alt='userProfileBackground'/>
      <img src={userProfileImg} className={ProfileCSS.userProfileImg} alt='userProfileImage' />
      <div className={ProfileCSS.userDataDiv}>
        <h2 className={ProfileCSS.name}>Rakshith Acharya</h2>
        <p className={ProfileCSS.bio}>Passionate shopper exploring every aisle for the perfect find.</p>
        <div style={{display:'flex',justifyContent:'start',alignItems:'center',marginTop:'20px',color:'gray'}}>
          <p className={ProfileCSS.address}><b>Address:</b> {address}</p>
          <LocationOnIcon fontSize="small"/>
        </div>
      </div>
      </>
      ) : (
        <>
        <img src={guestProfileBack} className={ProfileCSS.userProfileBack} alt='userProfileBackground'/>
        <img src={guestProfileImg} className={ProfileCSS.userProfileImg} alt='userProfileImage' />
        <div className={ProfileCSS.userDataDiv}>
          <h2 className={ProfileCSS.name}>Guest User ra3hh62shr3f</h2>
          <p className={ProfileCSS.bio}>No bio for guest user</p>
          <div style={{display:'flex',justifyContent:'start',alignItems:'center',marginTop:'20px',color:'gray'}}>
            <LocationOnIcon fontSize="small"/>
            <p className={ProfileCSS.address}><b>No Address:</b></p>
          </div>
        </div>
        </>
      )}
      <button onClick={handleLogoutClick} className={ProfileCSS.logoutBtn}>Logout</button>
    </>
  )
}

export default Profile
