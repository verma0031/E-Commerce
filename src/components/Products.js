import React from "react";
import { useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";

const ProductPage = () => {
	const location = useLocation();
	const product = location.state;

	return (
		<div className="container mx-auto my-8 p-4">
			<h1 className="text-3xl font-bold mb-4">{product.title}</h1>
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/2">
					{product.images.map((image, index) => (
						<div key={index} className="mb-4">
							<ReactImageMagnify
								{...{
									smallImage: {
										alt: product.title,
										isFluidWidth: true,
										src: image,
									},
									largeImage: {
										src: image,
										width: 1200,
										height: 1800,
									},
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
