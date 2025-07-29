import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';  // Adjust path if needed

const AdminCampaignManager = () => {
  const axiosSecure = UseAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosSecure.get('/campaigns');
      setCampaigns(res.data);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await axiosSecure.delete(`/campaigns/${id}`);
      fetchCampaigns();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const updateCampaign = async (id, updatedCampaign) => {
    try {
      const { _id, ...campaignWithoutId } = updatedCampaign; // _id remove
      await axiosSecure.put(`/campaigns/${id}`, campaignWithoutId);
      fetchCampaigns();
      setEditingCampaign(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    try {
      await axiosSecure.patch(`/campaigns/status/${id}`, { status: newStatus });
      fetchCampaigns();
    } catch (err) {
      console.error('Status toggle failed:', err);
    }
  };

  return (
    <div className="p-4 bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Manage Donation Campaigns</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Goal</th>
            <th>Raised</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(campaigns) &&
            campaigns.map((camp, idx) => (
              <tr key={camp._id}>
                <td>{idx + 1}</td>

                {/* Campaign Title (pet_name) */}
                <td>
                  {editingCampaign?._id === camp._id ? (
                    <input
                      type="text"
                      defaultValue={camp.pet_name}
                      onChange={e =>
                        setEditingCampaign({ ...editingCampaign, pet_name: e.target.value })
                      }
                    />
                  ) : (
                    camp.pet_name
                  )}
                </td>

                {/* Campaign Description (shortDesc) */}
                <td>
                  {editingCampaign?._id === camp._id ? (
                    <textarea
                      defaultValue={camp.shortDesc}
                      onChange={e =>
                        setEditingCampaign({ ...editingCampaign, shortDesc: e.target.value })
                      }
                    />
                  ) : (
                    camp.shortDesc
                  )}
                </td>

                {/* Goal Amount (maxAmount) */}
                <td>
                  {editingCampaign?._id === camp._id ? (
                    <input
                      type="number"
                      defaultValue={camp.maxAmount}
                      onChange={e =>
                        setEditingCampaign({ ...editingCampaign, maxAmount: Number(e.target.value) })
                      }
                    />
                  ) : (
                    `$${camp.maxAmount}`
                  )}
                </td>

                {/* Raised Amount */}
                <td>${camp.raisedAmount}</td>

                {/* Status Toggle */}
                <td>
                  <button
                    className={`btn btn-xs ${camp.status === 'active' ? 'btn-success' : 'btn-warning'}`}
                    onClick={() => toggleStatus(camp._id, camp.status)}
                  >
                    {camp.status}
                  </button>
                </td>

                {/* Owner Email */}
                <td>{camp.creator?.email || 'Unknown'}</td>

                {/* Action Buttons */}
                <td className="flex gap-1">
                  {editingCampaign?._id === camp._id ? (
                    <>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => updateCampaign(camp._id, editingCampaign)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={() => setEditingCampaign(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => setEditingCampaign(camp)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => deleteCampaign(camp._id)}
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

export default AdminCampaignManager;
