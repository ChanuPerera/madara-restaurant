import Link from "next/link";
import { UtensilsCrossed, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-madara-dark text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-madara-orange/20 border border-madara-orange/40 flex items-center justify-center text-madara-orange mb-6 shadow-glow-orange">
        <UtensilsCrossed className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-white font-serif mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gradient-orange mb-4">Page Not Found</h2>
      <p className="text-sm text-madara-textSecondary max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="btn-primary-orange px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
