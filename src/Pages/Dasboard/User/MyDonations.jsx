// Frontend: MyDonations.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";

const MyDonations = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [selectedDonators, setSelectedDonators] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/donation-campaigns/user/${user.email}`).then((res) => {
      setCampaigns(res.data);
    });
  }, [user]);

  const togglePause = async (id, paused) => {
    await axiosSecure.patch(`/donation-campaigns/${id}`, { paused: !paused });
    setCampaigns((prev) =>
      prev.map((c) => (c._id === id ? { ...c, paused: !paused } : c))
    );
  };

  const openModal = async (id) => {
    const res = await axiosSecure.get(`/donation-campaigns/${id}/donators`);
    setSelectedDonators(res.data);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Donation Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border">Pet Name</th>
              <th className="p-2 border">Max Donation</th>
              <th className="p-2 border">Progress</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => {
              const percent = Math.min(
                (c.totalDonated / c.maxDonationAmount) * 100,
                100
              );
              return (
                <tr key={c._id}>
                  <td className="p-2 border text-center">{c.pet_name || "N/A"}</td>
                  <td className="p-2 border text-center">${c.maxAmount}</td>
                  <td className="p-2 border">
                    <div className="w-full bg-gray-300 h-2 rounded">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <small>
                      ${c.maxAmount} / ${c.maxAmount}
                    </small>
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      className="bg-teal-600 text-white px-2 py-1 rounded"
                      onClick={() => navigate(`/dashboard/user/edit-donation/${c._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-blue-800 text-white px-2 py-1 rounded"
                      onClick={() => togglePause(c._id, c.paused)}
                    >
                      {c.paused ? "Unpause" : "Pause"}
                    </button>
                    <button
                      className="bg-teal-700 text-white px-2 py-1 rounded"
                      onClick={() => openModal(c._id)}
                    >
                      View Donators
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-80 relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <h3 className="text-lg font-bold mb-2">Donators</h3>
            <ul className="space-y-1">
              {selectedDonators.length > 0 ? (
                selectedDonators.map((d, i) => (
                  <li key={i}>
                    <strong>{d.name}</strong> donated ${d.amount}
                  </li>
                ))
              ) : (
                <li>No donations yet.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
