"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"; 
import { ThemeToggle } from "@/components/theme-toggle"; 
import { ArrowRight, ArrowUp, Calendar, ExternalLink, Layers, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { motion, useSpring } from "framer-motion";
import { BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const heroTools = [
  { id: 'asana', label: 'Asana', image: '/companylogo/asana.png', x: 1, y: -190, mobileX: 0, mobileY: -130, color: '#ea580c' },
  { id: 'jira', label: 'Jira', image: '/companylogo/jira.png', x: 170, y: -130, mobileX: 95, mobileY: -90, color: '#d97706' },
  { id: 'ms365', label: 'MS 365', image: '/companylogo/microsoft.webp', x: 260, y: 0, mobileX: 135, mobileY: 0, color: '#2563eb' },
  { id: 'clickup', label: 'ClickUp', image: '/companylogo/clickup.png', x: 170, y: 130, mobileX: 95, mobileY: 90, color: '#7c3aed' },
  { id: 'zoho', label: 'Zoho', image: '/companylogo/zoho.png', x: -1, y: 190, mobileX: 0, mobileY: 130, color: '#ef4444' },
  { id: 'google', label: 'Google', image: '/companylogo/google.webp', x: -170, y: 130, mobileX: -95, mobileY: 90, color: '#dc2626' },
  { id: 'slack', label: 'Slack', image: '/companylogo/slack.png', x: -260, y: 0, mobileX: -135, mobileY: 0, color: '#f97316' },
  { id: 'miro', label: 'Miro', image: '/companylogo/miro.png', x: -170, y: -130, mobileX: -95, mobileY: -90, color: '#fbbf24' },
];

// --- COMPONENTS ---
function ImagePlaceholder({ src, alt = "Gaprio Visualization" }) {
  return (
    <div className="my-10 sm:my-14 flex flex-col items-center w-full scroll-reveal">
      {src ? (
        <div className="w-full relative rounded-2xl overflow-hidden bg-transparent">
          <Image 
            src={src} 
            alt={alt} 
            width={1600} 
            height={900} 
            sizes="100vw"
            className="w-full h-auto object-contain block" 
            priority={false} 
          />
        </div>
      ) : (
        <div className="w-full aspect-video relative overflow-hidden rounded-2xl bg-zinc-50/30 dark:bg-[#0a0a0a]/30 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      )}
    </div>
  );
}

// --- DRAGGABLE NODE (INDIVIDUAL CARDS WITH BG) ---
function DraggableNode({ tool, containerRef, isMobile }) {
  const initialX = isMobile ? tool.mobileX : tool.x;
  const initialY = isMobile ? tool.mobileY : tool.y;

  const x = useSpring(initialX, { stiffness: 120, damping: 20 });
  const y = useSpring(initialY, { stiffness: 120, damping: 20 });
  const [pos, setPos] = useState({ x: initialX, y: initialY });

  useEffect(() => {
    x.set(isMobile ? tool.mobileX : tool.x);
    y.set(isMobile ? tool.mobileY : tool.y);
  }, [isMobile, tool.x, tool.y, tool.mobileX, tool.mobileY, x, y]);

  useEffect(() => {
    const unsubX = x.on("change", (v) => setPos((p) => ({ ...p, x: v })));
    const unsubY = y.on("change", (v) => setPos((p) => ({ ...p, y: v })));
    return () => {
      unsubX();
      unsubY();
    };
  }, [x, y]);

  const midX = pos.x / 2;
  const midY = pos.y / 2 + (isMobile ? 25 : 45);
  const gradientId = `gradient-${tool.id}`;

  return (
    <>
      <svg
        className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" className="text-zinc-300 dark:text-zinc-700" stopOpacity="0.3" />
            <stop offset="100%" stopColor={tool.color} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 0 0 Q ${midX} ${midY} ${pos.x} ${pos.y}`}
          stroke={`url(#${gradientId})`}
          strokeWidth={isMobile ? "1.5" : "2.5"}
          strokeLinecap="round"
          fill="none"
          className="opacity-70 transition-opacity duration-300"
        />
      </svg>

      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        dragMomentum={false}
        style={{ x, y }}
        whileHover={{ cursor: "grab"}}
        whileDrag={{ scale: 1.15, cursor: "grabbing", zIndex: 100 }}
        className="group absolute w-[60px] h-[60px] md:w-20 md:h-20 bg-white dark:bg-[#121212] rounded-2xl md:rounded-[1.5rem] flex flex-col items-center justify-center shadow-md dark:shadow-2xl z-20 border border-zinc-200 dark:border-white/5 backdrop-blur-md touch-none select-none overflow-hidden"
      >
        {/* Glow Border on Hover */}
        <div className="absolute inset-0 rounded-2xl md:rounded-[1.5rem] bg-gradient-to-tr from-black/5 dark:from-white/5 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 rounded-2xl md:rounded-[1.5rem]  transition-colors duration-300 pointer-events-none opacity-50"
          style={{ borderColor: tool.color + "60", color: tool.color }}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
          <div className="relative w-6 h-6 md:w-8 md:h-8 mb-1 pointer-events-none select-none transition-transform duration-300 ">
            <Image
              src={tool.image}
              alt={tool.label}
              fill
              draggable={false}
              className="object-contain"
            />
          </div>
          <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest pointer-events-none select-none transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
            {tool.label}
          </span>
        </div>
      </motion.div>
    </>
  );
}

// --- TEAM SOCIALS HELPER (UPGRADED UI) ---
// --- TEAM SOCIALS HELPER (UPGRADED UI) ---
function TeamMember({ name, role, linkedin, mail }) {
  return (
    <li className="flex items-center justify-between group p-3 -mx-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-white/10">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-zinc-900 dark:text-white">{name}</span>
        <span className="text-[10px] text-[#FC8B32] font-bold uppercase tracking-widest mt-0.5">{role}</span>
      </div>
      <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-7 h-7 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-[#FC8B32] hover:border-[#FC8B32] rounded-md shadow-sm transition-all hover:-translate-y-0.5">
            <BsLinkedin className="w-3 h-3" />
          </a>
        )}
        {mail && (
          <a href={`mailto:${mail}`} className="flex items-center justify-center w-7 h-7 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-[#FC8B32] hover:border-[#FC8B32] rounded-md shadow-sm transition-all hover:-translate-y-0.5">
            <Mail className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </li>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-up",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.1 }
      );

      const scrollElements = gsap.utils.toArray(".scroll-reveal");
      scrollElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div 
        ref={containerRef} 
        className="relative min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-300 selection:bg-[#FC8B32]/20 overflow-hidden font-sans"
      >
        
        {/* TOP ABSOLUTE GRADIENT */}
        <div className="absolute top-[-5%] right-[-10%] w-full max-w-[900px] h-[800px] bg-gradient-to-bl from-[#ff5e00] via-[#FC8B32]/60 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* HEADER WRAPPER */}
        <div className="absolute top-0 left-0 w-full z-50 pt-8 sm:pt-10 pointer-events-none">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="block pointer-events-auto cursor-pointer">
              {/* Light Mode Logo */}
              <Image 
                src="/logo001black.png" 
                alt="Gaprio" 
                width={180} 
                height={48} 
                className="block dark:hidden w-auto h-9 sm:h-11" 
                priority 
              />
              {/* Dark Mode Logo */}
              <Image 
                src="/logo001white.png" 
                alt="Gaprio" 
                width={180} 
                height={48} 
                className="hidden dark:block w-auto h-9 sm:h-11" 
                priority 
              />
            </a>
            
            {/* Theme Toggle */}
            <div className="pointer-events-auto cursor-pointer">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <main className="relative z-10 pt-32 pb-24">
          
          {/* Left-Aligned Hero Section */}
          <section className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-start text-left mb-16 sm:mb-20">
            <h1 className="flex flex-col items-start text-[clamp(1.5rem,7.5vw,3rem)] sm:text-5xl md:text-6xl font-semibold text-zinc-900 dark:text-white tracking-tighter sm:tracking-tight leading-[1.1] mb-6 sm:mb-8 fade-up w-full overflow-visible">
              <span className="block whitespace-nowrap">Stop managing your tools.</span>
              <span className="block text-[#FC8B32] whitespace-nowrap mt-1 sm:mt-2">Start doing actual work.</span>
            </h1>
            
            <div className="w-full max-w-2xl flex flex-col items-start space-y-4 sm:space-y-6 fade-up">
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-[1.7] sm:leading-[1.8] text-left text-balance font-medium">
                There's a moment every knowledge worker knows.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-[1.7] sm:leading-[1.8] text-left text-balance">
                You finish a meeting. Everyone nods. Someone says "let's follow up on this." And then you open six different apps trying to figure out who said what, what was decided, and who is actually supposed to do the thing that was supposed to happen.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-[1.7] sm:leading-[1.8] text-left text-balance">
                By the time you've found the Slack thread, opened Asana, searched Google Drive, and written the summary email, <span className="text-zinc-700 dark:text-zinc-300 font-medium">thirty minutes have gone.</span> And you haven't done a single minute of actual work.
              </p>
            </div>
          </section>

          {/* Clean Narrative Container */}
          <section className="max-w-3xl mx-auto px-4 sm:px-6 text-base md:text-lg leading-[1.7] space-y-12">
            
            <div className="scroll-reveal">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">What We Kept Hearing</h2>
              <p className="mb-8">
                We spent weeks going through forums, communities, and conversations with working professionals. Not to validate our idea. To understand the problem. What we heard was consistent, and it was human:
              </p>

              {/* Interactive Social Proof Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10">
                {[
                  {
                    quote: "Devs side-slacking me... piecing it all together at 11pm.",
                    subreddit: "r/projectmanagement",
                    upvotes: "196",
                    link: "https://www.reddit.com/r/projectmanagement/comments/1lzjqts/when_did_project_management_become_shouldering/" 
                  },
                  {
                    quote: "The worst offender: just checking Slack/Email...",
                    subreddit: "r/productivity",
                    upvotes: "1.8k",
                    link: "https://www.reddit.com/r/productivity/comments/1nwpxac/i_tracked_every_distraction_i_had_for_7_days_here/" 
                  },
                  {
                    quote: "Busy for 8 hours but nothing meaningful gets done.",
                    subreddit: "r/productivity",
                    upvotes: "184",
                    link: "https://www.reddit.com/r/productivity/comments/1obipxi/you_ever_have_a_day_where_youre_busy_for_8_hours/" 
                  },
                  {
                    quote: "Tools running the team, not the other way around.",
                    subreddit: "r/projectmanagement",
                    upvotes: "77",
                    link: "https://www.reddit.com/r/projectmanagement/comments/1l8rfav/is_anyone_else_lowkey_burned_out_on_toolfirst/" 
                  }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="group relative p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#FC8B32]/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FC8B32]/0 to-[#FC8B32]/[0.03] dark:to-[#FC8B32]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 pt-2">
                      <p className="text-[12px] sm:text-base font-medium text-zinc-800 dark:text-zinc-200 leading-snug sm:leading-relaxed mb-4 sm:mb-6">
                        "{item.quote}"
                      </p>
                    </div>
                    
                    <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2.5 pt-3 sm:pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#ff4500]/10 flex-shrink-0">
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff4500] fill-current"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.508 1.183-.849 2.863-1.428 4.714-1.488l.86-4.029c.032-.147.163-.25.313-.254l2.96-.624.004-.001a1.25 1.25 0 0 1 1.17-1.614zM10.932 15.688c0 .484.536.877 1.196.877s1.196-.393 1.196-.877c0-.485-.536-.877-1.196-.877s-1.196.392-1.196.877zm-3.176 0c0 .484.536.877 1.196.877s1.196-.393 1.196-.877c0-.485-.536-.877-1.196-.877s-1.196.392-1.196.877zm6.758-1.503c-.636 1.21-2.022 1.847-3.514 1.847-1.492 0-2.878-.637-3.514-1.847-.116-.222.045-.487.304-.487h6.42c.26 0 .42.265.304.487z"/></svg>
                        </div>
                        <span className="text-[9px] sm:text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 truncate max-w-[90px] sm:max-w-none">{item.subreddit}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-4 w-full xl:w-auto justify-between xl:justify-end">
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400">
                          <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ff4500]" />
                          {item.upvotes}
                        </div>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-zinc-400 dark:text-zinc-500 hover:text-[#FC8B32] transition-colors relative z-20 cursor-pointer"
                        >
                          Learn more
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="mb-6">
                The frustration wasn't with any single tool. People have gotten good at using Slack. They know how to use Asana. The frustration was with what happens between them: the manual coordination, the context that gets lost in translation, the invisible work of stitching everything together.
              </p>
              <p>
                Studies put a number on it. Employees lose between 45 and 90 minutes every single day to this kind of work sprawl. For a 100-person company, that's roughly <strong className="text-zinc-900 dark:text-white font-semibold">$420,000 a year</strong> in productivity that quietly bleeds out.
              </p>
            </div>

            {/* REAL INTERACTIVE MAP (Map is transparent, cards have BG) */}
            <div className="my-10 sm:my-14 scroll-reveal">
              <div
                ref={mapContainerRef}
                className="relative w-full h-[400px] md:h-[550px] flex items-center justify-center z-20 cursor-crosshair touch-none select-none overflow-hidden bg-transparent border-none"
              >
                {/* Central Hub */}
                <div className="relative z-30 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-28 h-28 md:w-40 md:h-40 bg-[#FC8B32]/20 blur-[40px] md:blur-[60px] rounded-full animate-pulse" />
                  
                  <div className="relative w-20 h-20 md:w-28 md:h-28 bg-white dark:bg-[#0a0a0a] rounded-full border border-zinc-200 dark:border-zinc-800 shadow-[0_0_50px_-10px_rgba(252,139,50,0.3)] flex items-center justify-center ring-1 ring-zinc-100 dark:ring-white/10">
                    <div className="absolute inset-0 rounded-full border border-[#FC8B32]/30 animate-[ping_3s_linear_infinite]" />
                    <div className="absolute inset-2 md:inset-4 rounded-full border border-[#FC8B32]/20 animate-[ping_3s_linear_infinite_1s]" />
                    
                    <div className="relative w-10 h-10 md:w-14 md:h-14">
                      {/* Logo changes automatically by overriding via tailwind classes */}
                      <Image
                        src="/logo03.png"
                        alt="Gaprio"
                        fill
                        className="object-contain block dark:hidden"
                      />
                      <Image
                        src="/logo1.png"
                        alt="Gaprio"
                        fill
                        className="object-contain hidden dark:block"
                      />
                    </div>
                  </div>
                </div>

                {/* Render Interactive Nodes */}
                {heroTools.map((tool) => (
                  <DraggableNode
                    key={tool.id}
                    tool={tool}
                    containerRef={mapContainerRef}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>

            <div className="scroll-reveal">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">The Idea</h2>
              <p className="mb-6">
                We didn't want to build another tool. The last thing anyone needs is another app in the stack. We were very clear about that from the beginning. Instead, we asked: What if there was something that lived above all the tools? Something that understood what was happening across all of them, and quietly made sure things got done?
              </p>
              
              <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 my-10">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FC8B32]"></div>
                <p className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">
                  Not a chatbot. Not a dashboard. Not an integration platform. Gaprio acts as a very sharp colleague, an interactive neural mesh, that reads conversations, attends meetings, and always knows exactly what needs to happen next.
                </p>
              </div>
            </div>

            <div className="scroll-reveal">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">How It Actually Works</h2>
              <p className="mb-6">
                The best way to explain Gaprio is through what currently doesn't happen automatically.
              </p>

              <div className="my-8 pl-4 sm:pl-5 border-l-2 border-zinc-200 dark:border-zinc-800">
                <p className="font-bold text-[10px] sm:text-xs text-[#FC8B32] uppercase tracking-widest mb-1.5">Scenario</p>
                <p className="text-zinc-900 dark:text-white text-base sm:text-lg m-0 font-medium">
                  A manager drops a message in Slack: <em className="text-zinc-500 dark:text-zinc-400 font-normal">"Can someone draft the proposal for the Kapoor account before Friday?"</em>
                </p>
              </div>

              <p className="mb-6">
                <strong className="text-zinc-900 dark:text-white font-semibold">Right now:</strong> someone creates a task in Asana (maybe), someone else searches Drive for the last proposal, someone emails the client for context, someone sets a reminder, and on Thursday afternoon someone realizes nobody actually started writing it.
              </p>
              <p className="mb-8">
                <strong className="text-zinc-900 dark:text-white font-semibold">With Gaprio:</strong> The system reads the Slack message. It understands that this is a formal deliverable, with a deadline, tied to a client. It pulls up the last proposal from Drive, identifies who on the team has worked on similar documents before, and surfaces a single notification:
              </p>

              <div className="p-5 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f0f0f] shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="w-8 h-8 rounded-md bg-[#FC8B32]/10 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4 text-[#FC8B32]" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">Gaprio Intelligence</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  "Proposal detected for Kapoor account. Should I create the task, assign it, and generate a first draft using your previous proposal as reference?"
                </p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <button className="px-4 py-2 bg-[#FC8B32] text-white rounded-md text-sm font-medium hover:bg-[#e07a2a] transition-colors cursor-pointer">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-transparent text-zinc-500 rounded-md text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                    Dismiss
                  </button>
                </div>
              </div>

              <p>
                One click. Gaprio creates the task, generates the draft in Google Docs, and notifies the right person, all within the tools already being used. The 45 minutes of coordination work just didn't happen.
              </p>
            </div>
            
            <ImagePlaceholder 
              src="/img0003.png" 
              alt="Gaprio execution comparison"
            />

            <div className="scroll-reveal">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">What Makes It Different</h2>
              <p className="mb-6">
                We know what you're thinking. <em className="text-zinc-800 dark:text-zinc-200">Asana has integrations. ClickUp connects to everything. Microsoft Copilot is already inside Teams.</em>
              </p>
              <p className="mb-8">
                Those tools connect apps. They push data from one place to another. They let you see your Slack messages inside Asana. <strong>Gaprio doesn't move data. It understands context.</strong>
              </p>
              <p className="mb-8">
                It knows that the Slack message about "the Kapoor proposal" is the same project as Task #4821 in Asana, the same client as the folder in Drive, and the same deadline discussed in Tuesday's meeting. No other tool builds that picture, because no other tool was designed to.
              </p>
            </div>

            <ImagePlaceholder 
              src="/img8.jpeg" 
              alt="Gaprio dashboard screenshot"
            />

            <div className="scroll-reveal">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">Who This Is For</h2>
              <p className="mb-6">
                Gaprio is built for organizations where coordination is the invisible job that everyone does and nobody accounts for.
              </p>
              <p>
                If you manage a team across multiple tools and regularly find yourself either chasing updates or being the person who "just keeps track of everything", Gaprio is built around your problem.
              </p>
            </div>

            <ImagePlaceholder 
              src="/img3.jpeg" 
              alt="Gaprio phased vision timeline"
            />

          </section>

          {/* NAKED CTA SECTION */}
          <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-20 sm:mt-24 scroll-reveal text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              What We're Asking
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
              We're running our first wave of market validation. We are talking to operations leaders, product managers, and experienced founders. We're not asking you to switch tools. Let's have a quick chat to see if we can solve your biggest operational headache.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a 
                href="https://calendly.com/gaprio-management/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FC8B32] text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-[#e07a2a] transition-colors cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                Schedule 20-min call
              </a>
              <a 
                href="https://www.gaprio.in/waitlist" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-zinc-900 dark:text-white px-8 py-3.5 rounded-xl text-base font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
        </main>

        {/* --- PREMIUM SAAS FOOTER WITH ORANGE GLOW & BACK TO TOP --- */}
        <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800 bg-[#fafafa] dark:bg-[#050505] pt-16 pb-8 overflow-hidden">
          
          {/* HUGE BOTTOM GRADIENT GLOW TO MATCH TOP */}
          <div className="absolute bottom-[-20%] left-[-10%] w-full max-w-[800px] h-[600px] bg-gradient-to-tr from-[#ff5e00] via-[#FC8B32]/30 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Top Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-16">
              
              {/* Brand Column */}
              <div className="md:col-span-5 lg:col-span-6 flex flex-col items-start text-left">
                <a href="/" className="mb-6 block">
                  <Image src="/logo001black.png" alt="Gaprio" width={160} height={40} className="block dark:hidden w-auto h-8 sm:h-9" priority />
                  <Image src="/logo001white.png" alt="Gaprio" width={160} height={40} className="hidden dark:block w-auto h-8 sm:h-9" priority />
                </a>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm mb-8">
                  Gaprio acts as an interactive neural mesh that reads conversations, attends meetings, and always knows exactly what needs to happen next. The intelligence layer for your stack.
                </p>
                <div className="flex items-center gap-4">
                  {/* <a href="https://twitter.com/gaprio" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-[#FC8B32] dark:hover:bg-[#FC8B32] hover:border-[#FC8B32] rounded-full transition-all duration-300 hover:-translate-y-0.5">
                    <BsTwitterX className="w-4 h-4" />
                  </a> */}
                  <a href="https://linkedin.com/company/gaprio" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-[#FC8B32] dark:hover:bg-[#FC8B32] hover:border-[#FC8B32] rounded-full transition-all duration-300 hover:-translate-y-0.5">
                    <BsLinkedin className="w-4 h-4" />
                  </a>
                  {/* <a href="https://instagram.com/gaprio" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-[#FC8B32] dark:hover:bg-[#FC8B32] hover:border-[#FC8B32] rounded-full transition-all duration-300 hover:-translate-y-0.5">
                    <BsInstagram className="w-4 h-4" />
                  </a> */}
                  <a href="mailto:gaprio.management@gmail.com" className="p-2 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-[#FC8B32] dark:hover:bg-[#FC8B32] hover:border-[#FC8B32] rounded-full transition-all duration-300 hover:-translate-y-0.5">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Founding Team Column */}
              <div className="md:col-span-4 lg:col-span-3">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest">Founding Team</h4>
                <ul className="space-y-2">
                  <ul className="space-y-2">
                  <TeamMember 
                    name="Hanu Shashwat" 
                    role="CEO" 
                    linkedin="https://www.linkedin.com/in/hanushashwat/"
                    mail="hanushashwat733@gmail.com" 
                  />
                  <TeamMember 
                    name="Eklak Alam" 
                    role="CTO" 
                    linkedin="http://linkedin.com/in/eklak-alam" 
                    mail="eklakalam420@gmail.com" 
                  />
                  <TeamMember 
                    name="Abhijeet" 
                    role="CAIO" 
                    linkedin="https://www.linkedin.com/in/abhx09/" 
                    mail="abhx09.singh@gmail.com" 
                  />
                </ul>
                </ul>
              </div>

              {/* Navigation Links Column */}
              <div className="md:col-span-3 lg:col-span-3">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest">Product</h4>
                <ul className="space-y-3">
                  <li><a href="https://www.gaprio.in/waitlist" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#FC8B32] dark:hover:text-[#FC8B32] transition-colors cursor-pointer font-medium">Join Waitlist</a></li>
                  <li><a href="https://calendly.com/gaprio-management/30min" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#FC8B32] dark:hover:text-[#FC8B32] transition-colors cursor-pointer font-medium">Schedule a Call</a></li>
                  {/* Fixed the mailto link here */}
                  <li><a href="mailto:gaprio.management@gmail.com" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#FC8B32] dark:hover:text-[#FC8B32] transition-colors cursor-pointer font-medium">Contact Us</a></li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar with Back to Top */}
            <div className="border-t border-zinc-200 dark:border-zinc-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-500 font-medium">© 2026 Gaprio.</p>
                {/* <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-widest">Systems Operational</span>
                </div> */}
              </div>

              <button 
                onClick={scrollToTop} 
                className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm hover:border-[#FC8B32] dark:hover:border-[#FC8B32] hover:text-[#FC8B32] dark:hover:text-[#FC8B32] text-zinc-600 dark:text-zinc-400 transition-all duration-300 cursor-pointer"
                aria-label="Scroll to top"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}