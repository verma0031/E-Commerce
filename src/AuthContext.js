import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState(null);

	useEffect(() => {
		// Load token from localStorage on component mount (like page refresh)
		const token = localStorage.getItem("authToken");
		if (token) {
			setAuthToken(token);
		}
	}, []);

	const login = (token) => {
		// Store token in localStorage and state
		localStorage.setItem("authToken", token);
		setAuthToken(token);
	};

	const logout = () => {
		// Clear token from localStorage and state
		localStorage.removeItem("authToken");
		setAuthToken(null);
	};

	return (
		<AuthContext.Provider value={{ authToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
