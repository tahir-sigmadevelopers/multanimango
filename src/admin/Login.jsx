import { div } from "framer-motion/client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast'
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function MyLoginForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/admin/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const { data } = await axios.post("http://localhost:3000/api/login/user", {
                 email, password
            });
            
            if (data.statusCode === 200) {
                // Store user data in context and localStorage
                login(data.user);
                toast.success(data.message);
                navigate("/admin/dashboard");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen from-green-100 flex items-center justify-center bg-green-400 bg-gradient-to-br">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="font-bold text-2xl text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} action="" className="space-y-4">

                    <div >
                        <label className=" font-bold block text-gray-700 mb-1" htmlFor="">Name</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" value={name} placeholder="enter your name" type="text" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label className="font-bold block text-gray-700 mb-1" htmlFor="">Email</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" type="text" value={email} placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label className="font-bold block text-gray-700 mb-1" htmlFor="">Password</label>
                        <div className="relative">
                            <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} value={password} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                            <button className="absolute right-3 top-2.5 text-gray-500" type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}