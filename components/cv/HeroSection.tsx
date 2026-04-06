"use client";

import { motion } from "framer-motion";
import { ChevronDown, Shield, Terminal } from "lucide-react";

const roles = [
  "Cybersecurity Student",
  "CTF Player",
  "Ethical Hacker",
  "Security Researcher",
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 md:px-8 pt-20"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#00ff7f 1px, transparent 1px), linear-gradient(90deg, #00ff7f 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 hidden md:flex flex-col gap-1 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-1">
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                className="w-1 h-1 rounded-full bg-primary"
                style={{ opacity: (i + j) % 3 === 0 ? 1 : 0.3 }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Terminal prompt line */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-primary/70 mb-6 flex items-center justify-center gap-2"
        >
          <Terminal className="w-4 h-4" />
          <span>root@hamad:~# whoami</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight"
        >
          <span className="text-foreground">Hamad </span>
          <span className="text-primary text-glow">Yazid</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-lg md:text-2xl text-accent mb-8"
        >
          <span className="text-muted-foreground">[</span>
          {roles[0]}
          <span className="text-muted-foreground">]</span>
          <span className="cursor-blink text-primary" />
        </motion.div>

        {/* Bio blurb */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10"
        >
          Passionate about breaking and defending digital systems.
          CTF competitor, security learner, and aspiring professional
          with a focus on web exploitation and cryptography.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          {[
            { value: "100+", label: "CTF Challenges" },
            { value: "6+", label: "Skill Categories" },
            { value: "PicoCTF", label: "Top Platform" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 border border-border rounded-lg px-5 py-3 bg-card/50"
            >
              <span className="font-mono text-xl font-black text-primary">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="flex items-center gap-2 bg-primary text-background font-mono font-bold px-6 py-3 rounded hover:bg-primary/90 transition-all uppercase tracking-widest text-sm"
          >
            <Shield className="w-4 h-4" />
            View Profile
          </a>
          <a
            href="#ctf"
            className="flex items-center gap-2 border border-primary/50 text-primary font-mono font-bold px-6 py-3 rounded hover:bg-primary/10 transition-all uppercase tracking-widest text-sm"
          >
            CTF Achievements
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <span className="font-mono text-xs uppercase tracking-widest">scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
