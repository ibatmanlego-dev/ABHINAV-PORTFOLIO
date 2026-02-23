import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicHero — Apple-style transform scroll storytelling.
 *
 * Uses GSAP pin: true so there is ZERO dead space after the section.
 * The next section appears immediately after the animation finishes.
 *
 * Scroll zones (across "+=200vh" of pinned scroll):
 *   0–20%   → Name fades out, orb enters
 *   20–45%  → Orb flies top-right, tagline 1
 *   45–65%  → Orb sweeps bottom-left, tagline 2
 *   65–80%  → Orb returns center enlarged, tagline 3
 *   80–100% → Orb settles, CTA appears, bottom fade-out
 */
export default function CinematicScroll() {
    const stickyRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const ring1Ref = useRef<HTMLDivElement>(null);
    const ring2Ref = useRef<HTMLDivElement>(null);
    const bgGlow1Ref = useRef<HTMLDivElement>(null);
    const bgGlow2Ref = useRef<HTMLDivElement>(null);
    const tag1Ref = useRef<HTMLDivElement>(null);
    const tag2Ref = useRef<HTMLDivElement>(null);
    const tag3Ref = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ─── Master timeline with GSAP pin — no empty dead space ─────────────
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stickyRef.current,
                    start: 'top top',
                    end: '+=250%',           // scroll distance relative to viewport height
                    pin: true,               // GSAP pins the element — next section follows right after
                    pinSpacing: true,        // adds spacer so layout is correct
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (progressRef.current) {
                            progressRef.current.style.width = `${self.progress * 100}%`;
                        }
                    },
                },
            });

            // 0–5%: Hero name fades out
            tl.to(heroTextRef.current, { opacity: 0, y: -60, ease: 'power2.in', duration: 0.05 }, 0);

            // 0–20%: Orb grows in
            tl.fromTo(orbRef.current,
                { scale: 0.6, opacity: 0 },
                { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.2 }, 0);

            // 20–45%: Orb → top-right, rings lag
            tl.to(orbRef.current, { x: '35vw', y: '-25vh', scale: 0.75, rotation: -12, ease: 'power1.inOut', duration: 0.25 }, 0.20);
            tl.to(ring1Ref.current, { x: '20vw', y: '-15vh', rotation: 25, ease: 'power1.inOut', duration: 0.25 }, 0.20);
            tl.to(ring2Ref.current, { x: '10vw', y: '-8vh', rotation: -15, ease: 'power1.inOut', duration: 0.25 }, 0.20);
            tl.to(bgGlow1Ref.current, { x: '15vw', y: '-10vh', ease: 'none', duration: 0.25 }, 0.20);
            tl.to(bgGlow2Ref.current, { x: '-10vw', y: '8vh', ease: 'none', duration: 0.25 }, 0.20);

            // Tagline 1
            tl.fromTo(tag1Ref.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, ease: 'power2.out', duration: 0.12 }, 0.22);
            tl.to(tag1Ref.current, { opacity: 0, x: -40, ease: 'power2.in', duration: 0.08 }, 0.40);

            // 45–65%: Orb → bottom-left
            tl.to(orbRef.current, { x: '-30vw', y: '28vh', scale: 0.9, rotation: 8, ease: 'power1.inOut', duration: 0.2 }, 0.45);
            tl.to(ring1Ref.current, { x: '-18vw', y: '18vh', rotation: -10, ease: 'power1.inOut', duration: 0.2 }, 0.45);
            tl.to(ring2Ref.current, { x: '-8vw', y: '10vh', rotation: 20, ease: 'power1.inOut', duration: 0.2 }, 0.45);
            tl.to(bgGlow1Ref.current, { x: '-12vw', y: '15vh', ease: 'none', duration: 0.2 }, 0.45);
            tl.to(bgGlow2Ref.current, { x: '8vw', y: '-12vh', ease: 'none', duration: 0.2 }, 0.45);

            // Tagline 2
            tl.fromTo(tag2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.12 }, 0.47);
            tl.to(tag2Ref.current, { opacity: 0, y: -40, ease: 'power2.in', duration: 0.08 }, 0.62);

            // 65–80%: Orb → center, enlarged
            tl.to(orbRef.current, { x: '5vw', y: '-5vh', scale: 1.25, rotation: -3, ease: 'power2.out', duration: 0.15 }, 0.65);
            tl.to(ring1Ref.current, { x: '3vw', y: '-3vh', rotation: 5, scale: 1.1, ease: 'power2.out', duration: 0.15 }, 0.65);
            tl.to(ring2Ref.current, { x: '-3vw', y: '3vh', rotation: -5, scale: 1.15, ease: 'power2.out', duration: 0.15 }, 0.65);

            // Tagline 3
            tl.fromTo(tag3Ref.current, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, ease: 'back.out(2)', duration: 0.12 }, 0.67);
            tl.to(tag3Ref.current, { opacity: 0, y: -30, ease: 'power2.in', duration: 0.08 }, 0.80);

            // 80–100%: Orb settles, CTA in
            tl.to(orbRef.current, { x: 0, y: 0, scale: 0.85, rotation: 0, ease: 'power3.out', duration: 0.2 }, 0.80);
            tl.to(ring1Ref.current, { x: 0, y: 0, scale: 1, rotation: 0, ease: 'power3.out', duration: 0.2 }, 0.80);
            tl.to(ring2Ref.current, { x: 0, y: 0, scale: 1, rotation: 0, ease: 'power3.out', duration: 0.2 }, 0.80);
            tl.fromTo(ctaRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.15 }, 0.82);

            // 90–100%: entire sticky fades out so next section feels like it rises up
            tl.to(stickyRef.current, { opacity: 0, ease: 'power2.in', duration: 0.10 }, 0.90);

        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ── Sticky hero — GSAP pins this, adds its own spacer ── */}
            <div
                ref={stickyRef}
                className="w-full h-screen overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at 50% 60%, #0a0700 0%, #030303 100%)' }}
            >
                {/* Parallax glow 1 */}
                <div ref={bgGlow1Ref} className="absolute pointer-events-none" style={{
                    width: '70vw', height: '70vw', top: '5%', left: '-15%', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                }} />

                {/* Parallax glow 2 */}
                <div ref={bgGlow2Ref} className="absolute pointer-events-none" style={{
                    width: '60vw', height: '60vw', bottom: '0%', right: '-10%', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,58,42,0.1) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                }} />

                {/* Film grain */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }} />

                {/* Outer ring */}
                <div ref={ring2Ref} className="absolute top-1/2 left-1/2 pointer-events-none" style={{
                    width: '65vmin', height: '65vmin', transform: 'translate(-50%, -50%)',
                    border: '1px solid rgba(201,168,76,0.06)', borderRadius: '50%',
                }} />

                {/* Inner ring */}
                <div ref={ring1Ref} className="absolute top-1/2 left-1/2 pointer-events-none" style={{
                    width: '50vmin', height: '50vmin', transform: 'translate(-50%, -50%)',
                    border: '1px solid rgba(201,168,76,0.12)', borderRadius: '50%',
                }} />

                {/* ── Main orb ── */}
                <div ref={orbRef} className="absolute top-1/2 left-1/2 pointer-events-none" style={{
                    width: '38vmin', height: '38vmin',
                    transform: 'translate(-50%, -50%) scale(0.6)',
                    opacity: 0, transformOrigin: 'center center',
                }}>
                    <div className="absolute inset-0 rounded-full" style={{
                        background: 'radial-gradient(circle at 35% 35%, rgba(201,168,76,0.3) 0%, transparent 60%)',
                        boxShadow: '0 0 80px 20px rgba(201,168,76,0.12), inset 0 0 40px rgba(201,168,76,0.05)',
                        border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50%',
                    }} />
                    <div className="absolute rounded-full overflow-hidden" style={{ inset: '8%', border: '1.5px solid rgba(201,168,76,0.4)' }}>
                        <img src="/profile.jpg" alt="Abhinav M" className="w-full h-full object-cover object-top"
                            style={{ filter: 'grayscale(0.3) contrast(1.05)' }} />
                    </div>
                    <div className="absolute inset-0 rounded-full" style={{ animation: 'slowSpin 20s linear infinite' }}>
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <path id="orb-label-path" d="M 100 100 m -82 0 a 82 82 0 1 1 164 0 a 82 82 0 1 1 -164 0" fill="none" />
                            <text className="fill-[#C9A84C]" style={{ fontSize: '11px', letterSpacing: '4px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                                <textPath href="#orb-label-path">ABHINAV M. · VISUAL STORYTELLER · KERALA 2025 ·</textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Hero title */}
                <div ref={heroTextRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-6">
                    <p className="text-[#C9A84C] font-mono text-xs tracking-[0.5em] uppercase mb-5">Visual Storyteller · Kerala, India</p>
                    <h1 className="font-heading font-bold uppercase text-white leading-[0.82] tracking-[-0.02em]"
                        style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}>
                        ABHINAV<br /><span style={{ color: '#C9A84C' }} className="italic">M.</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-8 opacity-50">
                        <div className="h-px w-8 bg-white/40" />
                        <p className="text-white font-mono text-xs tracking-[0.35em] uppercase animate-pulse">Scroll to explore</p>
                        <div className="h-px w-8 bg-white/40" />
                    </div>
                </div>

                {/* Tagline 1 */}
                <div ref={tag1Ref} className="absolute left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none" style={{ opacity: 0, maxWidth: '320px' }}>
                    <div className="h-px w-10 bg-[#C9A84C] mb-4 origin-left" />
                    <p className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase mb-2">Chapter 01</p>
                    <h3 className="text-white font-heading font-light text-3xl md:text-4xl leading-tight">
                        Every frame<br /><span style={{ color: '#C9A84C' }} className="italic">starts</span> with<br />a vision.
                    </h3>
                </div>

                {/* Tagline 2 */}
                <div ref={tag2Ref} className="absolute right-8 top-1/3 z-30 pointer-events-none text-right" style={{ opacity: 0, maxWidth: '300px' }}>
                    <div className="h-px w-10 bg-[#C9A84C] mb-4 ml-auto origin-right" />
                    <p className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase mb-2">Chapter 02</p>
                    <h3 className="text-white font-heading font-light text-3xl md:text-4xl leading-tight">
                        Light.<br />Motion.<br /><span style={{ color: '#C9A84C' }} className="italic">Story.</span>
                    </h3>
                </div>

                {/* Tagline 3 */}
                <div ref={tag3Ref} className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center" style={{ opacity: 0 }}>
                    <p className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase mb-3">Chapter 03</p>
                    <h3 className="text-white font-heading font-light text-4xl md:text-5xl leading-tight">
                        Three years of<br /><span style={{ color: '#C9A84C' }} className="italic">cinematic craft.</span>
                    </h3>
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-auto text-center" style={{ opacity: 0 }}>
                    <p className="text-white/30 font-mono text-xs tracking-[0.5em] uppercase mb-5">The story continues below</p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-px w-12 bg-[#C9A84C]/40" />
                        <div className="w-8 h-8 rounded-full border border-[#C9A84C]/40 flex items-center justify-center"
                            style={{ animation: 'bounceSoft 2s ease-in-out infinite' }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 2v8M3 7l3 3 3-3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="h-px w-12 bg-[#C9A84C]/40" />
                    </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 z-50">
                    <div ref={progressRef} className="h-full origin-left" style={{
                        width: '0%', background: 'linear-gradient(to right, #8B3A2A, #C9A84C)', transition: 'none',
                    }} />
                </div>
            </div>

            <style>{`
        @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounceSoft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      `}</style>
        </>
    );
}
