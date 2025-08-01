import { Link } from "wouter";
import { Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              Best View Properties L.L.C
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg">
              <h4 className="text-lg font-semibold mb-3 text-white">About Us</h4>
              <p className="text-white/90 leading-relaxed">
                Best View Properties is a leading real estate brokerage in Dubai, specializing in luxury, residential, and commercial properties. With an extensive portfolio tailored to diverse needs, we help buyers, sellers, investors, and tenants navigate Dubai's dynamic market with confidence. Our expert team delivers personalized service, market insights, and seamless transactions to ensure exceptional results.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Properties</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/properties/villa"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Luxury Villas</span></Link></li>
              <li><Link href="/properties/townhouse"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Modern Townhouses</span></Link></li>
              <li><Link href="/properties/apartment"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Premium Apartments</span></Link></li>
              <li><Link href="/properties"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">All Properties</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Services</span></Link></li>
              <li><Link href="/about"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">About Us</span></Link></li>
              <li><Link href="/buy-sell"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Buy & Sell</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">Contact</span></Link></li>
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
          <p className="text-gray-400 text-sm">&copy; 2025 Best View Properties L.L.C. All rights reserved.</p>
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
