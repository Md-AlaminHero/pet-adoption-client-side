import React from "react";

const guidelines = [
    "Be at least 18 years old to adopt.",
    "Have landlord approval (if renting).",
    "Provide a safe, clean, and loving home.",
    "Commit to proper veterinary care and vaccinations.",
    "Understand that pets are not gifts or toys.",
];

const AdoptionGuidelines = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Adoption Guidelines</h1>

            <p className="text-gray-200 text-center mb-8">
                🐾 Please follow these essential steps before bringing home a new pet companion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guidelines.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-md border border-gray-200 p-4 rounded-lg flex items-start gap-3 hover:shadow-lg transition"
                    >
                        <span className="text-green-500 text-xl">✔</span>
                        <p className="text-gray-700">{item}</p>
                    </div>
                ))}
            </div>

            <p className="mt-8 text-center text-gray-200">
                🐶 Ready to adopt? Explore our pets and submit your application today!
            </p>
        </div>
    );
};

export default AdoptionGuidelines;
