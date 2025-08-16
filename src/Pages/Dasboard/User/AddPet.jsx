import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";



const petOptions = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
];

const AddPet = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  // Cloudinary/ImgBB image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const imgbbKey = import.meta.env.VITE_image_upload_key

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.data.url;
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const imageUrl = await handleImageUpload(imageFile);
    if (!imageUrl) {
      Swal.fire("Error", "Image upload failed", "error");
      return;
    }

    const petData = {
      name: data.name,
      age: parseInt(data.age),
      category: selectedCategory?.value || "",
      location: data.location,
      shortDesc: data.shortDesc,
      longDesc: data.longDesc,
      image: imageUrl,
      createdAt: new Date().toISOString(),
      adopted: false,
      ownerEmail: user?.email || "unknown",
    };

    try {
      const res = await axiosSecure.post("/pets", petData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Pet added successfully!", "success");
        reset();
        setSelectedCategory(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 ">Add a Pet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Pet Name */}
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
            placeholder="Pet Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Age */}
        <div>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            className="input input-bordered w-full"
            placeholder="Pet Age"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        {/* Category */}
        <div className="text-black">
          <Select
            options={petOptions}
            value={selectedCategory}
            onChange={(selected) => {
              setSelectedCategory(selected);
              setValue("category", selected.value); // sync with form
            }}
            placeholder="Select Category"
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        {/* Location */}
        <div>
          <input
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
            placeholder="Pickup Location"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
            accept="image/*"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        {/* Short Description */}
        <div>
          <textarea
            {...register("shortDesc", { required: "Short description is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Short Description"
            rows={3}
          ></textarea>
          {errors.shortDesc && <p className="text-red-500">{errors.shortDesc.message}</p>}
        </div>

        {/* Long Description */}
        <div>
          <textarea
            {...register("longDesc", { required: "Long description is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Long Description"
            rows={5}
          ></textarea>
          {errors.longDesc && <p className="text-red-500">{errors.longDesc.message}</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default AddPet;
