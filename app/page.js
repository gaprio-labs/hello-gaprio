import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, Calendar, ImageIcon } from "lucide-react";

// Added a "tall" prop to handle portrait/long images perfectly on mobile
function ImagePlaceholder({ caption, src, tall = false }) {
  return (
    <figure className="my-16 flex flex-col items-center group w-full">
      {/* If tall is true, use aspect-[3/4] for more height. Otherwise use standard aspect-video */}
      <div className={`w-full relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-white/5 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 transition-colors duration-300 hover:border-orange-500/50 ${tall ? 'aspect-[3/4] sm:aspect-[4/5]' : 'aspect-video'}`}>
        
        {src ? (
          <Image 
            src={src} 
            alt={caption} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <ImageIcon className="w-10 h-10 mb-4 opacity-40 group-hover:opacity-100 group-hover:text-orange-500 transition-all duration-300 relative z-10" />
            <p className="text-sm font-semibold tracking-wider uppercase group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors relative z-10">Visual Concept</p>
          </>
        )}

      </div>
      <figcaption className="mt-5 text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-lg leading-relaxed px-4">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    // Clean, flat background with a sweeping radial orange gradient at the very top
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-800 dark:text-zinc-200 selection:bg-orange-100 dark:selection:bg-orange-900/50 font-sans relative overflow-x-hidden">
      
      {/* Background Gradient Layer - strictly for the background */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-white to-white dark:from-orange-900/20 dark:via-[#050505] dark:to-[#050505] -z-10 pointer-events-none"></div>

      {/* Flat, professional Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-white/90 dark:bg-[#050505]/90 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-3 text-zinc-900 dark:text-white">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image 
                src="/logo1.png" 
                alt="Gaprio Logo" 
                fill 
                className="object-contain rounded-md"
                priority
              />
            </div>
            Gaprio
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        
        <article className="text-base sm:text-[1.125rem] leading-[1.8] tracking-[-0.01em]">
          
          <header className="mb-12 sm:mb-16 text-left">
            {/* Solid text colors only */}
            <h1 className="text-4xl sm:text-[3rem] font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.15] text-zinc-900 dark:text-white">
              The Problem We Couldn't Stop Thinking About
            </h1>
          </header>

          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            There's a moment every knowledge worker knows.
          </p>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            You finish a meeting. Everyone nods. Someone says "let's follow up on this." And then you open six different apps trying to figure out who said what, what was decided, and who is actually supposed to do the thing that was supposed to happen.
          </p>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            By the time you've found the Slack thread, opened Asana, searched Google Drive for the document, and written the summary email, thirty minutes have gone. And you haven't done a single minute of actual work.
          </p>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            We sat with this problem for a long time before we started building anything. And the more we talked to people—project managers, operations leads, startup founders—the more we realized something uncomfortable:
          </p>
          
          {/* Highlight Box - Flat design, no shadow */}
          <div className="my-10 sm:my-12 p-6 sm:p-8 rounded-xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-900/50 text-center">
            <p className="font-semibold text-xl sm:text-2xl text-orange-900 dark:text-orange-100 tracking-tight leading-snug">
              The tools aren't broken. <br className="hidden sm:block"/>The space between the tools is.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-6 text-zinc-900 dark:text-white tracking-tight">What We Kept Hearing</h2>
          <p className="mb-8 text-zinc-700 dark:text-zinc-300">
            We spent weeks going through forums, communities, and conversations with working professionals. Not to validate our idea. To understand the problem. What we heard was consistent, and it was human:
          </p>

          <ul className="list-none flex flex-col gap-6 my-10 pl-2 sm:pl-4 border-l-2 border-orange-200 dark:border-orange-900/50">
            {[
              "I'm the person at 11pm piecing it all together.",
              "We use Asana, Slack, and Notion. Nothing actually talks to anything.",
              "I spend more time chasing updates than doing the actual work.",
              "We've tried every PM tool. They all solve a slightly different problem than the one we have."
            ].map((quote, i) => (
              <li key={i} className="text-lg sm:text-xl text-zinc-800 dark:text-zinc-200 m-0 leading-snug tracking-tight font-medium pl-4 relative before:absolute before:left-[-5px] before:top-2 before:w-2 before:h-2 before:bg-orange-500 before:rounded-full">
                "{quote}"
              </li>
            ))}
          </ul>

          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            The frustration wasn't with any single tool. People have gotten good at using Slack. They know how to use Asana. The frustration was with what happens between them: the manual coordination, the context that gets lost in translation, the invisible work of stitching everything together that someone always ends up doing—usually the most senior person in the room.
          </p>
          <p className="mb-12 text-zinc-700 dark:text-zinc-300">
            Studies put a number on it. Employees lose between 45 and 90 minutes every single day to this kind of work sprawl. For a 100-person company, that's roughly <strong className="text-orange-600 dark:text-orange-500 font-semibold">$420,000 a year</strong> in productivity that quietly bleeds out. Not from laziness or bad management, but from tools that were never designed to understand each other.
          </p>

          {/* FIRST IMAGE - tall={true} applied */}
          <ImagePlaceholder 
            src="/img2.jpeg" 
            tall={true}
            caption="6 common workplace tools shown as separate islands. A single human figure runs between them. This is how most teams operate today." 
          />

          <h2 className="text-2xl font-bold mt-16 sm:mt-20 mb-6 text-zinc-900 dark:text-white tracking-tight">The Idea</h2>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            We didn't want to build another tool.
          </p>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            The last thing anyone needs is another app in the stack. We were very clear about that from the beginning. So we asked a different question:
          </p>
          
          {/* Quote Block - Flat design */}
          <blockquote className="border-l-4 border-orange-500 pl-5 sm:pl-6 my-8 py-2 bg-zinc-50 dark:bg-white/5 rounded-r-lg">
            <p className="text-lg sm:text-xl italic text-zinc-900 dark:text-white font-medium">
              What if there was something that lived above all the tools? Something that understood what was happening across all of them, and quietly made sure things got done?
            </p>
          </blockquote>

          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            Not a chatbot. Not a dashboard. Not an integration platform.
          </p>
          <p className="mb-12 text-zinc-700 dark:text-zinc-300">
            More like a very sharp colleague who reads every conversation, attends every meeting, and always knows exactly what needs to happen next—and actually makes it happen without being asked. That's what we started building. We called it <strong className="text-orange-600 dark:text-orange-500 font-bold">Gaprio.</strong>
          </p>

          <h2 className="text-2xl font-bold mt-16 sm:mt-20 mb-6 text-zinc-900 dark:text-white tracking-tight">How It Actually Works</h2>
          <p className="mb-8 text-zinc-700 dark:text-zinc-300">
            The best way to explain Gaprio is through what currently doesn't happen automatically.
          </p>
          
          <div className="my-8 sm:my-10 pl-5 sm:pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
            <p className="font-bold text-[0.75rem] text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-2">
              Scenario
            </p>
            <p className="text-zinc-900 dark:text-white text-lg m-0">
              A manager drops a message in Slack: <em className="text-zinc-500 dark:text-zinc-400">"Can someone draft the proposal for the Kapoor account before Friday?"</em>
            </p>
          </div>

          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white font-semibold">Right now:</strong> someone creates a task in Asana (maybe), someone else searches Drive for the last proposal, someone emails the client for context, someone sets a reminder, and on Thursday afternoon someone realizes nobody actually started writing it.
          </p>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white font-semibold">With Gaprio:</strong> The system reads the Slack message. It understands that this is a formal deliverable, with a deadline, tied to a client. It pulls up the last proposal from Drive, identifies who on the team has worked on similar documents before, and surfaces a single notification:
          </p>
          
          {/* UI Notification Block - Completely Flat, No Shadows */}
          <div className="my-10 p-5 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
            <p className="text-zinc-900 dark:text-white text-base sm:text-lg font-medium leading-relaxed mb-5">
              "Proposal detected for Kapoor account. Should I create the task, assign it, and generate a first draft using your previous proposal as reference?"
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Buttons: FLAT. No shadow, no blur. */}
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors active:scale-95">
                Approve
              </button>
              <button className="px-4 py-2 bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white rounded-lg text-sm font-semibold hover:bg-zinc-300 dark:hover:bg-white/20 transition-colors active:scale-95">
                Edit
              </button>
              <button className="px-4 py-2 bg-transparent text-zinc-500 dark:text-zinc-400 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-white/5 transition-colors">
                Dismiss
              </button>
            </div>
          </div>

          <p className="mb-12 text-zinc-700 dark:text-zinc-300">
            One click. Gaprio creates the task, generates the draft in Google Docs, and notifies the right person, all within the tools already being used. Nothing was replaced. No one had to learn a new system. The 45 minutes of coordination work just didn't happen.
          </p>

          {/* SECOND IMAGE - tall={true} applied */}
          <ImagePlaceholder 
            src="/img5.jpeg" 
            tall={true}
            caption="Two-panel comparison. Left: 'Without Gaprio', a tangled flowchart taking 40+ mins. Right: 'With Gaprio', one notification card, under 2 minutes." 
          />

          <h2 className="text-2xl font-bold mt-16 sm:mt-20 mb-6 text-zinc-900 dark:text-white tracking-tight">What Makes It Different</h2>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            We know what you're thinking, because we've thought it too. <em>Asana has integrations. ClickUp connects to everything. Microsoft Copilot is already inside Teams.</em>
          </p>
          <p className="mb-10 text-zinc-700 dark:text-zinc-300">
            All true. But here's the distinction that took us a while to articulate clearly: Those tools connect apps. They push data from one place to another. They let you see your Slack messages inside Asana, or get a notification in Teams when a task is updated.
          </p>
          
          <div className="text-center py-8 sm:py-10 border-y border-zinc-200 dark:border-zinc-800 mb-10">
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Gaprio doesn't move data. <br className="hidden sm:block text-zinc-500"/>It understands context.
            </p>
          </div>

          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            It knows that the Slack message about "the Kapoor proposal" is the same project as Task #4821 in Asana, the same client as the folder in Drive, and the same deadline discussed in Tuesday's meeting. No other tool builds that picture, because no other tool was designed to.
          </p>
          <p className="mb-12 text-zinc-700 dark:text-zinc-300">
            The second thing that's different is that Gaprio is proactive. It doesn't wait to be asked. It notices when a meeting ended with no action items documented and asks if it should create them. It surfaces these moments as simple, one-click suggestions, and nothing executes without a human saying yes. That's the architecture, not a disclaimer.
          </p>

          {/* THIRD IMAGE - Standard size, tall={false} implicitly */}
          <ImagePlaceholder 
            src="/img8.jpeg" 
            caption="Screenshot of the Gaprio dashboard showing the unified view of active tool connections, live activity stream, and suggested actions." 
          />

          <h2 className="text-2xl font-bold mt-16 sm:mt-20 mb-6 text-zinc-900 dark:text-white tracking-tight">Who This Is For</h2>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300">
            Gaprio is built for organizations where coordination is the invisible job that everyone does and nobody accounts for.
          </p>
          <p className="mb-12 text-zinc-700 dark:text-zinc-300">
            If you manage a team across multiple tools and regularly find yourself either chasing updates or being the person who "just keeps track of everything", Gaprio is built around your problem. If you're a founder or operations leader who's tried to solve this with better tooling and found that better tooling isn't actually the answer, we'd especially like to hear from you.
          </p>

          {/* FOURTH IMAGE - Standard size, tall={false} implicitly */}
          <ImagePlaceholder 
            src="/img3.jpeg" 
            caption="Gaprio's phased vision: Phase 1 (AI layer) → Phase 2 (Proactive workflows) → Phase 3 (Native features)." 
          />

          <h2 className="text-2xl font-bold mt-16 sm:mt-20 mb-6 text-zinc-900 dark:text-white tracking-tight">What We're Asking</h2>
          <p className="mb-10 text-zinc-700 dark:text-zinc-300">
            We're running our first wave of market validation right now. We are talking to operations leaders, product managers, and experienced founders. We're not asking you to switch tools, sign up for a product, or commit to anything. We're asking for one of two things, whichever feels right:
          </p>

          {/* CTA Buttons: FLAT. No shadows, no blur. Solid background colors. */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16 sm:mb-20 mt-8 w-full">
            <a 
              href="#" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-orange-600 transition-colors active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              Schedule a 20-min call
            </a>
            <a 
              href="#" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors active:scale-95 border border-zinc-200 dark:border-transparent"
            >
              Join the waitlist
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <footer className="pt-10 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 flex flex-col items-center text-center">
            <p className="italic mb-8 max-w-lg">
              Gaprio is being built by a small team that believes the next decade of enterprise software won't be about better tools. It will be about the intelligence layer that finally makes every tool work together. We're building that layer.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-zinc-900 dark:text-zinc-200">Hanu Shashwat</p>
                <p>Founder, Gaprio</p>
              </div>
              <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
              <a href="https://gaprio.in" className="font-bold text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 hover:underline transition-colors">
                gaprio.in
              </a>
            </div>
          </footer>

        </article>
      </main>
    </div>
  );
}