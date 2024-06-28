import React, { useState } from "react";

const Cart = ({ isOpen, onClose }) => {
	const [cartItems, setCartItems] = useState([
		{
			title: "Colors",
			price: 100,
			imageUrl:
				"https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
			quantity: 2,
		},
		{
			title: "Black and white Colors",
			price: 50,
			imageUrl:
				"https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
			quantity: 3,
		},
		{
			title: "Yellow and Black Colors",
			price: 70,
			imageUrl:
				"https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
			quantity: 1,
		},
	]);

	const handleRemoveItem = (index) => {
		const newCartItems = [...cartItems];
		newCartItems.splice(index, 1);
		setCartItems(newCartItems);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed right-0 top-0 w-80 bg-white shadow-lg p-4 z-50">
			<button onClick={onClose} className="mb-4 text-red-500">
				Close
			</button>
			<h2 className="text-2xl font-bold mb-4">Cart</h2>
			<ul>
				{cartItems.map((item, index) => (
					<li key={index} className="flex items-center mb-4">
						<img
							src={item.imageUrl}
							alt={item.title}
							className="w-12 h-12 mr-4"
						/>
						<div>
							<h3 className="text-lg font-semibold">{item.title}</h3>
							<p className="text-gray-600">${item.price}</p>
							<p className="text-gray-600">Quantity: {item.quantity}</p>
						</div>
						<button
							onClick={() => handleRemoveItem(index)}
							className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Cart;
