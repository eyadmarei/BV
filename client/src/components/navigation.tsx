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
    { href: "/buy-sell", label: "Buy & Sell" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
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
                <span className={`nav-link text-white hover:text-gray-200 font-medium cursor-pointer ${
                  location === link.href ? 'text-gray-200' : ''
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
              className="text-white hover:text-gray-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-white/90 backdrop-blur-sm rounded-b-lg mx-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-black hover:text-gray-700 font-medium px-3 py-2 cursor-pointer block"
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
