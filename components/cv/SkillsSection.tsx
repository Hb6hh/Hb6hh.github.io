"use client";

import { motion } from "framer-motion";
import { Code, Globe, Lock, Database, Terminal, Cpu } from "lucide-react";

const skillGroups = [
  {
    icon: Globe,
    label: "Web Exploitation",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
    skills: ["SQL Injection", "XSS", "CSRF", "SSRF", "Path Traversal", "File Inclusion"],
    level: 80,
  },
  {
    icon: Lock,
    label: "Cryptography",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/30",
    skills: ["AES", "RSA", "Hash Cracking", "Classical Ciphers", "Base encodings", "XOR"],
    level: 75,
  },
  {
    icon: Database,
    label: "Forensics",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    skills: ["Steganography", "File Carving", "Memory Forensics", "Network Pcap", "Metadata"],
    level: 70,
  },
  {
    icon: Terminal,
    label: "Linux & Scripting",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
    skills: ["Bash", "Python", "Linux CLI", "Grep/Sed/Awk", "Netcat", "SSH"],
    level: 85,
  },
  {
    icon: Cpu,
    label: "Binary Exploitation",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    skills: ["Buffer Overflow", "GDB", "Pwntools", "Format Strings", "ROP Chains"],
    level: 55,
  },
  {
    icon: Code,
    label: "Reverse Engineering",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
    skills: ["Ghidra", "x86 Assembly", "Decompilation", "Static Analysis", "Anti-debug"],
    level: 50,
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 md:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-primary text-xs mb-3 tracking-widest uppercase">
            <span className="text-primary">$</span> ls -la skills/
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded" />
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-border rounded-xl p-6 bg-card/50 hover:border-primary/30 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center ${group.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${group.color}`} />
                  </div>
                  <h3 className={`font-mono font-bold text-sm uppercase tracking-widest ${group.color}`}>
                    {group.label}
                  </h3>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-border rounded-full mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${group.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + i * 0.05 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5 bg-background/50 hover:text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
