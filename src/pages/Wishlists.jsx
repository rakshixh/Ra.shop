import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MiniHeader from "../components/MiniHeader";
import Header from "../components/Header";
import ProductData from "../ProductData";
import Footer from "../components/Footer";
import HomeCSS from "../css/home.module.css";
import WishlistEmpty from "../assets/emptycart.svg";

function Wishlists() {
  const [wishlist, setWishlist] = useState([]);

  const handleWishlistToggle = (productId) => {
    if (wishlist.includes(productId)) {
      // To Remove the product from wishlist
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      // Add product to wishlist
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Filtering the ProductData array to display only the wishlist products
  const wishlistProducts = ProductData.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className={HomeCSS.page}>
      <MiniHeader />
      <Header />
      <div
        className={
          wishlistProducts.length === 0
            ? HomeCSS.emptyContent
            : HomeCSS.filledContent
        }
      >
        {wishlistProducts.length === 0 ? (
          <div className={HomeCSS.emptyWishlistContainer}>
            <div className={HomeCSS.imageContainer}>
              <img
                src={WishlistEmpty}
                className={HomeCSS.emptyWishlistImage}
                alt="Empty Cart"
              />
            </div>
            <h1 className={HomeCSS.EmptyHeading}>
              Create your wishlist and save your favorite products!
            </h1>
          </div>
        ) : (
          <div className={HomeCSS.wishlistContainer}>
            <div className={HomeCSS.productContainer}>
              {wishlistProducts.map((product) => (
                <div key={product.id} className={HomeCSS.productCard}>
                  <img
                    src={product.img}
                    className={HomeCSS.productImg}
                    alt={product.title}
                  />
                  <div className={HomeCSS.productTitlePriceDiv}>
                    <h2 className={HomeCSS.title}>{product.title}</h2>
                    <p className={HomeCSS.price}>
                      Price: ₹<b>{product.price}</b>
                    </p>
                    <button
                      className={HomeCSS.wishlistBtn}
                      onClick={() => handleWishlistToggle(product.id)}
                    >
                      {wishlist.includes(product.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </button>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className={HomeCSS.GTPbtn}
                  >
                    <button className={HomeCSS.GTPbutton}>Go To Product</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Wishlists;
