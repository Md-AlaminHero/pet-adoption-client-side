import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const categories = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'rabbit', label: 'Rabbit' },
];

const imgbbAPIKey = import.meta.env.VITE_image_upload_key;

const UpdatePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.string().matches(/^\d+$/, 'Only numbers allowed').required('Age is required'),
    category: Yup.object().nullable().required('Category is required'),
    location: Yup.string().required('Location is required'),
    shortDesc: Yup.string().required('Short description is required'),
    longDesc: Yup.string().required('Long description is required'),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      age: '',
      category: null,
      location: '',
      shortDesc: '',
      longDesc: '',
    },
  });

  const onSubmit = async (data) => {
    let finalImageUrl = imageUrl;

    if (imageFile) {
      const url = await uploadImageToImgbb(imageFile);
      if (!url) return;
      finalImageUrl = url;
    }

    const updatedPet = {
      name: data.name,
      age: parseInt(data.age),
      category: data.category.value,
      location: data.location,
      shortDesc: data.shortDesc,
      longDesc: data.longDesc,
      image: finalImageUrl,
    };

    try {
      const res = await axiosSecure.put(`/pets/${id}`, updatedPet);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Pet updated successfully!', 'success');
        navigate('/dashboard/user/my-pets');
      } else {
        Swal.fire('Info', 'No changes detected', 'info');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update pet', 'error');
    }
  };

  const uploadImageToImgbb = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUploading(false);
      return data.success ? data.data.url : null;
    } catch (error) {
      setUploading(false);
      return null;
    }
  };

  useEffect(() => {
    axiosSecure.get(`/pets/${id}`).then((res) => {
      const pet = res.data;
      setValue('name', pet.name || '');
      setValue('age', pet.age?.toString() || '');
      setValue('location', pet.location || '');
      setValue('shortDesc', pet.shortDesc || '');
      setValue('longDesc', pet.longDesc || '');
      setValue('category', categories.find((c) => c.value === pet.category) || null);
      setImageUrl(pet.image || '');
    });
  }, [id, axiosSecure, setValue]);

  return (
    <div className="max-w-xl mx-auto p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Update Pet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <input {...register('name')} className="input input-bordered w-full" placeholder="Pet Name" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Age */}
        <input {...register('age')} className="input input-bordered w-full" placeholder="Pet Age" />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}

        {/* Category */}
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              {...field}
              options={categories}
              placeholder="Select Category"
              isClearable
            />
          )}
        />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}

        {/* Location */}
        <input {...register('location')} className="input input-bordered w-full" placeholder="Location" />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}

        {/* Image Preview */}
        {imageUrl && <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {uploading && <p className="text-blue-500">Uploading image...</p>}

        {/* Short Desc */}
        <textarea {...register('shortDesc')} className="textarea textarea-bordered w-full" placeholder="Short Description" />
        {errors.shortDesc && <p className="text-red-500">{errors.shortDesc.message}</p>}

        {/* Long Desc */}
        <textarea {...register('longDesc')} className="textarea textarea-bordered w-full" placeholder="Long Description" />
        {errors.longDesc && <p className="text-red-500">{errors.longDesc.message}</p>}

        <button type="submit" disabled={uploading} className="btn btn-primary w-full mt-4">
          Update Pet
        </button>
      </form>
    </div>
  );
};

export default UpdatePet;