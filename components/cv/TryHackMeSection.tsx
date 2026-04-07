"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, ExternalLink } from "lucide-react";

type ThmData = {
  username: string;
  profile_url: string;
  rank: number | null;
  badges: number | null;
  completed_rooms: number | null;
  points: number | null;
  updated_at: string;
};

const fallback: ThmData = {
  username: "mrhamad",
  profile_url: "https://tryhackme.com/p/mrhamad",
  rank: 119819,
  badges: 17,
  completed_rooms: 90,
  points: null,
  updated_at: new Date().toISOString(),
};

export default function TryHackMeSection() {
  const [data, setData] = useState<ThmData>(fallback);

  useEffect(() => {
    fetch("/tryhackme.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => j && setData(j))
      .catch(() => {});
  }, []);

  const stats = [
    { value: data.rank ?? "—", label: "Rank" },
    { value: data.badges ?? "—", label: "Badges" },
    { value: data.completed_rooms ?? "—", label: "Completed rooms" },
    { value: data.points ?? "—", label: "Points" },
  ];

  return (
    <section id="tryhackme" className="py-24 px-4 md:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-primary text-xs mb-3 tracking-widest uppercase">
            <span className="text-primary">$</span> ./tryhackme --stats
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            TryHackMe <span className="text-primary">Progress</span>
          </h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-border rounded-2xl p-8 bg-card/50 hover:border-primary/30 transition-all duration-300 border-glow"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10">
              <Shield className="w-10 h-10 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-black text-foreground mb-1">{data.username}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                Auto-updated daily from your public TryHackMe profile.
              </p>

              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <a
                  href={data.profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                >
                  View profile <ExternalLink className="w-4 h-4" />
                </a>
                <span className="font-mono text-xs text-muted-foreground">
                  Last update: {new Date(data.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </motion.div>
      </div>
    </section>
  );
}
