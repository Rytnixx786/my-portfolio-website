import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 pb-28 md:pb-12 pt-10 sm:px-6 lg:px-8 bg-[#030705] border-t border-white/6 select-none">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-slate-500 font-mono">
        <div className="text-center md:text-left space-y-1">
          <p>© {currentYear} Mehedi Hasan. All rights reserved.</p>
          <p className="text-[11px] text-slate-600">
            CS @ BRAC University · AI & Backend Systems Engineering.
          </p>
        </div>

        {/* Quick Jump Links */}
        <nav aria-label="Footer navigation" className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <Link href="#projects" className="hover:text-primary transition-colors">
            Work
          </Link>
          <Link href="#capabilities" className="hover:text-primary transition-colors">
            Capabilities
          </Link>
          <Link href="#journey" className="hover:text-primary transition-colors">
            Journey
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <a
            href="#top"
            className="flex items-center gap-1 hover:text-primary transition-colors p-1"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </a>
        </nav>

        <div className="flex flex-col items-center md:items-end gap-1">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
              "Engineering Inquiry — Mehedi Hasan"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-400 hover:text-primary transition-colors"
          >
            {profile.email}
          </a>
          <span className="text-[10px] text-slate-600">
            Dhaka, Bangladesh (UTC+6)
          </span>
        </div>
      </div>
    </footer>
  );
}
