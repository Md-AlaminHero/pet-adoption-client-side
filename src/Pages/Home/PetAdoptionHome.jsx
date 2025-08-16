import React from "react";
import { motion } from "framer-motion";
import ContactUs from "./ContactUs";
import { Link } from "react-router";

export default function PetAdoptionHome() {
    return (
        <div className="font-sans">

            {/* 1. Hero Section */}
            <section className="bg-gradient-to-r from-pink-100 to-blue-100 py-20 px-6 text-center text-gray-950">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Find Your New Best Friend 🐾
                </motion.h1>
                <p className="max-w-xl mx-auto mb-6">
                    Adopt a pet and give them a forever home filled with love and care.
                </p>
                <Link to='/pet-gallery'>
                    <button className="bg-teal-500 border border-teal-500 text-white px-6 py-3 rounded-lg hover:bg-transparent hover:text-teal-600 cursor-pointer">
                        Explore Now
                    </button>
                </Link>
            </section>


            {/* 2. Why Adopt Section */}
            <section className=" py-24 px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Why Adopt?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className=" p-6 rounded-xl shadow-xl">
                        <h3 className="font-semibold text-lg mb-2">Save a Life</h3>
                        <p>Every adoption gives a homeless pet a chance to live.</p>
                    </div>
                    <div className=" p-6 rounded-xl shadow-xl">
                        <h3 className="font-semibold text-lg mb-2">Reduce Stray Population</h3>
                        <p>Help control the growing number of stray animals.</p>
                    </div>
                    <div className=" p-6 rounded-xl shadow-xl">
                        <h3 className="font-semibold text-lg mb-2">Unconditional Love</h3>
                        <p>Adopted pets bring joy and companionship for life.</p>
                    </div>
                </div>
            </section>

            {/* 3. Adoption Process Section */}
            <section className=" py-24 px-6 w-full mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 py-6">Adoption Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {["Browse Pets", "Fill Application", "Meet Pet", "Bring Home"].map((step, i) => (
                        <div key={i} className=" p-6 rounded-xl shadow-xl">
                            <div className="text-3xl font-bold text-teal-500 mb-2">{i + 1}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Success Stories Section */}
            <section className=" py-24 px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className=" p-6 rounded-xl shadow-2xl ">
                        <p className="italic">
                            "Adopting Buddy was the best decision we made. He completes our family."
                        </p>
                        <span className="block mt-4 font-semibold">– Sarah, Adopted Buddy</span>
                    </div>
                    <div className=" p-6 rounded-xl shadow-2xl">
                        <p className="italic">
                            "Mittens brought so much joy into our lives. She’s a sweetheart!"
                        </p>
                        <span className="block mt-4 font-semibold">– John, Adopted Mittens</span>
                    </div>
                </div>
            </section>



            {/* 5. Contact Section */}
            <ContactUs></ContactUs>
        </div>
    );
}
