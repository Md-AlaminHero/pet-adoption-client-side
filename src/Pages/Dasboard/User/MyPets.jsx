import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/UseAuth';
import { NavLink } from 'react-router';

const MyPets = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/pets?email=${user.email}`).then(res => {
                setPets(res.data);
            });
        }
    }, [user, axiosSecure]);

    const handleAdopted = async (id) => {
        const res = await axiosSecure.patch(`/pets/adopt/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Pet marked as adopted!", "success");
            setPets(prev => prev.map(p => p._id === id ? { ...p, adopted: true } : p));
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the pet permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/pets/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your pet has been deleted.", "success");
                    setPets(prev => prev.filter(p => p._id !== id));
                }
            }
        });
    };

    // Pagination logic
    const totalPages = Math.ceil(pets.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const currentPets = pets.slice(startIndex, startIndex + pageSize);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Pets</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Pet Name</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPets.map((pet, index) => (
                            <tr key={pet._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{pet.name}</td>
                                <td>{pet.category}</td>
                                <td>
                                    <img src={pet.image} alt="pet" className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td>{pet.adopted ? "Adopted" : "Not Adopted"}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleAdopted(pet._id)}
                                        disabled={pet.adopted}
                                        className="btn btn-xs bg-teal-500 text-black"
                                    >
                                        Adopted
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pet._id)}
                                        className="btn btn-xs btn-primary"
                                    >
                                        Delete
                                    </button>
                                    <NavLink
                                        to={`/dashboard/user/update-pet/${pet._id}`}
                                        className="btn btn-xs bg-teal-500 text-black"
                                    >
                                        Update
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            className="btn btn-sm"
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPets;