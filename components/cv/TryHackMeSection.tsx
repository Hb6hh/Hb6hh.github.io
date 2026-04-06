"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Award, Flame, Target, ExternalLink } from "lucide-react";
import type { TryHackMeProfile } from "@/lib/tryhackme";

interface Props {
  profile: TryHackMeProfile;
}

export default function TryHackMeSection({ profile }: Props) {
  const stats = [
    {
      value: profile.points.toLocaleString(),
      label: "Total Points",
      icon: Zap,
      color: "text-primary",
      border: "border-primary/30 bg-primary/10",
    },
    {
      value: String(profile.roomsCompleted),
      label: "Rooms Completed",
      icon: Target,
      color: "text-accent",
      border: "border-accent/30 bg-accent/10",
    },
    {
      value: String(profile.badgesEarned),
      label: "Badges Earned",
      icon: Award,
      color: "text-yellow-400",
      border: "border-yellow-400/30 bg-yellow-400/10",
    },
    {
      value: profile.streak > 0 ? `${profile.streak}d` : "—",
      label: "Current Streak",
      icon: Flame,
      color: "text-orange-400",
      border: "border-orange-400/30 bg-orange-400/10",
    },
  ];

  const progressPct = Math.min(
    100,
    profile.completedPercentage > 0
      ? profile.completedPercentage
      : profile.roomsCompleted > 0
      ? Math.min(99, profile.roomsCompleted)
      : 0
  );

  return (
    <section id="tryhackme" className="py-24 px-4 md:px-8">
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
            <span className="text-primary">$</span> ./tryhackme --profile{" "}
            {profile.username}
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            TryHackMe <span className="text-primary">Stats</span>
          </h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded" />
        </motion.div>

        {/* Main profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-border rounded-2xl p-8 bg-card/50 mb-10 hover:border-primary/30 transition-all duration-300 border-glow"
        >
          {/* Profile header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground mb-1">
                {profile.username}
              </h3>
              <p className="font-mono text-primary text-sm mb-1">
                Rank:{" "}
                <span className="text-accent font-bold">{profile.rank}</span>
              </p>
              <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                Active on TryHackMe — completing rooms, earning badges, and
                sharpening real-world{" "}
                <span className="text-primary font-bold">
                  offensive &amp; defensive
                </span>{" "}
                security skills.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className={`border rounded-xl p-4 flex flex-col items-center gap-2 ${stat.border}`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <p className={`font-mono font-black text-2xl ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest text-center">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          {progressPct > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Completion Progress
                </span>
                <span className="font-mono text-xs text-primary">
                  {progressPct}%
                </span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="mb-8">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Key Highlights
            </p>
            <ul className="space-y-2">
              {[
                "Actively solving rooms across multiple security domains",
                "Earning badges through hands-on offensive and defensive challenges",
                "Building practical skills in penetration testing and CTF",
                "Consistent progress through real-world lab environments",
              ].map((h, i) => (
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

          {/* View full profile link */}
          <motion.a
            href={`https://tryhackme.com/p/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 border border-primary/30 rounded-xl px-5 py-3 bg-primary/5 font-mono text-sm text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            View Full Profile on TryHackMe
          </motion.a>
        </motion.div>

        {/* Terminal banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 border border-primary/20 rounded-xl px-6 py-4 bg-primary/5 font-mono text-sm"
        >
          <Trophy className="w-4 h-4 text-primary flex-shrink-0" />
          <code className="text-primary/80 text-xs md:text-sm break-all">
            [+] target acquired — keep hacking, stay curious
          </code>
        </motion.div>
      </div>
    </section>
  );
}
