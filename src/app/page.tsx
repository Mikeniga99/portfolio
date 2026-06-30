import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="bg-black min-h-screen selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Projects />

      {/* Footer simple */}
      <footer className="py-12 border-t border-white/10 bg-black text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} — Créé avec passion</p>
      </footer>
    </div>
  );
}
