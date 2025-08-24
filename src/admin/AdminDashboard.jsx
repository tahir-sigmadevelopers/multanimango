import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../Components/AdminLayout";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Package, 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  Truck,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMangoes: 0,
    totalContacts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    todayMangoes: 0,
    todayContacts: 0,
    todayOrders: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchStats = async () => {
    try {
      setLoading(true);
      const [mangoStats, contactStats, orderStats, ordersData] = await Promise.all([
              axios.get('https://multanimango-backend.vercel.app/api/mango/stats'),
      axios.get('https://multanimango-backend.vercel.app/api/contacts/stats'),
      axios.get('https://multanimango-backend.vercel.app/api/orders/stats'),
      axios.get('https://multanimango-backend.vercel.app/api/orders')
      ]);
      
      setStats({
        totalMangoes: mangoStats.data.stats.totalMangoes,
        totalContacts: contactStats.data.stats.totalContacts,
        totalOrders: orderStats.data.stats.totalOrders,
        totalRevenue: orderStats.data.stats.totalRevenue,
        todayMangoes: mangoStats.data.stats.todayMangoes,
        todayContacts: contactStats.data.stats.todayContacts,
        todayOrders: orderStats.data.stats.todayOrders,
        pendingOrders: orderStats.data.stats.pendingOrders
      });

      // Get recent orders (last 5)
      if (ordersData.data.success) {
        setRecentOrders(ordersData.data.orders.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`https://multanimango-backend.vercel.app/api/orders/${orderId}/status`, {
        orderStatus: newStatus
      });
      
      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchStats(); // Refresh data
      }
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Clock };
      case 'confirmed':
        return { color: 'text-blue-600', bg: 'bg-blue-100', icon: CheckCircle };
      case 'shipped':
        return { color: 'text-purple-600', bg: 'bg-purple-100', icon: Truck };
      case 'delivered':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
      case 'cancelled':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: XCircle };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Clock };
    }
  };

  const summary = [
    { title: "Total Mangoes", value: stats.totalMangoes, color: "text-orange-600", icon: Package },
    { title: "Total Contacts", value: stats.totalContacts, color: "text-blue-600", icon: Mail },
    { title: "Total Orders", value: stats.totalOrders, color: "text-green-600", icon: User },
    { title: "Total Revenue", value: `Rs. ${stats.totalRevenue.toLocaleString()}`, color: "text-purple-600", icon: DollarSign },
  ];

  return (
    <AdminLayout>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-10 text-green-800"
        >
          Welcome, {user?.name || 'Admin'}! 🌟
        </motion.h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {summary.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                      {item.title}
                    </h3>
                    <p className={`text-3xl font-extrabold ${item.color}`}>
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {[
                { title: "Today's Mangoes", value: stats.todayMangoes, color: "text-orange-600", icon: Package },
                { title: "Today's Contacts", value: stats.todayContacts, color: "text-blue-600", icon: Mail },
                { title: "Today's Orders", value: stats.todayOrders, color: "text-green-600", icon: User },
                { title: "Pending Orders", value: stats.pendingOrders, color: "text-yellow-600", icon: Clock },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-l-4 border-yellow-400"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-700 mb-2">
                      {item.title}
                    </h3>
                    <p className={`text-2xl font-extrabold ${item.color}`}>
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
                <button
                  onClick={() => window.location.href = '/admin/orders'}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  View All Orders →
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order, index) => {
                    const statusInfo = getStatusInfo(order.orderStatus);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              Order #{order._id.slice(-6).toUpperCase()}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <User size={14} />
                                {order.customerName}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDate(order.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color} flex items-center gap-1`}>
                              <StatusIcon size={14} />
                              {order.orderStatus}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Customer:</span>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-gray-500">{order.customerEmail}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Shipping:</span>
                            <p className="font-medium">{order.city}</p>
                            <p className="text-gray-500">{order.shippingAddress}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Payment:</span>
                            <p className="font-medium">{order.paymentMethod}</p>
                            <p className="text-green-600 font-bold">Rs. {order.totalAmount}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {order.orderItems.length} items
                            </span>
                            <select
                              value={order.orderStatus}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-12 bg-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => window.location.href = '/admin/orders'}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl transition-colors duration-200"
                >
                  View Orders
                </button>
                <button
                  onClick={() => window.location.href = '/admin/add-mango'}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl transition-colors duration-200"
                >
                  Add New Mango
                </button>
                <button
                  onClick={() => window.location.href = '/admin/mangoes'}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl transition-colors duration-200"
                >
                  View All Mangoes
                </button>
                <button
                  onClick={() => window.location.href = '/admin/contacts'}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition-colors duration-200"
                >
                  View Contacts
                </button>
              </div>
            </motion.div>
          </>
        )}
    </AdminLayout>
  );
};

export default AdminDashboard;
