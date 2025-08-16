import React from 'react';

const ContactUs = () => {
    return (
        <div>
            <section className="py-16 px-6  max-w-4xl mx-auto">
                <h2 className="text-3xl text-teal-500 font-bold text-center mb-10">Contact Us</h2>
                <form className=" p-6 rounded-xl shadow-2xl space-y-4 bg-white text-black">
                    <input type="text" placeholder="Your Name" className="w-full shadow-sm p-3 rounded" />
                    <input type="email" placeholder="Your Email" className="w-full shadow-sm  p-3 rounded" />
                    <textarea placeholder="Your Message" className="w-full shadow-sm  p-3 rounded h-32"></textarea>
                    <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 cursor-pointer">
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;