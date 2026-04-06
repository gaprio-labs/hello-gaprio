import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, Calendar, ImageIcon } from "lucide-react";

// Upgraded premium placeholder for your graphics
function ImagePlaceholder({ caption }) {
  return (
    <figure className="my-16 flex flex-col items-center group">
      <div className="w-full aspect-video relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-[#0a0a0a] flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 p-6 text-center transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <ImageIcon className="w-10 h-10 mb-4 opacity-40 group-hover:opacity-70 transition-opacity" />
        <p className="text-sm font-medium tracking-wide uppercase">Visual Concept</p>
      </div>
      <figcaption className="mt-5 text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-lg leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-200 selection:bg-zinc-200 dark:selection:bg-zinc-800 font-sans relative">
      
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-zinc-100 dark:bg-zinc-900/30 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Navbar - Standard Flow (Not sticky/fixed) */}
      <nav className="w-full bg-transparent border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2 text-black dark:text-white">
            Gaprio
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-6 py-24 sm:py-32">
        
        <article className="text-[1.125rem] leading-[1.8] tracking-[-0.01em]">
          
          <header className="mb-16 text-center sm:text-left">
            <h1 className="text-4xl sm:text-[3rem] font-bold tracking-tight mb-8 leading-[1.1] text-black dark:text-white">
              The Problem We Couldn't Stop Thinking About
            </h1>
          </header>

          <p className="mb-6">
            There's a moment every knowledge worker knows.
          </p>
          <p className="mb-6">
            You finish a meeting. Everyone nods. Someone says "let's follow up on this." And then you open six different apps trying to figure out who said what, what was decided, and who is actually supposed to do the thing that was supposed to happen.
          </p>
          <p className="mb-6">
            By the time you've found the Slack thread, opened Asana, searched Google Drive for the document, and written the summary email, thirty minutes have gone. And you haven't done a single minute of actual work.
          </p>
          <p className="mb-6">
            We sat with this problem for a long time before we started building anything. And the more we talked to people, project managers, operations leads, startup founders, the more we realized something uncomfortable:
          </p>
          
          <div className="my-12 p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 text-center">
            <p className="font-semibold text-2xl text-black dark:text-white tracking-tight">
              The tools aren't broken. <br className="hidden sm:block"/>The space between the tools is.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-6 text-black dark:text-white tracking-tight">What We Kept Hearing</h2>
          <p className="mb-8">
            We spent weeks going through forums, communities, and conversations with working professionals. Not to validate our idea. To understand the problem. What we heard was consistent, and it was human:
          </p>

          {/* Clean bullet-point list for quotes, no cards */}
          <ul className="list-disc flex flex-col gap-6 my-12 pl-6 sm:pl-10 marker:text-zinc-300 dark:marker:text-zinc-700">
            {[
              "I'm the person at 11pm piecing it all together.",
              "We use Asana, Slack, and Notion. Nothing actually talks to anything.",
              "I spend more time chasing updates than doing the actual work.",
              "We've tried every PM tool. They all solve a slightly different problem than the one we have."
            ].map((quote, i) => (
              <li key={i} className="text-[1.25rem] sm:text-2xl text-zinc-600 dark:text-zinc-400 m-0 leading-snug tracking-tight font-medium pl-2">
                {quote}
              </li>
            ))}
          </ul>

          <p className="mb-6">
            The frustration wasn't with any single tool. People have gotten good at using Slack. They know how to use Asana. The frustration was with what happens between them: the manual coordination, the context that gets lost in translation, the invisible work of stitching everything together that someone always ends up doing, usually the most senior person in the room.
          </p>
          <p className="mb-12">
            Studies put a number on it. Employees lose between 45 and 90 minutes every single day to this kind of work sprawl. For a 100-person company, that's roughly <strong className="text-black dark:text-white font-semibold">$420,000 a year</strong> in productivity that quietly bleeds out. Not from laziness or bad management, but from tools that were never designed to understand each other.
          </p>

          <ImagePlaceholder caption="6 common workplace tools shown as separate islands. A single human figure runs between them. This is how most teams operate today." />

          <h2 className="text-2xl font-bold mt-20 mb-6 text-black dark:text-white tracking-tight">The Idea</h2>
          <p className="mb-6">
            We didn't want to build another tool.
          </p>
          <p className="mb-6">
            The last thing anyone needs is another app in the stack. We were very clear about that from the beginning. So we asked a different question:
          </p>
          
          <blockquote className="border-l-4 border-black dark:border-white pl-6 my-8 py-2">
            <p className="text-xl italic text-black dark:text-white font-medium">
              What if there was something that lived above all the tools. Something that understood what was happening across all of them, and quietly made sure things got done?
            </p>
          </blockquote>

          <p className="mb-6">
            Not a chatbot. Not a dashboard. Not an integration platform.
          </p>
          <p className="mb-12">
            More like a very sharp colleague who reads every conversation, attends every meeting, and always knows exactly what needs to happen next, and actually makes it happen without being asked. That's what we started building. We called it <strong className="text-black dark:text-white font-semibold">Gaprio.</strong>
          </p>

          <h2 className="text-2xl font-bold mt-20 mb-6 text-black dark:text-white tracking-tight">How It Actually Works</h2>
          <p className="mb-8">
            The best way to explain Gaprio is through what currently doesn't happen automatically.
          </p>
          
          {/* Clean text scenario block without heavy backgrounds or dots */}
          <div className="my-10 pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
            <p className="font-semibold text-[0.8rem] text-zinc-400 uppercase tracking-widest mb-2">
              Scenario
            </p>
            <p className="text-black dark:text-white text-lg m-0">
              A manager drops a message in Slack: <em className="text-zinc-500 dark:text-zinc-400">"Can someone draft the proposal for the Kapoor account before Friday?"</em>
            </p>
          </div>

          <p className="mb-6">
            <strong className="text-black dark:text-white font-semibold">Right now:</strong> someone creates a task in Asana (maybe), someone else searches Drive for the last proposal, someone emails the client for context, someone sets a reminder, and on Thursday afternoon someone realizes nobody actually started writing it.
          </p>
          <p className="mb-6">
            <strong className="text-black dark:text-white font-semibold">With Gaprio:</strong> The system reads the Slack message. It understands that this is a formal deliverable, with a deadline, tied to a client. It pulls up the last proposal from Drive, identifies who on the team has worked on similar documents before, and surfaces a single notification:
          </p>
          
          {/* Clean notification block with actual button UI */}
          <div className="my-10 pl-6 border-l-2 border-black dark:border-white">
            <p className="text-black dark:text-white text-lg font-medium leading-relaxed mb-4">
              "Proposal detected for Kapoor account. Should I create the task, assign it, and generate a first draft using your previous proposal as reference?"
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                Approve
              </button>
              <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                Dismiss
              </button>
            </div>
          </div>

          <p className="mb-12">
            One click. Gaprio creates the task, generates the draft in Google Docs, and notifies the right person, all within the tools already being used. Nothing was replaced. No one had to learn a new system. The 45 minutes of coordination work just didn't happen.
          </p>

          <ImagePlaceholder caption="Two-panel comparison. Left: 'Without Gaprio', a tangled flowchart taking 40+ mins. Right: 'With Gaprio', one notification card, under 2 minutes." />

          <h2 className="text-2xl font-bold mt-20 mb-6 text-black dark:text-white tracking-tight">What Makes It Different</h2>
          <p className="mb-6">
            We know what you're thinking, because we've thought it too. <em>Asana has integrations. ClickUp connects to everything. Microsoft Copilot is already inside Teams.</em>
          </p>
          <p className="mb-10">
            All true. But here's the distinction that took us a while to articulate clearly: Those tools connect apps. They push data from one place to another. They let you see your Slack messages inside Asana, or get a notification in Teams when a task is updated.
          </p>
          
          <div className="text-center py-10 border-y border-zinc-200 dark:border-zinc-800 mb-10">
            <p className="text-2xl font-semibold text-black dark:text-white tracking-tight">
              Gaprio doesn't move data. <br className="hidden sm:block text-zinc-400"/>It understands context.
            </p>
          </div>

          <p className="mb-6">
            It knows that the Slack message about "the Kapoor proposal" is the same project as Task #4821 in Asana, the same client as the folder in Drive, and the same deadline discussed in Tuesday's meeting. No other tool builds that picture, because no other tool was designed to.
          </p>
          <p className="mb-12">
            The second thing that's different is that Gaprio is proactive. It doesn't wait to be asked. It notices when a meeting ended with no action items documented and asks if it should create them. It surfaces these moments as simple, one-click suggestions, and nothing executes without a human saying yes. That's the architecture, not a disclaimer.
          </p>

          <ImagePlaceholder caption="Screenshot of the Gaprio dashboard showing the unified view of active tool connections, live activity stream, and suggested actions." />

          <h2 className="text-2xl font-bold mt-20 mb-6 text-black dark:text-white tracking-tight">Who This Is For</h2>
          <p className="mb-6">
            Gaprio is built for organizations where coordination is the invisible job that everyone does and nobody accounts for.
          </p>
          <p className="mb-12">
            If you manage a team across multiple tools and regularly find yourself either chasing updates or being the person who "just keeps track of everything", Gaprio is built around your problem. If you're a founder or operations leader who's tried to solve this with better tooling and found that better tooling isn't actually the answer, we'd especially like to hear from you.
          </p>

          <ImagePlaceholder caption="Gaprio's phased vision: Phase 1 (AI layer) → Phase 2 (Proactive workflows) → Phase 3 (Native features)." />

          <h2 className="text-2xl font-bold mt-20 mb-6 text-black dark:text-white tracking-tight">What We're Asking</h2>
          <p className="mb-10">
            We're running our first wave of market validation right now. We are talking to operations leaders, product managers, and experienced founders. We're not asking you to switch tools, sign up for a product, or commit to anything. We're asking for one of two things, whichever feels right:
          </p>

          {/* Standard rounded-lg CTA Buttons with subtle hover color changes (no scale) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 mt-8">
            <a 
              href="#" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Schedule a 20-min call
            </a>
            <a 
              href="#" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-black dark:text-white border border-zinc-200 dark:border-zinc-800 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Join the waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <footer className="pt-10 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-500 flex flex-col items-center text-center">
            <p className="italic mb-6 max-w-lg">
              Gaprio is being built by a small team that believes the next decade of enterprise software won't be about better tools. It will be about the intelligence layer that finally makes every tool work together. We're building that layer.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-zinc-900 dark:text-zinc-300">Hanu Shashwat</p>
                <p>Founder, Gaprio</p>
              </div>
              <div className="h-10 w-px bg-zinc-300 dark:bg-zinc-800"></div>
              <a href="https://gaprio.in" className="font-medium text-black dark:text-white hover:underline transition-all">
                gaprio.in
              </a>
            </div>
          </footer>

        </article>
      </main>
    </div>
  );
}