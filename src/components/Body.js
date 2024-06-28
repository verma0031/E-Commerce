import React, { useContext } from "react";
import CartContext from "../CartContext"; // Make sure the path is correct

const productsArr = [
	{
		title: "Colors",
		price: 100,
		imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
	},
	{
		title: "Black and white Colors",
		price: 50,
		imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
	},
	{
		title: "Yellow and Black Colors",
		price: 70,
		imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
	},
	{
		title: "Blue Color",
		price: 100,
		imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
	},
];

const Body = () => {
	const { addToCart } = useContext(CartContext);

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto my-8 w-6/12">
				{productsArr.map((product, index) => (
					<div
						key={index}
						className="bg-white shadow-md rounded-lg overflow-hidden"
					>
						<img
							src={product.imageUrl}
							alt={product.title}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h2 className="text-lg font-semibold mb-2">{product.title}</h2>
							<p className="text-gray-700 mb-2">${product.price}</p>
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
								onClick={() => addToCart(product)}
							>
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Body;
