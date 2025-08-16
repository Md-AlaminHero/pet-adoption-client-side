import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const AdminPetManager = () => {
  const axiosSecure = UseAxiosSecure(); // custom axios instance with security
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axiosSecure.get('/all-pets');
      console.log('Pets:', res.data);
      if (Array.isArray(res.data)) {
        setPets(res.data);
      } else if (res.data.pets && Array.isArray(res.data.pets)) {
        setPets(res.data.pets);
      } else {
        setPets([]);
        console.warn('Unexpected pets response format');
      }
    } catch (err) {
      console.error('Failed to fetch pets:', err);
    }
  };

  const deletePet = async (id) => {
    try {
      await axiosSecure.delete(`/pets/${id}`);
      fetchPets();
    } catch (err) {
      console.error('Failed to delete pet:', err);
    }
  };

  const updatePet = async (id, updatedPet) => {
    try {
      await axiosSecure.put(`/pets/${id}`, updatedPet);
      fetchPets();
      setEditingPet(null);
    } catch (err) {
      console.error('Failed to update pet:', err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'adopted' ? 'not adopted' : 'adopted';
      await axiosSecure.patch(`/pets/status/${id}`, { status: newStatus });
      fetchPets();
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  return (
    <div className="p-4 bg-gray-500">
      <h2 className="text-2xl font-bold mb-4">Manage All Pets</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Category</th>
            <th>Age</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(pets) &&
            pets.map((pet, idx) => (
              <tr key={pet._id}>
                <td>{idx + 1}</td>
                <td>
                  <img src={pet.image} alt="pet" className="w-12 h-12 rounded" />
                </td>
                <td>
                  {editingPet?._id === pet._id ? (
                    <input
                      defaultValue={pet.name}
                      onChange={(e) =>
                        setEditingPet({ ...editingPet, name: e.target.value })
                      }
                    />
                  ) : (
                    pet.name
                  )}
                </td>
                <td>{pet.category}</td>
                <td>{pet.age}</td>
                <td>
                  <button
                    className={`btn btn-xs ${
                      pet.status === 'adopted' ? 'btn-success' : 'btn-warning'
                    }`}
                    onClick={() => toggleStatus(pet._id, pet.status)}
                  >
                    {pet.status}
                  </button>
                </td>
                <td>{pet.ownerEmail}</td>
                <td className="flex gap-1">
                  {editingPet?._id === pet._id ? (
                    <>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => updatePet(pet._id, editingPet)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={() => setEditingPet(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs bg-blue-600"
                        onClick={() => setEditingPet(pet)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs bg-teal-500"
                        onClick={() => deletePet(pet._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPetManager;
