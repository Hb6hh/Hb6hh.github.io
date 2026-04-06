"use client";

import { motion } from "framer-motion";
import { User, MapPin, Mail, Github, Linkedin } from "lucide-react";

const facts = [
  { icon: "🎯", label: "Focus", value: "Cybersecurity & Ethical Hacking" },
  { icon: "🏆", label: "Achievement", value: "100+ CTF challenges solved" },
  { icon: "📚", label: "Currently learning", value: "Reverse Engineering & Pwn" },
  { icon: "⚡", label: "Passion", value: "Breaking things to make them stronger" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="font-mono text-primary text-xs mb-3 tracking-widest uppercase">
          <span className="text-primary">$</span> cat about.txt
        </p>
        <h2 className="text-4xl md:text-5xl font-black">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary mt-4 rounded" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: bio text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground">Hamad Yazid</h3>
              <p className="text-muted-foreground text-sm font-mono">Cybersecurity Enthusiast</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            I&apos;m a cybersecurity enthusiast with a deep passion for understanding
            how systems work — and how they can be broken. My journey started
            with curiosity and has evolved into a focused pursuit of security
            knowledge through hands-on CTF competitions and self-study.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I specialize in web exploitation, cryptography, and forensics.
            Every challenge I solve teaches me something new about the digital
            world and sharpens my ability to think like an attacker — so I can
            defend like a professional.
          </p>

          {/* Contact links */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Somewhere on the internet</span>
            </div>
            <a
              href="mailto:contact@hamadyazid.me"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-mono transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              contact@hamadyazid.me
            </a>
          </div>

          <div className="flex gap-3 mt-4">
            <a
              href="https://github.com/Hb6hh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 text-xs font-mono px-3 py-2 rounded transition-all"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-border text-muted-foreground hover:text-accent hover:border-accent/50 text-xs font-mono px-3 py-2 rounded transition-all"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right: fact cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="border border-border rounded-xl p-4 bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{fact.icon}</div>
              <p className="font-mono text-xs text-primary uppercase tracking-widest mb-1">
                {fact.label}
              </p>
              <p className="text-foreground text-sm font-medium">{fact.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
