import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MangoGallery from "./MangoGallery";
import FeaturedMangoCard from "./FeaturedMangoCard";
import axios from "axios";
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Heart, 
  ArrowRight,
  Package,
  Users,
  Award
} from "lucide-react";
import { useCart } from './CartContext';

const HomePage = () => {
  const [mangoes, setMangoes] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const HomePageMangoes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/mango/get");
      setMangoes(data?.allData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    HomePageMangoes();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-40 animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-pink-300 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-800 mb-6">
              Fresh Pakistani Mangoes
              <span className="block text-4xl md:text-5xl text-orange-600 mt-2">Delivered to Your Door</span>
            </h1>
            <p className="text-xl md:text-2xl text-yellow-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the authentic taste of premium mangoes from the finest orchards of Pakistan. 
              Sweet, juicy, and delivered fresh to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/about")}
                className="bg-white text-yellow-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-300 hover:border-yellow-400"
              >
                About Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Mangoes?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring you the finest quality mangoes with unmatched freshness and taste
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Premium Quality",
                description: "Hand-picked from the best orchards in Pakistan"
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Same-day delivery in major cities"
              },
              {
                icon: Shield,
                title: "100% Fresh",
                description: "Guaranteed freshness with every order"
              },
              {
                icon: Star,
                title: "Best Prices",
                description: "Competitive prices for premium quality"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "10K+", label: "Happy Customers" },
              { icon: Package, number: "50+", label: "Mango Varieties" },
              { icon: Award, number: "100%", label: "Fresh Quality" },
              { icon: Truck, number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-yellow-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-yellow-50 px-4 md:px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-4">
            Explore Our Mango Collection 🥭
          </h2>
          <p className="text-xl text-yellow-600 max-w-3xl mx-auto">
            Discover the finest varieties of Pakistani mangoes, each with its unique flavor and texture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mangoes?.map((mango, idx) => (
            <motion.div
              key={mango?._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-500 border border-yellow-100"
            >
              <Link to={`/product/${mango?._id}`}>
                <div className="relative group">
                  <img
                    src={mango?.image?.url}
                    alt={mango?.name}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  {/* Overlay Animation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Fresh
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-yellow-800 mb-3 group-hover:text-yellow-600 transition">
                  {mango?.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {mango?.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-yellow-700">
                    Rs. {mango?.price}
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(mango)}
                      className="bg-white border-2 border-yellow-300 hover:border-yellow-400 text-yellow-700 px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate(`/product/${mango._id}`)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <FeaturedMangoCard />
        </div>
      </section>
    </>
  );
};

export default HomePage;
