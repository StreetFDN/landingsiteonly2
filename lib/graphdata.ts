/**
 * Comprehensive Knowledge Graph Data
 * 6 Research Sectors with 200+ Nodes
 * Optimized for performance and geographic clustering
 */

export interface GraphNode {
  id: string;
  label: string;
  category: string;
  importance: number;
  description?: string;
  location?: string;
  funding?: string;
  type?: string;
  founded?: string;
  website?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  type: string;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Sector 1: AI Agriculture (Green)
const aiAgricultureNodes: GraphNode[] = [
  { id: "inari", label: "Inari", category: "ai-agriculture", importance: 3, description: "Seeds designed at the genetic level using AI for better yield and climate resilience", location: "Cambridge, MA", funding: "700M+", founded: "2016" },
  { id: "oishii", label: "Oishii", category: "ai-agriculture", importance: 2.8, description: "Vertical farming with AI-controlled environments producing premium strawberries", location: "New Jersey", funding: "150M+", founded: "2016" },
  { id: "monarch-tractor", label: "Monarch Tractor", category: "ai-agriculture", importance: 2.5, description: "Electric, driver-optional smart tractors with AI for precision agriculture", location: "Livermore, CA", funding: "220M+", founded: "2018" },
  { id: "carbon-robotics", label: "Carbon Robotics", category: "ai-agriculture", importance: 2.5, description: "AI-powered laser weeding robots for chemical-free farming", location: "Seattle, WA", funding: "57M+", founded: "2018" },
  { id: "plenty", label: "Plenty", category: "ai-agriculture", importance: 2.8, description: "Indoor vertical farming with AI optimization for sustainable agriculture", location: "San Francisco, CA", funding: "900M+", founded: "2014" },
  { id: "bowery-farming", label: "Bowery Farming", category: "ai-agriculture", importance: 2.5, description: "Tech-enabled indoor farms using AI for crop optimization", location: "New York, NY", funding: "647M+", founded: "2015" },
  { id: "iron-ox", label: "Iron Ox", category: "ai-agriculture", importance: 2.3, description: "Autonomous greenhouse with robotics and AI for sustainable farming", location: "San Carlos, CA", funding: "98M+", founded: "2015" },
  { id: "farmers-business-network", label: "Farmers Business Network", category: "ai-agriculture", importance: 2.5, description: "Agricultural data platform using AI for farmer decision-making", location: "San Carlos, CA", funding: "1B+", founded: "2014" },
  { id: "aigen", label: "Aigen", category: "ai-agriculture", importance: 2.2, description: "Solar-powered autonomous robots for sustainable farming", location: "Seattle, WA", funding: "19M+", founded: "2020" },
  { id: "farm-wise", label: "FarmWise", category: "ai-agriculture", importance: 2.1, description: "AI-powered agricultural robots for precision weeding", location: "San Francisco, CA", funding: "64M+", founded: "2016" },
  { id: "indigo-ag", label: "Indigo Ag", category: "ai-agriculture", importance: 2.6, description: "Microbial seed treatments and agricultural marketplace", location: "Boston, MA", funding: "1.2B+", founded: "2014" },
  { id: "pivot-bio", label: "Pivot Bio", category: "ai-agriculture", importance: 2.4, description: "Nitrogen-producing microbes for sustainable farming", location: "Berkeley, CA", funding: "600M+", founded: "2011" },
  { id: "aerofarms", label: "AeroFarms", category: "ai-agriculture", importance: 2.3, description: "Indoor vertical farming technology and produce", location: "Newark, NJ", funding: "238M+", founded: "2004" },
  { id: "appharvest", label: "AppHarvest", category: "ai-agriculture", importance: 2.2, description: "High-tech indoor farms in Appalachia", location: "Morehead, KY", funding: "Public company", founded: "2018" },
  { id: "bear-flag-robotics", label: "Bear Flag Robotics", category: "ai-agriculture", importance: 2.1, description: "Autonomous driving systems for tractors (acquired by John Deere)", location: "Newark, CA", funding: "Acquired", founded: "2017" },
  { id: "traptic", label: "Traptic", category: "ai-agriculture", importance: 2, description: "Robotic strawberry harvesting with computer vision", location: "Ventura, CA", funding: "12M+", founded: "2016" },
  { id: "small-robot-company", label: "Small Robot Company", category: "ai-agriculture", importance: 2, description: "AI farming robots for per-plant care", location: "Salisbury, UK", funding: "50M+", founded: "2017" },
  { id: "prospera", label: "Prospera", category: "ai-agriculture", importance: 2.3, description: "AI-powered crop intelligence for greenhouses", location: "Tel Aviv, Israel", funding: "105M+", founded: "2014" },
  { id: "taranis", label: "Taranis", category: "ai-agriculture", importance: 2.2, description: "AI-powered crop intelligence from aerial imagery", location: "Tel Aviv, Israel", funding: "60M+", founded: "2015" },
  { id: "blue-river-tech", label: "Blue River Technology", category: "ai-agriculture", importance: 2.4, description: "See & Spray technology for precision agriculture (acquired by John Deere)", location: "Sunnyvale, CA", funding: "Acquired", founded: "2011" },
];

const aiAgricultureVCs: GraphNode[] = [
  { id: "khosla-ventures", label: "Khosla Ventures", category: "ai-agriculture-vc", importance: 2.5, description: "Leading VC in agtech and climate tech investments", location: "Menlo Park, CA", type: "investor" },
  { id: "breakthrough-energy", label: "Breakthrough Energy", category: "ai-agriculture-vc", importance: 2.3, description: "Bill Gates-backed climate and agriculture tech fund", location: "Seattle, WA", type: "investor" },
  { id: "softbank-vision", label: "SoftBank Vision Fund", category: "ai-agriculture-vc", importance: 2.8, description: "Major investor in agricultural technology", location: "Tokyo/London", type: "investor" },
  { id: "s2g-ventures", label: "S2G Ventures", category: "ai-agriculture-vc", importance: 2.2, description: "Multi-stage VC focused on food and agriculture", location: "Chicago, IL", type: "investor" },
  { id: "finistere", label: "Finistere Ventures", category: "ai-agriculture-vc", importance: 2.1, description: "AgTech and FoodTech focused VC", location: "San Diego, CA", type: "investor" },
];

// Sector 2: Military & Defense (Red)
const militaryDefenseNodes: GraphNode[] = [
  { id: "anduril", label: "Anduril", category: "military-defense", importance: 3, description: "AI-powered defense systems and autonomous military technology", location: "Costa Mesa, CA", funding: "3.7B+ valuation", founded: "2017" },
  { id: "helsing", label: "Helsing", category: "military-defense", importance: 2.8, description: "AI defense platform for European military and intelligence", location: "Munich, Germany", funding: "825M+", founded: "2021" },
  { id: "shield-ai", label: "Shield AI", category: "military-defense", importance: 2.7, description: "AI pilot systems for autonomous aircraft and defense drones", location: "San Diego, CA", funding: "1.2B+ valuation", founded: "2015" },
  { id: "epirus", label: "Epirus", category: "military-defense", importance: 2.5, description: "Directed energy weapons and counter-drone systems", location: "Torrance, CA", funding: "694M+", founded: "2018" },
  { id: "palantir", label: "Palantir", category: "military-defense", importance: 3, description: "Data analytics and AI platforms for defense and intelligence", location: "Denver, CO", funding: "Public company", founded: "2003" },
  { id: "skydio", label: "Skydio", category: "military-defense", importance: 2.5, description: "Autonomous drones for defense and public safety", location: "San Mateo, CA", funding: "1B+ valuation", founded: "2014" },
  { id: "saronic", label: "Saronic", category: "military-defense", importance: 2.3, description: "Autonomous surface vessels for maritime defense", location: "Austin, TX", funding: "195M+", founded: "2022" },
  { id: "rebellion-defense", label: "Rebellion Defense", category: "military-defense", importance: 2.2, description: "AI-powered defense software and decision support systems", location: "Washington DC", funding: "200M+", founded: "2019" },
  { id: "scale-ai", label: "Scale AI", category: "military-defense", importance: 2.8, description: "Data labeling and AI training for defense applications", location: "San Francisco, CA", funding: "7.3B+ valuation", founded: "2016" },
  { id: "c3-ai", label: "C3.ai", category: "military-defense", importance: 2.4, description: "Enterprise AI software for defense and intelligence", location: "Redwood City, CA", funding: "Public company", founded: "2009" },
  { id: "primer", label: "Primer", category: "military-defense", importance: 2.2, description: "NLP and machine reading for intelligence analysis", location: "San Francisco, CA", funding: "110M+", founded: "2015" },
  { id: "fortem-tech", label: "Fortem Technologies", category: "military-defense", importance: 2.1, description: "Counter-drone and airspace security systems", location: "Pleasant Grove, UT", funding: "150M+", founded: "2016" },
  { id: "shift5", label: "Shift5", category: "military-defense", importance: 2, description: "Cybersecurity for military operational technology", location: "Arlington, VA", funding: "130M+", founded: "2019" },
  { id: "hermeus", label: "Hermeus", category: "military-defense", importance: 2.3, description: "Hypersonic aircraft for defense applications", location: "Atlanta, GA", funding: "140M+", founded: "2018" },
  { id: "orca-security", label: "Orca Security", category: "military-defense", importance: 2.2, description: "Cloud security for defense infrastructure", location: "Tel Aviv, Israel", funding: "1.8B valuation", founded: "2019" },
  { id: "hadrian", label: "Hadrian", category: "military-defense", importance: 2.1, description: "Automated precision manufacturing for defense", location: "Los Angeles, CA", funding: "180M+", founded: "2020" },
  { id: "true-anomaly", label: "True Anomaly", category: "military-defense", importance: 2.2, description: "Space security and satellite operations", location: "Colorado Springs, CO", funding: "100M+", founded: "2022" },
  { id: "umbra-lab", label: "Umbra Lab", category: "military-defense", importance: 2, description: "High-resolution SAR satellite imagery", location: "Santa Barbara, CA", funding: "152M+", founded: "2015" },
  { id: "slingshot-aerospace", label: "Slingshot Aerospace", category: "military-defense", importance: 2.1, description: "Space domain awareness and tracking", location: "El Segundo, CA", funding: "70M+", founded: "2017" },
  { id: "orbit-fab", label: "Orbit Fab", category: "military-defense", importance: 2, description: "In-space refueling for satellites", location: "Lafayette, CO", funding: "46M+", founded: "2018" },
];

const defenseVCs: GraphNode[] = [
  { id: "founders-fund", label: "Founders Fund", category: "defense-vc", importance: 2.8, description: "Peter Thiel's VC firm investing heavily in defense tech", location: "San Francisco, CA", type: "investor" },
  { id: "andreessen-horowitz", label: "Andreessen Horowitz", category: "defense-vc", importance: 2.7, description: "Major VC with significant defense tech portfolio", location: "Menlo Park, CA", type: "investor" },
  { id: "lux-capital", label: "Lux Capital", category: "defense-vc", importance: 2.5, description: "VC focused on frontier tech including defense", location: "New York, NY", type: "investor" },
  { id: "shield-capital", label: "Shield Capital", category: "defense-vc", importance: 2.3, description: "Defense-focused venture capital firm", location: "Washington DC", type: "investor" },
  { id: "dcode-capital", label: "DataTribe (dcode)", category: "defense-vc", importance: 2.1, description: "Early stage cybersecurity and defense tech", location: "Columbia, MD", type: "investor" },
];

// Sector 3: AI Adult Content (Purple)
const aiAdultContentNodes: GraphNode[] = [
  { id: "character-ai", label: "Character.ai", category: "ai-adult-content", importance: 3, description: "AI chatbot platform with significant adult roleplay usage", location: "Menlo Park, CA", funding: "1B+ valuation", founded: "2021" },
  { id: "replika", label: "Replika", category: "ai-adult-content", importance: 2.5, description: "AI companion with relationship and adult features", location: "San Francisco, CA", funding: "11M+", founded: "2017" },
  { id: "candy-ai", label: "Candy AI", category: "ai-adult-content", importance: 2.3, description: "AI companion platform with adult content features", location: "Remote", funding: "Bootstrapped", founded: "2023" },
  { id: "slushy", label: "SLUSHY", category: "ai-adult-content", importance: 2.1, description: "Audio erotica platform with AI-generated content", location: "Los Angeles, CA", funding: "10M+", founded: "2021" },
  { id: "unstable-diffusion", label: "Unstable Diffusion", category: "ai-adult-content", importance: 2.2, description: "Uncensored AI image generation for adult content", location: "Decentralized", funding: "Community-funded", founded: "2022" },
  { id: "civitai", label: "Civitai", category: "ai-adult-content", importance: 2.4, description: "AI model sharing platform with adult content", location: "Remote", funding: "16M+", founded: "2022" },
  { id: "janitor-ai", label: "Janitor AI", category: "ai-adult-content", importance: 2.2, description: "Character AI chat platform with NSFW options", location: "Remote", funding: "Bootstrapped", founded: "2023" },
  { id: "chai-ai", label: "Chai AI", category: "ai-adult-content", importance: 2.3, description: "AI chat platform with diverse character interactions", location: "Remote", funding: "16M+", founded: "2021" },
  { id: "crushon-ai", label: "CrushOn.AI", category: "ai-adult-content", importance: 2.1, description: "Uncensored AI character chat platform", location: "Remote", funding: "Bootstrapped", founded: "2023" },
  { id: "dopple-ai", label: "Dopple AI", category: "ai-adult-content", importance: 2, description: "AI-powered character conversations", location: "Remote", funding: "Early stage", founded: "2023" },
];

const adultContentInvestors: GraphNode[] = [
  { id: "initialized-capital", label: "Initialized Capital", category: "adult-content-investor", importance: 2.3, description: "Early stage VC with AI consumer platform investments", location: "San Francisco, CA", type: "investor" },
  { id: "network-capital", label: "Network Capital", category: "adult-content-investor", importance: 2, description: "VC investing in consumer AI platforms", location: "New York, NY", type: "investor" },
  { id: "accel", label: "Accel", category: "adult-content-investor", importance: 2.4, description: "Global VC with consumer AI investments", location: "Palo Alto, CA", type: "investor" },
];

// Sector 4: Surveillance Tech (Dark Blue)
const surveillanceTechNodes: GraphNode[] = [
  { id: "worldcoin", label: "Worldcoin", category: "surveillance-tech", importance: 2.8, description: "Biometric identity system using iris scanning", location: "San Francisco, CA", funding: "240M+", founded: "2020" },
  { id: "clearview-ai", label: "Clearview AI", category: "surveillance-tech", importance: 2.7, description: "Facial recognition database for law enforcement", location: "New York, NY", funding: "Controversial", founded: "2017" },
  { id: "flock-safety", label: "Flock Safety", category: "surveillance-tech", importance: 2.6, description: "License plate recognition and community surveillance", location: "Atlanta, GA", funding: "420M+", founded: "2017" },
  { id: "clarifai", label: "Clarifai", category: "surveillance-tech", importance: 2.5, description: "AI vision platform for content moderation and surveillance", location: "Washington DC", funding: "100M+", founded: "2013" },
  { id: "humanity-protocol", label: "Humanity Protocol", category: "surveillance-tech", importance: 2.3, description: "Biometric identity verification and anti-bot technology", location: "Global", funding: "30M+", founded: "2023" },
  { id: "authologic", label: "Authologic", category: "surveillance-tech", importance: 2.1, description: "Identity verification and surveillance technology", location: "Austin, TX", funding: "25M+", founded: "2020" },
  { id: "banjo", label: "Banjo", category: "surveillance-tech", importance: 2, description: "Real-time event detection from social media and sensors", location: "Park City, UT", funding: "Controversial history", founded: "2010" },
  { id: "pimeyes", label: "PimEyes", category: "surveillance-tech", importance: 2.4, description: "Reverse image search using facial recognition", location: "Poland", funding: "Private", founded: "2017" },
  { id: "nec-neoface", label: "NEC NeoFace", category: "surveillance-tech", importance: 2.5, description: "Enterprise facial recognition systems", location: "Tokyo, Japan", funding: "NEC Corporation", founded: "1982" },
  { id: "vigilant-solutions", label: "Vigilant Solutions", category: "surveillance-tech", importance: 2.3, description: "License plate recognition for law enforcement", location: "Livermore, CA", funding: "Motorola Solutions", founded: "2009" },
  { id: "truyo", label: "Truyo", category: "surveillance-tech", importance: 2, description: "Privacy rights automation and data subject requests", location: "Seattle, WA", funding: "15M+", founded: "2016" },
];

const privacyOrgs: GraphNode[] = [
  { id: "eff", label: "Electronic Frontier Foundation", category: "privacy-org", importance: 2.5, description: "Digital privacy and civil liberties advocacy organization", location: "San Francisco, CA", type: "organization", founded: "1990" },
  { id: "aclu", label: "ACLU", category: "privacy-org", importance: 2.5, description: "Civil liberties organization fighting surveillance overreach", location: "New York, NY", type: "organization", founded: "1920" },
  { id: "epic", label: "EPIC", category: "privacy-org", importance: 2.2, description: "Electronic Privacy Information Center", location: "Washington DC", type: "organization", founded: "1994" },
  { id: "access-now", label: "Access Now", category: "privacy-org", importance: 2.1, description: "Digital rights advocacy organization", location: "Global", type: "organization", founded: "2009" },
];

// Sector 5: Genetic Editing (Cyan)
const geneticEditingNodes: GraphNode[] = [
  { id: "crispr-therapeutics", label: "CRISPR Therapeutics", category: "genetic-editing", importance: 3, description: "Gene editing therapies using CRISPR technology", location: "Zug, Switzerland", funding: "Public company", founded: "2013" },
  { id: "beam-therapeutics", label: "Beam Therapeutics", category: "genetic-editing", importance: 2.8, description: "Precision genetic medicines using base editing", location: "Cambridge, MA", funding: "Public company", founded: "2017" },
  { id: "intellia", label: "Intellia Therapeutics", category: "genetic-editing", importance: 2.8, description: "In vivo CRISPR gene editing therapies", location: "Cambridge, MA", funding: "Public company", founded: "2014" },
  { id: "editas", label: "Editas Medicine", category: "genetic-editing", importance: 2.7, description: "CRISPR gene editing for genetic diseases", location: "Cambridge, MA", funding: "Public company", founded: "2013" },
  { id: "mammoth-bio", label: "Mammoth Biosciences", category: "genetic-editing", importance: 2.5, description: "CRISPR-based diagnostics and therapeutics", location: "Brisbane, CA", funding: "235M+", founded: "2017" },
  { id: "precision-biosciences", label: "Precision BioSciences", category: "genetic-editing", importance: 2.5, description: "Gene editing using ARCUS platform", location: "Durham, NC", funding: "Public company", founded: "2006" },
  { id: "caribou-bio", label: "Caribou Biosciences", category: "genetic-editing", importance: 2.4, description: "CRISPR genome editing technologies", location: "Berkeley, CA", funding: "Public company", founded: "2011" },
  { id: "synthego", label: "Synthego", category: "genetic-editing", importance: 2.3, description: "CRISPR genome engineering tools and services", location: "Redwood City, CA", funding: "300M+", founded: "2012" },
  { id: "inscripta", label: "Inscripta", category: "genetic-editing", importance: 2.2, description: "Benchtop genome engineering platform", location: "Boulder, CO", funding: "633M+", founded: "2015" },
  { id: "verve-therapeutics", label: "Verve Therapeutics", category: "genetic-editing", importance: 2.4, description: "In vivo gene editing for cardiovascular disease", location: "Cambridge, MA", funding: "Public company", founded: "2018" },
  { id: "metagenomi", label: "Metagenomi", category: "genetic-editing", importance: 2.3, description: "Next-gen gene editing systems from metagenomics", location: "Emeryville, CA", funding: "265M+", founded: "2016" },
  { id: "pairwise", label: "Pairwise", category: "genetic-editing", importance: 2.2, description: "CRISPR gene editing for food and agriculture", location: "Durham, NC", funding: "115M+", founded: "2017" },
  { id: "prime-medicine", label: "Prime Medicine", category: "genetic-editing", importance: 2.5, description: "Prime editing for genetic diseases", location: "Cambridge, MA", funding: "600M+", founded: "2019" },
  { id: "graphite-bio", label: "Graphite Bio", category: "genetic-editing", importance: 2.1, description: "Targeted gene integration for genetic diseases", location: "South San Francisco, CA", funding: "Public company", founded: "2019" },
  { id: "arbor-bio", label: "Arbor Biotechnologies", category: "genetic-editing", importance: 2.2, description: "Protein discovery for genome editing", location: "Cambridge, MA", funding: "100M+", founded: "2016" },
];

const biotechVCs: GraphNode[] = [
  { id: "flagship-pioneering", label: "Flagship Pioneering", category: "biotech-vc", importance: 2.8, description: "Biotech innovation foundry and investor", location: "Cambridge, MA", type: "investor" },
  { id: "arch-venture", label: "Arch Venture Partners", category: "biotech-vc", importance: 2.7, description: "Leading biotech and life sciences VC", location: "Chicago, IL", type: "investor" },
  { id: "8vc", label: "8VC", category: "biotech-vc", importance: 2.5, description: "VC firm investing in biotech and deep tech", location: "San Francisco, CA", type: "investor" },
  { id: "third-rock", label: "Third Rock Ventures", category: "biotech-vc", importance: 2.6, description: "Life sciences venture capital firm", location: "Boston, MA", type: "investor" },
  { id: "versant-ventures", label: "Versant Ventures", category: "biotech-vc", importance: 2.4, description: "Healthcare-focused venture capital", location: "Menlo Park, CA", type: "investor" },
];

// Sector 6: Augmented Reality (Orange)
const augmentedRealityNodes: GraphNode[] = [
  { id: "apple-vision", label: "Apple Vision Pro", category: "augmented-reality", importance: 3, description: "Spatial computing headset with advanced AR/VR", location: "Cupertino, CA", funding: "Apple Inc.", founded: "2023" },
  { id: "meta-quest", label: "Meta Quest", category: "augmented-reality", importance: 3, description: "VR headsets with AR passthrough capabilities", location: "Menlo Park, CA", funding: "Meta Platforms", founded: "2020" },
  { id: "microsoft", label: "Microsoft HoloLens", category: "augmented-reality", importance: 3, description: "Enterprise mixed reality platform", location: "Redmond, WA", funding: "Microsoft", founded: "2016" },
  { id: "varjo", label: "Varjo", category: "augmented-reality", importance: 2.8, description: "Professional-grade VR/XR headsets with human-eye resolution", location: "Helsinki, Finland", funding: "165M+", founded: "2016" },
  { id: "magic-leap", label: "Magic Leap", category: "augmented-reality", importance: 2.7, description: "Spatial computing and enterprise AR solutions", location: "Plantation, FL", funding: "3.5B+", founded: "2010" },
  { id: "xreal", label: "XREAL", category: "augmented-reality", importance: 2.6, description: "Consumer AR glasses for entertainment and productivity", location: "Beijing, China", funding: "320M+", founded: "2017" },
  { id: "rokid", label: "Rokid", category: "augmented-reality", importance: 2.5, description: "AR glasses for enterprise and consumer markets", location: "Hangzhou, China", funding: "400M+", founded: "2014" },
  { id: "snap-spectacles", label: "Snap Spectacles", category: "augmented-reality", importance: 2.5, description: "AR glasses by Snapchat for social experiences", location: "Los Angeles, CA", funding: "Snap Inc.", founded: "2016" },
  { id: "mojo-vision", label: "Mojo Vision", category: "augmented-reality", importance: 2.4, description: "AR contact lenses with micro-LED displays", location: "Saratoga, CA", funding: "220M+", founded: "2015" },
  { id: "vuzix", label: "Vuzix", category: "augmented-reality", importance: 2.3, description: "Smart glasses and AR wearables for enterprise", location: "Rochester, NY", funding: "Public company", founded: "1997" },
  { id: "nreal", label: "Nreal (now XREAL)", category: "augmented-reality", importance: 2.2, description: "Lightweight AR glasses", location: "Beijing, China", funding: "Rebranded", founded: "2017" },
  { id: "lynx-r", label: "Lynx R-1", category: "augmented-reality", importance: 2.1, description: "Standalone mixed reality headset", location: "Paris, France", funding: "22M+", founded: "2020" },
  { id: "pico", label: "Pico", category: "augmented-reality", importance: 2.4, description: "VR headsets (owned by ByteDance)", location: "Beijing, China", funding: "ByteDance", founded: "2015" },
  { id: "htc-vive", label: "HTC Vive", category: "augmented-reality", importance: 2.5, description: "VR and XR hardware platforms", location: "Taiwan", funding: "HTC Corporation", founded: "2015" },
  { id: "meta-ray-ban", label: "Meta Ray-Ban Stories", category: "augmented-reality", importance: 2.3, description: "Smart glasses collaboration", location: "Menlo Park, CA", funding: "Meta/Luxottica", founded: "2021" },
];

const arHardwarePartners: GraphNode[] = [
  { id: "qualcomm", label: "Qualcomm", category: "ar-hardware-partner", importance: 3, description: "Snapdragon XR platforms powering AR devices", location: "San Diego, CA", type: "partner" },
  { id: "sony-semiconductors", label: "Sony Semiconductors", category: "ar-hardware-partner", importance: 2.8, description: "Micro OLED displays for AR/VR headsets", location: "Tokyo, Japan", type: "partner" },
  { id: "microoled", label: "MicroOLED", category: "ar-hardware-partner", importance: 2.3, description: "Micro-displays for AR applications", location: "Isère, France", type: "partner" },
  { id: "kopin", label: "Kopin", category: "ar-hardware-partner", importance: 2.2, description: "Miniature displays for wearables", location: "Westborough, MA", type: "partner" },
];

const arInvestors: GraphNode[] = [
  { id: "google-ventures", label: "Google Ventures (GV)", category: "ar-investor", importance: 2.7, description: "VC arm investing in AR/VR startups", location: "Mountain View, CA", type: "investor" },
  { id: "intel-capital", label: "Intel Capital", category: "ar-investor", importance: 2.5, description: "Investment in AR hardware and platforms", location: "Santa Clara, CA", type: "investor" },
  { id: "warner-music", label: "Warner Music Group", category: "ar-investor", importance: 2.1, description: "Media company investing in AR experiences", location: "New York, NY", type: "investor" },
];

// Combine all nodes
export const allNodes: GraphNode[] = [
  ...aiAgricultureNodes,
  ...aiAgricultureVCs,
  ...militaryDefenseNodes,
  ...defenseVCs,
  ...aiAdultContentNodes,
  ...adultContentInvestors,
  ...surveillanceTechNodes,
  ...privacyOrgs,
  ...geneticEditingNodes,
  ...biotechVCs,
  ...augmentedRealityNodes,
  ...arHardwarePartners,
  ...arInvestors,
];

// Define all relationships
export const allLinks: GraphLink[] = [
  // AI Agriculture funding relationships
  { source: "inari", target: "khosla-ventures", type: "funded-by", value: 4 },
  { source: "inari", target: "flagship-pioneering", type: "funded-by", value: 3 },
  { source: "oishii", target: "softbank-vision", type: "funded-by", value: 4 },
  { source: "monarch-tractor", target: "breakthrough-energy", type: "funded-by", value: 3 },
  { source: "carbon-robotics", target: "khosla-ventures", type: "funded-by", value: 3 },
  { source: "plenty", target: "softbank-vision", type: "funded-by", value: 5 },
  { source: "bowery-farming", target: "google-ventures", type: "funded-by", value: 3 },
  { source: "iron-ox", target: "breakthrough-energy", type: "funded-by", value: 2 },
  { source: "farmers-business-network", target: "google-ventures", type: "funded-by", value: 4 },
  { source: "aigen", target: "khosla-ventures", type: "funded-by", value: 2 },
  { source: "farm-wise", target: "andreessen-horowitz", type: "funded-by", value: 2 },
  { source: "indigo-ag", target: "flagship-pioneering", type: "funded-by", value: 3 },
  { source: "pivot-bio", target: "breakthrough-energy", type: "funded-by", value: 3 },
  { source: "aerofarms", target: "softbank-vision", type: "funded-by", value: 2 },
  { source: "prospera", target: "qualcomm", type: "funded-by", value: 2 },
  
  // Military & Defense funding
  { source: "anduril", target: "founders-fund", type: "funded-by", value: 5 },
  { source: "anduril", target: "andreessen-horowitz", type: "funded-by", value: 4 },
  { source: "helsing", target: "lux-capital", type: "funded-by", value: 3 },
  { source: "shield-ai", target: "founders-fund", type: "funded-by", value: 3 },
  { source: "epirus", target: "lux-capital", type: "funded-by", value: 4 },
  { source: "skydio", target: "andreessen-horowitz", type: "funded-by", value: 3 },
  { source: "saronic", target: "founders-fund", type: "funded-by", value: 3 },
  { source: "rebellion-defense", target: "lux-capital", type: "funded-by", value: 2 },
  { source: "scale-ai", target: "founders-fund", type: "funded-by", value: 4 },
  { source: "palantir", target: "founders-fund", type: "founded-by", value: 5 },
  { source: "primer", target: "lux-capital", type: "funded-by", value: 2 },
  { source: "fortem-tech", target: "founders-fund", type: "funded-by", value: 2 },
  { source: "hermeus", target: "khosla-ventures", type: "funded-by", value: 2 },
  { source: "hadrian", target: "lux-capital", type: "funded-by", value: 3 },
  
  // AI Adult Content funding
  { source: "character-ai", target: "andreessen-horowitz", type: "funded-by", value: 5 },
  { source: "replika", target: "initialized-capital", type: "funded-by", value: 2 },
  { source: "slushy", target: "network-capital", type: "funded-by", value: 2 },
  { source: "chai-ai", target: "accel", type: "funded-by", value: 2 },
  
  // Surveillance Tech funding & opposition
  { source: "worldcoin", target: "andreessen-horowitz", type: "funded-by", value: 4 },
  { source: "flock-safety", target: "andreessen-horowitz", type: "funded-by", value: 3 },
  { source: "clarifai", target: "lux-capital", type: "funded-by", value: 2 },
  { source: "clearview-ai", target: "founders-fund", type: "funded-by", value: 3 },
  { source: "worldcoin", target: "eff", type: "criticized-by", value: 3 },
  { source: "clearview-ai", target: "aclu", type: "sued-by", value: 4 },
  { source: "flock-safety", target: "eff", type: "monitored-by", value: 2 },
  { source: "pimeyes", target: "aclu", type: "criticized-by", value: 2 },
  
  // Genetic Editing funding
  { source: "crispr-therapeutics", target: "flagship-pioneering", type: "funded-by", value: 4 },
  { source: "beam-therapeutics", target: "flagship-pioneering", type: "founded-by", value: 5 },
  { source: "mammoth-bio", target: "8vc", type: "funded-by", value: 3 },
  { source: "intellia", target: "arch-venture", type: "funded-by", value: 4 },
  { source: "editas", target: "flagship-pioneering", type: "funded-by", value: 3 },
  { source: "synthego", target: "founders-fund", type: "funded-by", value: 2 },
  { source: "precision-biosciences", target: "arch-venture", type: "funded-by", value: 2 },
  { source: "caribou-bio", target: "8vc", type: "funded-by", value: 2 },
  { source: "inscripta", target: "arch-venture", type: "funded-by", value: 3 },
  { source: "verve-therapeutics", target: "google-ventures", type: "funded-by", value: 3 },
  { source: "metagenomi", target: "8vc", type: "funded-by", value: 2 },
  { source: "prime-medicine", target: "third-rock", type: "funded-by", value: 4 },
  
  // AR funding & partnerships
  { source: "varjo", target: "intel-capital", type: "funded-by", value: 2 },
  { source: "magic-leap", target: "google-ventures", type: "funded-by", value: 4 },
  { source: "xreal", target: "softbank-vision", type: "funded-by", value: 3 },
  { source: "mojo-vision", target: "google-ventures", type: "funded-by", value: 2 },
  { source: "varjo", target: "qualcomm", type: "partners-with", value: 3 },
  { source: "rokid", target: "qualcomm", type: "partners-with", value: 3 },
  { source: "xreal", target: "sony-semiconductors", type: "partners-with", value: 3 },
  { source: "magic-leap", target: "qualcomm", type: "partners-with", value: 2 },
  { source: "meta-quest", target: "qualcomm", type: "partners-with", value: 4 },
  { source: "apple-vision", target: "sony-semiconductors", type: "partners-with", value: 4 },
  { source: "pico", target: "qualcomm", type: "partners-with", value: 3 },
  { source: "htc-vive", target: "qualcomm", type: "partners-with", value: 2 },
  { source: "vuzix", target: "kopin", type: "partners-with", value: 3 },
  
  // Cross-sector collaborations & competition
  { source: "anduril", target: "palantir", type: "collaborates", value: 3 },
  { source: "helsing", target: "palantir", type: "competes", value: 2 },
  { source: "shield-ai", target: "skydio", type: "collaborates", value: 2 },
  { source: "inari", target: "farmers-business-network", type: "data-partnership", value: 2 },
  { source: "monarch-tractor", target: "carbon-robotics", type: "related-tech", value: 2 },
  { source: "plenty", target: "bowery-farming", type: "competes", value: 3 },
  { source: "oishii", target: "bowery-farming", type: "competes", value: 2 },
  { source: "crispr-therapeutics", target: "beam-therapeutics", type: "competes", value: 3 },
  { source: "intellia", target: "editas", type: "competes", value: 3 },
  { source: "varjo", target: "magic-leap", type: "competes", value: 2 },
  { source: "xreal", target: "rokid", type: "competes", value: 3 },
  { source: "character-ai", target: "replika", type: "competes", value: 3 },
  { source: "worldcoin", target: "humanity-protocol", type: "competes", value: 3 },
  { source: "clearview-ai", target: "clarifai", type: "related-tech", value: 2 },
  { source: "apple-vision", target: "meta-quest", type: "competes", value: 5 },
  { source: "meta-quest", target: "pico", type: "competes", value: 3 },
  
  // VC co-investment patterns
  { source: "founders-fund", target: "andreessen-horowitz", type: "co-invests", value: 4 },
  { source: "khosla-ventures", target: "breakthrough-energy", type: "co-invests", value: 3 },
  { source: "flagship-pioneering", target: "arch-venture", type: "co-invests", value: 4 },
  { source: "google-ventures", target: "intel-capital", type: "co-invests", value: 2 },
  { source: "lux-capital", target: "founders-fund", type: "co-invests", value: 3 },
  { source: "8vc", target: "arch-venture", type: "co-invests", value: 3 },
];

export const graphData: GraphData = {
  nodes: allNodes,
  links: allLinks,
};

export default graphData;
