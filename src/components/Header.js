import { useState, useContext } from "react";
import {NavLink} from "react-router-dom";

import About from "./About";
import Cart from "./Cart";
import CartContext from "../CartContext"; // Make sure the path is correct

const Header = () => {
	const { cartCount } = useContext(CartContext);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const toggleCart = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<div>
			<div className="w-full h-12 bg-slate-300 flex items-center justify-between px-4 mb-0.5">
				<div className="flex-1 flex justify-center">
					<ul className="flex space-x-4">
						<li className="text-lg font-bold cursor-pointer">
							<NavLink
								to="/home"
								
								className="hover:text-blue-500"
							>
								Home
							</NavLink>
						</li>
						<li className="text-lg font-bold cursor-pointer">
							<NavLink
								to="/store"
								
								className="hover:text-blue-500"
							>
								Store
							</NavLink>
						</li>
						<li className="text-lg font-bold cursor-pointer">
							<NavLink
								to="/about"
								
								className="hover:text-blue-500"
							>
								About
							</NavLink>
						</li>
						<li className="text-lg font-bold cursor-pointer">
							<NavLink
								to="/contact"
								
								className="hover:text-blue-500"
							>
								ContactUs
							</NavLink>
						</li>
					</ul>
				</div>
				<button
					className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 relative"
					onClick={toggleCart}
				>
					Cart
					{cartCount > 0 && (
						<span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
							{cartCount}
						</span>
					)}
				</button>
			</div>
			<div className="w-full h-24 bg-black flex items-center justify-center">
				<h1 className="items-center text-white font-bold text-5xl font-mono">
					The Generics
				</h1>
			</div>
			<Cart isOpen={isCartOpen} onClose={toggleCart} />
		</div>
	);
};

export default Header;
