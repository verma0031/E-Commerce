import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.title === item.title
			);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.title === item.title
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			}
			return [...prevCart, { ...item, quantity: 1 }];
		});
	};

	const removeFromCart = (index) => {
		setCart((prevCart) => {
			const newCart = [...prevCart];
			if (newCart[index].quantity > 1) {
				newCart[index].quantity -= 1;
			} else {
				newCart.splice(index, 1);
			}
			return newCart;
		});
	};

	const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, cartCount }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
