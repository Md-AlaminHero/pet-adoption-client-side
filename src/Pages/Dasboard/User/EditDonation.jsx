import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const EditDonationCampaign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const imgbbKey = import.meta.env.VITE_image_upload_key;

    const [formData, setFormData] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await axiosSecure.get(`/donation-campaigns/${id}`);
                setFormData(res.data);
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to load donation data", "error");
            }
        };

        fetchCampaign();
    }, [id, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const pet_name = form.pet_name.value;
        const maxAmount = parseFloat(form.maxAmount.value);
        const lastDate = form.lastDate.value;
        const shortDesc = form.shortDesc.value;
        const longDesc = form.longDesc.value;

        try {
            let imageUrl = formData.image;

            // If new image is uploaded
            if (imageFile) {
                const imageData = new FormData();
                imageData.append("image", imageFile);
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
                    imageData
                );
                imageUrl = imgRes.data.data.url;
            }

            const updatedCampaign = {
                pet_name,
                image: imageUrl,
                maxAmount,
                lastDate,
                shortDesc,
                longDesc,
            };

            await axiosSecure.patch(`/donation-campaigns/${id}`, updatedCampaign);
            Swal.fire("Success", "Campaign updated successfully", "success");
            navigate("/dashboard/my-donation-campaigns");
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update campaign", "error");
        }
    };

    if (!formData) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold mb-6">Edit Donation Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Pet Name</label>
                    <input
                        type="text"
                        name="pet_name"
                        defaultValue={formData.pet_name}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Pet Picture (Leave empty to keep old)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="file-input w-full"
                    />
                    <img src={formData.image} alt="Current" className="w-32 mt-2" />
                </div>

                <div>
                    <label className="block font-medium mb-1">Maximum Donation Amount</label>
                    <input
                        type="number"
                        name="maxAmount"
                        defaultValue={formData.maxAmount}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Last Date of Donation</label>
                    <input
                        type="date"
                        name="lastDate"
                        defaultValue={formData.lastDate?.slice(0, 10)}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Short Description</label>
                    <textarea
                        name="shortDesc"
                        defaultValue={formData.shortDesc}
                        required
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                <div>
                    <label className="block font-medium mb-1">Long Description</label>
                    <textarea
                        name="longDesc"
                        defaultValue={formData.longDesc}
                        required
                        className="textarea textarea-bordered w-full"
                        rows={4}
                    ></textarea>
                </div>

                <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 cursor-pointer w-full">Update Campaign</button>
            </form>
        </div>
    );
};

export default EditDonationCampaign;
