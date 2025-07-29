import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-gray-700 py-10 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
                {/* Logo & About */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-3">PetAdopt</h2>
                    <p className="text-sm text-gray-600">
                        PetAdopt is a platform dedicated to connecting rescued pets with warm and loving homes. Join us in giving animals a second chance at life.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li><NavLink to="/pet-listings">Pet Listing</NavLink></li>
                        <li><NavLink to="/donation-campaigns">Donation Campaigns</NavLink></li>
                        <li><NavLink to="/about-us">About Us</NavLink></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                    <p className="text-sm mb-2">Email: support@petadopt.org</p>
                    <p className="text-sm mb-4">Phone: +880-1234-567890</p>
                    <div className="flex space-x-4 text-blue-600 text-lg">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                        <a href="mailto:support@petadopt.org"><FaEnvelope /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-500 border-t pt-4">
                &copy; {new Date().getFullYear()} PetAdopt. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
