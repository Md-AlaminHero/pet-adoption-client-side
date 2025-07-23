import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const categories = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'rabbit', label: 'Rabbit' },
];

const imgbbAPIKey = import.meta.env.VITE_image_upload_key;

const UpdatePet = () => {
  const { id } = useParams(); // get pet id from route params
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  // State to hold all form data as controlled inputs
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    category: null,
    location: '',
    shortDesc: '',
    longDesc: '',
    image: '', // url string or empty
  });

  const [uploading, setUploading] = useState(false);

  // Fetch pet data on mount
  useEffect(() => {
    axiosSecure.get(`/pets/${id}`)
      .then(res => {
        const pet = res.data;
        setFormData({
          name: pet.name || '',
          age: pet.age?.toString() || '',
          category: categories.find(c => c.value === pet.category) || null,
          location: pet.location || '',
          shortDesc: pet.shortDesc || '',
          longDesc: pet.longDesc || '',
          image: pet.image || '',
        });
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to load pet data', 'error');
      });
  }, [id, axiosSecure]);

  // Handle controlled input change for text/number/textarea
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For age, allow only digits or empty string
    if (name === 'age') {
      if (value === '' || /^[0-9\b]+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle category select change
  const handleCategoryChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, category: selectedOption }));
  };

  // Upload image to imgbb
  const uploadImageToImgbb = async (file) => {
    if (!file) return null;
    setUploading(true);

    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: 'POST',
        body: formDataImg,
      });
      const data = await res.json();
      setUploading(false);

      if (data.success) return data.data.url;
      else {
        Swal.fire('Error', 'Image upload failed', 'error');
        return null;
      }
    } catch (error) {
      setUploading(false);
      Swal.fire('Error', 'Image upload error', 'error');
      return null;
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image;

    // Check if user selected a new file (image upload)
    if (formData.imageFile) {
      const url = await uploadImageToImgbb(formData.imageFile);
      if (!url) return; // stop if upload failed
      imageUrl = url;
    }

    // Prepare payload for API
    const updatedPet = {
      name: formData.name,
      age: parseInt(formData.age) || 0,
      category: formData.category?.value || '',
      location: formData.location,
      shortDesc: formData.shortDesc,
      longDesc: formData.longDesc,
      image: imageUrl,
    };

    try {
      const res = await axiosSecure.put(`/pets/${id}`, updatedPet);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Pet updated successfully!', 'success');
        navigate('/dashboard/my-pets');
      } else {
        Swal.fire('Info', 'No changes detected', 'info');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update pet', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Update Pet</h2>
      <form onSubmit={onSubmit} className="space-y-4">

        {/* Pet Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Pet Name"
          className="input input-bordered w-full"
          required
        />

        {/* Pet Age */}
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Pet Age"
          className="input input-bordered w-full"
          min={0}
          required
        />

        {/* Pet Category */}
        <Select
          options={categories}
          value={formData.category}
          onChange={handleCategoryChange}
          placeholder="Select Category"
          isClearable
        />

        {/* Pickup Location */}
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Pickup Location"
          className="input input-bordered w-full"
          required
        />

        {/* Image Upload */}
        <div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Current pet"
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData(prev => ({ ...prev, imageFile: file }));
              }
            }}
          />
          {uploading && <p className="text-blue-500">Uploading image...</p>}
        </div>

        {/* Short Description */}
        <textarea
          name="shortDesc"
          value={formData.shortDesc}
          onChange={handleChange}
          placeholder="Short Description"
          className="textarea textarea-bordered w-full"
          rows={3}
          required
        />

        {/* Long Description */}
        <textarea
          name="longDesc"
          value={formData.longDesc}
          onChange={handleChange}
          placeholder="Long Description"
          className="textarea textarea-bordered w-full"
          rows={5}
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="btn btn-primary w-full mt-4"
        >
          Update Pet
        </button>
      </form>
    </div>
  );
};

export default UpdatePet;
