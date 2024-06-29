// src/components/Login.js
import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const response = await fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8pSxqEUTCqSrj8Ib85YqsG-Wb5q_vYLc",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						returnSecureToken: true,
					}),
				}
			);
			const data = await response.json();
			if (data.error) {
				setError(data.error.message);
			} else {
				login(data.idToken);
				navigate("/home"); // Redirect to home after successful login
			}
		} catch (err) {
			setError("Authentication failed.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded shadow-md w-full max-w-sm"
			>
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<div className="mb-4">
					<label className="block mb-2 text-sm font-medium">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border p-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2 text-sm font-medium">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border p-2 w-full"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
