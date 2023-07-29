import React from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import ProductData from '../ProductData'
import Footer from '../components/Footer'
import ProductDetailCSS from '../css/productdetails.module.css'

function ProductDetails() {
  const { id } = useParams();
  const product = ProductData.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const user = JSON.parse(localStorage.getItem('userType'))

  function cartHandle(){
    if(user === null){
      toast.error('Please Login First!')
    }else if(user === 'guest'){
      toast.warning('Please Login as User!')
    }
    else{
      const pid = product.id
      const existingProductIdsJSON = localStorage.getItem('CartItems');
      let productids = [];

      if (existingProductIdsJSON) {
        productids = JSON.parse(existingProductIdsJSON);
      }

      // Check if the product ID is not already in the array before adding it
      if (!productids.includes(pid)) {
        productids.push(pid);
        localStorage.setItem('CartItems', JSON.stringify(productids));
        toast.success('Successfully added to cart!');
      } else {
        toast.info('Product is already in the cart.');
      }
    }
  }

  return (
    <>
    <MiniHeader/>
    <Header/>

    <div className={ProductDetailCSS.productContainer}>
        <div className={ProductDetailCSS.productCard}>
            <img src={product.img} className={ProductDetailCSS.productImg} alt={product.title}/>
        </div>
        <h1 className={ProductDetailCSS.title}>{product.title}</h1>
        <p className={ProductDetailCSS.desc}>{product.desc}</p>
        <p className={ProductDetailCSS.price}><b>₹{product.price}.00</b> Inclusive of all taxes</p>
        <p className={ProductDetailCSS.size}><b>Size available in :</b></p>
        <span className={ProductDetailCSS.sizeback}>{product.size}</span>
        <p className={ProductDetailCSS.rating}><b>Ratings : {product.rating} / 5.0</b></p>
        <button className={ProductDetailCSS.cartBtn} onClick={cartHandle}>Add to Cart</button>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails
