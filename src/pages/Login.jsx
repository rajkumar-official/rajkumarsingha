import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { axiosInstance } from './../utils/axiosUrl';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter a valid email');
            return;
        }

        try {
            const response = await axiosInstance.post('/login', { email });
            const data = response?.data;

            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success('Login Successfully');
            // navigate('/dashboard', { state: { firstName: data.firstName, lastName: data.lastName, email: data.email, country: data.country, role: data.role } });
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            return error;
        }
    };

    return (
        <div className="appbody flex items-center justify-center min-h-[85vh] bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Please log in with your email to continue.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text text-gray-600">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2 hover:bg-primary-focus"
                    >
                        Confirm
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-primary font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                    <p className="text-center text-gray-600 mt-4">
                        Are You Maintainer of this Page?{" "}
                        <Link to="/maintainer-login" className="text-primary font-semibold hover:underline">
                            Log In Here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
