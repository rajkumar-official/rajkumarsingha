import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Bouncify_Api_Key, Bouncify_Endpoint } from "../utils/constants";
import { axiosInstance } from './../utils/axiosUrl';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    // Handle email verification
    const verifyEmail = async (email) => {
        try {
            setIsVerifying(true);
            const response = await axios.get(Bouncify_Endpoint, {
                params: {
                    email,
                    apikey: Bouncify_Api_Key,
                },
            });

            const { status, result } = response.data;
            setIsVerifying(false);

            if (result !== "undeliverable") {
                return true;
            } else {
                toast.error("Invalid email address. Please provide a valid email.");
                return false;
            }
        } catch (error) {
            setIsVerifying(false);
            toast.error("Error verifying email. Please try again.");
            return false;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter a valid email");
            return;
        }

        const isEmailValid = await verifyEmail(email);
        if (!isEmailValid) return;

        try {
            const response = await axiosInstance.post("/signup", {
                email,
            });
            toast.success("Signup Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            return error;
        }
    };

    return (
        <div className="appbody flex items-center justify-center min-h-[85vh] bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Create an Account
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Join us today! Fill in your details to get started.
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
                            disabled={isVerifying}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full mt-2 hover:bg-primary-focus ${isVerifying ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isVerifying}
                    >
                        {isVerifying ? "Verifying..." : "Confirm"}
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;

