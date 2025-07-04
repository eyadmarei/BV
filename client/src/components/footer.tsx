import { Link } from "wouter";
import { Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="gold">P</span>RESTIGE
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for luxury real estate and comprehensive business services worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Properties</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/properties/villa"><a className="hover:text-yellow-400 transition-colors duration-300">Luxury Villas</a></Link></li>
              <li><Link href="/properties/townhouse"><a className="hover:text-yellow-400 transition-colors duration-300">Modern Townhouses</a></Link></li>
              <li><Link href="/properties/apartment"><a className="hover:text-yellow-400 transition-colors duration-300">Premium Apartments</a></Link></li>
              <li><Link href="/properties"><a className="hover:text-yellow-400 transition-colors duration-300">All Properties</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services"><a className="hover:text-yellow-400 transition-colors duration-300">Company Formation</a></Link></li>
              <li><Link href="/services"><a className="hover:text-yellow-400 transition-colors duration-300">Immigration & Visas</a></Link></li>
              <li><Link href="/services"><a className="hover:text-yellow-400 transition-colors duration-300">Banking Solutions</a></Link></li>
              <li><Link href="/services"><a className="hover:text-yellow-400 transition-colors duration-300">Investment Advisory</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">Book an appointment</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2024 Prestige Properties. All rights reserved.</p>
          <div className="flex space-x-6 text-gray-400 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
