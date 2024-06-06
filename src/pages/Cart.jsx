import React, { useState } from "react";
import MiniHeader from "../components/MiniHeader";
import Header from "../components/Header";
import ProductData from "../ProductData";
import Checkout from "../components/Checkout";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import CartCSS from "../css/cart.module.css";
import EmptyCart from "../assets/emptycart.svg";

function Cart() {
  const cartItemsIdsJSON = localStorage.getItem("CartItems");
  // JSON parse will throw error if no key found so initializing it to empty if no key found!
  const cartItemsIds = JSON.parse(cartItemsIdsJSON) || [];

  const [cartItems, setCartItems] = useState(
    ProductData.filter((product) => cartItemsIds.includes(product.id))
  );

  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleRemove = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const updateLocalStorage = (items) => {
    const itemIds = items.map((item) => item.id);
    localStorage.setItem("CartItems", JSON.stringify(itemIds));
  };

  const getSubTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // to add shipping cost conditionally
  const shippingAmount = getSubTotalAmount() >= 2479 ? 0 : 399;

  const getTotalAmount = () => {
    return getSubTotalAmount() + shippingAmount;
  };

  // On click of checkout button make address option visible
  const [ProceedToCheckout, setProceedToCheckout] = useState(true);

  const handleProceedToCheck = () => {
    setProceedToCheckout(false);
    toast.info("Confirm the delivery address!");
  };

  return (
    <div className={CartCSS.mainContainer}>
      <MiniHeader />
      <Header />

      {cartItems.length === 0 ? (
        <div className={CartCSS.EmptyCartContainer}>
          <div className={CartCSS.imagecontainer}>
            <img
              src={EmptyCart}
              className={CartCSS.emptycart}
              alt="Empty Cart"
            />
          </div>
          <h1 align="center" style={{ color: "#2D6A4F" }}>
            Oops! Your cart is empty, let's go shopping!
          </h1>
        </div>
      ) : (
        <div className={CartCSS.Container}>
          {cartItems.map((product) => (
            <div key={product.id} className={CartCSS.card}>
              <div className={CartCSS.image}>
                <img src={product.img} alt={product.title} />
              </div>
              <div className={CartCSS.details}>
                <h2 className={CartCSS.title}>{product.title}</h2>
                <p className={CartCSS.price}>
                  <b>₹{product.price}.00</b>
                </p>
                <p className={CartCSS.instock}>In Stock</p>
                <p className={CartCSS.emi}>EMI options are available.</p>

                <div className={CartCSS.quantityControls}>
                  <div className={CartCSS.quantityBack}>
                    <button
                      className={CartCSS.quantityBtn}
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </button>
                    <span className={CartCSS.quantity}>{product.quantity}</span>
                    <button
                      className={CartCSS.quantityBtn}
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className={CartCSS.removeButton}
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <span className={CartCSS.line}></span>
          <div className={CartCSS.amountContainer}>
            <h2 className={CartCSS.subamount}>
              Sub Total: ₹{getSubTotalAmount()}
            </h2>
            {shippingAmount === 0 ? (
              <p className={CartCSS.shipping}>
                Shipping Charges: Free Shipping Charges
              </p>
            ) : (
              <p className={CartCSS.shipping}>
                Shipping Charges: +₹{shippingAmount}
              </p>
            )}
            <p className={CartCSS.tax}>Tax: +₹0</p>
            <span className={CartCSS.amountline}></span>
            <h1 className={CartCSS.totalamount}>
              Total Amount: ₹{getTotalAmount()}
            </h1>
            {ProceedToCheckout && (
              <button
                className={CartCSS.checkout}
                onClick={handleProceedToCheck}
              >
                Proceed to Checkout
              </button>
            )}
            {!ProceedToCheckout && <Checkout />}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
