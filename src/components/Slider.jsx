import React, { useState, useEffect } from 'react';

const ImageSlideshow = ({ images, intervalTime }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images, intervalTime]);

  const sliderStyle = { width:'100%'};

  return (
    <div>
      <img src={images[currentImageIndex]} style={sliderStyle} alt="Slideshow" />
    </div>
  );
};

export default ImageSlideshow;
