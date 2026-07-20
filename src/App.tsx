import React, { useState, useEffect, useRef } from "react";
import { 
  Star, 
  Search, 
  Menu, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  Calculator, 
  Paintbrush, 
  Layers, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  Hammer, 
  X, 
  SlidersHorizontal, 
  Eye, 
  Info,
  Clock,
  Users,
  Award,
  Play,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  MapPin,
  Send,
  ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import heroBg from "./assets/images/plasterer_hero_background_1783260364915.jpg";

// Types for interactive features
type FinishOption = {
  id: string;
  name: string;
  pricePerSqFt: number;
  description: string;
  icon: any;
};

const FINISH_OPTIONS: FinishOption[] = [
  { id: "venetian", name: "Venetian Plaster", pricePerSqFt: 14, description: "Polished, marble-like gloss finish.", icon: Paintbrush },
  { id: "microcement", name: "Microcement Coating", pricePerSqFt: 18, description: "Ultra-durable, sleek industrial style.", icon: Layers },
  { id: "stucco", name: "Polished Stucco", pricePerSqFt: 11, description: "Rustic, textured Mediterranean luxury.", icon: Sparkles },
  { id: "smooth", name: "Artisan Smooth Finish", pricePerSqFt: 7, description: "Flawless, seamless flat walls.", icon: Hammer },
];

type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  details: string;
  advantages: string[];
  stats: { prep: string; cost: string; duration: string };
  finishId: string;
  icon: any;
  imgUrl: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: "venetian",
    title: "Bespoke Venetian Plastering",
    tagline: "Ultra-luxurious, hand-burnished marble gloss",
    description: "Classic Italian multi-layered finish containing aged slaked lime putty and pure ground Carrara marble dust. Hand-burnished with steel trowels to achieve a light-catching mirror glaze.",
    details: "Requires up to 5 meticulous trowel applications. We seal the finish using premium natural beeswax or olive-oil soap, creating a high-end protective shield that is fully breathable.",
    advantages: [
      "Stunning high-gloss reflective marble depth",
      "Naturally alkaline, mould & mildew resistant",
      "Seamlessly flows across columns, fireplaces, and recesses"
    ],
    stats: { prep: "Medium", cost: "$$$$", duration: "5-7 Days" },
    finishId: "venetian",
    icon: Paintbrush,
    imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "microcement",
    title: "Microcement Surface Coating",
    tagline: "Seamless, water-impervious concrete design",
    description: "A specialized polymer-modified quartz cement layer applied at just 2-3mm thickness. Delivers completely seamless concrete-look floors, walls, and basins with zero grout lines.",
    details: "Completely waterproof and exceptionally durable. This modern compound bonds with concrete, tile, plasterboard, and wood, making it the supreme alternative for luxury showers and wetrooms.",
    advantages: [
      "100% waterproof and hygienic seamless barrier",
      "Incredible structural adhesion and load rating",
      "Available in customized mineral tones and matte sealers"
    ],
    stats: { prep: "High", cost: "$$$$$", duration: "6-8 Days" },
    finishId: "microcement",
    icon: Layers,
    imgUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "stucco",
    title: "Marmorino & Polished Stucco",
    tagline: "Warm, textured natural stone depth",
    description: "Medium-grain classic limestone formulation yielding soft matte texture shading. Simulates natural travertine blocks and classic masonry with gentle highlights.",
    details: "Ideal for feature walls, acoustic media rooms, or grand hallways. This breathing mineral layer maintains a dry, healthy indoor microclimate while reducing noise reverberation.",
    advantages: [
      "Authentic organic stone aesthetics and soft shadows",
      "Highly breathable lime base stabilizes room humidity",
      "Improves room acoustics and eliminates drywall glare"
    ],
    stats: { prep: "Low", cost: "$$$", duration: "4-5 Days" },
    finishId: "stucco",
    icon: Sparkles,
    imgUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "smooth",
    title: "Artisan Level-5 Smooth Finish",
    tagline: "Unbelievably flat, shadowless wall preparation",
    description: "Ultra-premium gypsum-lime hybrid finishing coat for discerning designers. Provides a perfect, smooth, and seamless surface ready for high-grade eggshell paints or fine wallpapers.",
    details: "We employ advanced dust-free vacuum sanding technology to protect your space and craft absolute flat transitions. Say goodbye to joint band flashings under steep grazing lights.",
    advantages: [
      "Completely flat shadow-free level-5 standards",
      "Fiberglass joint mesh reinforced against hairline cracks",
      "Advanced dustless preparation for occupied residences"
    ],
    stats: { prep: "Low", cost: "$$", duration: "3-4 Days" },
    finishId: "smooth",
    icon: Hammer,
    imgUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600"
  }
];

const STATS = [
  { value: "25+", label: "Years of Heritage", desc: "Decades of multi-generational hand-troweling expertise." },
  { value: "450+", label: "Estates Finished", desc: "Prestigious residences and high-end commercial spaces." },
  { value: "100%", label: "Eco-Mineral Base", desc: "Zero VOC, natural slaked lime, & Carrara marble powder." },
  { value: "15 Yr", label: "Structural Warranty", desc: "Guaranteed resistance against flaking, peeling or cracking." }
];

const WHY_CHOOSE_US_ITEMS = [
  {
    title: "Zero-VOC & Breathable",
    desc: "Our lime-based plasters naturally absorb carbon dioxide, regulate ambient room humidity, and prevent mildew.",
    icon: Sparkles
  },
  {
    title: "Dust-Free Technology",
    desc: "We utilize premium German dust-extraction sanding systems to ensure your luxury interior remains absolutely pristine.",
    icon: ShieldCheck
  },
  {
    title: "In-House Tint Matching",
    desc: "Our color specialists hand-pigment every batch to perfectly coordinate with Farrow & Ball, RAL, or custom paint cards.",
    icon: Paintbrush
  },
  {
    title: "Certified Master Artisans",
    desc: "Every member of our team carries dual certificates in classic Italian marmorino and high-strength microcement coatings.",
    icon: Hammer
  }
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Bespoke Swatch Curation",
    desc: "We analyze your interior lighting, present custom 12x12\" hand-made sample boards, and determine the perfect sheen."
  },
  {
    step: "02",
    title: "Substrate Reinforcement",
    desc: "Walls are reinforced with high-strength fiberglass mesh and quartz-aggregate grip primers to build an indestructible structural bond."
  },
  {
    step: "03",
    title: "Artisanal Multi-Coat Application",
    desc: "Up to 5 ultra-fine layers are applied by hand using premium Italian stainless steel trowels to build genuine organic depth."
  },
  {
    step: "04",
    title: "Burnishing & Beeswax Seal",
    desc: "Surface is hand-burnished to lock in reflection, then sealed with natural heated beeswax or olive-oil soap for lifelong protection."
  }
];

const TESTIMONIALS = [
  {
    quote: "Steevlp Surfaces transformed our Manhattan penthouse into a masterpiece of light and texture. The Venetian plaster feels soft as silk and glows with absolute depth. They are true master-craftsmen.",
    author: "Alessia Vanderbuilt",
    role: "Lead Designer, Vanderbuilt Interiors",
    location: "Manhattan, NY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "We specified their microcement for our master shower and double vanity. The seamless finish is exceptionally robust, completely water-impervious, and incredibly easy to maintain. Absolute perfection.",
    author: "Julian Thorne",
    role: "Architect, Thorne & Partners",
    location: "Beverly Hills, CA",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Finding plasterers who understand the chemistry of aged slaked lime is nearly impossible today. Steevlp brought centuries-old Italian heritage straight to our historic restoration project.",
    author: "Marcella Rossi",
    role: "Heritage Conservation Director",
    location: "Palm Beach, FL",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

const FAQ_ITEMS = [
  {
    q: "How does Venetian Plaster differ from standard painted drywall?",
    a: "Standard paint lies on top of the surface as a thin synthetic latex film. Venetian Plaster is an applied mineral layer composed of slaked lime and ground marble. It bonds chemically with the substrate, calcifying back into solid limestone over time. This creates a highly durable, 3D textured atmosphere that reacts dynamically to ambient room light."
  },
  {
    q: "Is Microcement completely waterproof and safe for showers?",
    a: "Yes. Unlike lime-based stuccoes, Microcement is a polymer-modified quartz cement. Applied at 3mm, we saturate it with specialized solvent-free polyurethane sealers. This creates a 100% waterproof, seamless, and grout-free continuous barrier that is ideal for steam rooms, wetrooms, and vanity basins."
  },
  {
    q: "Can Venetian plaster be patched if it gets damaged?",
    a: "While mineral finishes are exceptionally durable, they can be repaired if chipped. Since we archive the exact pigment recipes for every project, our technicians can carefully trowel and burnish a matching layer over the damaged area, seamlessly blending it back into the organic pattern."
  },
  {
    q: "How long does a typical installation take?",
    a: "Because each layer requires a precise curing cycle (about 12-24 hours depending on humidity), a premium multi-coat application typically takes between 5 to 8 business days. This guarantees the materials cure to their maximum structural hardness and chemical stability."
  },
  {
    q: "Is the finish safe for indoor air quality and occupants?",
    a: "Absolutely. Our slaked-lime materials contain zero Volatile Organic Compounds (VOCs). Because of their high natural alkalinity (pH 12+), they are naturally anti-bacterial, resistant to mold/mildew, and actively improve indoor humidity by breathing moisture in and out."
  }
];

const PORTFOLIO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    title: "Symphony of Light",
    finish: "Venetian Plaster",
    desc: "A hand-burnished marble dust finish reacting to morning light in a private penthouse.",
    size: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
    title: "Seamless Continuity",
    finish: "Microcement Wall",
    desc: "A flawless, custom-pigmented concrete atmosphere for a minimalist walk-in suite.",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
    title: "Organic Earth Tones",
    finish: "Marmorino Classic",
    desc: "A medium-grain matte texture bringing warmth and timeless elegance to living space walls.",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    title: "Subtle Sculpted Forms",
    finish: "Bespoke Travertine",
    desc: "A rough-troweled, structured lime plaster reminiscent of aged volcanic stone.",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=800",
    title: "The Polished Shell",
    finish: "Stucco Lustro",
    desc: "High-gloss classic Italian plaster with deep mirror reflections and satin touch feel.",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
    title: "Raw Mineral Depth",
    finish: "Natural Clay Plaster",
    desc: "An unpolished, deeply breathable clay mixture displaying ancient texture and velvet matte look.",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    title: "Chiaroscuro Warmth",
    finish: "Polished Venetian",
    desc: "Deep multi-layered lime stucco capturing candlelight and reflections with subtle gold dust undertones.",
    size: "col-span-1 md:col-span-2 row-span-1"
  }
];

export default function App() {
  // Navigation active tab (purely interactive, shows subtle active state and alerts/modals)
  const [activeTab, setActiveTab] = useState("Home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  
  // Modal states
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CTA Quote states
  const [quickSqFt, setQuickSqFt] = useState<number>(350);

  // Calculator states
  const [selectedFinish, setSelectedFinish] = useState<string>("venetian");
  const [calcSqFt, setCalcSqFt] = useState<number>(500);
  const [wallCondition, setWallCondition] = useState<number>(1.0); // Multiplier
  const [submittedQuote, setSubmittedQuote] = useState(false);
  const [estimateEmail, setEstimateEmail] = useState("");

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // New section states
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Before/After Slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle Before/After drag
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Synchronize the input field values when clicking quick quote
  const triggerQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setCalcSqFt(quickSqFt);
    setIsCalculatorOpen(true);
  };

  // Computed Estimate cost
  const selectedFinishData = FINISH_OPTIONS.find(f => f.id === selectedFinish) || FINISH_OPTIONS[0];
  const calculatedBase = calcSqFt * selectedFinishData.pricePerSqFt;
  const calculatedTotal = Math.round(calculatedBase * wallCondition);
  const calculatedMin = Math.round(calculatedTotal * 0.9);
  const calculatedMax = Math.round(calculatedTotal * 1.15);

  return (
    <div className="min-h-screen bg-[#0c0d12] flex flex-col font-sans antialiased">
      {/* Outer Browser/Showcase Container */}
      <div 
        id="showcase-container"
        className="w-full min-h-screen bg-[#0c0d12] overflow-hidden shadow-2xl relative flex flex-col"
      >
        {/* HERO SECTION */}
        <div className="relative h-[92vh] min-h-[680px] flex flex-col justify-between overflow-hidden">
          {/* Dynamic Background Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Elite Plastering Hero Background" 
              className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Elegant dark overlay gradient to guarantee supreme contrast and readability */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-black/30" />
          </div>

        {/* 1. HEADER SECTION */}
        <header className="relative z-20 px-6 py-5 md:px-10 md:py-7 flex items-center justify-between w-full">
          {/* Logo Brand on left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 cursor-pointer"
            onClick={() => {
              setActiveTab("Home");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="brand-logo"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-md shadow-amber-500/20">
              <span className="text-[10px] font-bold text-black">S</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white flex items-center">
              Steevlp <span className="text-amber-500 ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">PLASTER</span>
            </span>
          </motion.div>

          {/* Navigation links inside a sleek capsule pill */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center space-x-1 bg-white/10 hover:bg-white/15 backdrop-blur-lg px-2 py-1.5 rounded-full border border-white/10 shadow-lg transition-all duration-300"
            id="nav-pill"
          >
            {[
              { name: "About", action: () => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" }) },
              { name: "Services", action: () => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" }) },
              { name: "Portfolio", action: () => document.getElementById("portfolio-section")?.scrollIntoView({ behavior: "smooth" }) },
              { name: "Contact", action: () => setIsContactOpen(true) }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  tab.action();
                }}
                className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeTab === tab.name 
                    ? "bg-white text-black font-semibold shadow-md" 
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </motion.nav>

          {/* Call Button & Burger Menu on Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3 z-30"
            id="header-right-controls"
          >
            {/* Call Button */}
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2.5 rounded-full flex items-center space-x-2 text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-amber-500/10 cursor-pointer"
              id="call-button"
            >
              <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Call Us</span>
            </button>

            {/* Hamburger menu button */}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-md focus:outline-none"
              id="menu-trigger"
            >
              <Menu className="w-4 h-4 stroke-[2.5]" />
            </button>
          </motion.div>
        </header>

        {/* 2. MAIN HERO BODY */}
        <main className="relative z-10 px-6 py-6 md:px-12 md:py-10 flex flex-col justify-end h-full">
          <div className="max-w-2xl text-left">
            
            {/* SOCIAL PROOF RATING (Instead of version badge) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-3.5 bg-white/[0.07] backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-6"
              id="social-rating-badge"
            >
              {/* Overlapping small avatar circles */}
              <div className="flex -space-x-2.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                  alt="Reviewer" 
                  className="w-7 h-7 rounded-full border border-amber-500 object-cover" 
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
                  alt="Reviewer" 
                  className="w-7 h-7 rounded-full border border-amber-500 object-cover" 
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100" 
                  alt="Reviewer" 
                  className="w-7 h-7 rounded-full border border-amber-500 object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-semibold text-white">4.9 / 5.0</span>
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500 stroke-none" />
                    <Star className="w-3 h-3 fill-amber-500 stroke-none" />
                    <Star className="w-3 h-3 fill-amber-500 stroke-none" />
                    <Star className="w-3 h-3 fill-amber-500 stroke-none" />
                    <Star className="w-3 h-3 fill-amber-500 stroke-none" />
                  </div>
                </div>
                <span className="text-[10px] text-white/60 tracking-wider">Loved by 2,000+ homeowners & builders</span>
              </div>
            </motion.div>

            {/* MAIN DISPLAY HEADINGS */}
            <div className="space-y-2 mb-5">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.05]"
                id="hero-title-line-1"
              >
                Sculpting
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white/90 leading-[1.05] flex items-center flex-wrap"
                id="hero-title-line-2"
              >
                Flawless Walls
                <span className="inline-block ml-3 w-3 h-3 rounded-full bg-amber-500 animate-pulse mt-3" />
              </motion.h1>
            </div>

            {/* SUBTITLE */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-xl mb-8"
              id="hero-subtitle"
            >
              We combine decades of artisan plastering mastery with advanced eco-conscious materials to deliver flat, seamless, and stunning wall finishes for premium residential estates and commercial masterpieces.
            </motion.p>

            {/* CALL TO ACTION BUTTON (Exactly matching the minimalist layout in the reference design) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center mb-4"
              id="hero-cta-area"
            >
              {/* Quick Quote Pill Frame */}
              <form 
                onSubmit={triggerQuickQuote}
                className="bg-white hover:bg-neutral-100 text-black pl-5 pr-2 py-1.5 rounded-full flex items-center justify-between shadow-2xl transition-all duration-300 w-[220px] group border border-white/10"
              >
                <button 
                  type="submit"
                  className="w-full bg-transparent text-neutral-900 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-between hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>GET A FREE QUOTE</span>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-md shadow-amber-500/30 group-hover:bg-amber-600 group-hover:scale-105 transition-all duration-300 ml-4">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </form>
            </motion.div>
          </div>
        </main>


        </div>

        {/* ---------------------------------------------------- */}
        {/* 3. INTERACTIVE SLIDE-OVER DRAWER: QUOTE CALCULATOR */}
        {/* ---------------------------------------------------- */}
        <AnimatePresence>
          {isCalculatorOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCalculatorOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
              />

              {/* Side Drawer Panel */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#0c0e14] z-[110] shadow-2xl border-l border-white/10 flex flex-col p-6 overflow-y-auto"
                id="quote-calculator-drawer"
              >
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">Instant Estimator</h3>
                      <p className="text-[10px] text-white/50 font-mono tracking-wider">PROJECT COST CALCULATOR</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCalculatorOpen(false);
                      setSubmittedQuote(false);
                    }}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {submittedQuote ? (
                  // Success State After Estimate Request
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center px-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-2xl text-white mb-2">Estimate Secured!</h4>
                    <p className="text-sm text-white/70 leading-relaxed mb-6">
                      We've compiled your customized {selectedFinishData.name} estimate package. A soft copy has been sent to <span className="text-amber-500 font-semibold">{estimateEmail}</span>. Our master estimator will follow up within 24 hours to schedule your physical site audit.
                    </p>
                    <div className="w-full bg-white/5 rounded-xl p-4 border border-white/5 text-left mb-8 space-y-2">
                      <div className="flex justify-between text-xs text-white/50">
                        <span>Project Type</span>
                        <span className="text-white font-medium">{selectedFinishData.name}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/50">
                        <span>Calculated Area</span>
                        <span className="text-white font-medium">{calcSqFt} SQ FT</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/50">
                        <span>Pre-audit Estimate</span>
                        <span className="text-amber-500 font-bold font-mono">${calculatedMin.toLocaleString()} - ${calculatedMax.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCalculatorOpen(false);
                        setSubmittedQuote(false);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Return to Showcase
                    </button>
                  </motion.div>
                ) : (
                  // Active Estimator Form Content
                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      {/* 1. SELECT FINISH STYLE */}
                      <div>
                        <label className="text-xs font-semibold tracking-wider text-white/40 block mb-3 uppercase">1. Choose Surface Finish</label>
                        <div className="grid grid-cols-2 gap-3">
                          {FINISH_OPTIONS.map((opt) => {
                            const IconComp = opt.icon;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => setSelectedFinish(opt.id)}
                                className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                                  selectedFinish === opt.id 
                                    ? "bg-amber-500/10 border-amber-500 text-white" 
                                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10"
                                }`}
                              >
                                <div className="flex justify-between items-start w-full">
                                  <div className={`p-1.5 rounded-lg ${selectedFinish === opt.id ? "bg-amber-500 text-black" : "bg-white/5 text-white"}`}>
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <span className="text-xs font-mono font-bold text-amber-500">${opt.pricePerSqFt}/sf</span>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold font-display leading-tight">{opt.name}</h4>
                                  <p className="text-[9px] text-white/50 leading-tight mt-0.5">{opt.description}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. AREA SQ FT SLIDER & INPUT */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold tracking-wider text-white/40 uppercase">2. Area Size Estimation</label>
                          <div className="flex items-center space-x-1.5">
                            <input 
                              type="number" 
                              value={calcSqFt}
                              onChange={(e) => setCalcSqFt(Math.max(1, parseInt(e.target.value) || 0))}
                              className="w-20 bg-black/40 text-center text-xs font-bold font-mono text-white px-2 py-1 rounded border border-white/10 focus:outline-none"
                            />
                            <span className="text-[10px] text-white/50 font-mono">SQ FT</span>
                          </div>
                        </div>
                        <input 
                          type="range" 
                          min="100" 
                          max="5000" 
                          step="50"
                          value={calcSqFt}
                          onChange={(e) => setCalcSqFt(parseInt(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-white/30 font-mono">
                          <span>100 SQ FT</span>
                          <span>2,500 SQ FT</span>
                          <span>5,000 SQ FT</span>
                        </div>
                      </div>

                      {/* 3. WALL CONDITION / BASE MULTIPLIER */}
                      <div>
                        <label className="text-xs font-semibold tracking-wider text-white/40 block mb-2 uppercase">3. Underlying Wall Condition</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: "Ready Drywall", val: 1.0, desc: "Standard mudding" },
                            { name: "Rough Brick", val: 1.25, desc: "Needs backing coat" },
                            { name: "Damaged Plaster", val: 1.45, desc: "Heavy prep required" },
                          ].map((cond) => (
                            <button
                              key={cond.name}
                              onClick={() => setWallCondition(cond.val)}
                              className={`p-2.5 rounded-lg text-center border transition-all flex flex-col justify-between items-center ${
                                wallCondition === cond.val
                                  ? "bg-amber-500/10 border-amber-500 text-white"
                                  : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10"
                              }`}
                            >
                              <span className="text-[10px] font-bold font-display leading-tight">{cond.name}</span>
                              <span className="text-[8px] text-white/40 mt-1">{cond.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* LIVE CALCULATION REVEAL */}
                    <div className="space-y-4">
                      <div className="bg-[#12151e] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex justify-between text-[11px] text-white/50 uppercase font-mono tracking-wider mb-2">
                          <span>ESTIMATED PRICE RANGE</span>
                          <span className="text-emerald-500 font-bold font-sans flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> WARRANTY INCL.</span>
                        </div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-3xl font-display font-bold text-white tracking-tight">
                            ${calculatedMin.toLocaleString()}
                          </span>
                          <span className="text-white/40 text-sm font-mono">-</span>
                          <span className="text-3xl font-display font-bold text-amber-500 tracking-tight">
                            ${calculatedMax.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/40 leading-snug mt-2">
                          *Estimate includes premium structural preparation, bespoke artisan plaster compound application, dust-free sanding, and an 8-year surface guarantee.
                        </p>
                      </div>

                      {/* Request Form Submission */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (estimateEmail.trim()) {
                            setSubmittedQuote(true);
                          }
                        }}
                        className="space-y-2.5"
                      >
                        <input 
                          type="email" 
                          required
                          placeholder="Enter your email to secure estimate" 
                          value={estimateEmail}
                          onChange={(e) => setEstimateEmail(e.target.value)}
                          className="w-full bg-white/5 text-xs text-white px-4 py-3.5 rounded-full border border-white/10 focus:outline-none focus:border-amber-500 placeholder-white/30"
                        />
                        <button 
                          type="submit"
                          className="w-full bg-amber-500 hover:bg-amber-600 text-black py-4 rounded-full font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
                        >
                          <Calculator className="w-4 h-4 text-black" />
                          <span>SECURE MY GUARANTEED ESTIMATE</span>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------- */}
        {/* 4. BEFORE & AFTER INTERACTIVE COMPARISON SLIDER */}
        {/* ---------------------------------------------------- */}
        <AnimatePresence>
          {isComparisonOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsComparisonOpen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] cursor-pointer"
              />

              {/* Slider Modal Frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-x-4 md:inset-x-20 top-10 bottom-10 bg-[#0c0e14] z-[110] rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden"
                id="before-after-modal"
              >
                {/* 1. Interactive Slider Canvas (Left / Main) */}
                <div className="flex-1 relative bg-neutral-900 select-none overflow-hidden h-3/5 md:h-full">
                  <div 
                    ref={sliderRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    className="w-full h-full relative cursor-ew-resize"
                  >
                    {/* Background Layer: "BEFORE" (Bare rough brick wall) */}
                    <div className="absolute inset-0">
                      <img 
                        src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=1200" 
                        alt="Rough unplastered wall" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark ambient overlay to highlight texture */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Label */}
                      <div className="absolute left-6 bottom-6 bg-black/75 px-3 py-1.5 rounded text-[10px] font-mono tracking-wider text-red-400 border border-red-400/20">
                        RAW UNFINISHED BRICK
                      </div>
                    </div>

                    {/* Foreground Layer: "AFTER" (Perfect, smooth, hand-finished grey venetian plaster) */}
                    <div 
                      className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                        alt="Finished luxurious polished stucco" 
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        style={{ width: sliderRef.current?.getBoundingClientRect().width }}
                        referrerPolicy="no-referrer"
                      />
                      {/* Ambient premium warm shadow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent" />
                      {/* Label */}
                      <div className="absolute right-6 bottom-6 bg-amber-500 px-3 py-1.5 rounded text-[10px] font-mono tracking-wider text-black font-semibold shadow-md">
                        FINISHED LUXURY VENETIAN PLASTER
                      </div>
                    </div>

                    {/* Custom Draggable Handle Bar */}
                    <div 
                      className="absolute inset-y-0 w-1 bg-amber-500 z-10 cursor-ew-resize"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 border-4 border-[#0c0e14] text-black flex items-center justify-center shadow-lg">
                        <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Description & Settings Panel (Right) */}
                <div className="w-full md:w-[350px] bg-[#0c0e14] border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-between h-2/5 md:h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">Visualizer</h3>
                        <p className="text-[10px] text-white/50 font-mono tracking-wider">CRAFTSMANSHIP METAMORPHOSIS</p>
                      </div>
                      <button 
                        onClick={() => setIsComparisonOpen(false)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs text-white/70 leading-relaxed">
                        Drag the vertical golden slider from left to right on the canvas to inspect our surface quality transformation.
                      </p>
                      
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2 text-xs">
                        <div className="flex items-center space-x-2 text-amber-500 font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Perfect 3-Layer Coat Base</span>
                        </div>
                        <p className="text-[10px] text-white/50 pl-5 leading-tight">
                          We apply a moisture-barrier membrane, followed by aggregate fiber backing, and double artisan finish coats.
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-2 text-xs">
                        <div className="flex items-center space-x-2 text-amber-500 font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Crack-Resistant Compound</span>
                        </div>
                        <p className="text-[10px] text-white/50 pl-5 leading-tight">
                          Our eco-materials flex naturally, avoiding hairline spiderweb cracks over dry-shrink cycles.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => {
                        setIsComparisonOpen(false);
                        setIsCalculatorOpen(true);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Configure This Plaster</span>
                    </button>
                    <button 
                      onClick={() => setIsComparisonOpen(false)}
                      className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Close Visualizer
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------- */}
        {/* 5. BRAND MISSION DETAILS MODAL */}
        {/* ---------------------------------------------------- */}
        <AnimatePresence>
          {isMissionOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMissionOpen(false)}
                className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] cursor-pointer"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="fixed inset-x-6 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-10 md:top-20 max-w-xl bg-[#0c0e14] z-[110] rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
                id="mission-modal"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">Our Mission & Standards</h3>
                      <p className="text-[10px] text-white/50 font-mono tracking-wider">HERITAGE MEET MODERN APPARATUS</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMissionOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-white/70 leading-relaxed">
                  <p>
                    At <span className="text-white font-semibold">Steevlp Plastering</span>, we view walls not as simple partitions, but as critical architectural canvases. Founded on ancient Italian surface finishing customs, our crew uses true limestone, Venetian marmorino plaster, and custom marble dust matrices to formulate spaces that reflect light like precious gemstones.
                  </p>
                  <p>
                    By mixing timeless hand-troweled formulations with modern carbon-neutral acrylic binders, our finishes withstand structural vibration and humidity cycles while guaranteeing an organic, breathable environment.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                      <div className="font-display font-bold text-white text-base">8-Year Guarantee</div>
                      <p className="text-[10px] text-white/40 mt-1 leading-normal">Zero crack propagation, zero color fading, completely washable premium coatings.</p>
                    </div>
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                      <div className="font-display font-bold text-white text-base">Carbon-Neutral</div>
                      <p className="text-[10px] text-white/40 mt-1 leading-normal">Lime absorbs CO2 during curing, naturally neutralizing air-toxins within premium properties.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex space-x-3">
                  <button 
                    onClick={() => {
                      setIsMissionOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Discuss My Workspace
                  </button>
                  <button 
                    onClick={() => setIsMissionOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------- */}
        {/* 6. CONTACT CALLBACK REQUEST MODAL */}
        {/* ---------------------------------------------------- */}
        <AnimatePresence>
          {isContactOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsContactOpen(false)}
                className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] cursor-pointer"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="fixed inset-x-6 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-16 md:top-24 max-w-md bg-[#0c0e14] z-[110] rounded-2xl border border-white/10 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
                id="contact-callback-modal"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">Direct Advisory Line</h3>
                      <p className="text-[10px] text-white/50 font-mono tracking-wider">REQUEST A CALL-BACK</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsContactOpen(false);
                      setContactSuccess(false);
                    }}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {contactSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">Callback Scheduled</h4>
                    <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                      Thank you <span className="text-amber-500 font-semibold">{contactName}</span>. An expert plastering surveyor will dial your number (<span className="text-white/90 font-mono">{contactPhone}</span>) within the hour.
                    </p>
                    <button 
                      onClick={() => {
                        setIsContactOpen(false);
                        setContactSuccess(false);
                      }}
                      className="mt-4 bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                    >
                      Return
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (contactName.trim() && contactPhone.trim()) {
                        setContactSuccess(true);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-[10px] font-semibold tracking-wider text-white/40 uppercase block mb-1.5">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Sterling Archer" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white/5 text-xs text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 placeholder-white/20"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold tracking-wider text-white/40 uppercase block mb-1.5">Contact Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. (555) 019-2834" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-white/5 text-xs text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 placeholder-white/20 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold tracking-wider text-white/40 uppercase block mb-1.5">Project Scope (Optional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Briefly describe your walls, stucco, or repair plans..." 
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        className="w-full bg-white/5 text-xs text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 placeholder-white/20"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>BOOK DIRECT CALLBACK CALL</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------- */}
        {/* 7. FULL SCREEN MOBILE NAVIGATION OVERLAY */}
        {/* ---------------------------------------------------- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-0 bg-[#0c0e14] z-[100] border-b border-white/10 p-6 flex flex-col space-y-6 md:hidden shadow-2xl"
              id="mobile-nav-panel"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="font-display font-bold text-white">Menu Options</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                {[
                  { name: "About Heritage", action: () => { document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" }); setIsMobileMenuOpen(false); } },
                  { name: "Our Services", action: () => { document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" }); setIsMobileMenuOpen(false); } },
                  { name: "Interactive Portfolio", action: () => { document.getElementById("portfolio-section")?.scrollIntoView({ behavior: "smooth" }); setIsMobileMenuOpen(false); } },
                  { name: "Direct Callback Contact", action: () => { setIsContactOpen(true); setIsMobileMenuOpen(false); } }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="text-left py-3 px-4 rounded-xl bg-white/5 hover:bg-amber-500/10 hover:text-amber-500 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] text-white/40 text-center font-mono">
                STEEVLP PLASTER ARCHITECTURE • PRE-AUDIT VERIFIED
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* SERVICES SECTION */}
      {/* ---------------------------------------------------- */}
      <section 
        id="services-section"
        className="w-full bg-[#0c0d12]/60 backdrop-blur-md p-6 md:p-10 lg:p-12 border-t border-white/10 relative overflow-hidden flex flex-col space-y-8"
      >
        {/* Subtle background decorative amber glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
          <div className="space-y-2 text-left">
            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
              [ ARTISAN SERVICE CATALOGUE ]
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Our Bespoke Surface Finishes
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-light max-w-xl">
              We craft tactile atmospheres. Select a specialty to view meticulous material recipes, curing procedures, and performance advantages.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3 text-[11px] font-mono text-white/40">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
              HAND-TROWELED PROTOCOLS
            </span>
            <span>|</span>
            <span>8-YEAR SURFACE INTEGRITY</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const ServiceIcon = service.icon;
            const isExpanded = expandedServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                layout="position"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`bg-white/[0.02] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded 
                    ? "border-amber-500/40 shadow-xl shadow-amber-500/[0.03] bg-white/[0.04]" 
                    : "border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                }`}
              >
                {/* Card Header Banner / Quick Info */}
                <div className="p-6 md:p-8 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-start justify-between">
                    {/* Left: Icon & Service Info */}
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                          {service.title}
                        </h3>
                        <span className="text-[11px] text-amber-500/90 font-medium tracking-wide">
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Right: Expand/Collapse Arrow */}
                    <button
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isExpanded 
                          ? "bg-amber-500 text-black border-amber-500" 
                          : "bg-white/5 text-white/75 border-white/10 hover:border-white/20 hover:bg-white/10"
                      }`}
                      title={isExpanded ? "Collapse Details" : "View Material Details"}
                    >
                      <SlidersHorizontal className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {/* Short Description */}
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light text-left px-6 md:px-8">
                    {service.description}
                  </p>

                  {/* Stats Pill Row */}
                  <div className="flex items-center space-x-4 text-[11px] font-mono bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2.5 w-fit mx-6 md:mx-8">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-white/40">PREP:</span>
                      <span className="text-white font-medium">{service.stats.prep}</span>
                    </div>
                    <span className="text-white/10">•</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-white/40">COST:</span>
                      <span className="text-amber-500 font-bold">{service.stats.cost}</span>
                    </div>
                    <span className="text-white/10">•</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-white/40">TIME:</span>
                      <span className="text-white font-medium">{service.stats.duration}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 px-6 md:px-8 pb-4">
                    <button
                      onClick={() => {
                        setSelectedFinish(service.finishId);
                        setIsCalculatorOpen(true);
                        // Smooth scroll up to showcase container where estimator drawer opens
                        document.getElementById("showcase-container")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2.5 rounded-full font-display font-bold text-[11px] uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Estimate Cost</span>
                    </button>

                    <button
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-5 py-2.5 rounded-full font-display font-medium text-[11px] uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "Inspect Material"}</span>
                    </button>
                  </div>

                  {/* Expandable Section with smooth transition */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-white/10 pt-4 mt-2 space-y-4 px-6 md:px-8 pb-6 text-left"
                      >
                        {/* Inner grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          {/* Material Recipe Details */}
                          <div className="md:col-span-7 space-y-3.5">
                            <h4 className="text-[10px] uppercase tracking-wider text-amber-500 font-mono font-bold">
                              APPLICATION PROTOCOL & RECIPE
                            </h4>
                            <p className="text-white/85 text-xs leading-relaxed font-light">
                              {service.details}
                            </p>
                            
                            {/* Advantages Checklist */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono font-bold block">
                                CRITICAL BENEFITS
                              </span>
                              {service.advantages.map((adv, i) => (
                                <div key={i} className="flex items-start space-x-2 text-xs">
                                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                  </div>
                                  <span className="text-white/80 font-light">{adv}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Service Image Preview */}
                          <div className="md:col-span-5 h-44 md:h-auto min-h-[160px] rounded-xl overflow-hidden relative border border-white/10">
                            <img 
                              src={service.imgUrl} 
                              alt={service.title} 
                              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm uppercase">
                              ARTISAN SWATCH
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick FAQ / Guaranteed craftsmanship badge below list */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-white text-sm">Need a Custom Compound blend?</h4>
              <p className="text-white/50 text-[11px] font-light max-w-lg mt-0.5">
                Our raw materials are fully tintable and custom-molded to any bespoke texture specification requested by architects or interior space designers.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span>Consult Our Specialist</span>
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* PORTFOLIO GALLERY SECTION */}
      {/* ---------------------------------------------------- */}
      <section 
        id="portfolio-section"
        className="w-full bg-[#090a0e]/55 p-6 md:p-10 lg:p-12 border-t border-white/10 relative overflow-hidden flex flex-col space-y-10 animate-fade-in"
      >
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/[0.015] rounded-full blur-[120px] pointer-events-none" />
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6">
          <div className="space-y-2 text-left">
            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
              [ COMPLETED WORK ]
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Artisan Plaster Portfolio
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-light max-w-xl">
              A curated showcase of our bespoke hand-crafted surface installations across luxury residential estates and high-end retail studios.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <button 
              onClick={() => setIsComparisonOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Launch Slider Visualizer</span>
            </button>
          </div>
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_IMAGES.map((img, i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl overflow-hidden border border-white/5 group h-80 ${img.size}`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-5 inset-x-5 text-left flex flex-col justify-end space-y-1.5 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase bg-amber-500/10 border border-amber-500/35 text-amber-500 px-2 py-0.5 rounded">
                    {img.finish}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white font-display">
                  {img.title}
                </h3>
                <p className="text-[11px] text-white/60 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* ABOUT SECTION (WITH STATS) */}
      {/* ---------------------------------------------------- */}
      <section 
        id="about-section"
        className="w-full bg-[#0c0d12]/40 backdrop-blur-md p-6 md:p-10 lg:p-12 border-t border-white/5 relative overflow-hidden flex flex-col space-y-10"
      >
        <div className="absolute top-12 left-10 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Storytelling */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
              [ ARTISANAL HERITAGE ]
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              A Legacy of Perfection & tactile Luxury
            </h2>
            <div className="h-0.5 w-12 bg-amber-500/80 rounded" />
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
              At Steevlp Surfaces, we do not simply finish walls—we compose sensory atmospheres. Founded on the traditional plastering techniques of Northern Italy and refined with state-of-the-art materials, our multi-generational collective of master-applicators bridges raw mineral chemistry with high-end modern minimalism.
            </p>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
              Our materials are sourced directly from historical lime quarries and pulverized marble basins. Hand-mixed with natural binders, they undergo natural carbonation, aging like fine masonry to form a rock-hard, breathable stone shield that actually improves the air quality and microclimate of your space.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2.5 text-xs text-white/80">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Award className="w-3 h-3" />
                </div>
                <span className="font-light">European Guild Accredited</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-white/80">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Users className="w-3 h-3" />
                </div>
                <span className="font-light">Architect-Approved Swatches</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-left space-y-2 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-500 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white tracking-wide">
                  {stat.label}
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed font-light">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* WHY CHOOSE US SECTION */}
      {/* ---------------------------------------------------- */}
      <section 
        id="why-choose-us-section"
        className="w-full bg-[#090a0e]/70 p-6 md:p-10 lg:p-12 border-t border-white/5 relative overflow-hidden flex flex-col space-y-8"
      >
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
        
        {/* Section Header */}
        <div className="text-center mx-auto space-y-2 max-w-xl">
          <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
            [ UNCOMPROMISING CRITERIA ]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            Why Specified by Discerning Clients
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-light">
            We operate at the intersection of master craftsmanship and absolute luxury clean-site execution protocols.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0c0d12]/60 border border-white/5 rounded-xl p-6 text-left space-y-3 hover:border-amber-500/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>Guaranteed protocol</span>
                  <Check className="w-3 h-3 text-emerald-500/80" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* INTERACTIVE VIDEO STUDIO SECTION */}
      {/* ---------------------------------------------------- */}
      <section 
        id="video-section"
        className="w-full bg-[#0c0d12]/40 backdrop-blur-md p-6 md:p-10 lg:p-12 border-t border-white/5 relative overflow-hidden flex flex-col space-y-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.01] to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
              [ CRAFTSMANSHIP DOCUMENTARY ]
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Witness the Hand-Troweling Artistry
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Every stroke of the spatula is a deliberate artistic expression. Our documentary captures the delicate chemistry of lime aging, pigment mixing, and the precision burnishing process that gives our finishes their deep, three-dimensional light response.
            </p>
            
            <div className="space-y-2 pt-2 text-xs text-white/50 font-mono">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Running Time: 2 mins 40 secs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Paintbrush className="w-3.5 h-3.5 text-amber-500" />
                <span>Focus: Level-5 Venetian Burnishing</span>
              </div>
            </div>

            <button
              onClick={() => setIsVideoPlaying(true)}
              className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center space-x-2.5 transition-all cursor-pointer w-fit"
            >
              <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Launch Studio Video</span>
            </button>
          </div>

          <div className="lg:col-span-7">
            {/* Cinematic Mock Video Container */}
            <div 
              onClick={() => setIsVideoPlaying(true)}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer group"
            >
              {/* Image poster */}
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200" 
                alt="Venetian Plaster Application"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center" />

              {/* Pulsing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-500 text-black flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-all duration-300 relative">
                  <span className="absolute inset-0 w-full h-full rounded-full bg-amber-500/20 animate-ping" />
                  <Play className="w-6 h-6 fill-black ml-1" />
                </div>
              </div>

              {/* Cinematic details banner */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center justify-between text-white text-[10px] font-mono uppercase tracking-wide">
                <span>Steevlp Surfaces: Art of Trowel</span>
                <span>4K ULTRA HD • SOUND ON</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Lightbox Player Modal */}
        <AnimatePresence>
          {isVideoPlaying && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              {/* Dark backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsVideoPlaying(false)}
                className="fixed inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              />
              
              {/* Player modal frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-black w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/10 z-10 shadow-2xl flex flex-col"
              >
                {/* Header inside video modal */}
                <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-5 text-white z-20">
                  <span className="font-display font-bold text-xs uppercase tracking-wider">
                    STEEVLP STUDIO: PROCESS DOCUMENTARY
                  </span>
                  <button 
                    onClick={() => setIsVideoPlaying(false)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated high-fidelity video play loop (using premium public placeholder, or full simulated video graphics) */}
                <div className="w-full h-full relative bg-neutral-900 flex items-center justify-center">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                    title="Bespoke Plastering Masterpiece Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* ---------------------------------------------------- */}
      {/* HOW IT WORKS SECTION */}
      {/* ---------------------------------------------------- */}
      <section 
        id="how-it-works-section"
        className="w-full bg-[#090a0e]/70 p-6 md:p-10 lg:p-12 border-t border-white/5 relative overflow-hidden flex flex-col space-y-10"
      >
        {/* Section Header */}
        <div className="text-center mx-auto space-y-2 max-w-xl">
          <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
            [ METICULOUS DEPLOYMENT ]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            The Masterclass Protocol
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-light">
            Every square foot follows a rigid chemical preparation and hand-trowel drying timeline. Here is our sequential journey to perfection.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0d12]/40 border border-white/5 rounded-xl p-6 text-left space-y-4 relative z-10 hover:border-white/15 hover:bg-[#0c0d12]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Step Pill Header */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-2xl text-amber-500/20 tracking-wider">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono text-[10px] text-amber-500 font-bold">
                    STEP
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 mt-4 text-[9px] font-mono text-white/30 uppercase flex items-center space-x-1.5">
                <Clock className="w-3 h-3 text-amber-500" />
                <span>Strict quality control</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FAQ SECTION (WITH INTERACTIVE ACCORDION) */}
      {/* ---------------------------------------------------- */}
      <section 
        id="faq-section"
        className="w-full bg-[#0c0d12]/40 backdrop-blur-md p-6 md:p-10 lg:p-12 border-t border-white/5 relative overflow-hidden flex flex-col space-y-8"
      >
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-amber-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
        
        {/* Section Header */}
        <div className="text-center mx-auto space-y-2 max-w-xl">
          <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
            [ ACADEMIC CLARITY ]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            Frequently Asked Inquiries
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-light">
            Answering chemical composition, structural durability, moisture safety, and custom aesthetic color matching queries.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="max-w-3xl w-full mx-auto space-y-3 pt-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = expandedFaqId === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "border-amber-500/30 bg-white/[0.03]" 
                    : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => setExpandedFaqId(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left text-white font-medium text-xs sm:text-sm focus:outline-none focus:ring-0 select-none cursor-pointer"
                >
                  <span className="pr-4 font-display font-bold leading-snug">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-amber-500 text-black border-amber-500" : "bg-white/5 border-white/10 text-white/80"
                  }`}>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-left text-white/70 text-xs sm:text-sm leading-relaxed font-light border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TESTIMONIALS SECTION */}
      {/* ---------------------------------------------------- */}
      <section 
        id="testimonial-section"
        className="w-full bg-[#090a0e]/70 p-6 md:p-10 lg:p-12 border-t border-white/5 relative overflow-hidden flex flex-col space-y-8"
      >
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-amber-500/[0.01] rounded-full blur-[80px]" />

        {/* Header */}
        <div className="text-center mx-auto space-y-2 max-w-xl">
          <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold block">
            [ ACCREDITED REVIEWS ]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            Voices of Distinction
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-light">
            Read critical assessments from leading interior designers, custom residential builders, and world-class architects.
          </p>
        </div>

        {/* Carousel block */}
        <div className="max-w-4xl w-full mx-auto relative bg-[#0c0d12]/50 border border-white/5 rounded-2xl p-6 md:p-10 text-left space-y-6">
          
          {/* Quote mark ornament */}
          <span className="font-display text-8xl text-amber-500/10 leading-none absolute top-4 left-6 pointer-events-none select-none">
            “
          </span>

          <div className="min-h-[140px] flex items-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-white/90 font-light text-sm sm:text-base md:text-lg italic leading-relaxed">
                  "{TESTIMONIALS[currentTestimonial].quote}"
                </p>

                {/* Profile row */}
                <div className="flex items-center space-x-4 pt-2">
                  <img 
                    src={TESTIMONIALS[currentTestimonial].avatar} 
                    alt={TESTIMONIALS[currentTestimonial].author}
                    className="w-12 h-12 rounded-full object-cover border border-amber-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-white text-xs sm:text-sm">
                      {TESTIMONIALS[currentTestimonial].author}
                    </h4>
                    <p className="text-white/50 text-[11px] font-mono mt-0.5">
                      {TESTIMONIALS[currentTestimonial].role} • {TESTIMONIALS[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls bottom bar */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-white/40">
              <span className="text-amber-500 font-bold">{currentTestimonial + 1}</span>
              <span>/</span>
              <span>{TESTIMONIALS.length}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/85 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer select-none"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/85 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer select-none"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SITE FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer 
        id="site-footer"
        className="w-full bg-[#07080b] p-8 md:p-12 lg:p-16 border-t border-white/10 relative overflow-hidden flex flex-col space-y-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left relative z-10">
          
          {/* Brand details (Col span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="font-display font-extrabold text-base tracking-wider text-white">
                STEEVLP SURFACES
              </span>
              <span className="text-[9px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded">
                ARTISANAL GENUINE
              </span>
            </div>
            
            <p className="text-white/55 text-xs font-light leading-relaxed max-w-sm">
              We engineer beautiful textured plaster surfaces, natural mineral stuccos, and extreme-hardness waterproofing microcement layers for award-winning architects and premium residential builders worldwide.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-white/60">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="font-light">Studio & Lab: 48 Artisan Way, Industrial West, London</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="font-light">Contracting Hotline: +44 20 7946 0831</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="font-light">Lab Enquiries: craft@steevlp.com</span>
              </div>
            </div>
          </div>

          {/* Quick Nav directory (Col span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">
              DIRECTORY INDEX
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("showcase-container")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-amber-500 transition-colors"
                >
                  Return to Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-amber-500 transition-colors"
                >
                  Artisan Services
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-amber-500 transition-colors"
                >
                  Our Heritage & History
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-amber-500 transition-colors"
                >
                  Structural FAQ Panel
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsCalculatorOpen(true)}
                  className="hover:text-amber-500 transition-colors bg-transparent border-none text-left cursor-pointer"
                >
                  Interactive Cost Estimator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsComparisonOpen(true)}
                  className="hover:text-amber-500 transition-colors bg-transparent border-none text-left cursor-pointer"
                >
                  Visual Before & After Slider
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription form (Col span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">
              THE ARTISAN COURIER
            </h4>
            <p className="text-white/55 text-xs font-light leading-relaxed">
              Subscribe to receive physical sample boards, seasonal pigment reports, and local project case studies.
            </p>

            <AnimatePresence mode="wait">
              {!newsletterSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterSuccess(true);
                    }
                  }}
                  className="flex items-center bg-white/5 border border-white/10 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-amber-500/40 transition-all"
                >
                  <input 
                    type="email" 
                    placeholder="architect@studio.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none focus:ring-0 flex-1 min-w-0"
                  />
                  <button 
                    type="submit"
                    className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-all cursor-pointer"
                    title="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-xs text-left"
                >
                  <div className="flex items-center space-x-2 font-bold mb-1">
                    <Check className="w-4 h-4" />
                    <span>Welcome to the Registry</span>
                  </div>
                  <p className="font-light text-white/70">
                    We have successfully added you to our physical sample catalog distribution list. Expect our swatch catalogue shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom copyright line & return to top button */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/35 font-mono space-y-4 sm:space-y-0 text-center sm:text-left relative z-10">
          <div>
            © {new Date().getFullYear()} STEEVLP SURFACES. ALL RIGHTS RESERVED. CERTIFIED LIME ARTISANS.
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => document.getElementById("showcase-container")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-amber-500 transition-colors flex items-center space-x-2 bg-transparent border-none cursor-pointer"
              title="Return to top"
            >
              <span>BACK TO TOP</span>
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <ArrowUp className="w-3 h-3 text-amber-500" />
              </div>
            </button>
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
}
