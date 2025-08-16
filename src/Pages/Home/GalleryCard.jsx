import React, { use } from 'react';

const GalleryCard = ({ getPetsPromise }) => {
    const getAllPets = use(getPetsPromise);
    console.log(getAllPets);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {
                getAllPets.map(onePet => <div key={onePet.id} className="h-64 rounded-2xl shadow-lg overflow-hidden">
                    <img
                        src={onePet.image}
                        alt=''
                        className="w-full h-full object-cover"
                    />
                </div>)
            }
        </div>
    );
};

export default GalleryCard;