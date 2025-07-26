import { useState } from "react";
import axios from "axios";
// import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// import axiosSecure from "../../api/axiosSecure";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const CreateDonationCampaign = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
   const imgbbKey = import.meta.env.VITE_image_upload_key;
   const axiosSecure = UseAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const pet_name = form.pet_name.value;
    const maxAmount = form.maxAmount.value;
    const lastDate = form.lastDate.value;
    const shortDesc = form.shortDesc.value;
    const longDesc = form.longDesc.value;

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );
        imageUrl = res.data.data.url;
      }

      const newCampaign = {
        pet_name: pet_name,
        image: imageUrl,
        maxAmount: parseFloat(maxAmount),
        lastDate,
        shortDesc,
        longDesc,
        createdAt: new Date().toISOString(),
        creator: {
          name: user?.displayName,
          email: user?.email,
        },
      };

      await axiosSecure.post("/donation-campaigns", newCampaign);
      Swal.fire("Success", "Donation campaign created!", "success");
      navigate("/dashboard/user/my-campaign");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create campaign", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Create Donation Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Pet Name</label>
          <input
            type="text"
            name="pet_name"
            placeholder="Pet Name"
            required
            className="input input-bordered w-full"
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Pet Picture</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Maximum Donation Amount</label>
          <input
            type="number"
            name="maxAmount"
            placeholder="Type Ammount"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Last Date of Donation</label>
          <input
            type="date"
            name="lastDate"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Short Description</label>
          <textarea
            name="shortDesc"
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Long Description</label>
          <textarea
            name="longDesc"
            required
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
        </div>

        <button className="btn btn-primary">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateDonationCampaign;
