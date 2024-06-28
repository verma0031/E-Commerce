import React, { useState, useEffect, useCallback } from "react";

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false); // Start with false to prevent immediate loading
	const [error, setError] = useState(null);
	const [isRetrying, setIsRetrying] = useState(false);
	const [retryTimeout, setRetryTimeout] = useState(null);

	const getMovies = useCallback(async () => {
		if (isRetrying) return; // Prevent multiple retries at the same time

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("https://swapi.dev/api/films");
			if (!response.ok) {
				throw new Error("Something went wrong... Retrying");
			}
			const data = await response.json();
			setMovies(data.results);
			setIsLoading(false);
			setIsRetrying(false);
		} catch (err) {
			setError(err.message);
			setIsLoading(false); // Ensure isLoading is false when an error occurs
			setIsRetrying(true); // Set retrying state
			setRetryTimeout(
				setTimeout(() => {
					setIsRetrying(false);
					getMovies();
				}, 5000)
			); // Set timeout for retrying
		}
	}, [isRetrying]);

	useEffect(() => {
		getMovies();
		return () => {
			if (retryTimeout) {
				clearTimeout(retryTimeout);
			}
		};
	}, [getMovies, retryTimeout]);

	const handleCancelRetry = () => {
		if (retryTimeout) {
			clearTimeout(retryTimeout);
		}
		setIsRetrying(false); // Reset retrying state
		setError(null);
	};

	return (
		<div className="container mx-auto my-8 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Movies</h1>
			{isLoading && (
				<p className="text-center text-gray-600">Loading movies...</p>
			)}
			{error && (
				<div className="text-center text-red-600">
					<p>{error}</p>
					{isRetrying && (
						<button
							className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
							onClick={handleCancelRetry}
						>
							Cancel Retry
						</button>
					)}
				</div>
			)}
			{!isLoading && movies.length > 0 && (
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
			)}
		</div>
	);
};

export default Home;
