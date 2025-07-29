import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-6 lg:px-24">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
                <p className="text-lg text-gray-600 mb-12">
                    We're dedicated to giving pets a second chance by connecting them with loving families and creating a caring community for animals in need.
                </p>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {/* Mission */}
                    <div className="p-6 rounded-2xl shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Mission</h2>
                        <p className="text-gray-600">
                            To rescue, care for, and rehome stray and abandoned animals, making pet adoption easy, safe, and accessible for everyone.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="p-6 rounded-2xl shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-green-600 mb-2">Our Vision</h2>
                        <p className="text-gray-600">
                            A world where every pet has a loving home and no animal is left behind or forgotten.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="p-6 rounded-2xl shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-semibold text-purple-600 mb-2">Our Values</h2>
                        <ul className="list-disc list-inside text-gray-600 text-left">
                            <li>Compassion</li>
                            <li>Responsibility</li>
                            <li>Community</li>
                            <li>Transparency</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team</h3>
                    <p className="text-gray-600 mb-10">
                        Our passionate team works hard to care for animals and match them with the perfect families.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Example team member */}
                        <div className="w-64 bg-gray-100 p-6 rounded-xl shadow text-center">
                            <img
                                src="https://i.pravatar.cc/150?img=3"
                                alt="Team member"
                                className="w-24 h-24 mx-auto rounded-full mb-4"
                            />
                            <h4 className="text-xl font-semibold text-gray-700">Emma Davis</h4>
                            <p className="text-sm text-gray-500">Animal Care Coordinator</p>
                        </div>

                        <div className="w-64 bg-gray-100 p-6 rounded-xl shadow text-center">
                            <img
                                src="https://i.pravatar.cc/150?img=5"
                                alt="Team member"
                                className="w-24 h-24 mx-auto rounded-full mb-4"
                            />
                            <h4 className="text-xl font-semibold text-gray-700">Liam Johnson</h4>
                            <p className="text-sm text-gray-500">Adoption Specialist</p>
                        </div>

                        <div className="w-64 bg-gray-100 p-6 rounded-xl shadow text-center">
                            <img
                                src="https://i.pravatar.cc/150?img=6"
                                alt="Team member"
                                className="w-24 h-24 mx-auto rounded-full mb-4"
                            />
                            <h4 className="text-xl font-semibold text-gray-700">Sofia Patel</h4>
                            <p className="text-sm text-gray-500">Volunteer Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
