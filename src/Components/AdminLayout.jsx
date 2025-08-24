import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, PlusCircle, Eye, Phone, LogOut, User, Package } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-900 text-white flex flex-col p-6 shadow-lg">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Admin Panel
        </motion.h2>

        {/* User Info */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 p-4 bg-green-600 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <User size={16} />
              <span className="text-sm font-medium">Logged in as:</span>
            </div>
            <p className="text-sm font-bold">{user.name}</p>
            <p className="text-xs opacity-80">{user.email}</p>
          </motion.div>
        )}

        <nav className="flex flex-col gap-4 flex-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-2 p-3 rounded-xl transition duration-300 ${
              isActiveRoute('/admin/dashboard') 
                ? 'bg-green-600 text-white' 
                : 'hover:bg-green-700'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/admin/add-mango"
            className={`flex items-center gap-2 p-3 rounded-xl transition duration-300 ${
              isActiveRoute('/admin/add-mango') 
                ? 'bg-green-600 text-white' 
                : 'hover:bg-green-700'
            }`}
          >
            <PlusCircle size={20} /> Add Mango
          </Link>
          <Link
            to="/admin/mangoes"
            className={`flex items-center gap-2 p-3 rounded-xl transition duration-300 ${
              isActiveRoute('/admin/mangoes') 
                ? 'bg-green-600 text-white' 
                : 'hover:bg-green-700'
            }`}
          >
            <Eye size={20} /> View Mangos
          </Link>
          <Link
            to="/admin/contacts"
            className={`flex items-center gap-2 p-3 rounded-xl transition duration-300 ${
              isActiveRoute('/admin/contacts') 
                ? 'bg-green-600 text-white' 
                : 'hover:bg-green-700'
            }`}
          >
            <Phone size={20} /> View Contacts
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center gap-2 p-3 rounded-xl transition duration-300 ${
              isActiveRoute('/admin/orders') 
                ? 'bg-green-600 text-white' 
                : 'hover:bg-green-700'
            }`}
          >
            <Package size={20} /> View Orders
          </Link>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-600 p-3 rounded-xl transition duration-300 mt-auto"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
