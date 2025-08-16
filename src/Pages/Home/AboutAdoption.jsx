import React from "react";

const AboutAdoption = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="flex justify-center">
                <img data-aos="zoom-in" data-aos-duration="1600"
                    src="https://i.postimg.cc/yNWZJB4m/cats-8105667-1280.jpg"
                    alt="Pet Adoption"
                    className="rounded-2xl shadow-lg w-full max-w-md object-cover"
                />
            </div>

            {/* Text Section */}
            <div data-aos="zoom-in-up" data-aos-duration="1600" className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Why Adopt a Pet?
                </h2>
                <p className=" leading-relaxed">
                    Every pet deserves a loving home. By adopting, you’re not just giving
                    an animal a second chance you’re also gaining a loyal companion. Our
                    adoption process ensures pets are healthy, vaccinated, and ready to
                    bring joy to your family.
                </p>
                <p className=" leading-relaxed">
                    From playful kittens and puppies to calm and caring senior pets, you’ll
                    find the perfect friend who matches your lifestyle. Together, we can
                    reduce the number of homeless pets and spread happiness.
                </p>

            </div>
        </div>
    );
};

export default AboutAdoption;
