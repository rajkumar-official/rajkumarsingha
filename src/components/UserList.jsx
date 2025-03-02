import React, { useEffect, useState } from "react";
import { axiosInstance } from './../utils/axiosUrl';

const UserList = ({ role }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosInstance.get("/allUsrs", { params: { role } });
                setUsers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching users");
            }
        };

        getUsers();
    }, [role]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Users:</h3>

            {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

            {/* User Table */}
            {users.length > 0 ? (
                <div className="overflow-x-auto max-h-50">
                    <table className="table table-zebra w-full text-left table-fixed">
                        <thead className="sticky top-0 bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">First Name</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">Last Name</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-700">Country</th>
                                {role === "Coolest Kid" && (
                                    <>
                                        <th className="px-4 py-2 text-sm font-medium text-gray-700">Email</th>
                                        <th className="px-4 py-2 text-sm font-medium text-gray-700">Role</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="overflow-y-auto max-h-72">
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.firstName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.lastName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{user.country}</td>
                                    {role === "Coolest Kid" && (
                                        <>
                                            <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            ) : (
                <p className="text-gray-600">No users found.</p>
            )}
        </div>
    );
};

export default UserList;
