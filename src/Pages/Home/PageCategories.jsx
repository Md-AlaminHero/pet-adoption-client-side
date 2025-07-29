import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import UseAxios from "../../Hook/UseAxios";

const categoryOptions = [
    { label: "Cats", value: "cat", image: "https://i.postimg.cc/d3XMfZZD/pexels-pixabay-45201.jpg" },
    { label: "Dogs", value: "dog", image: "https://i.postimg.cc/9MLHGnWd/pexels-valeriya-1805164.jpg" },
    { label: "Rabbits", value: "rabbit", image: "https://i.postimg.cc/gkCFqRPT/pexels-smpicturez-4001296.jpg" }
];

const PetCategories = () => {
    const axiosInstance = UseAxios();
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [category, setCategory] = useState("");
    const observer = useRef();

    const lastPetElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore]
    );

    useEffect(() => {
        setPets([]);
        setPage(1);
        setHasMore(true);
    }, [category]);

    useEffect(() => {
        const fetchPets = async () => {
            if (!category) return;
            try {
                const res = await axiosInstance.get(`/all-pets?category=${category}&page=${page}`);
                const newPets = res.data;
                setPets((prev) => [...prev, ...newPets]);
                if (newPets.length < 10) setHasMore(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPets();
    }, [page, category]);

    return (
        <div className="max-w-6xl mx-auto p-4 py-20">
            {/* Category Cards */}
            <h2 className="text-2xl font-bold mb-6 text-center">Choose a Pet Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-10 w-full">
                {categoryOptions.map((cat) => (
                    <div
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border-2 ${category === cat.value ? "border-blue-500" : "border-transparent"
                            }`}
                    >
                        <img src={cat.image} alt={cat.label} className="h-28 w-full object-cover" />
                        <div className="p-2 text-center font-medium">{cat.label}</div>
                    </div>
                ))}
            </div>

            {/* Show Pets */}
            {!category ? (
                <p className="text-center text-lg text-gray-500 mt-12">Please select a pet category to view available pets.</p>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Your Selected Pets</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {pets.map((pet, index) => (
                            <div
                                key={pet._id}
                                ref={index === pets.length - 1 ? lastPetElementRef : null}
                                className="card bg-base-100 shadow-xl"
                            >
                                <figure>
                                    <img src={pet.image} alt={pet.name} className="h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{pet.name}</h2>
                                    <p>Age: {pet.age}</p>
                                    <p>Location: {pet.location}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/pet-details/${pet._id}`} className="btn btn-primary">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {pets.length === 0 && !hasMore && (
                            <p className="text-center col-span-3">No pets found in this category.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetCategories;
