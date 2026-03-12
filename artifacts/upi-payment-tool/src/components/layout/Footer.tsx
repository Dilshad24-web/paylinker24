import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 flex-shrink-0">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4f46e5"/>
                      <stop offset="1" stopColor="#7c3aed"/>
                    </linearGradient>
                  </defs>
                  <rect width="36" height="36" rx="10" fill="url(#footerLogoGrad)"/>
                  <path d="M14 13h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 13h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
                  <path d="M19 18h-2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight">Pay Linker</span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Create professional, shareable UPI payment pages in seconds.
              Free to use, no account needed, works with Google Pay, PhonePe & Paytm.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Questions? <a href="mailto:dilshadansari78606490@gmail.com" className="text-primary hover:underline font-medium">dilshadansari78606490@gmail.com</a>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">UPI Link Generator</Link></li>
              <li><Link href="/templates" className="text-sm text-muted-foreground hover:text-primary transition-colors">Templates Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pay Linker. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            Powered by <span className="font-medium text-foreground ml-1">Firebase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
