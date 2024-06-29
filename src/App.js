import React, { useState } from "react";
import ReactDOM from "react-dom/client";


import Header from "./components/Header";
import Home from "./components/Home";
import Body from "./components/Body";
import Cart from "./components/Cart";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import ProductPage from "./components/Products";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { CartProvider } from "./CartContext";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleCartOpen = () => {
		setIsCartOpen(true);
	};

	const handleCartClose = () => {
		setIsCartOpen(false);
	};

	return (
		<CartProvider>
			<div>
				<Header onCartOpen={handleCartOpen} />
				<Outlet />
				<Cart isOpen={isCartOpen} onClose={handleCartClose} />
			</div>
		</CartProvider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/store",
				element: <Body />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/contact",
				element: <ContactUs />,
			},
			{
				path: "/product/:productId",
				element: <ProductPage />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
