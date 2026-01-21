// resources/js/Components/Layout.jsx
import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { createPageUrl } from "@/utils";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const { url } = usePage(); // current Inertia URL
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Highlight active page
  const isActive = (pageName) => {
    return url.startsWith(createPageUrl(pageName));
  };

  const userLogoUrl =
    "https://cdn.prod.website-files.com/68aefaa8e956052ea849f3a1/68b129e1e4c32f155e2e861d_logo%20edited.svg";

  const pages = ["Home", "Browse", "Sell", "Finance", "About", "Contact"];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Custom CSS */}
      <style>{`
        :root {
          --primary-dark: #0a0a0a;
          --secondary-dark: #1a1a1a;
          --accent-red: #d50000;
          --text-primary: #fafafa;
          --text-secondary: #a1a1a1;
          --border-subtle: #2a2a2a;
        }
        body { background-color: var(--primary-dark); color: var(--text-primary); }
        .gradient-red { background: linear-gradient(135deg, var(--accent-red), #e53935); }
        .luxury-shadow { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8); }
        .glass-effect { backdrop-filter: blur(16px); background: rgba(26, 26, 26, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={createPageUrl("Home")} className="flex items-center space-x-3">
            <div className="w-[90px] h-[90px] rounded-full flex items-center justify-center">
              <img src={userLogoUrl} alt="A.B.S Motor Group Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {pages.map((page) => (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive(page) ? "text-red-500" : "text-zinc-300"
                }`}
              >
                {page === "Browse" ? "Browse Stock" : page === "Sell" ? "Sell Your Car" : page}
              </Link>
            ))}
          </div>

          {/* Quick Contact */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              asChild
            >
              <a href="tel:+61394840084">
                <Phone className="w-4 h-4 mr-2" />
                03 9484 0084
              </a>
            </Button>
            <Button size="sm" className="gradient-red text-zinc-50 hover:opacity-90" asChild>
              <Link href={createPageUrl("Contact")}>Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-zinc-300"></div>
              <div className="w-full h-0.5 bg-zinc-300"></div>
              <div className="w-full h-0.5 bg-zinc-300"></div>
            </div>
          </Button>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-900">
            <nav className="container mx-auto px-6 py-4 space-y-3">
              {pages.map((page) => (
                <Link
                  key={page}
                  href={createPageUrl(page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    isActive(page) ? "text-red-500" : "text-zinc-300"
                  }`}
                >
                  {page === "Browse" ? "Browse Stock" : page === "Sell" ? "Sell Your Car" : page}
                </Link>
              ))}
              <div className="pt-3 border-t border-zinc-800">
                <Button size="sm" className="w-full gradient-red text-zinc-50" asChild>
                  <a href="tel:+61394840084">
                    <Phone className="w-4 h-4 mr-2" />
                    03 9484 0084
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {/* ...keep the footer code the same as before... */}
    </div>
  );
}
