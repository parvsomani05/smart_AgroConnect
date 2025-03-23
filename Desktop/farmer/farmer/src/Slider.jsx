import React, { useState, useEffect } from "react";

function Slider (){
    const images = ["farmer1.jpg", "farmer2.jpg", "farmer3.jpg"];

    const Slider = () => {
      const [index, setIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);

      return (
        <div className="slider">
          <img src={images[index]} alt="Farmer" className="slider-image" />
        </div>
      );
    };
}

export default Slider
