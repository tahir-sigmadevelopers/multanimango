// src/NavbarComponents/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Zap, 
  Star, 
  Truck, 
  Shield, 
  Heart, 
  ArrowLeft,
  Package,
  Clock,
  CheckCircle
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  const getOneMangoDetail = async () => {
    try {
      const { data } = await axios.get(`https://multanimango-backend.vercel.app/api/single/${id}`);
      setProduct(data?.singleMango);
      toast.success("Product loaded successfully! 🥭");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    getOneMangoDetail();
  }, []);

  const handleBuyNow = () => {
    addToCart(product);
    toast.success("Added to cart! Redirecting to checkout... 🛒");
    navigate("/user/order");
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!product) return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center"
        >
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <button
            onClick={handleGoBack}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.7 }}
            className="flex justify-center items-center relative group"
          >
            <div className="relative">
              <motion.img
                src={product?.image?.url}
                alt={product?.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-full max-w-lg object-contain rounded-3xl shadow-2xl group-hover:shadow-yellow-300 transition-all duration-300"
              />
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              
              {/* Sale Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                SALE -10%
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                {product?.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(4.8/5 - 127 reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-orange-600">Rs. {product?.price}</span>
                <span className="text-xl text-gray-500 line-through">Rs. {Math.round(product?.price * 1.1)}</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  Save 10%
                </span>
              </div>
              <p className="text-green-600 font-medium text-sm">Free delivery on orders above Rs. 2000</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">Fast Delivery</p>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Secure Payment</p>
                  <p className="text-sm text-gray-600">JazzCash available</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">Quality Assured</p>
                  <p className="text-sm text-gray-600">Fresh & organic</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Clock className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-800">24/7 Support</p>
                  <p className="text-sm text-gray-600">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="font-semibold text-gray-800 mb-3">Why choose our mangoes?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Freshly harvested from premium orchards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  No artificial ripening or chemicals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Hand-picked for perfect ripeness
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Delivered in eco-friendly packaging
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
