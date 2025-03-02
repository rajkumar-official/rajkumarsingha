import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from './../utils/axiosUrl';

const MaintainerList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingChanges, setPendingChanges] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/all-users");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle dropdown change
    const handleDropdownChange = (email, event) => {
        const newRole = event.target.value;
        setPendingChanges((prev) => ({
            ...prev,
            [email]: newRole,
        }));
    };

    // Handle submit for a specific user
    const handleSubmit = async (email) => {
        const newRole = pendingChanges[email];
        if (!newRole) {
            toast.warning("No changes to submit for this user");
            return;
        }

        try {
            await axiosInstance.put("/update-role", { email, newRole });
            toast.success("Role updated successfully");
            setPendingChanges((prev) => {
                const updated = { ...prev };
                delete updated[email];
                return updated;
            });

            // Re-fetch users to ensure data consistency
            const response = await axiosInstance.get("/all-users");
            setUsers(response.data);
        } catch (error) {
            toast.error("Failed to update role");
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">User Management</h2>

            {loading ? (
                <div className="flex justify-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto max-h-80">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-6 py-2 text-left">First Name</th>
                                <th className="px-6 py-2 text-left">Last Name</th>
                                <th className="px-6 py-2 text-left">Email</th>
                                <th className="px-6 py-2 text-left">Role</th>
                                <th className="px-6 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.Users?.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-3">{user.firstName}</td>
                                    <td className="px-6 py-3">{user.lastName}</td>
                                    <td className="px-6 py-3">{user.email}</td>
                                    <td className="px-6 py-3">
                                        <select
                                            className="form-select"
                                            value={pendingChanges[user.email] || user.role}
                                            onChange={(event) => handleDropdownChange(user.email, event)}
                                        >
                                            <option value="Cool Kid">Cool Kid</option>
                                            <option value="Cooler Kid">Cooler Kid</option>
                                            <option value="Coolest Kid">Coolest Kid</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button
                                            className={`btn btn-primary ${!pendingChanges[user.email] ? "disabled" : ""
                                                }`}
                                            onClick={() => handleSubmit(user.email)}
                                            disabled={!pendingChanges[user.email]}
                                        >
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MaintainerList;
