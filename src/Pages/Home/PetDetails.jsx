import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import UseAuth from "../../Hook/UseAuth";
import UseAxios from "../../Hook/UseAxios";
import Swal from "sweetalert2";

const PetDetails = () => {
    const axiosInstance = UseAxios();

    const { id } = useParams();
    const { user } = UseAuth();
    const [pet, setPet] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    console.log(user);

    useEffect(() => {
        axiosInstance.get(`/pet/${id}`).then((res) => {
            setPet(res.data);
        });
    }, [id]);

    const handleAdoptSubmit = async (e) => {
        e.preventDefault();

        const adoptionData = {
            petId: pet._id,
            petName: pet.name,
            petImage: pet.image,
            userName: user.displayName,
            userEmail: user.email,
            phone,
            address,
        };

        try {
            await axiosInstance.post("/adoption-request", adoptionData);
            Swal.fire("Success", "Adoption Request Send Successfully", "success");
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            alert("Failed to submit request");
        }
    };

    if (!pet) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <img src={pet.image} alt={pet.name} className="w-full rounded-xl h-80 object-cover mb-4" />
            <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Location:</strong> {pet.location}</p>
            <p className="mt-4">{pet.description}</p>
            <button className="btn btn-primary mt-6" onClick={() => setIsOpen(true)}>
                Adopt
            </button>

            {/* Adoption Modal */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0">
                <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
                    <Dialog.Panel className=" rounded-lg p-6 max-w-md w-full space-y-4">
                        <Dialog.Title className="text-xl font-semibold">Adopt {pet.name}</Dialog.Title>
                        <form onSubmit={handleAdoptSubmit} className="space-y-4">
                            <div>
                                <label className="label">Your Name</label>
                                <input type="text" value={user?.displayName} disabled className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">Email</label>
                                <input type="email" value={user?.email} disabled className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">Phone</label>
                                <input type="tel" required className="input input-bordered w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label className="label">Address</label>
                                <textarea required className="textarea textarea-bordered w-full" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default PetDetails;
