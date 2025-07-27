// DonationPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UseAxios from '../../Hook/UseAxios';


const axiosInstance = UseAxios();

// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//     Elements,
//     CardElement,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


// function DonateForm({ campaign, onSuccess }) {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [amount, setAmount] = useState('');
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { data } = await axiosInstance.post('/create-payment-intent', { amount });
//         setClientSecret(data.clientSecret);

//         const result = await stripe.confirmCardPayment(data.clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         });
//         if (result.error) {
//             setError(result.error.message);
//         } else if (result.paymentIntent.status === 'succeeded') {
//             // record donation
//             await axios.post('/donate', {
//                 campaignId: campaign._id,
//                 userName: 'John Doe',      // fetch from auth
//                 userEmail: 'john@example.com',
//                 amount: parseFloat(amount),
//             });
//             onSuccess();
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//                 type="number"
//                 placeholder="Donation amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="input input-bordered w-full"
//                 required
//             />
//             <CardElement className="p-2 border" />
//             {error && <p className="text-red-500">{error}</p>}
//             <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={!stripe || !clientSecret}
//             >
//                 Donate
//             </button>
//         </form>
//     );
// }

const DonationDetails = () => {


    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [recommended, setRec] = useState([]);
    // const [donated, setDonated] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/donation-campaigns/${id}`).then((res) => setCampaign(res.data));
        axiosInstance.get(`/donation-campaigns/recommended/${id}`).then((res) => setRec(res.data));
    }, [id]);

    if (!campaign) return <div>Loading...</div>;

    console.log(recommended);
    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="card bg-base-100 shadow-xl">
                <figure>
                    <img src={campaign.image} alt={campaign.pet_name} className="w-full h-80 object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{campaign.pet_name}</h2>
                    <p>Max Donation: ${campaign.maxAmount}</p>
                    {/* ...plus donated total if tracked */}
                    {/* <Elements stripe={stripePromise}>
                        {!donated ? (
                            <DonateForm
                                campaign={campaign}
                                onSuccess={() => setDonated(true)}
                            />
                        ) : (
                            <p className="text-green-600 font-bold mt-4">
                                Thank you for donating!
                            </p>
                        )}
                    </Elements> */}
                </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Recommended Campaigns</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommended.map((c) => (
                    <div key={c._id} className="card p-4 shadow-2xl">
                        <img src={c.image} alt={c.pet_name} className="h-40 w-full object-cover mb-2" />
                        <h4 className="font-bold">{c.pet_name}</h4>
                        <p>Max Ammount: ${c.maxAmount}</p>
                        <button
                            onClick={() => (window.location = `/donation-campaigns/${c._id}`)}
                            className="btn btn-sm btn-primary mt-2"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DonationDetails;
