import React, { useState, useEffect, useCallback } from "react";

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isRetrying, setIsRetrying] = useState(false);
	const [retryTimeout, setRetryTimeout] = useState(null);

	const [newMovie, setNewMovie] = useState({
		title: "",
		openingCrawl: "",
		director: "",
		releaseDate: "",
	});

	const getMovies = useCallback(async () => {
		if (isRetrying) return;

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"https://ecommerce-ad896-default-rtdb.firebaseio.com/movies.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong... Retrying");
			}
			const data = await response.json();
			if (data) {
				const moviesArray = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));
				setMovies(moviesArray);
			} else {
				setMovies([]);
			}
			setIsLoading(false);
			setIsRetrying(false);
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			setIsRetrying(true);
			setRetryTimeout(
				setTimeout(() => {
					setIsRetrying(false);
					getMovies();
				}, 5000)
			);
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
		setIsRetrying(false);
		setError(null);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewMovie((prevMovie) => ({
			...prevMovie,
			[name]: value,
		}));
	};

	const handleAddMovie = async (e) => {
		e.preventDefault();

		const response = await fetch(
			"https://ecommerce-ad896-default-rtdb.firebaseio.com/movies.json",
			{
				method: "POST",
				body: JSON.stringify(newMovie),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();
		console.log(data);

		// Add new movie to the list of movies
		setMovies((prevMovies) => [
			...prevMovies,
			{
				id: data.name, // Firebase returns the unique key in the name property
				...newMovie,
			},
		]);

		// Reset the form
		setNewMovie({
			title: "",
			openingCrawl: "",
			director: "",
			releaseDate: "",
		});
	};

	return (
		<div className="container mx-auto my-8 p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Movies</h1>
			<form className="mb-4" onSubmit={handleAddMovie}>
				<div className="mb-2">
					<label className="block text-gray-700">Title</label>
					<input
						type="text"
						name="title"
						value={newMovie.title}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					/>
				</div>
				<div className="mb-2">
					<label className="block text-gray-700">Opening Crawl</label>
					<textarea
						name="openingCrawl"
						value={newMovie.openingCrawl}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					></textarea>
				</div>
				<div className="mb-2">
					<label className="block text-gray-700">Director</label>
					<input
						type="text"
						name="director"
						value={newMovie.director}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					/>
				</div>
				<div className="mb-2">
					<label className="block text-gray-700">Release Date</label>
					<input
						type="date"
						name="releaseDate"
						value={newMovie.releaseDate}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					Add Movie
				</button>
			</form>
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
			{!isLoading && movies.length === 0 && !error && (
				<p className="text-center text-gray-600">No movies present.</p>
			)}
			{!isLoading && movies.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{movies.map((movie) => (
						<div
							key={movie.id}
							className="bg-white rounded-lg shadow-md overflow-hidden"
						>
							<div className="p-4">
								<h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
								<p className="text-gray-700 mb-4">{movie.openingCrawl}</p>
								<p className="text-gray-800">
									<strong>Director:</strong> {movie.director}
								</p>
								<p className="text-gray-800">
									<strong>Release Date:</strong> {movie.releaseDate}
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
