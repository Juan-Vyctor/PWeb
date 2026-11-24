"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MovieForm() {
	const [titleSearchKey, setTitleSearchKey] = useState("");
	const [yearSearchKey, setYearSearchKey] = useState("");
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
    
    const url = `https://www.omdbapi.com/?apikey=f1cbc41e${titleSearchKey != "" ? `&s=${titleSearchKey}` : ""}${yearSearchKey != "" ? `&y=${yearSearchKey}` : ""}`;

	async function pesquisar(event) {
		event.preventDefault();
		setLoading(true);
		const res = await fetch(url);
		const data = await res.json();
        console.log(data);
		setMovies(data.Search || []);
		setLoading(false);
	}

	return (
		<div>
			<form onSubmit={pesquisar}>
				<div>
					<div>titleSearchKey: {titleSearchKey}</div>
					<label htmlFor="idTitleSearchKey">Título</label>
					<input
						id="idTitleSearchKey"
						name="titleSearchKey"
						value={titleSearchKey}
						onChange={(e) => setTitleSearchKey(e.target.value)}
					/>
				</div>
				<div>
					<div>yearSearchKey: {yearSearchKey}</div>
					<label htmlFor="idYearSearchKey">Ano</label>
					<input
						id="idYearSearchKey"
						name="yearSearchKey"
						value={yearSearchKey}
						onChange={(e) => setYearSearchKey(e.target.value)}
					/>
				</div>
				<button type="submit">Pesquisar</button>
			</form>
			<hr />
			<div>
				{loading && <p>Pesquisando...</p>}
				{!loading &&
					movies.map((m) => (
						<div key={m.imdbID}>
							<Link href={`/movie/${m.imdbID}`}>
								{m.Title} --- {m.Year}
							</Link>
							{m.Poster && m.Poster != "N/A" && (
								<Image
									src={m.Poster}
									alt={`Poster do filme ${m.Title}`}
									width={300}
									height={445}
									style={{ display: "block", height: "auto" }}
								/>
							)}
						</div>
					))}
			</div>
		</div>
	);
}