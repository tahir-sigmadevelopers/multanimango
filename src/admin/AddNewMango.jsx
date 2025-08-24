import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";
import toast from 'react-hot-toast';

const AddMango = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      toast.error("Please select an image file");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
      toast.success("Image uploaded successfully! 📸");
    };

    reader.onerror = () => {
      toast.error("Failed to read image file");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || !price.trim() || !imageBase64) {
      toast.error("Please fill all fields and upload an image");
      return;
    }
    
    setLoading(true);
    try {
      const newMango = {
        name,
        description,
        image: imageBase64,
        price,
      };

      const { data } = await axios.post("http://localhost:3000/api/mango/save", newMango);
      
      if (data.success) {
        toast.success("Mango added successfully! 🥭");
        setName("");
        setDescription("");
        setPrice("");
        setImageBase64("");
      } else {
        toast.error(data.message || "Failed to add mango");
      }
    } catch (error) {
      console.error("Error adding mango:", error);
      toast.error(error.response?.data?.message || "Failed to add mango");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-100 to-yellow-300 py-12 px-4 overflow-hidden rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        >
        {/* Floating Mango Emoji */}
        <motion.div
          className="absolute -top-10 -right-10 text-6xl"
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🥭
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-yellow-700 text-center mb-6"
        >
          🍋 Add New Mango
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            placeholder="Mango Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            required
          />

          {/* Description */}
          <motion.textarea
            whileFocus={{ scale: 1.03 }}
            placeholder="Mango Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            rows={4}
            required
          />

          {/* Price */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="number"
            placeholder="Price (PKR)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            required
          />

          {/* Image Upload */}
          <motion.label
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-yellow-400 py-8 cursor-pointer rounded-2xl bg-yellow-50 hover:bg-yellow-100 transition relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-yellow-200 opacity-20"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <svg
              className="w-12 h-12 text-yellow-500 mb-2 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-yellow-600 font-semibold">
              Upload Mango Image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </motion.label>

          {/* Preview */}
          {imageBase64 && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={imageBase64}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-2xl mx-auto mt-4 border-4 border-yellow-400 shadow-lg"
            />
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="relative overflow-hidden w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg"
          >
            <span className="relative z-10">
              {loading ? "🍋 Uploading..." : "🥭 Add Mango"}
            </span>
            {/* Shine Animation */}
            <motion.span
              className="absolute inset-0 bg-white/30 skew-x-12"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        </form>
      </motion.div>
    </div>
    </AdminLayout>
  );
};

export default AddMango;
