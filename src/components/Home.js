// src/components/Home.js
import React, { useState, useEffect } from "react";

const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		getMovies();
	}, []);

	const getMovies = async () => {
		const response = await fetch("https://swapi.dev/api/films");
		const data = await response.json();
		setMovies(data.results);
	};

	return (
		<div className="container mx-auto my-8 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Movies</h1>
			{movies.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{movies.map((movie) => (
						<div
							key={movie.episode_id}
							className="bg-white rounded-lg shadow-md overflow-hidden"
						>
							<div className="p-4">
								<h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
								<p className="text-gray-700 mb-4">{movie.opening_crawl}</p>
								<p className="text-gray-800">
									<strong>Director:</strong> {movie.director}
								</p>
								<p className="text-gray-800">
									<strong>Release Date:</strong> {movie.release_date}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-center text-gray-600">Loading movies...</p>
			)}
		</div>
	);
};

export default Home;
