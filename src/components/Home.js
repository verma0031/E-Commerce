import React from "react";

const tourData = [
	{
		date: "JUL 16",
		location: "DETROIT, MI",
		venue: "DTE ENERGY MUSIC THEATRE",
	},
	{ date: "JUL 19", location: "TORONTO, ON", venue: "BUDWEISER STAGE" },
	{ date: "JUL 22", location: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
	{ date: "JUL 29", location: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
	{ date: "AUG 2", location: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
	{ date: "AUG 7", location: "CONCORD, CA", venue: "CONCORD PAVILION" },
];

const Home = () => {
	return (
		<div className="container mx-auto my-8 p-4">
			<h1 className="text-3xl font-bold mb-4">Tours</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{tourData.map((tour, index) => (
					<div key={index} className="bg-white shadow-md rounded-lg p-4">
						<h2 className="text-lg font-semibold">{tour.date}</h2>
						<p className="text-gray-700">{tour.location}</p>
						<p className="text-gray-700">{tour.venue}</p>
						<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
							Buy Tickets
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
