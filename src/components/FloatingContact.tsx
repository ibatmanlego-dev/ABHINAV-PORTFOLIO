import React from 'react';
import { Phone, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingContact() {
    const phoneNumber = '+919495639056';
    const whatsappNumber = '919495639056';
    const whatsappMessage = 'Hello, I would like to know more about your services!';
    const instagramUrl = 'https://www.instagram.com/abhnav.___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

    const callUrl = `tel:${phoneNumber}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            <motion.a
                href={callUrl}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-500 transition-colors duration-300 backdrop-blur-md bg-opacity-90 border border-emerald-400/30"
                aria-label="Call Us"
            >
                <Phone className="w-6 h-6" />
            </motion.a>

            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors duration-300 backdrop-blur-md bg-opacity-90 border border-[#25D366]/30"
                aria-label="Chat on WhatsApp"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.1-.473-.15-.673.15-.2.299-.767.966-.94 1.164-.173.199-.347.223-.648.074-.301-.15-1.261-.465-2.403-1.485-.888-.795-1.487-1.777-1.66-2.076-.173-.299-.018-.461.132-.611.135-.134.301-.349.452-.523.15-.174.2-.299.301-.498.1-.199.05-.374-.025-.524-.075-.15-.673-1.623-.923-2.223-.243-.585-.49-.504-.673-.513-.173-.008-.372-.008-.572-.008s-.524.074-.799.374c-.274.299-1.048 1.022-1.048 2.492s1.073 2.89 1.223 3.09c.15.199 2.105 3.214 5.1 4.505.713.308 1.268.492 1.701.629.714.227 1.365.195 1.881.118.574-.085 1.767-.722 2.016-1.422.25-.701.25-1.302.175-1.422-.074-.121-.274-.196-.574-.345z"></path>
                    <path d="M12 21.972a9.96 9.96 0 0 1-5.12-1.42L2 22l1.45-4.88A9.957 9.957 0 1 1 12 21.972z"></path>
                </svg>
            </motion.a>

            <motion.a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300 backdrop-blur-md border border-white/20"
                aria-label="Follow on Instagram"
            >
                <Instagram className="w-6 h-6" />
            </motion.a>
        </div>
    );
}
