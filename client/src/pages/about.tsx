import { motion } from "framer-motion";
import { CheckCircle, Home, Briefcase, TrendingUp, Key, Phone, Globe, Mail, Instagram, Facebook } from "lucide-react";

export default function About() {
  const whyChooseUs = [
    {
      title: "Deep Market Knowledge",
      description: "Insider expertise on trends, regulations, and prime opportunities.",
      icon: TrendingUp
    },
    {
      title: "Tailored Property Matching",
      description: "Personalized searches based on your lifestyle and investment goals.",
      icon: Home
    },
    {
      title: "Skilled Negotiation",
      description: "Securing the best deals in sales, leasing, and acquisitions.",
      icon: Briefcase
    },
    {
      title: "End-to-End Investment Advisory",
      description: "Data-driven strategies for maximum ROI.",
      icon: TrendingUp
    },
    {
      title: "Comprehensive Property Management",
      description: "Hassle-free rental and maintenance solutions.",
      icon: Key
    }
  ];

  const services = [
    {
      title: "Property Search & Acquisition",
      description: "From luxury penthouses to family-friendly villas.",
      icon: Home
    },
    {
      title: "Sales & Leasing",
      description: "Expert deal-making for buyers, sellers, landlords, and tenants.",
      icon: Briefcase
    },
    {
      title: "Investment Consultancy",
      description: "Identifying high-growth opportunities in Dubai's market.",
      icon: TrendingUp
    },
    {
      title: "Property Management",
      description: "Tenant screening, maintenance, and rent collection handled seamlessly.",
      icon: Key
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Best View Properties
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Your Trusted Real Estate Partner in Dubai
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Best View Properties is a leading real estate brokerage in Dubai, specializing in luxury, residential, and commercial properties. With an extensive portfolio tailored to diverse needs, we help buyers, sellers, investors, and tenants navigate Dubai's dynamic market with confidence. Our expert team delivers personalized service, market insights, and seamless transactions to ensure exceptional results.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              "To redefine real estate excellence in Dubai by delivering unparalleled service, innovative solutions, and lasting value for our clients."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              "To empower clients with expert guidance, transparency, and bespoke real estate strategies, helping them achieve their property goals in Dubai's competitive market."
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Why Choose Best View Properties?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Our Services */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-black p-3 rounded-lg text-white">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Our Commitment */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/10 shadow-lg text-center text-black">
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              We build relationships on <strong>trust, integrity, and results</strong>. Whether you're a first-time buyer, expat, or seasoned investor, we provide dedicated support at every step—ensuring a smooth, rewarding real estate experience.
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Your Dream Property Awaits</h3>
            </div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-black text-center mb-8">Get In Touch Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-lg text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-black">Phone</p>
                <p className="text-gray-600">+971 4 552 7359</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-lg text-white">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-black">Website</p>
                <a href="https://bestview.ae" className="text-blue-600 hover:underline">bestview.ae</a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-lg text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-black">Email</p>
                <a href="mailto:info@bestview.ae" className="text-blue-600 hover:underline">info@bestview.ae</a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-lg text-white">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-black">Social Media</p>
                <div className="flex space-x-2 text-sm">
                  <a href="https://www.instagram.com/bestview.ae" className="text-blue-600 hover:underline">Instagram</a>
                  <span className="text-gray-400">|</span>
                  <a href="https://www.facebook.com/bestview.ae" className="text-blue-600 hover:underline">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}