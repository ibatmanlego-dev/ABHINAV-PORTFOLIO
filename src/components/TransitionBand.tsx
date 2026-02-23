import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// ──────────────────────────────────────────────────────────────────────────────
// Marquee rows — define text items and direction for each band
// ──────────────────────────────────────────────────────────────────────────────
const ROW_1 = ['Visual Storytelling', '◆', 'Documentary Film', '◆', 'Color Grading', '◆', 'Wedding Cinematography', '◆', 'Event Coverage', '◆', 'Sound Design', '◆'];
const ROW_2 = ['DaVinci Resolve', '◈', 'Premiere Pro', '◈', 'Final Cut Pro', '◈', 'DSLR / Mirrorless', '◈', 'DJI Gimbal RS4', '◈', 'After Effects', '◈'];
const ROW_3 = ['Kerala, India', '◆', '3 Years Experience', '◆', '20+ Projects', '◆', 'Feature Documentary', '◆', 'Abhinav M.', '◆'];

interface MarqueeRowProps {
    items: string[];
    direction?: 'left' | 'right';
    speed?: number;
    highlight?: boolean;
}

function MarqueeRow({ items, direction = 'left', speed = 40, highlight = false }: MarqueeRowProps) {
    // Repeat enough times to fill screen
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div className="overflow-hidden w-full flex">
            <motion.div
                className="flex whitespace-nowrap w-max flex-shrink-0"
                animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
                transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
            >
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        className={`inline-flex items-center px-5 font-paragraph text-base uppercase tracking-[0.2em]
              ${item.startsWith('◆') || item.startsWith('◈')
                                ? 'text-primary/60 text-lg'
                                : highlight
                                    ? 'text-white/90 font-medium'
                                    : 'text-white/45'}
            `}
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────────────────────
export default function TransitionBand() {
    const ref = useRef<HTMLDivElement>(null);

    // Parallax on the big centered text
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const ghostX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
    const ghostOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="relative w-full overflow-hidden bg-[#050505] py-4 select-none">

            {/* ── Large parallax decorative element — low opacity, theme-matched ── */}
            {/* Moves upward as you scroll through the band */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], ['15%', '-15%']),
                    x: ghostX,
                    opacity: ghostOpacity,
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                {/* Outer ring */}
                <div
                    style={{
                        width: 'clamp(260px, 45vw, 560px)',
                        height: 'clamp(260px, 45vw, 560px)',
                        border: '1px solid rgba(201,168,76,0.07)',
                        borderRadius: '50%',
                        position: 'relative',
                    }}
                >
                    {/* Middle ring */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '12%',
                            border: '1px solid rgba(201,168,76,0.05)',
                            borderRadius: '50%',
                        }}
                    />
                    {/* Inner ring with gold dot accent */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '28%',
                            border: '1px solid rgba(201,168,76,0.06)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Monogram */}
                        <span
                            style={{
                                fontFamily: 'var(--font-heading, sans-serif)',
                                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                                fontWeight: 700,
                                color: 'rgba(201,168,76,0.06)',
                                letterSpacing: '-0.02em',
                                userSelect: 'none',
                            }}
                        >
                            AM
                        </span>
                    </div>
                    {/* Top accent dot */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-3px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'rgba(201,168,76,0.25)',
                            boxShadow: '0 0 12px 4px rgba(201,168,76,0.12)',
                        }}
                    />
                    {/* Bottom accent dot */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-3px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'rgba(139,58,42,0.3)',
                            boxShadow: '0 0 12px 4px rgba(139,58,42,0.12)',
                        }}
                    />
                </div>
            </motion.div>

            {/* ── Top gold accent line ── */}
            <motion.div
                className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />

            {/* ── Marquee Row 1 — slides LEFT ── */}
            <div className="py-2">
                <MarqueeRow items={ROW_1} direction="left" speed={50} />
            </div>

            {/* ── Divider film-strip strip ── */}
            <div className="relative my-3 overflow-hidden">
                <div className="flex items-center gap-6 justify-center">
                    {/* Film perforation dots */}
                    {Array.from({ length: 28 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2.5 h-4 bg-primary/20 rounded-[2px] flex-shrink-0"
                            initial={{ opacity: 0, scaleY: 0 }}
                            whileInView={{ opacity: 1, scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.02, duration: 0.3 }}
                        />
                    ))}
                </div>
                {/* Center badge over the strip */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#050505] px-6 py-1.5 rounded-full border border-primary/20 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-primary font-mono text-xs tracking-[0.35em] uppercase">Portfolio 2025</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                </div>
            </div>

            {/* ── Marquee Row 2 — slides RIGHT (opposite direction) ── */}
            <div className="py-2">
                <MarqueeRow items={ROW_2} direction="right" speed={38} highlight />
            </div>

            {/* ── Second divider ── */}
            <div className="h-px w-full my-2" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.1) 20%, rgba(201,168,76,0.1) 80%, transparent)' }} />

            {/* ── Marquee Row 3 — slides LEFT, slower ── */}
            <div className="py-2">
                <MarqueeRow items={ROW_3} direction="left" speed={65} />
            </div>

            {/* ── Bottom gold accent line ── */}
            <motion.div
                className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />

            {/* Bottom gradient fade into About section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
            />
        </div>
    );
}
