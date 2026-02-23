import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ activeSection }: { activeSection?: string }) {
    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Expertise' },
        { id: 'story', label: 'Journey' },
        { id: 'work', label: 'Work' },
        { id: 'contact', label: 'Contact' },
    ];

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[60] py-6 px-6 lg:px-12 mix-blend-difference flex justify-between items-center bg-transparent">
            <div className="font-heading font-bold text-2xl tracking-widest text-[#F5F5F5] cursor-pointer" onClick={() => scrollTo('hero')}>
                AM<span className="text-[#C9A84C]">.</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`font-paragraph text-sm tracking-widest uppercase transition-colors duration-300 relative group
              ${activeSection === item.id ? 'text-[#C9A84C]' : 'text-[#F5F5F5]/70 hover:text-[#F5F5F5]'}`}
                    >
                        {item.label}
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="nav-indicator"
                                className="absolute -bottom-2 left-0 right-0 h-px bg-[#C9A84C]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <div className={`absolute -bottom-2 left-0 right-0 h-px bg-[#F5F5F5]/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${activeSection === item.id ? 'hidden' : ''}`} />
                    </button>
                ))}
            </nav>

            {/* Mobile Menu Button - simple placeholder */}
            <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
                <div className="w-6 h-[2px] bg-[#F5F5F5]"></div>
                <div className="w-4 h-[2px] bg-[#F5F5F5] self-end"></div>
            </div>
        </header>
    );
}
