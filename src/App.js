import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Cart from "./components/Cart";
import About from "./components/About";
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
				path: "/",
				element: <Body />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
