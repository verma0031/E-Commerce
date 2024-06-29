import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext"; // Adjust path as per your project structure

const ChangePassword = () => {
	const { authToken } = useContext(AuthContext); // Assuming your context provides authToken
	const [newPassword, setNewPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleChangePassword = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError(null);
		setSuccess(false);

		const payload = {
			idToken: authToken, // Use authToken from context
			password: newPassword,
			returnSecureToken: true,
		};

		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8pSxqEUTCqSrj8Ib85YqsG-Wb5q_vYLc`, // Replace with your actual API key
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error.message || "Password change failed");
			}

			setSuccess(true);
		} catch (error) {
			console.error("API Error:", error);
			setError(error.message || "Password change failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg">
			<h2 className="text-2xl font-bold mb-4">Change Password</h2>
			{error && <div className="text-red-600 mb-4">{error}</div>}
			{success && (
				<div className="text-green-600 mb-4">
					Password changed successfully!
				</div>
			)}
			<form onSubmit={handleChangePassword}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						New Password
					</label>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{loading ? "Changing Password..." : "Change Password"}
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
