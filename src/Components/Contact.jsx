import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsappNo, setWhatsappNo] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!email.includes('@')) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    if (message.trim().length < 10) {
      toast.error("Message should be at least 10 characters long");
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
      const { data } = await axios.post("http://localhost:3000/api/save/contact", {
        name, email, whatsappNo, message
      });
      
      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon. 📧");
        setName("");
        setEmail("");
        setWhatsappNo("");
        setMessage("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className=" pt-24 mt-10 relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 overflow-hidden">
      
      {/* Background Animation Circles */}
      <div className=" absolute -top-20 -left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-ping"></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-bounce"></div>
      
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-12 relative z-10 w-full max-w-lg backdrop-blur-lg bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-10 transform transition duration-500 hover:scale-[1.03] animate-fadeIn"
      >
        <h2 className="text-gray-900 text-4xl font-extrabold mb-4 text-center drop-shadow-lg animate-slideDown">
          Contact Us
        </h2>
        <p className="leading-relaxed mb-8 text-gray-700 text-center">
          Got a question or feedback? We’d love to hear from you!
        </p>
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-4 focus:ring-pink-300 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-4 focus:ring-yellow-300 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="whatsappNo" className="block text-sm font-medium text-gray-800">WhatsApp Number</label>
          <input 
            type="tel" 
            id="whatsappNo" 
            value={whatsappNo} 
            onChange={(e) => setWhatsappNo(e.target.value)}
            placeholder="923001234567"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-4 focus:ring-green-300 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-medium text-gray-800">Message</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-2 px-4 py-3 h-32 rounded-xl bg-white/70 border border-gray-300 focus:ring-4 focus:ring-orange-300 outline-none resize-none transition-all duration-300 shadow-sm hover:shadow-md"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </section>
  )
}

export default Contact
