"use client";

import { motion } from "framer-motion";
import { Trophy, Flag, Globe, Lock, Database, Cpu, Code, Search } from "lucide-react";

const stats = [
  { value: "100+", label: "Challenges Solved" },
  { value: "PicoCTF", label: "Platform" },
  { value: "6+", label: "Categories" },
  { value: "Top %", label: "Ranking" },
];

const categories = [
  { label: "Web Exploitation", icon: Globe, color: "text-primary", bg: "border-primary/30 bg-primary/10" },
  { label: "Cryptography", icon: Lock, color: "text-accent", bg: "border-accent/30 bg-accent/10" },
  { label: "Forensics", icon: Search, color: "text-yellow-400", bg: "border-yellow-400/30 bg-yellow-400/10" },
  { label: "Binary Exploitation", icon: Cpu, color: "text-red-400", bg: "border-red-400/30 bg-red-400/10" },
  { label: "Reverse Engineering", icon: Code, color: "text-purple-400", bg: "border-purple-400/30 bg-purple-400/10" },
  { label: "General Skills", icon: Database, color: "text-blue-400", bg: "border-blue-400/30 bg-blue-400/10" },
];

const highlights = [
  "Solved 100+ challenges across all difficulty levels",
  "Competed in PicoCTF — Carnegie Mellon's premier security competition",
  "Strong performance in Web Exploitation and Cryptography",
  "Demonstrated skills in forensics, binary exploitation, and more",
  "Consistent improvement through iterative problem solving",
];

export default function CTFSection() {
  return (
    <section id="ctf" className="py-24 px-4 md:px-8 bg-secondary/30">
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
            <span className="text-primary">$</span> ./ctf --stats
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            CTF <span className="text-primary">Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded" />
        </motion.div>

        {/* PicoCTF card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-border rounded-2xl p-8 bg-card/50 mb-10 hover:border-primary/30 transition-all duration-300 border-glow"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground mb-1">PicoCTF</h3>
              <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                Competed in PicoCTF — Carnegie Mellon University&apos;s premier cybersecurity competition.
                Solved{" "}
                <span className="text-primary font-bold">100+ challenges</span> spanning web
                exploitation, cryptography, forensics, binary exploitation, and more.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="border border-border rounded-xl p-4 bg-background/50 text-center"
              >
                <p className="font-mono font-black text-2xl text-primary">{stat.value}</p>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Solve rate bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Overall Progress
              </span>
              <span className="font-mono text-xs text-primary">82%</span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "82%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Challenge Categories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className={`border rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300 cursor-default ${cat.bg}`}
                  >
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                    <span
                      className={`font-mono text-xs text-center leading-tight ${cat.color}`}
                    >
                      {cat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Key Highlights
            </p>
            <ul className="space-y-2">
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Flag banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 border border-primary/20 rounded-xl px-6 py-4 bg-primary/5 font-mono text-sm"
        >
          <Flag className="w-4 h-4 text-primary flex-shrink-0" />
          <code className="text-primary/80 text-xs md:text-sm break-all">
            flag&#123;keep_hacking_and_never_stop_learning&#125;
          </code>
        </motion.div>
      </div>
    </section>
  );
}
