import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Calendar, Trash2 } from 'lucide-react';

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all contacts
  const getAllContacts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/api/contacts');
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      toast.error('Failed to fetch contacts');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact by ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:3000/api/contacts/${id}`);
        toast.success('Contact deleted successfully');
        getAllContacts(); // Refresh after delete
      } catch (error) {
        toast.error('Delete failed');
        console.error('Error deleting contact:', error);
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

  useEffect(() => {
    getAllContacts();
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
          <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
          <div className="text-sm text-gray-600">
            Total: {contacts.length} messages
          </div>
        </div>

        {contacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
            <p className="text-gray-500">Contact messages will appear here when customers reach out.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {contact.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        {contact.email}
                      </div>
                      {contact.whatsappNo && (
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          {contact.whatsappNo}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    title="Delete contact"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {contact.message}
                  </p>
                </div>

                {contact.whatsappNo && (
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/${contact.whatsappNo}?text=Hello ${contact.name}, thank you for contacting us about your mango inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Phone size={16} />
                      Reply on WhatsApp
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default ViewContacts;
