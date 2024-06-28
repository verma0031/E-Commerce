import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Cart from "./components/Cart";
import { CartProvider } from "./CartContext";

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
				<Body />
				<Cart isOpen={isCartOpen} onClose={handleCartClose} />
			</div>
		</CartProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
