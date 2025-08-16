import React, { Suspense } from 'react';
import LoadingSpinner from '../Shared/ReactSpinnerLoading/LoadingSpinner';
import GalleryCard from './GalleryCard';

const PetGallery = () => {
    const getPetsPromise = fetch('https://pet-adoption-server-side-three.vercel.app/all-pets').then(res => res.json());
    return (
        <div>
            <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
                <GalleryCard getPetsPromise={getPetsPromise}></GalleryCard>
            </Suspense>
        </div>
    );
};

export default PetGallery;