// components/common/FlowerLoader.js
import React from 'react';
import '../../styles/FlowerLoader.css'; // Path to your new CSS file
import flowerIcon from '../../assets/images/flower.png'; // Path to your flower image

const FlowerLoader = ({ isVisible }) => {
    return (
        <div className={`flower-overlay ${isVisible ? 'show' : ''}`}>
            <img src={flowerIcon} alt="Loading Flower" />
        </div>
    );
};

export default FlowerLoader;
