"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, CheckCircle } from "lucide-react";

const certifications = [
  {
    name: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    date: "2025",
    status: "Completed",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
    description:
      "Comprehensive program covering threat detection, network security, incident response, and the use of SIEM tools like Chronicle and Splunk.",
    skills: ["SIEM", "Threat Detection", "Network Security", "Incident Response", "Python"],
    link: "#",
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "In Progress",
    status: "In Progress",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/30",
    description:
      "Industry-standard certification covering core security functions and skills required to pursue an IT security career.",
    skills: ["Risk Management", "Cryptography", "Identity Management", "Network Security"],
    link: "#",
  },
  {
    name: "TryHackMe — Pre Security",
    issuer: "TryHackMe",
    date: "2024",
    status: "Completed",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/30",
    description:
      "Hands-on cybersecurity training covering Linux fundamentals, networking, web fundamentals, and basic security concepts.",
    skills: ["Linux", "Networking", "Web Fundamentals", "OSINT"],
    link: "#",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="font-mono text-primary text-xs mb-3 tracking-widest uppercase">
          <span className="text-primary">$</span> cat certifications.json
        </p>
        <h2 className="text-4xl md:text-5xl font-black">
          Certifications &amp; <span className="text-primary">Learning</span>
        </h2>
        <div className="w-16 h-1 bg-primary mt-4 rounded" />
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.article
            key={cert.name}
            aria-label={`${cert.name} — ${cert.issuer}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-border rounded-xl p-6 bg-card/50 hover:border-primary/30 transition-all duration-300 flex flex-col gap-4"
          >
            {/* Icon + title */}
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${cert.bg}`}
              >
                <Award className={`w-6 h-6 ${cert.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-foreground text-base leading-tight mb-1">
                  {cert.name}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border ${
                  cert.status === "Completed"
                    ? "text-primary border-primary/30 bg-primary/10"
                    : "text-accent border-accent/30 bg-accent/10"
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                {cert.status}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{cert.date}</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              {cert.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Link */}
            {cert.link && cert.link !== "#" && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 font-mono text-xs ${cert.color} hover:underline mt-auto`}
              >
                <ExternalLink className="w-3 h-3" />
                View Certificate
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
