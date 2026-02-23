import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CinematicScroll from '@/components/CinematicScroll';
import TransitionBand from '@/components/TransitionBand';

gsap.registerPlugin(ScrollTrigger);

// --- CANONICAL DATA SOURCES ---
const TICKER_ITEMS = [
    'DaVinci Resolve', 'Premiere Pro', 'Final Cut Pro', 'DSLR/Mirrorless',
    'DJI Gimbal RS4', 'Color Grading', 'Documentary Film', 'Event Coverage',
    'Visual Storytelling', 'Sound Design'
];

const STATS_DATA = [
    { value: '3', label: 'Years Exp' },
    { value: '20+', label: 'Projects' },
    { value: '6', label: 'Software' },
    { value: '1', label: 'Feature Doc' },
];

const SKILLS_DATA = [
    {
        icon: '🎬',
        title: 'Video Editing',
        description: 'Expert in DaVinci Resolve, Premiere Pro, and Final Cut Pro for cinematic storytelling.',
    },
    {
        icon: '🎨',
        title: 'Color Grading',
        description: 'Transforming footage with professional color correction and creative grading techniques.',
    },
    {
        icon: '📸',
        title: 'Photography',
        description: 'DSLR and mirrorless camera handling for events, portraits, and documentary work.',
    },
    {
        icon: '🎥',
        title: 'Documentary Film',
        description: 'Crafting compelling narratives that capture real stories with authenticity and impact.',
    },
    {
        icon: '🎵',
        title: 'Audio Design',
        description: 'Professional audio editing and sound design to enhance the viewing experience.',
    },
    {
        icon: '📹',
        title: 'Event Coverage',
        description: 'Capturing weddings, cultural events, and special moments with cinematic quality.',
    },
];

const SOFTWARE_TAGS = ['DaVinci Resolve', 'Adobe Premiere Pro', 'Final Cut Pro', 'CapCut', 'Photoshop', 'After Effects'];

const TIMELINE_DATA = [
    { year: '2021', title: 'First Frame, First Story', description: 'Discovered my passion for visual storytelling through photography and experimental video projects.' },
    { year: '2022', title: 'Events & Weddings', description: 'Began capturing life\'s precious moments, honing skills in event coverage and wedding cinematography.' },
    { year: '2023', title: 'Freelance Launch', description: 'Officially launched my freelance career, working with diverse clients across Kerala.' },
    { year: '2023', title: 'Thirayattam Documentary', description: 'Created a feature documentary in association with Karnataka University, marking a career milestone.' },
    { year: '2024–Now', title: 'Growing, Always', description: 'Continuing to push creative boundaries while completing my Diploma in Elementary Education.' },
];

const DOCUMENTARY_FACTS = [
    { label: 'Format', value: 'Documentary' },
    { label: 'Association', value: 'Karnataka University' },
    { label: 'Role', value: 'Director & Editor' },
    { label: 'Year', value: '2023' },
];

const PROJECT_REEL_DATA = [
    { num: '01', title: 'Thirayattam Documentary', category: 'Documentary', gradient: 'from-rust-accent/40 to-primary/20' },
    { num: '02', title: 'Wedding Film Series', category: 'Cinematography', gradient: 'from-primary/40 to-secondary/20' },
    { num: '03', title: 'Cultural Event Reels', category: 'Event Coverage', gradient: 'from-secondary/40 to-rust-accent/20' },
    { num: '04', title: 'Short Film Edits', category: 'Narrative', gradient: 'from-rust-accent/30 to-primary/30' },
    { num: '05', title: 'Portrait Photography', category: 'Photography', gradient: 'from-primary/30 to-secondary/30' },
];

// --- UTILITY COMPONENTS ---

// --- MAIN COMPONENT ---

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState('hero');

    // Refs for scroll spy
    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const skillsRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Loading Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Let the DOM settle, then refresh GSAP ScrollTrigger so all
            // scroll positions are computed against the real page layout.
            setTimeout(() => ScrollTrigger.refresh(), 300);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    // Cursor Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { id: 'hero', ref: heroRef },
                { id: 'about', ref: aboutRef },
                { id: 'skills', ref: skillsRef },
                { id: 'story', ref: timelineRef },
                { id: 'work', ref: projectsRef },
                { id: 'contact', ref: contactRef },
            ];

            for (const section of sections) {
                const element = section.ref.current;
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Ultra-smooth GSAP Stagger Reveals — targets every element type precisely
    useEffect(() => {
        const ctx = gsap.context(() => {

            // --- Eyebrow lines (the decorative lines + small caps text above headings) ---
            gsap.from('.gsap-eyebrow', {
                scaleX: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15,
                scrollTrigger: { trigger: '.gsap-eyebrow', start: 'top 90%', toggleActions: 'play none none reverse' },
            });

            // --- Section headings — slide up with clip ---
            document.querySelectorAll('.gsap-heading').forEach((el) => {
                gsap.from(el, {
                    y: 80,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
                });
            });

            // --- Body paragraphs — fade up with mild blur ---
            document.querySelectorAll('.gsap-para').forEach((el) => {
                gsap.from(el, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
                });
            });

            // --- Stats: count up + fade ---
            document.querySelectorAll('.gsap-stat').forEach((el, i) => {
                gsap.from(el, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' },
                });
            });

            // --- Skill cards — staggered 3D tilt entrance ---
            gsap.from('.gsap-card', {
                y: 60,
                opacity: 0,
                rotationX: 15,
                duration: 0.9,
                ease: 'power3.out',
                stagger: { amount: 0.6, from: 'start' },
                scrollTrigger: { trigger: '.gsap-card', start: 'top 88%', toggleActions: 'play none none reverse' },
            });

            // --- Software tags — cascade in ---
            gsap.from('.gsap-tag', {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(2)',
                stagger: 0.07,
                scrollTrigger: { trigger: '.gsap-tag', start: 'top 90%', toggleActions: 'play none none reverse' },
            });

            // --- Timeline items — alternating left/right slide ---
            document.querySelectorAll('.gsap-timeline-item').forEach((el, i) => {
                gsap.from(el, {
                    x: i % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
                });
            });

            // --- Documentary facts — pop in ---
            gsap.from('.gsap-fact', {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(2)',
                stagger: 0.1,
                scrollTrigger: { trigger: '.gsap-fact', start: 'top 88%', toggleActions: 'play none none reverse' },
            });

            // --- Project reel cards ---
            gsap.from('.gsap-reel-card', {
                x: 80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: { trigger: '.gsap-reel-card', start: 'top 90%', toggleActions: 'play none none reverse' },
            });

            // --- CTA Buttons ---
            gsap.from('.gsap-btn', {
                y: 30,
                opacity: 0,
                scale: 0.9,
                duration: 0.7,
                ease: 'back.out(2)',
                stagger: 0.12,
                scrollTrigger: { trigger: '.gsap-btn', start: 'top 92%', toggleActions: 'play none none reverse' },
            });

            // --- Contact section headline ---
            document.querySelectorAll('.gsap-contact-h').forEach((el) => {
                gsap.from(el, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
                });
            });

        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-background text-foreground min-h-screen overflow-x-hidden cursor-none selection:bg-primary selection:text-background">

            {/* --- GLOBAL STYLES --- */}
            <style>{`
        .text-stroke-gold {
          -webkit-text-stroke: 1px #C9A84C;
          color: transparent;
        }
        .text-stroke-gold-thin {
          -webkit-text-stroke: 0.5px rgba(201, 168, 76, 0.3);
          color: transparent;
        }
        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 40;
          opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        /* Font Imports */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@200;300;400;500;600;700;800&display=swap');
      `}</style>

            {/* --- LOADING SCREEN --- */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            <h1 className="text-[120px] md:text-[180px] font-heading font-light leading-none text-stroke-gold tracking-tighter">
                                AM
                            </h1>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                                className="h-0.5 w-full bg-primary origin-left mt-4"
                            />
                            <p className="text-xs font-paragraph text-primary/60 uppercase tracking-[0.4em] mt-4 text-center">
                                Loading Portfolio
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- CUSTOM CURSOR --- */}
            <motion.div
                className="fixed w-3 h-3 rounded-full bg-primary pointer-events-none z-[90] mix-blend-difference hidden md:block"
                animate={{ x: cursorPos.x - 6, y: cursorPos.y - 6 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
            <motion.div
                className="fixed w-10 h-10 rounded-full border border-primary pointer-events-none z-[90] hidden md:block"
                animate={{ x: cursorPos.x - 20, y: cursorPos.y - 20 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            />

            {/* --- SCROLL PROGRESS --- */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-rust-accent)] via-primary to-secondary origin-left z-[80]"
                style={{ scaleX }}
            />

            {/* --- FILM GRAIN --- */}
            <div className="grain-overlay" />

            {/* --- NAVIGATION --- */}
            <Header activeSection={activeSection} />

            {/* --- HERO SECTION (Apple-style transform scroll) --- */}
            <section ref={heroRef} id="hero" className="w-full relative z-10">
                <CinematicScroll />
            </section>

            {/* --- TRANSITION BAND — fills gap between hero & about --- */}
            <TransitionBand />

            {/* --- TICKER SECTION --- */}
            <div className="bg-primary py-6 overflow-hidden border-y border-primary/20">
                <div className="flex animate-marquee whitespace-nowrap w-fit">
                    {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-background font-paragraph font-bold text-xl tracking-[0.1em] uppercase px-8">
                                {item}
                            </span>
                            <span className="text-background/40 text-xl">◆</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ABOUT SECTION --- */}
            <section ref={aboutRef} id="about" className="py-32 lg:py-48 relative">
                <div className="container max-w-[120rem] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Image Side */}
                        <div className="relative group">
                            <div className="absolute -inset-4 border border-primary/20 rounded-sm translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                                <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-overlay" />
                                <Image
                                    src="/profile.jpg"
                                    alt="Abhinav M Portrait"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-12 -right-8 w-32 h-32 bg-background border border-primary rounded-full flex items-center justify-center z-20">
                                <div className="relative w-full h-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-24 h-24 absolute">
                                        <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                        <text className="text-[10px] font-paragraph uppercase tracking-[0.2em] fill-primary">
                                            <textPath href="#curve">
                                                3 Years of Experience • 2025 •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                                <span className="absolute text-2xl font-heading font-bold text-primary">AM</span>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div>
                            <div className="flex items-center gap-4 mb-6 gsap-eyebrow">
                                <div className="w-12 h-px bg-primary origin-left" />
                                <span className="text-xs font-paragraph tracking-[0.3em] text-primary uppercase">About Me</span>
                            </div>
                            <h2 className="gsap-heading text-5xl md:text-7xl font-heading font-light text-foreground leading-[0.9] mb-12 md:mb-20">
                                Every Frame Tells a <span className="italic text-primary block md:inline">Story</span>
                            </h2>

                            <div className="space-y-8 text-lg font-paragraph text-foreground/70 leading-relaxed mb-12">
                                <p className="gsap-para">
                                    With three years of dedicated experience in visual storytelling, I've honed my craft in photography and video editing, transforming moments into cinematic narratives. From intimate wedding films to powerful documentaries, each project is an opportunity to capture the essence of human experience.
                                </p>
                                <p className="gsap-para">
                                    My journey began with a passion for visual arts and evolved through hands-on experience with industry-leading tools like DaVinci Resolve, Adobe Premiere Pro, and professional camera equipment. I believe in the power of color, composition, and sound to evoke emotion and tell stories that resonate.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12">
                                {STATS_DATA.map((stat, i) => (
                                    <div key={i} className="text-center md:text-left gsap-stat">
                                        <div className="text-4xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                                        <div className="text-xs font-paragraph uppercase tracking-wider text-foreground/50">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SKILLS SECTION --- */}
            <section ref={skillsRef} id="skills" className="py-32 bg-[#080808] relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container max-w-[120rem] mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-24">
                        <div className="flex items-center justify-center gap-4 mb-6 gsap-eyebrow">
                            <div className="w-12 h-px bg-primary origin-left" />
                            <span className="text-xs font-paragraph tracking-[0.3em] text-primary uppercase">Expertise</span>
                            <div className="w-12 h-px bg-primary origin-right" />
                        </div>
                        <h2 className="gsap-heading text-5xl md:text-7xl font-heading font-light text-foreground leading-[0.9]">
                            Crafted with <span className="italic text-primary block md:inline">Precision</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {SKILLS_DATA.map((skill, i) => (
                            <SkillCard key={i} skill={skill} index={i} />
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {SOFTWARE_TAGS.map((tag, i) => (
                            <span
                                key={i}
                                className="gsap-tag px-6 py-3 border border-white/10 rounded-full text-sm font-paragraph text-foreground/60 hover:border-primary hover:text-primary transition-colors duration-300 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TIMELINE SECTION --- */}
            <section ref={timelineRef} id="story" className="py-32 lg:py-48 relative">
                <div className="container max-w-[100rem] mx-auto px-6">
                    <div className="text-center mb-24">
                        <div className="flex items-center justify-center gap-4 mb-6 gsap-eyebrow">
                            <div className="w-12 h-px bg-primary origin-left" />
                            <span className="text-xs font-paragraph tracking-[0.3em] text-primary uppercase">Journey</span>
                            <div className="w-12 h-px bg-primary origin-right" />
                        </div>
                        <h2 className="gsap-heading text-5xl md:text-7xl font-heading font-light text-foreground leading-[0.9]">
                            The Story <span className="italic text-primary">So Far</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Central Line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

                        <div className="space-y-24">
                            {TIMELINE_DATA.map((item, i) => (
                                <TimelineItem key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DOCUMENTARY FEATURE --- */}
            <section className="py-32 bg-[#030303] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rust-accent/20 via-transparent to-transparent" />
                </div>

                <div className="container max-w-[120rem] mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        {/* Visual Side */}
                        <div className="lg:col-span-7 relative">
                            <div className="aspect-video bg-gradient-to-br from-rust-accent/10 to-primary/5 border border-primary/20 rounded-sm overflow-hidden relative group">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center z-10">
                                        <h3 className="text-6xl md:text-8xl font-heading font-bold text-primary animate-pulse opacity-90 mb-4">
                                            തിരയാട്ടം
                                        </h3>
                                        <p className="text-xl font-paragraph text-white/60 tracking-[0.5em] uppercase">Thirayattam</p>
                                    </div>
                                </div>
                                {/* Particle effect overlay could go here */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-4 mb-8 gsap-eyebrow">
                                <div className="w-12 h-px bg-primary origin-left" />
                                <span className="text-xs font-paragraph tracking-[0.3em] text-primary uppercase">Featured Work</span>
                            </div>

                            <h2 className="gsap-heading text-4xl md:text-5xl font-heading font-light mb-8 leading-tight">
                                The Film That <span className="italic text-primary">Defined Me</span>
                            </h2>

                            <blockquote className="gsap-para border-l-2 border-primary pl-6 mb-8">
                                <p className="text-2xl font-heading italic text-white/90 leading-relaxed">
                                    "Every tradition carries the weight of generations. This film honors that legacy."
                                </p>
                            </blockquote>

                            <p className="gsap-para text-foreground/60 font-paragraph leading-relaxed mb-12">
                                Thirayattam is more than a documentary — it's a deep dive into the ancient ritual art form of Kerala. Created in association with Karnataka University, this project challenged me to blend academic rigor with cinematic storytelling.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                {DOCUMENTARY_FACTS.map((fact, i) => (
                                    <div key={i} className="gsap-fact border border-white/10 p-4 rounded-sm hover:border-primary/30 transition-colors">
                                        <div className="text-[10px] font-paragraph uppercase tracking-wider text-primary mb-1">{fact.label}</div>
                                        <div className="text-lg font-heading font-semibold">{fact.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROJECT REEL (HORIZONTAL SCROLL) --- */}
            <section ref={projectsRef} id="work" className="py-32 overflow-hidden">
                <div className="container max-w-[120rem] mx-auto px-6 mb-16 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-6 gsap-eyebrow">
                            <div className="w-12 h-px bg-primary origin-left" />
                            <span className="text-xs font-paragraph tracking-[0.3em] text-primary uppercase">Portfolio</span>
                        </div>
                        <h2 className="gsap-heading text-5xl md:text-7xl font-heading font-light text-foreground leading-[0.9]">
                            Selected <span className="italic text-primary">Works</span>
                        </h2>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-primary/60 text-sm font-paragraph uppercase tracking-widest">
                        <span>Drag to Explore</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                <div className="pl-6 md:pl-[max(2rem,calc((100vw-120rem)/2+2rem))]">
                    <ProjectReel />
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section ref={contactRef} id="contact" className="py-32 lg:py-48 relative overflow-hidden flex flex-col items-center justify-center text-center">
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[25vw] font-heading font-bold text-stroke-gold-thin opacity-5">
                        CONNECT
                    </span>
                </div>

                <div className="container relative z-10 px-6">
                    <h2 className="gsap-contact-h text-6xl md:text-8xl font-heading font-light mb-8">
                        Have a story to <span className="italic text-primary">tell?</span>
                    </h2>
                    <p className="gsap-para text-xl font-paragraph text-foreground/60 max-w-2xl mx-auto mb-16">
                        Let's collaborate to bring your vision to life through the power of visual storytelling.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        {/* Call Me */}
                        <a
                            href="tel:+919495639056"
                            className="gsap-btn group flex items-center gap-3 px-8 py-4 border border-primary/30 rounded-sm hover:bg-primary hover:text-background transition-all duration-300"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="font-paragraph font-medium">Call Me</span>
                        </a>

                        {/* Email Me — opens Gmail directly in the browser */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=abhinav9495639056@gmail.com&su=Service%20Enquiry&body=Hi%20Abhinav%2C%0A%0AI%20would%20like%20to%20make%20an%20enquiry%20regarding%20your%20services.%0A%0AThanks!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gsap-btn group flex items-center gap-3 px-8 py-4 border border-primary/30 rounded-sm hover:bg-primary hover:text-background transition-all duration-300"
                        >
                            <Mail className="w-5 h-5" />
                            <span className="font-paragraph font-medium">Email Me</span>
                        </a>

                        {/* WhatsApp — wa.me opens WhatsApp directly on mobile and WhatsApp Web on desktop */}
                        <a
                            href="https://wa.me/919495639056?text=Hi%20Abhinav%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20collaborate%20with%20you!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gsap-btn group flex items-center gap-3 px-8 py-4 border border-primary/30 rounded-sm hover:bg-primary hover:text-background transition-all duration-300"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-paragraph font-medium">WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

// --- SUB-COMPONENTS ---

function SkillCard({ skill, index }: { skill: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="gsap-card group relative bg-white/[0.02] border border-white/5 p-8 rounded-sm hover:border-primary/50 transition-colors duration-500"
        >
            <div style={{ transform: "translateZ(20px)" }}>
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{skill.icon}</div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{skill.title}</h3>
                <p className="text-foreground/60 font-paragraph text-sm leading-relaxed">{skill.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </motion.div>
    );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
    const isEven = index % 2 === 0;
    return (
        <div
            className={`gsap-timeline-item relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="flex-1 w-full md:w-auto text-center md:text-left pl-8 md:pl-0 md:pr-16 md:text-right">
                {isEven ? (
                    <>
                        <span className="text-primary font-mono text-sm tracking-widest mb-2 block">{item.year}</span>
                        <h3 className="text-3xl font-heading font-bold mb-4">{item.title}</h3>
                        <p className="text-foreground/60 font-paragraph">{item.description}</p>
                    </>
                ) : (
                    <div className="hidden md:block" /> /* Spacer for odd items on left side */
                )}
            </div>

            {/* Center Dot */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8">
                <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)]" />
                <div className="absolute w-8 h-8 border border-primary/30 rounded-full animate-ping opacity-20" />
            </div>

            <div className="flex-1 w-full md:w-auto text-center md:text-left pl-8 md:pl-16">
                {!isEven ? (
                    <>
                        <span className="text-primary font-mono text-sm tracking-widest mb-2 block">{item.year}</span>
                        <h3 className="text-3xl font-heading font-bold mb-4">{item.title}</h3>
                        <p className="text-foreground/60 font-paragraph">{item.description}</p>
                    </>
                ) : (
                    <div className="hidden md:block" /> /* Spacer for even items on right side */
                )}
            </div>
        </div>
    );
}

function ProjectReel() {
    const reelRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (reelRef.current) {
            setWidth(reelRef.current.scrollWidth - reelRef.current.offsetWidth);
        }
    }, []);

    return (
        <motion.div ref={reelRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
            <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex gap-8"
            >
                {PROJECT_REEL_DATA.map((project, i) => (
                    <motion.div
                        key={i}
                        className="relative flex-shrink-0 w-[350px] h-[500px] group"
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-sm`} />
                        <div className="absolute inset-0 border border-white/10 group-hover:border-primary/50 transition-colors duration-500 rounded-sm p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-6xl font-heading font-light text-white/10 group-hover:text-primary/20 transition-colors">
                                    {project.num}
                                </span>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                                    <ArrowRight className="w-4 h-4 -rotate-45 text-white group-hover:text-black" />
                                </div>
                            </div>

                            <div>
                                <span className="inline-block px-3 py-1 border border-primary/30 rounded-full text-[10px] font-paragraph uppercase tracking-widest text-primary mb-4">
                                    {project.category}
                                </span>
                                <h3 className="text-3xl font-heading font-bold leading-tight group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                            </div>
                        </div>

                        {/* Image Placeholder (Overlay) */}
                        <div className="absolute inset-0 -z-10 opacity-40 mix-blend-overlay">
                            <Image
                                src="https://static.wixstatic.com/media/484817_1d8ecd4af729414887ffaef325fec61b~mv2.png?originWidth=320&originHeight=448"
                                alt={project.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}


