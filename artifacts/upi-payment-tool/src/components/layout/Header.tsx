import { Link, useLocation } from "wouter";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Pay Linker Logo SVG */}
          <div className="w-9 h-9 relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4f46e5"/>
                  <stop offset="1" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
              <rect width="36" height="36" rx="10" fill="url(#logoGrad)"/>
              {/* Chain link icon */}
              <path d="M14 13h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 13h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
              <path d="M19 18h-2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg tracking-tight text-foreground">Pay</span>
            <span className="font-extrabold text-lg tracking-tight text-primary -mt-1">Linker</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${location === "/" ? "text-primary" : "text-muted-foreground"}`}
          >
            Generator
          </Link>
          <Link
            href="/templates"
            className={`text-sm font-medium transition-colors hover:text-primary ${location === "/templates" ? "text-primary" : "text-muted-foreground"}`}
          >
            Templates
          </Link>
        </nav>
      </div>
    </header>
  );
}
