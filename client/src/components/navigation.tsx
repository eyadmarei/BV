import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import bvLogo from "@assets/image_1753823499504.png";
import companyName from "@assets/image_1753823659585.png";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/buy-sell", label: "Buy & Sell" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img 
                src={bvLogo} 
                alt="BV Logo" 
                className="h-12"
              />
              <img 
                src={companyName} 
                alt="Best View Properties" 
                className="h-6"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`nav-link text-charcoal hover:text-black font-medium cursor-pointer ${
                  location === link.href ? 'text-black' : ''
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="bg-black text-white hover:bg-charcoal">
                Book Consultation
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-charcoal hover:text-black font-medium px-3 py-2 cursor-pointer block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <Button 
                  className="bg-black text-white hover:bg-charcoal mx-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
