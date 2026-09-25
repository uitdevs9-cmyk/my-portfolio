"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { MotionButton, Reveal } from "@/app/components/motion";

const CONTACT_EMAIL = "uitdevs9@gmail.com";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorText("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    setErrorText("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorText(
        "Email is not configured yet. Set the NEXT_PUBLIC_EMAILJS_* environment variables."
      );
      return;
    }

    const [emailResult] = await Promise.allSettled([
      emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message,
          to_email: CONTACT_EMAIL,
        },
        { publicKey }
      ),
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      }),
    ]);

    if (emailResult.status === "fulfilled") {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
      setErrorText("Something went wrong sending your message. Please try again.");
    }
  }

  return (
    <Reveal as="section" id="contact" className="scroll-mt-28 space-y-8">
      <h2 className="text-2xl font-bold text-white tracking-tight border-b border-white/10 pb-4">
        Let&apos;s build something
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4 text-neutral-400">
          <p>
            Have a project in mind or just want to say hi? Drop a message or
            email directly.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-white/10 bg-neutral-900/50 text-sm text-white"
          >
            Email: <span className="text-violet-400">{CONTACT_EMAIL}</span>
          </motion.div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            whileFocus={{ scale: 1.01 }}
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 disabled:opacity-60"
          />
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            whileFocus={{ scale: 1.01 }}
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 disabled:opacity-60"
          />
          <motion.textarea
            placeholder="Message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            whileFocus={{ scale: 1.01 }}
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 disabled:opacity-60"
          />
          <MotionButton
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 font-semibold text-sm text-white rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </MotionButton>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3"
            >
              Message sent! I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
            >
              {errorText}
            </motion.p>
          )}
        </form>
      </div>
    </Reveal>
  );
}
