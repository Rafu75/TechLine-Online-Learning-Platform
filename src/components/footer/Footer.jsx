import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
   
    const socialLinks = [
        { icon: FaFacebookF, link: "#" },
        { icon: FaXTwitter, link: "#" },
        { icon: FaInstagram, link: "#" },
        { icon: FaLinkedinIn, link: "#" },
    ];
    
    
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section shadow-[0_-2px_6px_rgba(0,0,0,0.08)] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
               
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    
                    
                    <div className="text-center md:text-left">
                        
                        <div className="flex items-center justify-center md:justify-start">
                            <span className="text-xl font-bold">
                                Tech<span className="text-blue-600">Line</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Empowering Minds Together.</p>
                    </div>

                   
                    <p className="text-gray-500 text-sm">
                        ©TechLine.
                    </p>

                   
                    <div className="flex space-x-4">
                        {socialLinks.map((item, index) => (
                            <Link 
                                key={index} 
                                to={item.link} 
                                className="text-gray-400 hover:text-gray-700 transition duration-300"
                                aria-label={item.icon.name.replace('Fa', '')}
                            >
                                <item.icon className="w-5 h-5" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;