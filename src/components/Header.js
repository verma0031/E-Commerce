const Header = () => {
	return (
		<div>
			<div className="w-full h-12 bg-slate-300 flex items-center justify-between px-4 mb-0.5">
				<div className="flex-1 flex justify-center">
					<ul className="flex space-x-4">
						<li className="text-lg font-bold cursor-pointer">Home</li>
						<li className="text-lg font-bold cursor-pointer">Store</li>
						<li className="text-lg font-bold cursor-pointer">About</li>
					</ul>
				</div>
				<button className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
					Cart
				</button>
			</div>
			<div className="w-full h-24 bg-black flex items-center justify-center">
				<h1 className="items-center text-white font-bold text-5xl font-mono">
					The Generics
				</h1>
			</div>
		</div>
	);
};

export default Header;
