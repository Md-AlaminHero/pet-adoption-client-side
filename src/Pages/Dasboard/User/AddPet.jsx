import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
// import axiosSecure from '../../../api/axiosSecure'; // ✅ তোমার custom axios instance

const AddPet = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = UseAxiosSecure();

  const onSubmit = async (data) => {
    const petData = {
      name: data.name,
      age: parseInt(data.age),
      category: data.category,
      location: data.location,
      image: data.image,
      description: data.description,
      createdAt: new Date().toISOString(),
      adopted: false,
    };

    try {
      const res = await axiosSecure.post('/pets', petData);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Pet added successfully!', 'success');
        reset(); // form reset
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="max- mx-auto  p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add a Pet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <input
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
          placeholder="Pet Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Age */}
        <input
          type="number"
          {...register("age", { required: "Age is required" })}
          className="input input-bordered w-full"
          placeholder="Pet Age"
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}

        {/* Category */}
        <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
          <option value="">Select Category</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}

        {/* Location */}
        <input
          {...register("location", { required: "Location is required" })}
          className="input input-bordered w-full"
          placeholder="Pickup Location"
        />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}

        {/* Image URL */}
        <input
          {...register("image", { required: "Image URL is required" })}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        {/* Description */}
        <textarea
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-bordered w-full"
          placeholder="Short Description"
          rows={4}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <button type="submit" className="btn btn-primary w-full">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;
