import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaWhatsapp,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Truck, 
  Shield, 
  Heart,
  ArrowRight,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      toast.success('Thank you for subscribing! 🥭');
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🥭</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Multani Mango</h3>
                <p className="text-orange-400 text-sm">Fresh & Delicious</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Pakistan's premier online mango marketplace, delivering the finest quality mangoes 
              from the heart of Multan to your doorstep with unmatched freshness and taste.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-sm">+92 308 867 8762</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-sm">hananosama064@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-sm">Multan, Pakistan</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-orange-500 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/', icon: '🏠' },
                { name: 'Products', href: '/products', icon: '🥭' },
                { name: 'About Us', href: '/about', icon: 'ℹ️' },
                { name: 'Contact', href: '/contact', icon: '📞' },
                { name: 'Cart', href: '/cart', icon: '🛒' },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="transition-all duration-300"
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    <span>{link.icon}</span>
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-orange-500 pb-2">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Fast Delivery', icon: Truck, desc: 'Same day delivery' },
                { name: 'Fresh Quality', icon: Shield, desc: '100% fresh guarantee' },
                { name: '24/7 Support', icon: Clock, desc: 'Always here for you' },
                { name: 'Secure Payment', icon: Shield, desc: 'Safe transactions' },
              ].map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <service.icon className="w-4 h-4 text-orange-400" />
                  <div>
                    <div className="text-sm font-medium">{service.name}</div>
                    <div className="text-xs text-gray-400">{service.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-orange-500 pb-2">
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get updates about new mango varieties and special offers!
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-400 text-sm">🎉 Successfully subscribed!</p>
              </div>
            )}

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-300">Follow Us</h5>
              <div className="flex space-x-3">
                {[
                  { icon: FaFacebook, href: "https://web.facebook.com/profile.php?id=61578783943389", color: "hover:text-blue-400" },
                  { icon: FaInstagram, href: "#", color: "hover:text-pink-400" },
                  { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
                  { icon: FaYoutube, href: "#", color: "hover:text-red-400" },
                  { icon: FaWhatsapp, href: "https://wa.me/923088678762?text=Hello! I'm interested in your mangoes.", color: "hover:text-green-400" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} <span className="text-orange-400 font-semibold">Multani Mango</span>. 
              All rights reserved. Made with <Heart className="inline w-4 h-4 text-red-500" /> in Pakistan.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <Link to="/about" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-orange-400 transition-colors">
                Support
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <motion.a
        href="https://wa.me/923088678762?text=Hello! I'm interested in your mangoes."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300"
      >
        <FaWhatsapp className="w-6 h-6" />
      </motion.a>
    </footer>
  );
};

export default Footer;
