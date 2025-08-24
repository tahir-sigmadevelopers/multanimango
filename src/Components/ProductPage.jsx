import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, 
  Package, 
  Star, 
  ShoppingCart, 
  ArrowRight,
  Filter,
  Heart
} from "lucide-react";
import toast from 'react-hot-toast';
import { useCart } from './CartContext';

const ProductPage = () => {
  const [mangoes, setMangoes] = useState([]);
  const [filteredMangoes, setFilteredMangoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const fetchAllMangoes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/api/mango/get");
      setMangoes(data?.allData || []);
      setFilteredMangoes(data?.allData || []);
      toast.success("Products loaded successfully! 🥭");
    } catch (error) {
      console.error("Error fetching mangoes:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMangoes();
  }, []);

  // Filter mangoes based on search term
  useEffect(() => {
    const filtered = mangoes.filter(mango =>
      mango.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mango.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMangoes(filtered);
  }, [searchTerm, mangoes]);

  const handleViewDetails = (mangoId) => {
    navigate(`/product/${mangoId}`);
  };

  const handleAddToCart = (mango) => {
    addToCart(mango);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-yellow-700 text-lg">Loading delicious mangoes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 px-4 md:px-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-orange-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-40 animate-ping"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-800 mb-6">
              Our Mango Collection 🥭
            </h1>
            <p className="text-xl md:text-2xl text-yellow-700 max-w-3xl mx-auto leading-relaxed">
              Discover the finest varieties of Pakistani mangoes, each with its unique flavor and texture
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mangoes by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border-2 border-yellow-200 focus:border-yellow-400 focus:outline-none text-lg"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Filter className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-700 font-medium">
                {filteredMangoes.length} of {mangoes.length} mangoes found
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredMangoes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No mangoes found</h3>
              <p className="text-gray-500 mb-8">
                Try adjusting your search terms or browse all our mangoes
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                View All Mangoes
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMangoes.map((mango, index) => (
                <motion.div
                  key={mango._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-500 border border-yellow-100 group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={mango?.image?.url}
                      alt={mango?.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Fresh
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-red-500" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(4.8)</span>
                    </div>

                    <h3 className="text-xl font-bold text-yellow-800 mb-3 group-hover:text-yellow-600 transition">
                      {mango?.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {mango?.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-yellow-700">
                        Rs. {mango?.price}
                      </p>
                      <div className="text-sm text-gray-500">
                        In Stock
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(mango._id)}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(mango)}
                        className="bg-white border-2 border-yellow-300 hover:border-yellow-400 text-yellow-700 py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
