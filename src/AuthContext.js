// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState(() =>
		localStorage.getItem("authToken")
	);
	const [logoutTimer, setLogoutTimer] = useState(null);

	const login = (token) => {
		setAuthToken(token);
		localStorage.setItem("authToken", token);
		setLogoutTimer(setTimeout(logout, 300000)); // 5 minutes in milliseconds
	};

	const logout = () => {
		setAuthToken(null);
		localStorage.removeItem("authToken");
		if (logoutTimer) {
			clearTimeout(logoutTimer);
			setLogoutTimer(null);
		}
	};

	const logoutWithTimeout = () => {
		logout();
		alert("Session expired. Please login again.");
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			setAuthToken(storedToken);
			setLogoutTimer(setTimeout(logoutWithTimeout, 300000)); // Set initial timeout on page load
		}
	}, []);

	// Clear timer on component unmount
	useEffect(() => {
		return () => {
			if (logoutTimer) {
				clearTimeout(logoutTimer);
				setLogoutTimer(null);
			}
		};
	}, []);

	return (
		<AuthContext.Provider value={{ authToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
