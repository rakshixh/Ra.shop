import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import CartCss from '../css/cart.module.css'
import { toast } from 'react-toastify'

function Checkout() {
  const [address, setAddress] = useState(localStorage.getItem('Address') || '');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleConfirmClick = () => {
    localStorage.setItem('Address', address);
    setIsEditMode(false);
    toast.success('Address Updated!')
  };

  const handleCancelClick = () => {
    setAddress(localStorage.getItem('Address') || '');
    setIsEditMode(false);
  };

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const navigate = useNavigate()
  const handleOrderBtn = () => {
    toast.success('Order Placed! Thank you!')
    localStorage.removeItem('CartItems')
    navigate('/home')
  }
  return (
    <>
    {isEditMode ? (
        <div className={CartCss.addressContainer}>
            <span className={CartCss.deliveryline}></span>
            <h2 className={CartCss.deliveryaddresstitle}>Delivery Address:</h2>
            <input className={CartCss.inputfield} type="text" value={address} onChange={handleInputChange} />
            <br></br>
            <button className={CartCss.confirmBtn} onClick={handleConfirmClick}>Confirm</button>
            <button className={CartCss.cancelBtn} onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div className={CartCss.addressContainer}>
            <span className={CartCss.deliveryline}></span>
            <h2 className={CartCss.deliveryaddresstitle}>Delivery Address:</h2>
            <p className={CartCss.deliveryaddress}>{address}</p>
            <button className={CartCss.deliveryeditBtn} onClick={handleEditClick}>Edit Address</button>
            <br></br>
            <button className={CartCss.orderBtn} onClick={handleOrderBtn}> Order Now</button>
        </div>
      )}
    </>
  )
}

export default Checkout
