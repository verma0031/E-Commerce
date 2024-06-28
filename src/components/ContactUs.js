import React, { useState } from "react";

const ContactUs = () => {
	const [contactInfo, setContactInfo] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setContactInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(contactInfo);
		// Reset the form
		setContactInfo({
			name: "",
			email: "",
			message: "",
		});
	};

	return (
		<div className="container mx-auto my-8 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
			<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Name</label>
					<input
						type="text"
						name="name"
						value={contactInfo.name}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Email</label>
					<input
						type="email"
						name="email"
						value={contactInfo.email}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Message</label>
					<textarea
						name="message"
						value={contactInfo.message}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					></textarea>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ContactUs;
