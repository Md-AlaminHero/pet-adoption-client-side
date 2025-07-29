import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner from './Banner';
import PetCategories from './PageCategories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetCategories></PetCategories>
        </div>
    );
};

export default Home;