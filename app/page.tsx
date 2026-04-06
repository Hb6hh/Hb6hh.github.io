import NavBar from "@/components/cv/NavBar";
import HeroSection from "@/components/cv/HeroSection";
import AboutSection from "@/components/cv/AboutSection";
import SkillsSection from "@/components/cv/SkillsSection";
import CertificationsSection from "@/components/cv/CertificationsSection";
import CTFSection from "@/components/cv/CTFSection";
import TryHackMeSection from "@/components/cv/TryHackMeSection";
import { getTryHackMeProfile } from "@/lib/tryhackme";

export default async function Home() {
  const thmProfile = await getTryHackMeProfile("mrhamad");

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="scan-line" />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CertificationsSection />
      <CTFSection />
      <TryHackMeSection profile={thmProfile} />
      <footer className="text-center py-10 text-muted-foreground font-mono text-xs border-t border-border mt-10 z-10 relative">
        <span className="text-primary">root@hamad</span>
        <span className="text-muted-foreground">:~# </span>
        <span className="text-foreground/70">echo &quot;Built with passion for security&quot;</span>
        <br />
        <span className="text-primary mt-2 inline-block">© 2026 Hamad — Cybersecurity Portfolio</span>
      </footer>
    </div>
  );
}
