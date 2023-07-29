import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ProductData from '../ProductData'
import { toast } from 'react-toastify'
import HomeCSS from '../css/home.module.css'

const Products = () => {

  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return storedWishlist;
  });

  const user = JSON.parse(localStorage.getItem('userType'))

  const handleWishlistToggle = (productId) => {
    if(user === null){
      toast.error('Please login first!')
    } else{
      if (wishlist.includes(productId)) {
        // To Remove the product from wishlist
        const updatedWishlist = wishlist.filter((id) => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.info('Product removed from wishlist!')
      } else {
        // Add product to wishlist
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.info('Product added to wishlist!')
      }
    }
  }

  // Update local storage whenever the wishlist state changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  return (
    <>
    <div className={HomeCSS.productContainer}>
        {ProductData.map((product) => (
        <div key={product.id} className={HomeCSS.productCard}>
            <img src={product.img} className={HomeCSS.productImg} alt={product.title}/>
            <div className={HomeCSS.productTitlePriceDiv}>
                <h2 className={HomeCSS.title}>{product.title}</h2>
                <p className={HomeCSS.price}>Price: ₹<b>{product.price}</b></p>
                <button className={HomeCSS.wishlistBtn} onClick={() => handleWishlistToggle(product.id)}>
                  {wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                <Link to={`/products/${product.id}`} className={HomeCSS.GTPbtn}><button className={HomeCSS.GTPbutton}>Go To Product</button></Link>
            </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Products
