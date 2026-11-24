import React from "react";
import Image from "next/image";

export default async function Home({ params }) {
	const { id } = await params;
	const movie = await fetch(
		`https://www.omdbapi.com/?apikey=f1cbc41e&i=${id}`,
	).then((res) => res.json());
	return (
		<div>
			<h1>
				{movie.Title} ({movie.Year})
			</h1>
			{/* O OMDb devolve "N/A" quando o filme não tem poster */}
			{movie.Poster && movie.Poster != "N/A" && (
				<Image
					src={movie.Poster}
					alt={`Poster do filme ${movie.Title}`}
					width={300}
					height={445}
					style={{ height: "auto" }}
				/>
			)}
			<p>Director: {movie.Director}</p>
			<p>Plot: {movie.Plot}</p>
		</div>
	);
}

export async function generateStaticParams() {
	const allMovies = await fetch(
		"https://www.omdbapi.com/?apikey=f1cbc41e&s=lady",
	).then((res) => res.json());
	return allMovies.Search.map((movie) => ({
		id: movie.imdbID,
	}));
}
