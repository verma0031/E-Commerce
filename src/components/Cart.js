import React, { useContext } from "react";
import CartContext from "../CartContext"; // Make sure the path is correct

const Cart = ({ isOpen, onClose }) => {
	const { cart, removeFromCart } = useContext(CartContext);

	const handleRemoveItem = (index) => {
		removeFromCart(index);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed right-0 top-0 w-80 bg-white shadow-lg p-4 z-50">
			<button onClick={onClose} className="mb-4 text-red-500">
				Close
			</button>
			<h2 className="text-2xl font-bold mb-4">Cart</h2>
			<ul>
				{cart.map((item, index) => (
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
