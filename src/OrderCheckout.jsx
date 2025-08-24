import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useCart } from './Components/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "JazzCash",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your shipping address");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city");
      return false;
    }
    if (!formData.postalCode.trim()) {
      toast.error("Please enter your postal code");
      return false;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add some items first!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate total amount
      const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shippingFee = 500;
      const totalAmount = subtotal + shippingFee;

      // Prepare order data
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        shippingAddress: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        orderItems: cartItems.map(item => ({
          productId: item._id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image?.url
        })),
        totalAmount
      };

      // Send order to backend
      const response = await fetch('https://multanimango-backend.vercel.app/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        toast.success("🎉 Order placed successfully! Please send payment screenshot to WhatsApp.");
        
        // Clear cart
        cartItems.forEach(item => removeFromCart(item._id));
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          address: "",
          city: "",
          postalCode: "",
          paymentMethod: "JazzCash",
        });
        
        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to place order. Please try again.");
      }
      
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          🥭 Mango Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Shipping Address
            </label>
            <textarea
              name="address"
              rows="3"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            ></textarea>
          </div>

          {/* City + Postal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                required
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              💳 JazzCash Payment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-700 font-medium">Account Name:</span>
                <span className="text-green-800 font-bold text-lg">Sheraz Ahmed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-700 font-medium">JazzCash Number:</span>
                <span className="text-green-800 font-bold text-lg">03286892421</span>
              </div>
              <div className="bg-green-200 p-3 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Instructions:</strong> Please send the payment screenshot to our WhatsApp number 
                  <strong> 923088678762</strong> after completing the payment.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
