'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, animate } from 'framer-motion'; 
import { Loader2, ArrowUpRight, ArrowRight, Twitter, Globe, X, Check, Building2, TrendingUp, AlertTriangle } from 'lucide-react';
import PhysicsFooter from '@/components/PhysicsFooter';

// --- FUNNEL CANVAS ---
const FunnelCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const PARTICLE_COUNT = 1500; 
    const COLORS = ['#cfd7ff', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#3a48c8'];
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            canvas.width = width;
            canvas.height = height;
        }
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    class Particle {
      x: number = 0; y: number = 0; vx: number = 0; vy: number = 0; w: number = 0; h: number = 0;
      constructor() { this.reset(true); }
      reset(randomX = false) {
        const w = canvas?.width || 800; const h = canvas?.height || 600;
        this.x = randomX ? Math.random() * w : -50;
        this.y = (h / 2) + (Math.random() - 0.5) * (h * 0.8);
        this.w = Math.random() * 3 + 2; this.h = Math.random() * 1.5 + 0.5;
        this.vx = 2 + Math.random() * 2.5; this.vy = (Math.random() - 0.5) * 2;
      }
      update(width: number, height: number, correction: number) {
        this.x += this.vx * correction; this.y += this.vy * correction;
        const bundlePointX = width * 0.55; 
        const currentLimit = this.x < bundlePointX ? (height * 0.9 * (1 - Math.max(0, this.x/bundlePointX)) + 30) : 30;
        if (Math.abs(this.y - height/2) > currentLimit) {
            this.vy -= (this.y - height/2) * 0.01 * correction;
            this.vy *= (1 - 0.1 * correction); 
        }
        if (this.x > width + 50) this.reset(false);
      }
    }
    const particles = COLORS.flatMap(() => Array.from({ length: PARTICLE_COUNT / COLORS.length }, () => new Particle()));
    let animationId: number;
    let lastTime = performance.now();
    const animate = () => {
        if (!canvas || !ctx) return;
        const w = canvas.width; const h = canvas.height;
        if (w === 0 || h === 0) { animationId = requestAnimationFrame(animate); return; }
        const now = performance.now();
        const correction = Math.min((now - lastTime) / 16.667, 2.0);
        lastTime = now;
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        particles.forEach((p, i) => {
            ctx.fillStyle = COLORS[i % COLORS.length];
            p.update(w, h, correction);
            ctx.fillRect(p.x, p.y, p.w, p.h);
        });
        animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => { resizeObserver.disconnect(); cancelAnimationFrame(animationId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-[2.5rem]" />;
};

// --- UI COMPONENTS ---
const MockProgressBar = ({ label, current, total, color }: { label: string, current: number, total: number, color: string }) => (
    <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500/80 font-sans">
        <div className="flex gap-0.5">
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className={`h-3 w-1 rounded-sm ${i < current ? color : 'bg-slate-200/50'}`}></div>
            ))}
        </div>
        <span className="tabular-nums w-4 text-right text-slate-400">{current}/{total}</span>
        <span className="text-slate-300">•</span>
        <span>{label}</span>
    </div>
);

const FeatureParticleCard = ({ variant, title, text, stats }: { variant: 'static' | 'chaotic' | 'flow', title: string, text: string, stats: { label: string, current: number, total: number, color: string }[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        const COLORS = ['#cfd7ff', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'];
        const PARTICLE_COUNT = 350;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) { canvas.width = width; canvas.height = height; }
            }
        });
        resizeObserver.observe(container);
        class CardParticle {
            x: number = 0; y: number = 0; vx: number = 0; vy: number = 0; ox: number = 0; oy: number = 0; w: number; h: number; color: string;
            constructor() {
                this.w = Math.random() * 3 + 2; this.h = Math.random() * 1.5 + 0.5;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.reset(true);
            }
            reset(initial: boolean = false) {
                const w = canvas?.width || 300; const h = canvas?.height || 200;
                if (variant === 'static') { this.x = (w / 2) + (Math.random() - 0.5) * 160; this.y = (h / 2) + (Math.random() - 0.5) * 100; this.ox = this.x; this.oy = this.y; } 
                else if (variant === 'flow') { this.x = initial ? Math.random() * w : -20; this.y = (h / 2) + (Math.random() - 0.5) * 80; this.vx = 2 + Math.random() * 2; } 
                else { this.x = Math.random() * w; this.y = Math.random() * h; this.vx = (Math.random() - 0.5) * 1.5; this.vy = (Math.random() - 0.5) * 1.5; }
            }
            update(width: number, height: number) {
                if (variant === 'static') { this.x = this.ox + Math.sin(Date.now() * 0.002 + this.ox) * 1.0; this.y = this.oy + Math.cos(Date.now() * 0.003 + this.oy) * 1.0; } 
                else if (variant === 'chaotic') { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; } 
                else if (variant === 'flow') { this.x += this.vx; this.y += Math.sin(this.x * 0.02) * 0.5; if (this.x > width + 20) this.reset(false); }
            }
        }
        const particles = Array.from({ length: PARTICLE_COUNT }, () => new CardParticle());
        let animId: number;
        const animate = () => {
            if (!canvas || !ctx) return;
            const w = canvas.width; const h = canvas.height;
            if (w === 0 || h === 0) { animId = requestAnimationFrame(animate); return; }
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(w, h); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.w, p.h); });
            animId = requestAnimationFrame(animate);
        };
        setTimeout(() => animate(), 100);
        return () => { resizeObserver.disconnect(); cancelAnimationFrame(animId); };
    }, [variant]);

    return (
        <div className="flex flex-col h-full rounded-3xl border border-white/50 bg-white/60 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_0_rgba(31,38,135,0.12)] hover:-translate-y-1 hover:bg-white/80 relative group">
            <div ref={containerRef} className="relative h-[240px] w-full mt-4">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-multiply opacity-90" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.4) 100%)' }}></div>
            </div>
            <div className="px-8 -mt-8 relative z-10 mb-6">
                <div className="space-y-2.5">{stats.map((s, i) => <MockProgressBar key={i} {...s} />)}</div>
            </div>
            <div className="px-8 pb-10 flex flex-col justify-start gap-4 flex-1">
                <div className="space-y-2">
                    <h3 className="text-3xl font-serif text-slate-900 leading-tight tracking-tight">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium font-sans">{text}</p>
                </div>
            </div>
        </div>
    );
};

// --- COMPARISON SECTION ---
const ComparisonSection = () => {
    const [flowParticles, setFlowParticles] = useState<{left: number, top: number, duration: number, opacity: number}[]>([]);
    useEffect(() => {
        const newParticles = Array.from({ length: 8 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 3 + Math.random() * 2,
            opacity: Math.random() * 0.5 + 0.2
        }));
        setFlowParticles(newParticles);
    }, []);

    return (
        <section className="relative z-10 w-full bg-white px-6 pb-32">
            <div className="max-w-[1100px] mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">Liquidity without the Pivot.</h2>
                    <p className="text-lg text-slate-500 font-medium tracking-wide font-sans max-w-2xl mx-auto">
                        Liquidity & Speculation are a public good. You shouldn't have to become a crypto project to access it.
                    </p>
                </div>
                <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/60 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] flex flex-col md:flex-row min-h-[550px] bg-white/20 backdrop-blur-xl ring-1 ring-slate-200/50">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] flex items-center justify-center border border-slate-100 ring-4 ring-white/30">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">VS</span>
                    </div>
                    <div className="flex-1 bg-slate-50/50 backdrop-blur-md p-12 flex flex-col justify-between relative overflow-hidden group items-center text-center border-r border-slate-100/50">
                        <div className="relative z-10 space-y-8 flex flex-col items-center w-full max-w-md">
                            <div className="flex items-center justify-center gap-3 text-slate-500 font-semibold text-sm bg-white/60 py-2 px-4 rounded-full border border-slate-100 shadow-sm">
                                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0"><X size={12} className="text-slate-600" strokeWidth={3} /></div>
                                <span>Other Standards</span>
                            </div>
                            <h3 className="text-2xl font-serif text-slate-900">Turns you into a crypto business</h3>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto font-sans">Forces a complete pivot, complex legal overhaul, and 100% on-chain risk.</p>
                        </div>
                        <div className="relative h-48 w-full mt-8 flex items-center justify-center">
                            <div className="relative w-28 h-28 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center z-10 group-hover:scale-95 transition-transform duration-500">
                                <Building2 size={48} className="text-slate-300" />
                                <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse"></div>
                            </div>
                            <div className="absolute w-40 h-40 border-2 border-dashed border-slate-200 rounded-full animate-[spin_12s_linear_infinite]"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#0B1121]/95 backdrop-blur-xl p-12 flex flex-col justify-between relative overflow-hidden group items-center text-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
                        <div className="relative z-10 space-y-8 flex flex-col items-center w-full max-w-md">
                            <div className="h-12 flex items-center"><img src="/street-logo.png" alt="Street" className="h-full w-auto object-contain brightness-0 invert" /></div>
                            <div className="space-y-3 w-full">
                                <div className="flex items-center justify-center gap-3 text-blue-200 font-semibold text-sm bg-blue-500/10 py-2 px-4 rounded-full border border-blue-500/20 shadow-sm">
                                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"><Check size={12} className="text-white" strokeWidth={3} /></div>
                                    <span>Tokenize just 1% of equity</span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto font-sans">Keep your business model, get instant upsides from it, and let the market speculate without the headache.</p>
                            </div>
                        </div>
                        <div className="relative h-48 w-full mt-8 flex items-center justify-center">
                            <div className="relative w-28 h-28 bg-[#151E32] rounded-3xl shadow-2xl border border-white/10 flex items-center justify-center z-10 group-hover:border-blue-500/40 transition-colors duration-500 ring-1 ring-white/5">
                                <Building2 size={48} className="text-white" />
                                <div className="absolute -right-4 -top-4 bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_4px_15px_rgba(59,130,246,0.4)] animate-[bounce_3s_infinite]">1%</div>
                            </div>
                            <div className="absolute inset-0 overflow-hidden opacity-40">
                                {flowParticles.map((p, i) => (
                                    <div key={i} className="absolute h-0.5 w-12 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" style={{ left: `${p.left}%`, top: `${p.top}%`, animation: `flowRight ${p.duration}s linear infinite`, opacity: p.opacity }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{` @keyframes flowRight { 0% { transform: translateX(-100px); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateX(300px); opacity: 0; } } `}</style>
        </section>
    );
};

// --- EQUITY CALCULATOR SECTION (FIXED SLIDER) ---
const EquityCalculatorSection = () => {
    const equityTiers = [
        { val: 1, up: "people can speculate on your company, you get revenue from the access and don't lose out to synthetic derivates like RobinHood, you can design engines on user acquisition etc", down: "ceiling on how many people will be interested" },
        { val: 3, up: "easier user acquisition engine, and higher ceiling, more access to web3 markets and easy to integrate with more liquidity and CEXs, more playing room", down: "still a ceiling on how many people will be interested" },
        { val: 10, up: "you have full upsides of crypto at this spot, CEX listings, plug into decentralised finance, large interest in your project, high user acquisition engine", down: "lot of people interested now, high commitment" },
        { val: 20, up: "you are pivoting to embrace crypto but not changing your companies direction, you are a web2.5 company now operating on the edge of both sides, all the upsides of prior", down: "very large commitment, street will usually not advice to commit so hard unless you gradually increase the equity to 20% when seeing value" },
        { val: 50, up: "you are a crypto company now and people will treat you like one, too heavy commitment (Street will never advice this)", down: "people will expect you to act like a crypto company, to give them updates every day and you will be forced to pivot your communications" }
    ];
    const [selectedEquity, setSelectedEquity] = useState(equityTiers[0].val);
    const yMotion = useMotionValue(0);
    const trackHeight = 300; 
    const stops = equityTiers.map((_, index) => (index / (equityTiers.length - 1)) * trackHeight);

    useEffect(() => {
        const index = equityTiers.findIndex(t => t.val === selectedEquity);
        if(index !== -1) yMotion.set(stops[index]);
    }, []);

    const handleDragEnd = (_: any, info: any) => {
        const currentY = yMotion.get();
        let closestIndex = 0;
        let minDiff = Infinity;
        stops.forEach((stop, index) => { const diff = Math.abs(currentY - stop); if (diff < minDiff) { minDiff = diff; closestIndex = index; } });
        animate(yMotion, stops[closestIndex], { type: "spring", stiffness: 400, damping: 30 });
        setSelectedEquity(equityTiers[closestIndex].val);
    };

    const handleTierClick = (val: number, index: number) => {
        setSelectedEquity(val);
        animate(yMotion, stops[index], { type: "spring", stiffness: 400, damping: 30 });
    };

    const currentTier = equityTiers.find(t => t.val === selectedEquity) || equityTiers[0];

    return (
        <section className="relative z-10 w-full bg-white px-6 pb-32">
            <div className="max-w-[1100px] mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">Scale on your terms.</h2>
                    <p className="text-lg text-slate-500 font-medium tracking-wide font-sans">Start small and expand your float only when you see the value.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-stretch min-h-[450px] relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-blue-50/50 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
                        <div className="flex items-center gap-3 text-green-600 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shadow-sm"><TrendingUp size={16} strokeWidth={2.5} /></div>
                            <span className="text-xs font-bold uppercase tracking-widest font-sans">Upside</span>
                        </div>
                        <h3 className="text-2xl font-sans text-slate-900 leading-tight">{currentTier.up}</h3>
                    </div>
                    <div className="w-full md:w-40 flex flex-col items-center justify-center relative z-20 py-4 select-none">
                        <div className="relative w-2 h-[300px] bg-slate-100 rounded-full flex flex-col justify-between items-center">
                            <motion.div className="absolute top-0 w-full bg-blue-100 rounded-full" style={{ height: yMotion }} />
                            {equityTiers.map((tier, index) => (
                                <div key={tier.val} className="relative w-full flex items-center justify-center">
                                    <div className={`w-3 h-3 rounded-full z-10 transition-colors duration-300 ${selectedEquity >= tier.val ? 'bg-blue-500' : 'bg-slate-300'}`} />
                                    <button onClick={() => handleTierClick(tier.val, index)} className={`absolute left-6 text-xs font-bold font-sans transition-colors duration-300 ${selectedEquity === tier.val ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>{tier.val}%</button>
                                </div>
                            ))}
                            <motion.div drag="y" dragConstraints={{ top: 0, bottom: 300 }} dragElastic={0.1} dragMomentum={false} onDragEnd={handleDragEnd} style={{ y: yMotion }} className="absolute top-0 -left-3 w-8 h-8 bg-slate-900 rounded-full shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center z-20 ring-4 ring-white">
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-6 relative z-10 text-right items-end">
                        <div className="flex items-center gap-3 text-orange-500 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest font-sans">Downside</span>
                            <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm"><AlertTriangle size={16} strokeWidth={2.5} /></div>
                        </div>
                        <h3 className="text-xl font-medium text-slate-700 leading-relaxed max-w-sm font-sans">{currentTier.down}</h3>
                    </div>
                </div>
                <div className="mt-8 text-center"><p className="text-[10px] text-slate-400 font-medium font-sans">* Street allows to to start with 1% and gradually increase the equity if you see the benefits and worthy.</p></div>
            </div>
        </section>
    );
};

// --- LANDING PAGE COMPONENT ---
export default function LandingPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");
  const [dotCount, setDotCount] = useState(0);

  const handleOpenApp = () => {
    setIsTransitioning(true);
    setTransitionMessage("Opening App");
    setTimeout(() => setTransitionMessage("Connecting with Server"), 1500);
    setTimeout(() => setTransitionMessage("Success"), 2500);
    setTimeout(() => router.push('/dashboard'), 3500);
  };

  useEffect(() => {
    if (isTransitioning) {
      const interval = setInterval(() => setDotCount((prev) => (prev + 1) % 4), 400); 
      return () => clearInterval(interval);
    } else {
      setDotCount(0);
    }
  }, [isTransitioning]);

  const renderDots = () => ".".repeat(dotCount);

  return (
    <div className="min-h-screen font-sans bg-transparent text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative flex flex-col">
      
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-white">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #4A90E2 0%, #93C5FD 45%, #FFFFFF 100%)' }}></div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.5) 100%)' }}></div>
      </div>

      {isTransitioning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 flex flex-col items-center gap-6 max-w-sm w-full mx-4 transform transition-all scale-100">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full"></div>
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin relative z-10" />
                </div>
                <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 font-sans">Just a moment</h3>
                    <p className="text-sm font-medium text-gray-500 font-mono h-6">{transitionMessage}{renderDots()}</p>
                </div>
            </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all">
          <div className="max-w-[1100px] mx-auto px-8 flex justify-between items-center">
              <div className="flex items-center gap-3">
                  <img src="/street-logo.png" alt="Street" className="h-8 w-auto object-contain" />
              </div>
              <div className="flex items-center gap-6">
                   <a href="https://accelerate.street.app" target="_blank">
                      <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-white hover:text-blue-600 transition-all shadow-sm flex items-center gap-2 font-sans">
                          Apply Now
                      </button>
                   </a>
              </div>
          </div>
      </nav>

      <section className="relative z-10 pt-20 pb-6 flex flex-col items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-white drop-shadow-sm tracking-tight mb-8 leading-tight">
              #1 Place for <br/>
              breakout startups
          </h1>
          <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6"></div>
          <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm mb-6 px-4 font-sans">
              Deploy equity-grade tokens without it being a security and supercharge your startups growth.
          </p>
          
          <button 
            onClick={handleOpenApp}
            className="group relative flex items-center gap-2.5 px-6 py-3 rounded-xl overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #4689F2 0%, #1A55C9 100%)',
                boxShadow: `
                    0px 4px 4px rgba(0, 0, 0, 0.25), 
                    0px 8px 16px rgba(0, 0, 0, 0.15),
                    inset 0px 1px 2px rgba(255, 255, 255, 0.4),
                    inset 0px -2px 4px rgba(0, 0, 0, 0.25)
                `,
            }}
          > 
              <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded border-[1.5px] border-white/90 shadow-sm">
                 <ArrowUpRight className="text-white w-3 h-3" strokeWidth={3} />
              </div>
              <span className="relative z-10 text-sm font-sans font-bold text-white tracking-wide drop-shadow-sm">
                  Open App
              </span>
              
              <div className="absolute inset-0 z-0 animate-shimmer pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)', backgroundSize: '200% 100%' }}></div>
          </button>
      </section>

      <section className="relative z-10 w-full flex items-center justify-center px-6 pb-12">
          <div className="relative w-full max-w-[1400px] h-[50vh] min-h-[450px] rounded-[2rem] overflow-hidden mx-auto bg-white border border-slate-200 shadow-2xl shadow-blue-900/10">
              <FunnelCanvas />
              <div className="absolute bottom-0 left-0 right-0 z-20 h-[65%] bg-gradient-to-t from-white from-10% via-white/90 to-transparent flex items-end pb-10 px-8 md:px-12 pointer-events-none">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                      <div className="text-left">
                          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-slate-900 leading-[1.0] drop-shadow-sm">
                              Standardize Equity.<br/>
                              On-Chain Liquidity.
                          </h1>
                      </div>
                      <div className="text-left md:text-right pb-1">
                          <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-sans max-w-[280px] ml-auto">
                              Street transforms illiquid startup stakes into liquid, compliant digital assets. Order out of chaos.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="relative z-10 w-full bg-white px-6 pb-32 pt-20 overflow-hidden">
          <div className="max-w-[1100px] mx-auto relative z-10">
             <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mt-6 tracking-tight">
                    We invented ERC-S
                </h2>
                <p className="mt-4 text-lg text-slate-500 font-medium tracking-wide font-sans">
                    Equity grade ownership without it being a security
                </p>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center">
                <FeatureParticleCard 
                    variant="static"
                    title="Locked Equity"
                    text="Your equity is locked and not contributing to growth."
                    stats={[ { label: 'Liquidity', current: 0, total: 5, color: 'bg-slate-300' }, { label: 'Revenue', current: 0, total: 5, color: 'bg-slate-300' }, { label: 'Growth', current: 1, total: 5, color: 'bg-slate-300' } ]}
                />
                <div className="hidden lg:flex justify-center text-slate-300/50"><ArrowRight size={32} strokeWidth={1} /></div>
                <FeatureParticleCard 
                    variant="chaotic"
                    title="Liquid Assets"
                    text="ERC-S allows you to unlock a small chunk of your equity without selling a %."
                    stats={[ { label: 'Liquidity', current: 5, total: 5, color: 'bg-green-400' }, { label: 'Revenue', current: 5, total: 5, color: 'bg-green-400' }, { label: 'Growth', current: 3, total: 5, color: 'bg-green-400' } ]}
                />
                 <div className="hidden lg:flex justify-center text-slate-300/50"><ArrowRight size={32} strokeWidth={1} /></div>
                <FeatureParticleCard 
                    variant="flow"
                    title="Acceleration"
                    text="You can use your locked equity as a user, attention and revenue engine now."
                    stats={[ { label: 'Liquidity', current: 5, total: 5, color: 'bg-blue-500' }, { label: 'Revenue', current: 5, total: 5, color: 'bg-blue-500' }, { label: 'Growth', current: 5, total: 5, color: 'bg-blue-500' } ]}
                />
             </div>
          </div>
      </section>

      <ComparisonSection />
      <EquityCalculatorSection />

      <footer className="w-full border-t border-gray-100 bg-white relative z-10">
          <PhysicsFooter />
          <div className="max-w-[1100px] mx-auto px-8 pb-12 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                  <div className="col-span-1 md:col-span-2 space-y-4">
                     <div className="flex items-center gap-2">
                         <div className="relative h-6 w-24">
                            <img src="/street-logo2.png" alt="Street" className="h-6 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
                         </div>
                     </div>
                     <p className="text-xs text-gray-500 leading-relaxed max-w-xs font-sans">
                        Street turns private equity into liquid, programmable digital assets through the ERC-S standard.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">Platform</h4>
                     <ul className="space-y-2 text-xs text-gray-500 font-sans">
                        <li><a href="#" className="hover:text-blue-600 transition">Governance</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Treasury</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Documentation</a></li>
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">Legal</h4>
                     <ul className="space-y-2 text-xs text-gray-500 font-sans">
                        <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Cookie Policy</a></li>
                     </ul>
                  </div>
              </div>
              <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-[10px] text-gray-400 font-sans">© 2025 Street Protocol. All rights reserved.</p>
                  <div className="flex gap-6 text-gray-400">
                      <a href="https://x.com/StreetFDN" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
                          <Twitter size={16} />
                      </a>
                      <a href="#" className="hover:text-blue-600 transition">
                          <Globe size={16} />
                      </a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}