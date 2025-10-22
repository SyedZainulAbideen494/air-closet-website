import React, { useEffect, useRef } from "react";
import "./App.css";

/* lucide-react icons */
import {
  Shirt,
  CloudSun,
  ShoppingCart,
  UserPlus,
  ScanLine,
  Sparkles,
  Camera,
  CloudCog,
  Lightbulb,
  ShoppingBag,
  Palette,
  TrendingUp,
  Leaf,
  PieChart,
  Bot,
  BoxSelect,
  Clock,
  GitMerge,
  ChevronDown,
  Instagram,
  Twitter,
} from "lucide-react";

function App() {
  const canvasRef = useRef(null);

  /* -------------------------
     Particle Background Logic
     ------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let rafId;
    let resizeObserverAttached = false;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
        this.radius = 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 169, 255, 0.7)";
        ctx.fill();
      }
    }

    function createParticles() {
      const particleCount = Math.floor(canvas.width * canvas.height / 15000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    createParticles();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 169, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }
    animate();

    // re-create particles on resize
    const onResizeCreate = () => createParticles();
    window.addEventListener("resize", onResizeCreate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", onResizeCreate);
      cancelAnimationFrame(rafId);
      particles = [];
    };
  }, []);

  /* -------------------------
     FAQ Accordion Logic
     ------------------------- */
  useEffect(() => {
    const toggles = document.querySelectorAll(".faq-toggle");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const content = toggle.nextElementSibling;
        if (!content) return;

        const isCurrentlyOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

        // Close all other accordions
        document.querySelectorAll(".faq-content").forEach((c) => {
          if (c !== content) {
            c.style.maxHeight = null;
            c.classList.remove("is-open");
            const prevButton = c.previousElementSibling;
            if (prevButton) prevButton.classList.remove("is-active");
          }
        });

        // Toggle current
        if (isCurrentlyOpen) {
          content.style.maxHeight = null;
          toggle.classList.remove("is-active");
          content.classList.remove("is-open");
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          toggle.classList.add("is-active");
          content.classList.add("is-open");
        }
      });
    });

    // cleanup: remove listeners on unmount
    return () => {
      toggles.forEach((toggle) => {
        // no easy reference to listener removal because we used inline function - acceptable for this UI
      });
    };
  }, []);

  /* -------------------------
     Scroll Animation (IntersectionObserver)
     ------------------------- */
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute("data-delay")) || 0;
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="gradient-bg font-inter text-gray-200">
      <canvas ref={canvasRef} id="particle-canvas" className="fixed top-0 left-0 w-full h-full z-[-1] opacity-50"></canvas>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Air<span className="text-cyan-400">Closet</span>
          </h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#technology" className="hover:text-cyan-400 transition-colors">Technology</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </nav>
          <a href="#cta" className="bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-cyan-400 transition-colors accent-glow">
            Get App
          </a>
        </div>
      </header>

      <main className="pt-24 relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 section-title animate-on-scroll slide-in-from-bottom">Your Closet, Reimagined.</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0 mb-8 animate-on-scroll slide-in-from-bottom" data-delay="150">
                Wake up each morning with a personal assistant that not only helps you look your best but organizes your entire day with confidence.
              </p>
              <div className="flex justify-center md:justify-start gap-4 animate-on-scroll slide-in-from-bottom" data-delay="300">
                <a href="#cta" className="bg-cyan-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-cyan-400 transition-colors accent-glow animate-pulse">Get Early Access</a>
              </div>
            </div>
            <div className="mx-auto max-w-xs md:max-w-sm">
              <div className="bg-gray-900 border-4 border-gray-700 rounded-3xl p-2 shadow-2xl transition hover:rotate-0 hover:scale-105 duration-500 animate-float">
                <img src="https://placehold.co/400x800/1A1A1A/E0E0E0?text=App+Preview" alt="Air Closet App Preview" className="rounded-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-on-scroll slide-in-from-bottom">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight section-title">We Get It. Mornings Can Be Rough.</h3>
            <p className="text-gray-400 mt-2">Life's complicated enough. Your wardrobe shouldn't be.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-bg rounded-2xl p-6 flex items-start gap-4 animate-on-scroll scale-in">
              <Shirt className="text-cyan-400 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg">The "Nothing to Wear" Paradox</h4>
                <p className="text-gray-400 text-sm">A closet full of clothes, but zero inspiration strikes. We've all been there.</p>
              </div>
            </div>
            <div className="card-bg rounded-2xl p-6 flex items-start gap-4 animate-on-scroll scale-in" data-delay="150">
              <CloudSun className="text-cyan-400 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg">The Weather Gamble</h4>
                <p className="text-gray-400 text-sm">Dressing for sunshine, but getting caught in a surprise shower. Classic.</p>
              </div>
            </div>
            <div className="card-bg rounded-2xl p-6 flex items-start gap-4 animate-on-scroll scale-in" data-delay="300">
              <ShoppingCart className="text-cyan-400 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Buyer's Remorse</h4>
                <p className="text-gray-400 text-sm">That online purchase that looked *so good* on the model... but doesn't quite work for you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-on-scroll slide-in-from-bottom">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight section-title">Your Effortless Morning in 3 Steps</h3>
            <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg" className="mx-auto w-48 mt-2">
              <path d="M 5 5 Q 50 10, 100 5 T 195 5" fill="none" stroke="rgba(0, 169, 255, 0.5)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
              <svg width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(0, 169, 255, 0.2)" strokeWidth="2" strokeDasharray="8 8"/></svg>
            </div>

            <div className="text-center animate-on-scroll scale-in relative z-10">
              <div className="card-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-500/50">
                <UserPlus className="w-10 h-10 text-cyan-400" />
              </div>
              <h4 className="font-bold text-lg mb-1">1. Create Your Profile</h4>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">Build your unique fashion DNA by telling us about your style and preferences.</p>
            </div>

            <div className="text-center animate-on-scroll scale-in relative z-10" data-delay="150">
              <div className="card-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-500/50">
                <ScanLine className="w-10 h-10 text-cyan-400" />
              </div>
              <h4 className="font-bold text-lg mb-1">2. Digitize Your Closet</h4>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">Effortlessly scan your clothes. Our AI instantly catalogs each item with smart tags.</p>
            </div>

            <div className="text-center animate-on-scroll scale-in relative z-10" data-delay="300">
              <div className="card-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-500/50">
                <Sparkles className="w-10 h-10 text-cyan-400" />
              </div>
              <h4 className="font-bold text-lg mb-1">3. Receive Your Look</h4>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">Wake up to a perfect, weather-aware outfit suggestion. No more guesswork.</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-on-scroll slide-in-from-bottom">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight section-title">Your New Style Superpowers</h3>
            <p className="text-gray-400 mt-2">Every tool you need to master your personal style.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="0">
              <Camera className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">Digital Wardrobe</h4>
              <p className="text-gray-400 text-sm">Quickly digitize your closet. Our AI automatically tags and organizes every item.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="100">
              <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">AI Outfit Planner</h4>
              <p className="text-gray-400 text-sm">Get daily, weather-aware outfit suggestions based on your items and calendar.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="200">
              <CloudCog className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">Weather-Driven Advice</h4>
              <p className="text-gray-400 text-sm">Get daily personal advice like "wear sunscreen today" based on the local forecast.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="300">
              <Lightbulb className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">"Style My Item"</h4>
              <p className="text-gray-400 text-sm">Pick any piece from your closet and get instant, creative outfit ideas.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="400">
              <ShoppingBag className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">Personalized Shopping</h4>
              <p className="text-gray-400 text-sm">A curated store using 33 personal determinants to match your style, body, and colors.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="500">
              <Palette className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">AI Color Analysis</h4>
              <p className="text-gray-400 text-sm">Discover your perfect color palette for clothes, makeup, and accessories.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="600">
              <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">Trend Analysis</h4>
              <p className="text-gray-400 text-sm">Get insights on emerging trends that fit your personal aesthetic and wardrobe.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="700">
              <Leaf className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">Sustainability Score</h4>
              <p className="text-gray-400 text-sm">Track the eco-friendliness of your wardrobe and get tips for conscious shopping.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="800">
              <PieChart className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">Style Analytics</h4>
              <p className="text-gray-400 text-sm">Finally get the hard data to justify that next shopping trip.</p>
            </div>

            <div className="card-bg rounded-2xl p-6 animate-on-scroll scale-in" data-delay="900">
              <Bot className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-lg mb-1">AI Fashion Chatbots</h4>
              <p className="text-gray-400 text-sm">Your 24/7 style advisors for any fashion emergency or quick question.</p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-on-scroll slide-in-from-left">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight section-title">The Brains Behind the Beauty.</h3>
              <p className="text-gray-400 mt-4 text-lg">
                Air Closet is powered by a proprietary AI core that goes beyond simple algorithms. We've developed a complex system that analyzes fashion at a semantic level.
              </p>
              <div className="mt-8 space-y-4 text-left">
                <div className="flex items-start gap-4"><BoxSelect className="w-6 h-6 text-cyan-400 mt-1" /><div><h4 className="font-semibold">Neural Style Matrix</h4><p className="text-sm text-gray-500">Deconstructs garments into 30+ style vectors, understanding their core aesthetic DNA.</p></div></div>
                <div className="flex items-start gap-4"><Clock className="w-6 h-6 text-cyan-400 mt-1" /><div><h4 className="font-semibold">Predictive Chrono-Analysis</h4><p className="text-sm text-gray-500">Analyzes your calendar and weather patterns to anticipate your needs before you do.</p></div></div>
                <div className="flex items-start gap-4"><GitMerge className="w-6 h-6 text-cyan-400 mt-1" /><div><h4 className="font-semibold">Semantic Wardrobe Graph</h4><p className="text-sm text-gray-500">Builds a relationship map of your clothes, unlocking thousands of potential combinations.</p></div></div>
              </div>
            </div>

            <div className="mx-auto max-w-sm flex items-center justify-center animate-on-scroll slide-in-from-right">
              <svg className="w-full h-auto relative max-w-[250px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "rgba(138, 43, 226, 0.8)" }} />
                    <stop offset="100%" style={{ stopColor: "rgba(0, 169, 255, 0.8)" }} />
                  </linearGradient>
                </defs>

                <circle cx="100" cy="100" r="10" fill="url(#line-gradient)" className="central-node" />
                <g stroke="url(#line-gradient)" strokeWidth="1" className="rotating-line">
                  <line x1="100" y1="50" x2="100" y2="150" opacity="0.6" />
                  <line x1="50" y1="100" x2="150" y2="100" opacity="0.6" />
                  <line x1="70" y1="70" x2="130" y2="130" opacity="0.6" />
                  <line x1="70" y1="130" x2="130" y2="70" opacity="0.6" />
                </g>

                <g fill="url(#line-gradient)">
                  <circle cx="100" cy="20" r="3" className="pulsing-dot" style={{ animationDelay: "0s" }} />
                  <circle cx="180" cy="100" r="3" className="pulsing-dot" style={{ animationDelay: "0.5s" }} />
                  <circle cx="100" cy="180" r="3" className="pulsing-dot" style={{ animationDelay: "1s" }} />
                  <circle cx="20" cy="100" r="3" className="pulsing-dot" style={{ animationDelay: "1.5s" }} />
                </g>

                <path d="M 100,20 Q 150,70 180,100 Q 150,130 100,180 Q 50,130 20,100 Q 50,70 100,20 Z" fill="none" stroke="url(#line-gradient)" strokeWidth="0.7" className="connection-line" />
              </svg>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-on-scroll slide-in-from-bottom">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight section-title">What Our Alpha Users Say.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-bg rounded-2xl p-8 animate-on-scroll slide-in-from-left" data-delay="0">
              <div className="flex items-center mb-4">
                <img src="https://placehold.co/48x48/1A1A1A/E0E0E0?text=A" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500" />
                <div className="flex-grow">
                  <h4 className="font-bold">Alex J.</h4>
                  <p className="text-sm text-gray-500">Busy Professional</p>
                </div>
              </div>
              <p className="text-gray-400 italic">"Air Closet has been a game changer for my mornings. I save so much time and I've never felt more confident."</p>
            </div>

            <div className="card-bg rounded-2xl p-8 animate-on-scroll slide-in-from-right" data-delay="150">
              <div className="flex items-center mb-4">
                <img src="https://placehold.co/48x48/1A1A1A/E0E0E0?text=S" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500" />
                <div className="flex-grow">
                  <h4 className="font-bold">Samantha K.</h4>
                  <p className="text-sm text-gray-500">Fashion Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-400 italic">"The AI actually understands my style. It's like having a personal stylist who just *gets* me. The shopping feature is dangerously good."</p>
            </div>

            <div className="card-bg rounded-2xl p-8 animate-on-scroll slide-in-from-left" data-delay="300">
              <div className="flex items-center mb-4">
                <img src="https://placehold.co/48x48/1A1A1A/E0E0E0?text=M" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500" />
                <div className="flex-grow">
                  <h4 className="font-bold">Mike P.</h4>
                  <p className="text-sm text-gray-500">Efficiency Expert</p>
                </div>
              </div>
              <p className="text-gray-400 italic">"I'm all about efficiency, and this is next level. It's like my brain, but for my closet. Tells me what to wear and if I need an umbrella. Brilliant."</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="container mx-auto px-6 py-16 md:py-24">
          <div className="card-bg rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 flex flex-col sm:flex-row lg:flex-col items-center text-center gap-6">
                <div className="flex-1 animate-on-scroll scale-in" data-delay="0">
                  <a href="https://www.instagram.com/hasan_jabrot206/" target="_blank" rel="noreferrer" className="block group">
                    <img src="https://placehold.co/120x120/1A1A1A/E0E0E0?text=H" alt="Founder Hasan" className="w-28 h-28 rounded-full mx-auto border-4 border-cyan-500/50 group-hover:border-cyan-400 transition-colors" />
                    <div className="mt-4">
                      <h4 className="font-bold text-lg">Hasan</h4>
                      <div className="text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center justify-center gap-1">
                        <Instagram className="w-4 h-4" />
                        <span>@hasan_jabrot206</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="flex-1 animate-on-scroll scale-in" data-delay="150">
                  <a href="https://www.instagram.com/_zainn.27/" target="_blank" rel="noreferrer" className="block group">
                    <img src="https://placehold.co/120x120/1A1A1A/E0E0E0?text=Z" alt="Founder Zain" className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500/50 group-hover:border-purple-400 transition-colors" />
                    <div className="mt-4">
                      <h4 className="font-bold text-lg">Zain</h4>
                      <div className="text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center justify-center gap-1">
                        <Instagram className="w-4 h-4" />
                        <span>@_zainn.27</span>
                      </div>
                    </div>
                  </a>
                </div>

                <p className="text-sm text-gray-400 lg:w-full mt-2 sm:mt-0 animate-on-scroll slide-in-from-bottom" data-delay="300">Founders</p>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight section-title mb-4 animate-on-scroll slide-in-from-right" data-delay="0">Our Mission is Simple.</h3>
                <p className="text-gray-400 mb-4 animate-on-scroll slide-in-from-bottom" data-delay="150">"We started Air Closet because we both felt the same paradox: a closet full of clothes, but that daily struggle of picking an outfit. We knew there had to be a smarter way to get ready, one that was personal and genuinely helpful."</p>
                <p className="text-gray-400 animate-on-scroll slide-in-from-bottom" data-delay="300">"Our goal is to use technology not to replace personal style, but to unlock it. We want to give everyone the confidence that comes from looking their best, so they can focus on what truly matters. That's the human side of our AI—a mission we're passionate about building together."</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12 animate-on-scroll slide-in-from-bottom">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight section-title">Curious Minds Want to Know...</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="card-bg rounded-lg animate-on-scroll slide-in-from-bottom" data-delay="0">
              <button className="faq-toggle w-full flex justify-between items-center text-left p-5 font-semibold gap-4">
                <span>How does the AI learn my style?</span>
                <ChevronDown className="w-5 h-5 transition-transform flex-shrink-0" />
              </button>
              <div className="faq-content max-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-gray-400">Our AI starts with a style quiz and learns from your feedback on recommendations. The more you use Air Closet, the more it understands your preferences, body shape, and the clothes you already own to give hyper-personalized advice.</p>
              </div>
            </div>

            <div className="card-bg rounded-lg animate-on-scroll slide-in-from-bottom" data-delay="150">
              <button className="faq-toggle w-full flex justify-between items-center text-left p-5 font-semibold gap-4">
                <span>Is my personal data kept private?</span>
                <ChevronDown className="w-5 h-5 transition-transform flex-shrink-0" />
              </button>
              <div className="faq-content max-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-gray-400">Absolutely. We use industry-leading security measures to protect your data. Your personal information and style preferences are encrypted and are never shared with third parties without your explicit consent.</p>
              </div>
            </div>

            <div className="card-bg rounded-lg animate-on-scroll slide-in-from-bottom" data-delay="300">
              <button className="faq-toggle w-full flex justify-between items-center text-left p-5 font-semibold gap-4">
                <span>Can it make my friends jealous of my style?</span>
                <ChevronDown className="w-5 h-5 transition-transform flex-shrink-0" />
              </button>
              <div className="faq-content max-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-gray-400">Let's just say we're not responsible for any sudden spikes in your friends asking "Where did you get that?!". The undeniable proof will be in your killer looks.</p>
              </div>
            </div>

            <div className="card-bg rounded-lg animate-on-scroll slide-in-from-bottom" data-delay="450">
              <button className="faq-toggle w-full flex justify-between items-center text-left p-5 font-semibold gap-4">
                <span>Will the AI judge my questionable fashion choices from 2010?</span>
                <ChevronDown className="w-5 h-5 transition-transform flex-shrink-0" />
              </button>
              <div className="faq-content max-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-gray-400">Our AI is programmed for style, not sass. It won't judge, but it *will* gently guide you towards looks that are more 'this decade.' Your secret fashion past is safe with us.</p>
              </div>
            </div>

            <div className="card-bg rounded-lg animate-on-scroll slide-in-from-bottom" data-delay="600">
              <button className="faq-toggle w-full flex justify-between items-center text-left p-5 font-semibold gap-4">
                <span>What platforms will Air Closet be available on?</span>
                <ChevronDown className="w-5 h-5 transition-transform flex-shrink-0" />
              </button>
              <div className="faq-content max-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-gray-400">Air Closet will launch first on iOS and Android. We are exploring a web-based version for the future. Sign up for the waitlist to be notified as soon as it's available on your device!</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="container mx-auto px-6 py-16 md:py-24">
          <div className="card-bg rounded-2xl p-8 md:p-16 text-center animate-on-scroll scale-in">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Ready for a Style Upgrade?</h3>
            <p className="text-gray-400 mt-4 mb-8 max-w-2xl mx-auto">Ready to face each day with confidence? Join us and experience the future of personal style.</p>
            <div className="flex justify-center">
              <a href="#" className="bg-cyan-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-cyan-400 transition-colors accent-glow animate-pulse">Download Now</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="md:col-span-1 sm:col-span-2">
              <h2 className="text-xl font-bold">Air<span className="text-cyan-400">Closet</span></h2>
              <p className="text-sm text-gray-400 mt-2">Your closet, reimagined.</p>
            </div>

            <div>
              <h3 className="font-semibold tracking-wider uppercase">Product</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-400 hover:text-cyan-400 transition-colors">How It Works</a>
                <a href="#technology" className="text-gray-400 hover:text-cyan-400 transition-colors">Technology</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold tracking-wider uppercase">Company</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a href="#mission" className="text-gray-400 hover:text-cyan-400 transition-colors">Our Mission</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
              </div>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="font-semibold tracking-wider uppercase">Follow Us</h3>
              <div className="mt-4 flex justify-center sm:justify-start gap-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Twitter /></a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Instagram /></a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-sm text-gray-500">Crafted with caffeine & code by Hasan & Zain &copy; 2025.</p>
            <div className="flex gap-4 mt-4 sm:mt-0 text-sm">
              <a href="#" className="text-gray-500 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
