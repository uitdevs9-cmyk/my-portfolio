"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  login,
  signup,
  oauthLogin,
  handleAuthCallback,
  AuthError,
  MissingIdentityError,
} from "@netlify/identity";
import { motion } from "motion/react";
import { MotionButton, MotionLink, FadeIn } from "@/app/components/motion";

type Mode = "login" | "signup";
type Status = "idle" | "loading";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleAuthCallback()
      .then((result) => {
        if (!result) return;
        switch (result.type) {
          case "oauth":
            setMessage(`Logged in as ${result.user?.email}`);
            break;
          case "confirmation":
            setMessage("Email confirmed. You are now logged in.");
            break;
          case "recovery":
            setMessage("You can now set a new password from your account.");
            break;
        }
      })
      .catch((err) => {
        if (err instanceof AuthError) setError(err.message);
      });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setStatus("loading");

    try {
      if (mode === "login") {
        const user = await login(email, password);
        setMessage(`Welcome back, ${user.name ?? user.email}`);
      } else {
        const user = await signup(email, password, { full_name: name });
        setMessage(
          user.confirmedAt
            ? "Account created. You are now logged in."
            : "Check your email to confirm your account."
        );
      }
    } catch (err) {
      if (err instanceof MissingIdentityError) {
        setError("Identity is not enabled on this site yet.");
      } else if (err instanceof AuthError) {
        setError(
          err.status === 401
            ? "Invalid email or password."
            : err.status === 403
              ? "Signups are not allowed right now."
              : err.message
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setStatus("idle");
    }
  }

  function handleGoogleLogin() {
    oauthLogin("google");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans flex items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb-violet top-[-8rem] left-[-6rem] h-80 w-80 bg-violet-600/25" />
        <div className="ambient-orb ambient-orb-emerald bottom-[-6rem] right-[-8rem] h-96 w-96 bg-emerald-500/15" />
      </div>

      <FadeIn className="relative w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <MotionLink
            href="/"
            className="inline-block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← Back home
          </MotionLink>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-neutral-400">
            {mode === "login"
              ? "Log in to manage your project requests."
              : "Sign up to submit and track project requests."}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <motion.input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                whileFocus={{ scale: 1.01 }}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 disabled:opacity-60"
              />
            )}
            <motion.input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              whileFocus={{ scale: 1.01 }}
              disabled={status === "loading"}
              className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 disabled:opacity-60"
            />
            <motion.input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              whileFocus={{ scale: 1.01 }}
              disabled={status === "loading"}
              className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 disabled:opacity-60"
            />
            <MotionButton
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 font-semibold text-sm text-white rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading"
                ? "Please wait..."
                : mode === "login"
                  ? "Log in"
                  : "Sign up"}
            </MotionButton>
          </form>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <div className="h-px flex-1 bg-white/10" />
            or
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <MotionButton
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-white/20 bg-neutral-900 hover:bg-neutral-800 font-medium text-sm text-white rounded-xl transition-colors"
          >
            Continue with Google
          </MotionButton>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3"
            >
              {message}
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
            >
              {error}
            </motion.p>
          )}
        </div>

        <p className="text-center text-sm text-neutral-400">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setMessage("");
            }}
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </FadeIn>
    </div>
  );
}
