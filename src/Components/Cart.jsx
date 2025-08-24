import React, { useEffect } from 'react';
import { Trash2, ShoppingBag, ArrowLeft, Truck, Shield, CreditCard } from 'lucide-react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 500;
  const total = subtotal + shippingFee;

  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId, itemName) => {
    removeFromCart(itemId);
    toast.success(`${itemName} removed from cart! 🗑️`);
  };

  const handleUpdateQuantity = (itemId, newQuantity, itemName) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    if (newQuantity > 10) {
      toast.error("Maximum quantity allowed is 10");
      return;
    }
    updateQuantity(itemId, newQuantity);
    if (newQuantity > 1) {
      toast.success(`Updated ${itemName} quantity to ${newQuantity} 🛒`);
    } else {
      toast.success(`Updated ${itemName} quantity to ${newQuantity} 🛒`);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add some items first!");
      return;
    }
    toast.success("Redirecting to checkout... 🛒");
    navigate("/user/order");
  };

  const handleContinueShopping = () => {
    toast.success("Happy shopping! 🥭");
    navigate("/");
  };

  // Show welcome message when cart has items
  useEffect(() => {
    if (cartItems.length > 0) {
      toast.success(`Welcome back! You have ${totalItems} items in your cart 🛒`);
    }
  }, []);
  
  return (
    <div className="min-h-screen md:pt-28 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Shopping Cart
              <span className="text-orange-600 ml-2">({totalItems} {totalItems === 1 ? "item" : "items"})</span>
            </h1>
          </div>
          <button
            onClick={handleContinueShopping}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any delicious mangoes yet!</p>
            <button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Shopping 🥭
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-4"
            >
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative"
                        >
                          <img 
                            src={item?.image?.url} 
                            alt={item.title} 
                            className="w-24 h-24 object-cover rounded-xl shadow-md" 
                          />
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              SALE
                            </div>
                          )}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-gray-500 line-through text-sm">Rs. {item.originalPrice}</p>
                              <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full font-semibold">
                                -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                              </span>
                            </div>
                          )}
                          <p className="text-orange-600 font-bold text-xl">Rs. {item.price}</p>
                          {item.variation && (
                            <p className="text-sm text-gray-500 mt-1">Variation: {item.variation}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1, item.title)} 
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors font-bold text-gray-600"
                          >
                            −
                          </motion.button>
                          <span className="min-w-[2rem] text-center font-semibold text-gray-800">{item.quantity}</span>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1, item.title)} 
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors font-bold text-gray-600"
                          >
                            +
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">Rs. {item.price * item.quantity}</p>
                          <p className="text-sm text-gray-500">Rs. {item.price} each</p>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveFromCart(item._id, item.title)} 
                          className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Right: Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-1/3"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-gray-800">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="font-semibold text-gray-800">Rs. {shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg px-3">
                    <span className="font-bold text-lg text-gray-800">Total</span>
                    <span className="font-bold text-xl text-orange-600">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}  
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:shadow-lg mb-6"
                >
                  PROCEED TO CHECKOUT ({totalItems})
                </motion.button>

                {/* Features */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span>Free delivery on orders above Rs. 2000</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>100% Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="w-4 h-4 text-green-600" />
                    <span>JazzCash Payment Available</span>
                  </div>
                </div>

                {/* Savings Info */}
                {cartItems.some(item => item.originalPrice && item.originalPrice > item.price) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <p className="text-green-800 font-semibold text-sm">
                      🎉 You're saving money on selected items!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
