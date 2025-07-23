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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const fetchCampaigns = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosSecure.get(
                    `/donation-campaigns/user/${encodeURIComponent(user.email)}`
                );
                setCampaigns(res.data);
            } catch (err) {
                console.error("Failed to fetch campaigns:", err);
                setError("Failed to load campaigns");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, [user?.email]); // Only re-run when user.email changes

    const togglePause = async (id, paused) => {
        try {
            await axiosSecure.patch(`/donation-campaigns/${id}`, { paused: !paused });
            setCampaigns((prev) =>
                prev.map((c) => (c._id === id ? { ...c, paused: !paused } : c))
            );
        } catch (err) {
            console.error("Failed to toggle pause:", err);
        }
    };

    const openModal = async (id) => {
        try {
            const res = await axiosSecure.get(`/donation-campaigns/${id}/donators`);
            setSelectedDonators(res.data);
            setShowModal(true);
        } catch (err) {
            console.error("Failed to fetch donators:", err);
            setSelectedDonators([]);
            setShowModal(true);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
                My Donation Campaigns
            </h2>

            {loading && <p>Loading campaigns...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ backgroundColor: "#333", color: "#fff" }}>
                        <tr>
                            <th style={{ padding: "8px", border: "1px solid #444" }}>
                                Pet Name
                            </th>
                            <th style={{ padding: "8px", border: "1px solid #444" }}>
                                Max Donation
                            </th>
                            <th style={{ padding: "8px", border: "1px solid #444" }}>
                                Progress
                            </th>
                            <th style={{ padding: "8px", border: "1px solid #444" }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "8px" }}>
                                    No donation campaigns found.
                                </td>
                            </tr>
                        )}
                        {campaigns.map((c) => {
                            const percent = Math.min(
                                (c.totalDonated / c.maxDonationAmount) * 100,
                                100
                            );
                            return (
                                <tr key={c._id}>
                                    <td style={{ textAlign: "center", padding: "8px" }}>
                                        {c.petName || "N/A"}
                                    </td>
                                    <td style={{ textAlign: "center", padding: "8px" }}>
                                        ${c.maxDonationAmount}
                                    </td>
                                    <td style={{ padding: "8px" }}>
                                        <div
                                            style={{ backgroundColor: "#ccc", height: "8px", width: "100%" }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: "#4caf50",
                                                    width: `${percent}%`,
                                                    height: "100%",
                                                }}
                                            />
                                        </div>
                                        <small>
                                            ${c.totalDonated} / ${c.maxDonationAmount}
                                        </small>
                                    </td>
                                    <td style={{ textAlign: "center", padding: "8px" }}>
                                        <button onClick={() => navigate(`/dashboard/edit-donation/${c._id}`)}>
                                            Edit
                                        </button>{" "}
                                        <button onClick={() => togglePause(c._id, c.paused)}>
                                            {c.paused ? "Unpause" : "Pause"}
                                        </button>{" "}
                                        <button onClick={() => openModal(c._id)}>View Donators</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {/* Simple Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "6px",
                            width: "300px",
                            position: "relative",
                        }}
                    >
                        <h3>Donators</h3>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                                fontSize: "16px",
                            }}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <ul style={{ marginTop: "10px", maxHeight: "300px", overflowY: "auto" }}>
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
