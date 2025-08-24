import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  ShoppingCart, 
  ArrowRight, 
  Heart,
  Award,
  Truck,
  Shield
} from "lucide-react";
import { useCart } from './CartContext';

const FeaturedMangoCard = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleViewDetails = () => {
    // Navigate to the first mango product or a specific featured product
    navigate('/products');
  };

  const handleAddToCart = () => {
    // Create a featured mango object for the cart
    const featuredMango = {
      _id: 'featured-sindhri',
      name: 'Sindhri Mango',
      price: 1500,
      description: 'Sindhri is known as the queen of mangoes! Grown in Sindh, it\'s juicy, aromatic, and incredibly sweet.',
      image: {
        url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=600&fit=crop'
      }
    };
    addToCart(featuredMango);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12 my-16 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-orange-300 rounded-full opacity-30 animate-bounce"></div>
      </div>

      {/* Mango Image with Enhanced Hover Effect */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="relative w-full lg:w-1/2"
      >
        <motion.img
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.4 }}
          src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=600&fit=crop"
          alt="Featured Sindhri Mango"
          className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
        />
        
        {/* Image Overlay Badges */}
        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
          <Award className="w-4 h-4" />
          Featured
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors cursor-pointer">
          <Heart className="w-5 h-5 text-red-500" />
        </div>
        
        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">4.9</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-yellow-700 mb-2">
              🌟 Featured: Sindhri Mango 🥭
            </h2>
            <p className="text-lg text-yellow-600 font-semibold">
              The Queen of Mangoes
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-700 leading-relaxed text-lg"
          >
            Sindhri is known as the <span className="font-semibold text-yellow-700">queen of mangoes</span>! 
            Grown in Sindh, it's juicy, aromatic, and incredibly sweet. Perfect for 
            juices, desserts, and enjoying fresh in summer.
          </motion.p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Star, text: "Premium Quality", color: "text-yellow-600" },
              { icon: Truck, text: "Fast Delivery", color: "text-green-600" },
              { icon: Shield, text: "100% Fresh", color: "text-blue-600" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-gray-600">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-yellow-700">Rs. 1,500</span>
              <span className="text-lg text-gray-500 line-through">Rs. 1,800</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                -17%
              </span>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewDetails}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-white border-2 border-yellow-300 hover:border-yellow-400 text-yellow-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
            </div>
          </div>

          {/* Limited Time Offer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">Limited Time Offer!</span>
            </div>
            <p className="text-sm mt-1">Get 17% off on Sindhri Mangoes. Offer ends soon!</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedMangoCard;
