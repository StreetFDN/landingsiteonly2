// FILE: app/city/page.tsx
'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import * as THREE from 'three';
import { FutureCity } from '@/components/city/futurecity';
import { DetailPanel } from '@/components/city/detailpanel';
import { EnvironmentControls } from '@/components/city/ui/environmentcontrols';
import { TimeMode } from '@/components/city/effects/environmentcontroller';
import { Startup } from '@/components/city/types';
import { LoadingClouds, LoadingCloudsHandle } from '@/components/city/loadingclouds';
import { CanvasBackground } from '@/components/city/canvasbackground';

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

// Camera Reset Component (inside Canvas)
const CameraReset = ({ resetTrigger, onResetComplete }: { resetTrigger: number; onResetComplete: () => void }) => {
  const { camera, controls } = useThree();
  const prevTriggerRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (resetTrigger !== prevTriggerRef.current && resetTrigger > 0) {
      prevTriggerRef.current = resetTrigger;
      
      // Cancel any existing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Initial camera position and target (20% zoomed in from [25, 25, 25])
      const initialPosition = new THREE.Vector3(20, 20, 20);
      const initialTarget = new THREE.Vector3(0, 0, 0);
      
      // Smoothly animate camera back
      const startPosition = camera.position.clone();
      const startTarget = (controls as any)?.target?.clone() || new THREE.Vector3(0, 0, 0);
      const duration = 1000; // 1 second
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        const eased = easeInOutCubic(progress);
        
        camera.position.lerpVectors(startPosition, initialPosition, eased);
        
        if (controls && (controls as any).target) {
          (controls as any).target.lerpVectors(startTarget, initialTarget, eased);
          (controls as any).update();
        }
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure we're exactly at the target
          camera.position.copy(initialPosition);
          if (controls && (controls as any).target) {
            (controls as any).target.copy(initialTarget);
            (controls as any).update();
          }
          animationFrameRef.current = null;
          onResetComplete();
        }
      };
      
      animate();
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resetTrigger, camera, controls, onResetComplete]);

  return null;
};

// --- NAVBAR COMPONENT ---
const Navbar = ({ onLaunch, timeMode }: { onLaunch: () => void; timeMode: TimeMode }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all bg-transparent pointer-events-none">
      <div className="max-w-[1100px] mx-auto px-8 flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
              <a href="/">
                  <img src="/street-logo.png" alt="Street" className={`h-8 w-auto object-contain ${timeMode === 'day' ? 'invert' : ''}`} style={timeMode === 'night' ? { filter: 'brightness(0) invert(1) opacity(0.9)' } : undefined} />
              </a>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center gap-6">
              
              {/* NAV LINKS */}
              <div className="hidden md:flex items-center gap-8 mr-2">
                  <a href="/scouting" className={`text-sm font-medium transition-colors font-sans ${timeMode === 'day' ? 'text-black hover:text-black/80' : 'text-gray-200 hover:text-gray-300'}`}>Scouting</a>
                  <a href="/web3" className={`text-sm font-medium transition-colors font-sans ${timeMode === 'day' ? 'text-black hover:text-black/80' : 'text-gray-200 hover:text-gray-300'}`}>Research</a>
                  <a href="/cockpit-test" className={`group flex items-center gap-2 text-sm font-medium transition-colors font-sans ${timeMode === 'day' ? 'text-black hover:text-black/80' : 'text-gray-200 hover:text-gray-300'}`}>
                      Network City
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${timeMode === 'day' ? 'bg-blue-100 text-blue-600' : 'bg-gray-300/20 text-gray-200'}`}>New</span>
                  </a>
              </div>

            

              <button 
                  onClick={onLaunch}
                  className={`backdrop-blur-md px-6 py-2.5 rounded-full text-xs font-bold hover:scale-105 transition-all shadow-sm flex items-center gap-2 font-sans ${
                    timeMode === 'day' 
                      ? 'bg-slate-900/5 border border-slate-900/10 text-slate-900 hover:bg-slate-900/10' 
                      : 'bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20'
                  }`}
              >
                  Launch App
              </button>
          </div>
      </div>
  </nav>
);

// --- TIME-BASED DAY/NIGHT CALCULATION ---
// Dawn: 6:00 AM (switch to day)
// Dusk: 7:00 PM (19:00) (switch to night)
const getTimeModeFromCurrentTime = (): TimeMode => {
  const now = new Date();
  const hours = now.getHours();
  
  // Day: 6:00 AM (6) to 7:00 PM (19)
  // Night: 7:00 PM (19) to 6:00 AM (6)
  if (hours >= 6 && hours < 19) {
    return 'day';
  }
  return 'night';
};

// --- MAIN PAGE ---
export default function CityPage() {
  const [selected, setSelected] = useState<Startup | null>(null);
  const [timeMode, setTimeMode] = useState<TimeMode>(() => getTimeModeFromCurrentTime());
  const [cameraResetTrigger, setCameraResetTrigger] = useState(0);
  const [showLoadingClouds, setShowLoadingClouds] = useState(true);
  const [startCloudAnimation, setStartCloudAnimation] = useState(false);
  const [cloudsReady, setCloudsReady] = useState(false);
  // Initialize canvasReady and showCanvas as false so overlay is visible immediately
  const [canvasReady, setCanvasReady] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);
  const cloudsRef = useRef<LoadingCloudsHandle>(null);
  // Initialize CSS custom property for name tag fade-in (completely outside React)
  // Clean up on unmount to prevent leaking to other pages
  useEffect(() => {
    document.documentElement.style.setProperty('--name-tag-opacity', '0');
    document.documentElement.style.setProperty('--name-tag-translate-y', '-1rem');
    
    return () => {
      // Clean up CSS custom properties when component unmounts
      document.documentElement.style.removeProperty('--name-tag-opacity');
      document.documentElement.style.removeProperty('--name-tag-translate-y');
    };
  }, []);
  
  // Configuration: Adjust when name tags start fading in (0.0 to 1.0, where 0.5 = halfway through cloud animation)
  const NAMETAG_FADE_IN_START = 0.5; // Start fade-in when cloud animation is 50% complete

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

  // Automatic time-based day/night switching
  useEffect(() => {
    // Update immediately on mount
    setTimeMode(getTimeModeFromCurrentTime());
    
    // Check time every minute to update mode if needed
    const interval = setInterval(() => {
      const newMode = getTimeModeFromCurrentTime();
      setTimeMode((currentMode) => {
        // Only update if mode actually changed (prevents unnecessary re-renders)
        if (newMode !== currentMode) {
          return newMode;
        }
        return currentMode;
      });
    }, 60000); // Check every minute (60000ms)
    
    return () => clearInterval(interval);
  }, []);

  // Start cloud animation after clouds are ready and a short delay
  useEffect(() => {
    if (cloudsReady) {
      const timer = setTimeout(() => {
        setStartCloudAnimation(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cloudsReady]);

  // Start name tag fade-in when cloud animation reaches the configured point
  // Cloud animation progress goes from 0 to 1, with animationSpeed affecting how fast
  // Calculate delay based on when we want fade-in to start (default 0.5 = halfway)
  useEffect(() => {
    if (startCloudAnimation) {
      // Animation speed is 0.01, so progress increases by 0.01 per second
      // To reach progress = NAMETAG_FADE_IN_START, it takes: NAMETAG_FADE_IN_START / cloudAnimationSpeed seconds
      // cloudAnimationSpeed is 0.01, so: NAMETAG_FADE_IN_START / 0.01 = NAMETAG_FADE_IN_START * 100 seconds
      const cloudAnimationSpeed = 0.01;
      const fadeInDelayMs = (NAMETAG_FADE_IN_START / cloudAnimationSpeed) * 35;
      
      const fadeInTimer = setTimeout(() => {
        // Update CSS custom properties directly - completely outside React render cycle
        // This triggers the fade-in animation via pure CSS, zero React involvement
        document.documentElement.style.setProperty('--name-tag-opacity', '1');
        document.documentElement.style.setProperty('--name-tag-translate-y', '0');
      }, fadeInDelayMs);
      
      return () => clearTimeout(fadeInTimer);
    }
  }, [startCloudAnimation]);




  // Delay Canvas mount (Option 6)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMountCanvas(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Show Canvas after it's ready (Option 2)
  useEffect(() => {
    if (canvasReady) {
      const timer = setTimeout(() => {
        setShowCanvas(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [canvasReady]);

  const renderDots = () => ".".repeat(dotCount);

  // Sky colors matching the transition
  const DAY_BG_COLOR = '#d5a7b4';
  const NIGHT_BG_COLOR = '#43526f';
  const skyColor = timeMode === 'day' ? DAY_BG_COLOR : NIGHT_BG_COLOR;

  // Loading clouds configuration - adjust these values to position and size the clouds
  const leftCloudX = -6;      // Left cloud X position (negative = left)
  const leftCloudY = 21;        // Left cloud Y position (vertical)
  const leftCloudZ = -25;       // Left cloud Z position (depth)
  const rightCloudX =-4;      // Right cloud X position (positive = right)
  const rightCloudY = 21;      // Right cloud Y position (vertical)
  const rightCloudZ = -25;     // Right cloud Z position (depth)
  const leftCloudSize = 0.015;  // Left cloud size multiplier
  const rightCloudSize = 0.017; // Right cloud size multiplier
  const cloudRotation = 10;    // Rotation for both clouds (in radians, 0 = facing camera)
  const cloudAnimationSpeed = 0.01; // Animation speed (higher = faster)


  // Set CSS variable for sky color so Loader can use it
  useEffect(() => {
    document.documentElement.style.setProperty('--sky-color', skyColor);
    return () => {
      document.documentElement.style.removeProperty('--sky-color');
    };
  }, [skyColor]);

  // Immediately set body/html background on mount to prevent black frame
  useEffect(() => {
    // Get sky color from sessionStorage if coming from cockpit transition
    const transitionColor = typeof window !== 'undefined' ? sessionStorage.getItem('transitionSkyColor') : null;
    const initialColor = transitionColor || skyColor;
    
    // Set immediately before React hydrates
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = initialColor;
      document.documentElement.style.backgroundColor = initialColor;
      document.documentElement.style.transition = 'background-color 0.3s ease-in-out';
      
      // Clean up sessionStorage after a delay
      if (transitionColor) {
        setTimeout(() => {
          sessionStorage.removeItem('transitionSkyColor');
        }, 2000);
      }
      
      return () => {
        // Complete cleanup when leaving city page - remove ALL properties we set
        document.body.style.backgroundColor = '';
        document.body.style.removeProperty('background-color');
        document.documentElement.style.backgroundColor = '';
        document.documentElement.style.removeProperty('background-color');
        document.documentElement.style.transition = '';
        document.documentElement.style.removeProperty('transition');
        
        // Force a reflow to ensure styles are cleared before next page renders
        void document.body.offsetHeight;
      };
    }
  }, [skyColor]);

  return (
    <div className="w-screen h-screen relative overflow-hidden" style={{ backgroundColor: skyColor }}>
      {/* Full-screen overlay to cover black flash - fades out when Canvas is ready (Option 1) */}
      {!canvasReady && (
        <div 
          className="fixed inset-0 z-[3000] transition-opacity duration-300"
          style={{ 
            backgroundColor: skyColor,
            opacity: canvasReady ? 0 : 1
          }}
        />
      )}
      
      {/* 1. LOADING OVERLAY - CHANGED Z-INDEX TO 2000 TO BEAT THE 3D LABELS */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
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
      <Navbar onLaunch={handleOpenApp} timeMode={timeMode} />
      
      {/* Day/night mode is automatically controlled by real-world time */}
      <EnvironmentControls />

      {/* Delay Canvas mount (Option 6) */}
      {mountCanvas && (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [20, 20, 20], fov: 35 }} 
          shadows
          frameloop="always"
          className="w-full h-full"
          style={{ 
            backgroundColor: skyColor, // Option 4: CSS background on Canvas
            opacity: showCanvas ? 1 : 0, // Option 2: Hide until ready
            transition: 'opacity 0.3s ease-in'
          }}
          onCreated={({ gl, scene }) => {
            // Set clear color FIRST - IMMEDIATE
            const bgColor = timeMode === 'day' ? DAY_BG_COLOR : NIGHT_BG_COLOR;
            gl.setClearColor(bgColor, 1);
            
            // Get WebGL context and set clear color immediately - BEFORE any rendering
            const webglContext = gl.getContext();
            if (webglContext) {
              const color = new THREE.Color(bgColor);
              webglContext.clearColor(color.r, color.g, color.b, 1);
              // Clear immediately to show sky color
              webglContext.clear(webglContext.COLOR_BUFFER_BIT | webglContext.DEPTH_BUFFER_BIT);
            }
            
            // Set scene background - IMMEDIATE
            scene.background = new THREE.Color(bgColor);
            
            // Configure renderer - initialize exposure based on timeMode
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = timeMode === 'day' ? 1.0 : 0.6; // Match EnvironmentController target
            
            // Mark canvas as ready after ensuring background is set
            setTimeout(() => {
              setCanvasReady(true);
            }, 200);
          }}
          gl={{ 
            alpha: false,
            antialias: true,
            preserveDrawingBuffer: false
          }}
        >
        {/* Background color - set immediately to prevent black flash */}
        <CanvasBackground color={timeMode === 'day' ? DAY_BG_COLOR : NIGHT_BG_COLOR} />
        <color attach="background" args={[timeMode === 'day' ? DAY_BG_COLOR : NIGHT_BG_COLOR]} />
        
        <fog attach="fog" args={['#9BA4B5', 10, 120]} />

        {/* City only renders after clouds are ready */}
        {cloudsReady && (
          <Suspense fallback={null}>
            <FutureCity 
              selected={selected} 
              onSelect={setSelected} 
              introFinished={true}
              timeMode={timeMode}
            />
          </Suspense>
        )}

        {/* Loading clouds animation - MUST render before city */}
        {/* Keep mounted but hide when animation completes to prevent depth buffer changes */}
        <LoadingClouds
          ref={cloudsRef}
          leftCloudX={leftCloudX}
          leftCloudY={leftCloudY}
          leftCloudZ={leftCloudZ}
          rightCloudX={rightCloudX}
          rightCloudY={rightCloudY}
          rightCloudZ={rightCloudZ}
          leftCloudSize={leftCloudSize}
          rightCloudSize={rightCloudSize}
          cloudRotation={cloudRotation}
          animationSpeed={cloudAnimationSpeed}
          startStatic={true}
          startAnimation={startCloudAnimation}
          onReady={() => setCloudsReady(true)}
          onComplete={() => setShowLoadingClouds(false)}
        />

        <OrbitControls 
          makeDefault 
          enabled={!selected} 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={Math.sqrt(20 * 20 + 20 * 20 + 20 * 20)}
          dampingFactor={0.05}
          target={[0, 0, 0]}
        />
        
        <CameraReset 
          resetTrigger={cameraResetTrigger} 
          onResetComplete={() => {}}
        />
        </Canvas>
      )}
      
      {selected && (
        <DetailPanel startup={selected} onClose={() => setSelected(null)} />
      )}
      
      {/* Loader with sky color background to prevent black frame */}
      <Loader 
        containerStyles={{ 
          background: skyColor,
          backgroundColor: skyColor,
        }}
      />
    </div>
  );
}
