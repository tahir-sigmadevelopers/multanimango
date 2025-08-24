import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../Components/AdminLayout';

const ViewMangoes = () => {
  const [mangoes, setMangoes] = useState([]);

  // Fetch all mango data
  const getAllMangoes = async () => {
    try {
      const { data } = await axios.get('https://multanimango-backend.vercel.app/api/mango/get');
      setMangoes(data?.allData || []); // Make sure this matches your backend response
    } catch (error) {
      toast.error('Failed to fetch mangoes');
      console.error('Error fetching mangoes:', error);
    }
  };

  // Delete mango by ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mango?')) {
      try {
        const { data } = await axios.delete(`https://multanimango-backend.vercel.app/api/delete/${id}`);
        if (data.success) {
          toast.success('Mango deleted successfully! 🗑️');
          getAllMangoes(); // Refresh after delete
        } else {
          toast.error(data.message || 'Delete failed');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
        console.error('Error deleting mango:', error);
      }
    }
  };

  useEffect(() => {
    getAllMangoes();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">All Mangoes</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mangoes.map((mango) => (
              <tr key={mango._id} className="border-b">
                <td className="py-3 px-4">
                  <img
                    src={mango.image?.url}
                    alt={mango.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{mango.name}</td>
                <td className="py-3 px-4">Rs. {mango.price}</td>
                <td className="py-3 px-4">{mango.description}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleDelete(mango._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  {/* Optional Edit button can be added here */}
                </td>
              </tr>
            ))}
            {mangoes.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No mangoes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ViewMangoes;
