import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-8 border-t border-white/10 bg-[#030303] text-center">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
                <p className="text-[#F5F5F5]/50 font-paragraph text-sm tracking-wider">
                    &copy; {currentYear} Abhinav M. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
