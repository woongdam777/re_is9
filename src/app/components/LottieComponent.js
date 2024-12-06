'use client';

import React from 'react';
import Lottie from 'react-lottie-player';
import circleAnimation from '../../../public/lottie/loading.json';
import catAnimation from '../../../public/lottie/cat.json';
import sitAnimation from '../../../public/lottie/sit.json';

const LottieComponent = ({ type, width = 20, height = 20 }) => {
    const getAnimationData = () => {
        switch (type) {
            case 'circle':
                return circleAnimation;
            case 'cat':
                return catAnimation;
            case 'sit':
                return sitAnimation;
            default:
                console.warn(`Unknown animation type: ${type}`);
                return circleAnimation;
        }
    };

    return (
        <Lottie
            loop
            animationData={getAnimationData()}
            play
            style={{ width, height }}
        />
    );
};

export default LottieComponent;