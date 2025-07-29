// src/pages/SuccessStories.jsx
import React from "react";

const stories = [
    {
        name: "Luna the Cat",
        image: "https://i.postimg.cc/JzKwwFk9/pexels-akhmad-sarwani-2373672-4123992.jpg",
        story: "Luna was rescued from the streets and found her forever home with Emma. She now enjoys sunbathing and cuddles every day.",
    },
    {
        name: "Rocky the Dog",
        image: "https://i.postimg.cc/kX3PWKCh/pexels-hnoody93-58997.jpg",
        story: "Rocky was adopted by a family with kids. He loves playing fetch and guarding the backyard!",
    },
    {
        name: "Goldie the Cat",
        image: "https://i.postimg.cc/d3XMfZZD/pexels-pixabay-45201.jpg",
        story: "Goldie now walking in a small house, living a peaceful and colorful life.",
    },
];

const SuccessStories = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 py-20">
            <h1 className="text-3xl font-bold text-center mb-10">Adoption Success Stories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {stories.map((story, idx) => (
                    <div key={idx} className="rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl transition">
                        <img src={story.image} alt={story.name} className="h-48 w-full object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{story.name}</h2>
                            <p className="text-gray-600">{story.story}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessStories;
