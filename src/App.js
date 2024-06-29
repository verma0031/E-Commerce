// src/App.js
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Body from "./components/Body";
import Cart from "./components/Cart";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import ProductPage from "./components/Products";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext"; // Make sure this file exists and is correctly implemented

const App = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleCartOpen = () => {
		setIsCartOpen(true);
	};

	const handleCartClose = () => {
		setIsCartOpen(false);
	};

	return (
		<AuthProvider>
			<CartProvider>
				<div>
					<Header onCartOpen={handleCartOpen} />
					<Outlet />
					<Cart isOpen={isCartOpen} onClose={handleCartClose} />
				</div>
			</CartProvider>
		</AuthProvider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/home",
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: "/about",
				element: (
					<ProtectedRoute>
						<About />
					</ProtectedRoute>
				),
			},
			{
				path: "/store",
				element: (
					<ProtectedRoute>
						<Body />
					</ProtectedRoute>
				),
			},
			{
				path: "/contact",
				element: (
					<ProtectedRoute>
						<ContactUs />
					</ProtectedRoute>
				),
			},
			{
				path: "/product/:productId",
				element: (
					<ProtectedRoute>
						<ProductPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/profile",
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
