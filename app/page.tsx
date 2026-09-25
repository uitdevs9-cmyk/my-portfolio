"use client";

import { motion, MotionConfig } from "motion/react";
import {
  FadeIn,
  MotionCard,
  MotionLink,
  Reveal,
} from "./components/motion";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans selection:bg-violet-500 selection:text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ambient-orb ambient-orb-violet top-[-8rem] left-[-6rem] h-80 w-80 bg-violet-600/25" />
          <div className="ambient-orb ambient-orb-emerald top-[20rem] right-[-8rem] h-96 w-96 bg-emerald-500/15" />
          <div className="ambient-orb ambient-orb-violet bottom-[-6rem] left-1/3 h-72 w-72 bg-fuchsia-500/10" />
        </div>

        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md px-6 py-4"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="font-bold text-lg text-white tracking-wider">
              aaban.dev
            </span>
            <div className="hidden md:flex gap-6 text-sm text-neutral-400">
              <a href="#work" className="hover:text-white transition-colors">
                Work
              </a>
              <a href="#stack" className="hover:text-white transition-colors">
                Stack
              </a>
              <a href="#demos" className="hover:text-white transition-colors">
                Demos
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MotionLink
                href="/login"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Login
              </MotionLink>
              <MotionLink
                href="#contact"
                className="px-4 py-2 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-full transition-colors"
              >
                Hire me
              </MotionLink>
            </div>
          </div>
        </motion.nav>

        <main className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-28">
          <section className="space-y-6 max-w-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for freelance & contract work
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="gradient-name text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                Syed Muhammad Aaban
              </h1>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="text-xl text-neutral-400 leading-relaxed">
                Full-Stack Developer & UI Builder with 2 years of field
                experience. Crafting modern web applications, responsive
                layouts, and performant backends.
              </p>
            </FadeIn>
            <FadeIn delay={0.36} className="flex gap-4 pt-4">
              <MotionLink
                href="#work"
                className="px-6 py-3 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Explore Work
              </MotionLink>
              <MotionLink
                href="#contact"
                className="px-6 py-3 border border-white/20 bg-neutral-900 text-white font-medium text-sm rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Contact Me
              </MotionLink>
            </FadeIn>
          </section>

          <Reveal as="section" id="stack" className="scroll-mt-28 space-y-8" delay={0.05}>
            <h2 className="text-2xl font-bold text-white tracking-tight border-b border-white/10 pb-4">
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MotionCard
                delay={0.05}
                className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm space-y-3"
              >
                <h3 className="font-semibold text-violet-400">Frontend</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  React, Next.js, TypeScript, Tailwind CSS, Framer Motion
                </p>
              </MotionCard>
              <MotionCard
                delay={0.15}
                className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm space-y-3"
              >
                <h3 className="font-semibold text-violet-400">Backend & DB</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Node.js, Express, REST APIs, Supabase, PostgreSQL
                </p>
              </MotionCard>
              <MotionCard
                delay={0.25}
                className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm space-y-3"
              >
                <h3 className="font-semibold text-violet-400">
                  Tools & Workflow
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Git, GitHub, Cursor AI, v0.dev, Vercel
                </p>
              </MotionCard>
            </div>
          </Reveal>

          <Reveal as="section" id="work" className="scroll-mt-28 space-y-8">
            <h2 className="text-2xl font-bold text-white tracking-tight border-b border-white/10 pb-4">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MotionCard
                delay={0.08}
                className="group border border-white/10 rounded-2xl p-6 bg-neutral-900/30 hover:border-violet-500/50 transition-colors space-y-4"
              >
                <span className="text-xs font-mono text-violet-400">
                  College Project
                </span>
                <h3 className="text-xl font-semibold text-white">
                  Student Result Management System
                </h3>
                <p className="text-sm text-neutral-400">
                  Full-stack web application for automated result generation,
                  student record handling, and dynamic data query filters.
                </p>
              </MotionCard>
              <MotionCard
                delay={0.18}
                className="group border border-white/10 rounded-2xl p-6 bg-neutral-900/30 hover:border-violet-500/50 transition-colors space-y-4"
              >
                <span className="text-xs font-mono text-violet-400">
                  Personal Web App
                </span>
                <h3 className="text-xl font-semibold text-white">
                  Expense Tracker & Dashboard
                </h3>
                <p className="text-sm text-neutral-400">
                  Interactive financial tracking tool with categorised budget
                  summaries and Supabase database integration.
                </p>
              </MotionCard>
            </div>
          </Reveal>

          <ContactSection />
        </main>

        <footer className="relative border-t border-white/10 py-8 text-center text-xs text-neutral-500">
          © 2026 Syed Muhammad Aaban Devs. Built with Next.js & Tailwind CSS.
        </footer>
      </div>
    </MotionConfig>
  );
}
