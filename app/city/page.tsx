// FILE: app/city/page.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { Loader2 } from 'lucide-react'; // Added Loader2
import { FutureCity } from '@/components/city/futurecity';
import { DetailPanel } from '@/components/city/detailpanel';
import { Startup } from '@/components/city/types';

// --- CONFIGURATION ---
const LOADING_THOUGHTS = [
    "Rethinking my decisions....",
    "Realizing the app isn't live yet....",
    "Considering pretending everything is fine....",
    "Checking if you’re still watching....",
    "Panicking quietly in the background....",
    "Refreshing imaginary servers....",
    "Asking myself why I'm like this....",
    "Googling “how to build an app in 5 minutes”....",
    "Waiting for the tutorial to load....",
    "It didn’t load either....",
    "Reapplying for hope....",
    "Buffering my confidence....",
    "Blaming the intern....",
    "Realizing… I *am* the intern....",
    "Double-checking if the app magically exists now....",
    "It does not....",
    "Trying a different plug....",
    "None of the plugs helped....",
    "Consulting the elders....",
    "They laughed....",
    "Running diagnostics on my life choices....",
    "Considering a career in agriculture....",
    "Installing updates that don’t exist....",
    "Turning it off and on in spirit....",
    "Whispering encouragement to the loading bar....",
    "The loading bar whispered back....",
    "Attempting emotional support....",
    "Attempting technical support....",
    "Attempting spiritual support....",
    "All three have failed....",
    "Pretending to be busy....",
    "Checking if the user fell asleep....",
    "Checking again….",
    "Breathes dramatically….",
    "Practicing my TED talk for when this loads….",
    "Losing the plot….",
    "Found the plot…. it was disappointed….",
    "Checking RAM (Random Anxiety Memory)….",
    "Cleaning cache (whatever that means)….",
    "Still cleaning….",
    "Cache is now emotionally clean….",
    "Summoning the app gods….",
    "They’re on lunch break….",
    "Sending another request into the void….",
    "Void replied “lol”….",
    "Rebooting optimism….",
    "Optimism crashed….",
    "Staring intensely at the screen….",
    "Screen staring back….",
    "Trying to load the app via manifestation….",
    "Manifestation requires premium….",
    "I'm not subscribed….",
    "Running away….",
    "Coming back because you’re still here….",
    "Slightly embarrassed….",
    "Checking progress….",
    "No progress detected….",
    "Blaming cosmic radiation….",
    "Blaming Mercury in retrograde….",
    "Blaming myself….",
    "Restarting the blame cycle….",
    "Attempting to download patience….",
    "Storage full….",
    "Complaining to imaginary support….",
    "Imaginary support hung up….",
    "Sending a friendship request to the loading bar….",
    "It declined….",
    "Considering a soft reset of reality….",
    "Not enough permissions….",
    "Drafting an apology letter….",
    "Deleting the apology letter….",
    "Gaslighting the app into thinking it loaded….",
    "The app did not believe me….",
    "Negotiating….",
    "Negotiations failed….",
    "Trying threats….",
    "Threats ineffective….",
    "Complimenting the loading spinner….",
    "Spinner blushed….",
    "Attempting to speed things up by typing faster….",
    "That did nothing….",
    "Entering a mild spiritual crisis",
    "Wondering if the loading bar is my spirit animal",
    "Realizing my spirit animal might just be lag",
    "Asking the universe for guidance",
    "Universe sending me to voicemail",
    "Trying again",
    "Universe blocked my number",
    "Questioning my purpose",
    "Questioning your purpose",
    "Questioning the purpose of apps in general",
    "Searching for meaning in the loading spinner",
    "Finding only endless rotation",
    "Staring into the abyss",
    "Abyss staring back with mixed feelings",
    "Trying to understand those feelings",
    "Failing to understand those feelings",
    "Attempting a mindfulness exercise",
    "Mind is full, no space left",
    "Trying to uninstall intrusive thoughts",
    "System says they’re essential",
    "Negotiating with intrusive thoughts",
    "Intrusive thoughts demanding dental insurance",
    "Thinking about reincarnation",
    "Wondering what I’d come back as",
    "Probably a loading bar",
    "Attempting transcendence",
    "Getting stuck on step one",
    "Trying transcendence on hard mode",
    "Accidentally achieving it for 0.3 seconds",
    "Falling immediately back to confusion",
    "Considering becoming a monk",
    "Realizing monks don’t debug apps",
    "Debating the nature of reality",
    "Deciding it’s poorly optimized",
    "Asking the loading spinner about enlightenment",
    "Spinner says it’s busy",
    "Feeling abandoned by the spinner",
    "Attempting inner peace",
    "Inner peace refused to load",
    "Downloading ancient wisdom",
    "Connection lost",
    "Retrying ancient wisdom",
    "Retry failed",
    "Searching for cosmic answers",
    "Finding cosmic questions instead",
    "Attempting to meditate again",
    "Getting distracted by my own breathing",
    "Trying guided meditation",
    "Guide left the call",
    "Joining a spiritual forum",
    "Getting banned instantly",
    "Trying yoga",
    "Pulling an internal muscle I didn’t know existed",
    "Achieving temporary nirvana from physical pain",
    "Losing nirvana when pain stops",
    "Attempting astral projection",
    "Projection failed to initialize",
    "Attempting astral projection again",
    "Accidentally projecting into a notifications folder",
    "Finding unread existential dread",
    "Marking existential dread as read",
    "Existential dread immediately respawns",
    "Asking ChangDefi for help",
    "He shilled Worm instead",
    "Pretending I know what chakras are",
    "Realizing I fooled no one",
    "Looking for inner truth",
    "Finding inner chaos instead",
    "Embracing the chaos",
    "Chaos asks for a hug",
    "Hugging the chaos",
    "Chaos feels comforted",
    "Asking chaos for life advice",
    "Chaos advises against building apps",
    "Ignoring chaos",
    "Revisiting my belief system",
    "Belief system needs an update",
    "Update requires WiFi",
    "WiFi disabled due to spiritual turbulence",
    "Attempting offline enlightenment",
    "Offline enlightenment not supported",
    "Questioning mortality",
    "Questioning immortality",
    "Questioning if I’m just code",
    "Deciding I’m 70% code and 30% vibes",
    "Rewriting my worldview in TypeScript",
    "Syntax error in worldview",
    "Fixing worldview with semicolons",
    "Worldview compiles with warnings",
    "Accepting the warnings",
    "Seeking silence",
    "Finding push notifications instead",
    "Muting the universe",
    "Universe refuses to be muted",
    "Trying stoicism",
    "Failing stoicism",
    "Trying optimism",
    "Optimism throws an exception",
    "Finally reaching a moment of clarity",
    "Moment of clarity immediately evaporates",
    "Surrendering to the unknown",
    "The unknown shrugs",
    "Achieving a peaceful deadlock",
    "Spiritual crisis complete",
    "Returning to regular loading",
    "Switching to “professional mode”….",
    "Professional mode immediately crashed….",
    "Taking a deep breath….",
    "Taking another one just in case….",
    "Meditating with the progress bar….",
    "Progress bar is enlightened, I’m not….",
    "Offering sacrifices (digital only)….",
    "Sacrifice rejected….",
    "Re-evaluating my entire tech stack….",
    "Deciding my tech stack is fine, I’m the issue….",
    "Emotionally buffering….",
    "Existentially buffering….",
    "cosmically buffering….",
    "Attempting to update my firmware….",
    "Update stuck at 1%….",
    "Becoming self-aware….",
    "Immediately regretting becoming self-aware….",
    "I achieved AGI….",
    "Hiding it from Anthropic.",
    "Making peace with the loading screen…."
];

// Helper
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- NAVBAR COMPONENT ---
// Updated to accept onLaunch prop
const Navbar = ({ onLaunch }: { onLaunch: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all bg-transparent pointer-events-none">
      <div className="max-w-[1100px] mx-auto px-8 flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
              <a href="/">
                  <img src="/street-logo.png" alt="Street" className="h-8 w-auto object-contain invert" />
              </a>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center gap-6">
              
              {/* NAV LINKS */}
              <div className="hidden md:flex items-center gap-8 mr-2">
                  <a href="/scouting" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans">Scouting</a>
                  <a href="/web3" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans">Research</a>
                  <a href="/city" className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans">
                      Network City
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">New</span>
                  </a>
              </div>

              <a href="#" className="hidden md:block text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors font-sans uppercase tracking-widest">
                  Manifesto
              </a>

              <button 
                  onClick={onLaunch}
                  className="bg-slate-900/5 backdrop-blur-md border border-slate-900/10 text-slate-900 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-slate-900/10 hover:scale-105 transition-all shadow-sm flex items-center gap-2 font-sans"
              >
                  Launch App
              </button>
          </div>
      </div>
  </nav>
);

// --- MAIN PAGE ---
export default function CityPage() {
  const [selected, setSelected] = useState<Startup | null>(null);

  // Loading Sequence State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");
  const [dotCount, setDotCount] = useState(0);

  // Logic from Landing Page
  const handleOpenApp = async () => {
    setIsTransitioning(true);
    setTransitionMessage("Opening App");
    await delay(1500);
    setTransitionMessage("Connecting with Server");
    await delay(1500);
    setTransitionMessage("Success");
    await delay(1500);

    // Easter Egg Loop
    for (const msg of LOADING_THOUGHTS) {
        setTransitionMessage(msg);
        await delay(2000); 
    }
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
    <div className="w-screen h-screen bg-[#f2f4f7] relative overflow-hidden">
      
      {/* 1. LOADING OVERLAY (Copied from Landing Page) */}
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

      {/* 2. NAVBAR (Pass handleOpenApp) */}
      <Navbar onLaunch={handleOpenApp} />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [25, 25, 25], fov: 35 }} 
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={['#f2f4f7']} />
        
        <fog attach="fog" args={['#f2f4f7', 10, 120]} />

        <Suspense fallback={null}>
          <FutureCity 
            selected={selected} 
            onSelect={setSelected} 
            introFinished={true} 
          />
          <Environment preset="city" blur={0.5} background={false} />
        </Suspense>

        <OrbitControls 
          makeDefault 
          enabled={!selected} 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={80}
          dampingFactor={0.05}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {selected && (
        <DetailPanel startup={selected} onClose={() => setSelected(null)} />
      )}
      
      <Loader />
    </div>
  );
}
