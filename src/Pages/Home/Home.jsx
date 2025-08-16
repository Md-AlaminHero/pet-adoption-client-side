import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner from './Banner';
import PetCategories from './PageCategories';
import AdoptionGuidelines from './AdoptionGuidelines';
import SuccessStories from './SuccessStories';
import PetAdoptionHome from './PetAdoptionHome';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetCategories></PetCategories>
            <AdoptionGuidelines></AdoptionGuidelines>
            <SuccessStories></SuccessStories>
            <PetAdoptionHome></PetAdoptionHome>
        </div>
    );
};

export default Home;