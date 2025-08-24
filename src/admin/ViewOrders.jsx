import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { motion } from 'framer-motion';
import { 
  Package, 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Trash2, 
  Edit3,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  Phone
} from 'lucide-react';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/api/orders');
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/orders/${orderId}/status`, {
        orderStatus: newStatus
      });
      
      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        getAllOrders(); // Refresh orders
      }
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order:', error);
    }
  };

  // Update payment status
  const handlePaymentStatusUpdate = async (orderId, newPaymentStatus) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/orders/${orderId}/status`, {
        paymentStatus: newPaymentStatus
      });
      
      if (data.success) {
        toast.success(`Payment status updated to ${newPaymentStatus}`);
        getAllOrders(); // Refresh orders
      }
    } catch (error) {
      toast.error('Failed to update payment status');
      console.error('Error updating payment status:', error);
    }
  };

  // Delete order
  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const { data } = await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
        if (data.success) {
          toast.success('Order deleted successfully');
          getAllOrders(); // Refresh orders
        }
      } catch (error) {
        toast.error('Failed to delete order');
        console.error('Error deleting order:', error);
      }
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

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>
          <div className="text-sm text-gray-600">
            Total: {orders.length} orders
          </div>
        </div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here when customers place them.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => {
              const statusInfo = getStatusInfo(order.orderStatus);
              const StatusIcon = statusInfo.icon;
              
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {order.customerName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          {order.customerEmail}
                        </div>
                                                 <div className="flex items-center gap-1">
                           <Calendar size={14} />
                           {formatDate(order.createdAt)}
                         </div>
                         <a
                           href={`https://wa.me/923088678762?text=Hello ${order.customerName}, regarding your order #${order._id.slice(-6).toUpperCase()}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                           title="Contact customer on WhatsApp"
                         >
                           <Phone size={14} />
                           Contact
                         </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color} flex items-center gap-1`}>
                        <StatusIcon size={14} />
                        {order.orderStatus}
                      </div>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Delete order"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <MapPin size={16} />
                        Shipping Address
                      </h4>
                      <p className="text-gray-700 text-sm">
                        {order.shippingAddress}<br />
                        {order.city}, {order.postalCode}
                      </p>
                    </div>
                                         <div>
                       <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                         <DollarSign size={16} />
                         Payment Details
                       </h4>
                       <p className="text-gray-700 text-sm">
                         Method: {order.paymentMethod}<br />
                         Account: Sheraz Ahmed (03286892421)<br />
                         Status: <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                           {order.paymentStatus}
                         </span><br />
                         Total: <span className="font-bold text-lg text-green-600">Rs. {order.totalAmount}</span>
                       </p>
                       <div className="mt-2">
                         <select
                           value={order.paymentStatus}
                           onChange={(e) => handlePaymentStatusUpdate(order._id, e.target.value)}
                           className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:outline-none"
                         >
                           <option value="pending">Payment Pending</option>
                           <option value="paid">Payment Received</option>
                           <option value="failed">Payment Failed</option>
                         </select>
                       </div>
                     </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.orderItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.productName}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity} × Rs. {item.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">Rs. {item.quantity * item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Update Status:</span>
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
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default ViewOrders;
