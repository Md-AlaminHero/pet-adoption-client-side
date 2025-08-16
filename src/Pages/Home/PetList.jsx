import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import UseAxios from "../../Hook/UseAxios";

const PetList = () => {
    const axiosInstance = UseAxios();

    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState(""); // 🔹 new state for sorting
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

    // Reset when filters change
    useEffect(() => {
        setPets([]);
        setPage(1);
        setHasMore(true);
    }, [search, category, sort]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await axiosInstance.get(
                    `/all-pets?search=${search}&category=${category}&page=${page}`
                );
                let newPets = res.data;

                // 🔹 Apply sorting (frontend)
                if (sort === "asc") {
                    newPets = [...newPets].sort((a, b) => a.age - b.age);
                } else if (sort === "desc") {
                    newPets = [...newPets].sort((a, b) => b.age - a.age);
                }

                setPets((prev) => [...prev, ...newPets]);
                if (newPets.length < 10) setHasMore(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPets();
    }, [page, search, category, sort]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* 🔹 Filters + Sorting */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="input input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="rabbit">Rabbit</option>
                </select>
                <select
                    className="select select-bordered"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort by Age</option>
                    <option value="asc">Ascending Age</option>
                    <option value="desc">Descending Age</option>
                </select>
            </div>

            {/* 🔹 Pet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pets.map((pet, index) => (
                    <div
                        key={pet._id}
                        ref={index === pets.length - 1 ? lastPetElementRef : null}
                        className="card bg-base-100 shadow-xl h-full flex flex-col"
                    >
                        <figure className="h-48">
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="h-full w-full object-cover rounded-t-xl"
                            />
                        </figure>
                        <div className="card-body flex flex-col justify-between">
                            <div>
                                <h2 className="card-title">{pet.name}</h2>
                                <p>Age: {pet.age}</p>
                                <p>Location: {pet.location}</p>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <Link to={`/pet-details/${pet._id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                {!pets.length && !hasMore && (
                    <p className="text-center col-span-3">No pets found</p>
                )}
            </div>
        </div>
    );
};

export default PetList;
