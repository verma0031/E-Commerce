// src/components/Profile.js
import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-4">Profile</h2>
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Profile;
