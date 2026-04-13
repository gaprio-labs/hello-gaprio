"use client";

import { useEffect, useRef } from "react";
import Image from "next/image"; 
import { ThemeToggle } from "@/components/theme-toggle"; 
import { ArrowRight, Calendar, Layers, Workflow, ArrowUp, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
gsap.registerPlugin(ScrollTrigger);

// Cleaned up: No borders, no shadows, no captions. Just the raw image.
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

export default function Home() {
  const containerRef = useRef(null);

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

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div 
        ref={containerRef} 
        className="relative min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-300 selection:bg-[#FC8B32]/20 overflow-hidden font-sans"
      >
        
        {/* ABSOLUTE GRADIENT: Scrolls away naturally with the page */}
        <div className="absolute top-[-5%] right-[-10%] w-full max-w-[900px] h-[800px] bg-gradient-to-bl from-[#ff5e00] via-[#FC8B32]/60 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* HEADER WRAPPER: Absolute positioning so BOTH Logo and Theme Toggle scroll away naturally */}
        <div className="absolute top-0 left-0 w-full z-50 pt-8 sm:pt-10 pointer-events-none">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="block pointer-events-auto cursor-pointer">
              <Image 
                src="/logo03.png" 
                alt="Gaprio" 
                width={140} 
                height={40} 
                className="block dark:hidden w-auto h-7 sm:h-8" 
                priority 
              />
              <Image 
                src="/logo1.png" 
                alt="Gaprio" 
                width={140} 
                height={40} 
                className="hidden dark:block w-auto h-7 sm:h-8" 
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
            <h1 className="flex flex-col items-start text-[1.75rem] min-[390px]:text-4xl sm:text-5xl md:text-6xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-[1.2] sm:leading-[1.15] mb-6 sm:mb-8 fade-up">
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
                    upvotes: "192",
                    link: "https://www.reddit.com/r/projectmanagement" 
                  },
                  {
                    quote: "The worst offender: just checking Slack/Email...",
                    subreddit: "r/productivity",
                    upvotes: "1.7k",
                    link: "https://www.reddit.com/r/productivity" 
                  },
                  {
                    quote: "Busy for 8 hours but nothing meaningful gets done.",
                    subreddit: "r/productivity",
                    upvotes: "180",
                    link: "https://www.reddit.com/r/productivity" 
                  },
                  {
                    quote: "Tools running the team, not the other way around.",
                    subreddit: "r/projectmanagement",
                    upvotes: "47",
                    link: "https://www.reddit.com/r/projectmanagement" 
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

            <ImagePlaceholder 
              src="/img0002.png" 
              alt="Workplace tools silos"
            />

            <div className="scroll-reveal">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">The Idea</h2>
              <p className="mb-6">
                We didn't want to build another tool. The last thing anyone needs is another app in the stack. We were very clear about that from the beginning. Instead, we asked: What if there was something that lived above all the tools? Something that understood what was happening across all of them, and quietly made sure things got done?
              </p>
              
              <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-zinc-900/20 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 my-10">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FC8B32]"></div>
                {/* <Workflow className="w-6 h-6 text-[#FC8B32] mb-4" /> */}
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

          {/* NAKED CTA SECTION: Buttons updated for a crisp, solid look without shadows/blur */}
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FC8B32] text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-[#e07a2a] transition-colors cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                Schedule 20-min call
              </a>
              <a 
                href="https://www.gaprio.in/waitlist" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-zinc-900 dark:text-white px-8 py-3.5 rounded-xl text-base font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800 py-10 text-center text-sm text-zinc-500 mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
            <p className="italic max-w-lg mx-auto leading-relaxed text-[13px] sm:text-sm">
              Gaprio is being built by a small team that believes the next decade of enterprise software won't be about better tools. It will be about the intelligence layer that finally makes every tool work together. We're building that layer.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-zinc-900 dark:text-zinc-300 font-medium">
              <span>Hanu Shashwat</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              <span>Eklak Alam</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              <span>Abhijeet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FC8B32]"></span>
              <a href="https://gaprio.in" className="hover:text-[#FC8B32] text-zinc-900 dark:text-white font-semibold transition-colors">gaprio.in</a>
            </div>
            <p className="text-xs opacity-60">© 2026 Gaprio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}