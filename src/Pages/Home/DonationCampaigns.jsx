// components/DonationCampaigns.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import UseAxios from "../../Hook/UseAxios";
import { Link } from "react-router";

const DonationCampaigns = () => {
    const axiosInstance = UseAxios();

    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const lastCampaignRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore]
    );

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await axiosInstance.get(`/donation-campaigns?page=${page}`);
                const newCampaigns = res.data;
                setCampaigns((prev) => [...prev, ...newCampaigns]);
                if (newCampaigns.length < 9) setHasMore(false);
            } catch (error) {
                console.error("Error loading donation campaigns", error);
            }
        };
        fetchCampaigns();
    }, [page]);

    console.log(campaigns);
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Donation Campaigns</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {campaigns.map((campaign, index) => (
                    <div
                        key={campaign._id}
                        ref={index === campaigns.length - 1 ? lastCampaignRef : null}
                        className="card bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img
                                src={campaign.image}
                                alt={campaign.petName}
                                className="h-48 w-full object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{campaign.pet_name}</h2>
                            <h2 className="card-title">Last Date: {campaign.lastDate}</h2>
                            <p>Max Amount: ৳{campaign.maxAmount}</p>
                            <p>Donated: ৳{campaign.donatedAmount || 0}</p>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                <div
                                    className="bg-green-500 h-3 rounded-full"
                                    style={{
                                        width: `${((campaign.donatedAmount || 0) / campaign.maxAmount) * 100
                                            }%`,
                                    }}
                                ></div>
                            </div>
                            <Link to={`/donation-campaigns/${campaign._id}`}><button className="bg-transparent border border-teal-500 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-500 hover:text-white cursor-pointer">View Details</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationCampaigns;
