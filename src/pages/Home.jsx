import React from 'react'
import MiniHeader from '../components/MiniHeader'
import Header from '../components/Header'
import Slider from '../components/Slider'
import Products from '../components/Products'
import Footer from '../components/Footer'
import HomeCSS from '../css/home.module.css'
// images
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'

function Home() {
  const intervalTime = 3000;
  const images = [banner1,banner2,banner3,banner4];
  return (
    <>
    <MiniHeader/>
    <Header/>
    <Slider images={images} intervalTime={intervalTime} />
    <h1 align="center" className={HomeCSS.heading}>Offers You can't Miss!</h1>
    <Products />
    <Footer/>
    </>
  )
}

export default Home
