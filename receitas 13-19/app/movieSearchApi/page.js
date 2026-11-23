"use client";

import { useState } from "react";

export default function MovieFormApi() {
	const [titleSearchKey, setTitleSearchKey] = useState("");
	const [yearSearchKey, setYearSearchKey] = useState("");
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	// Agora a requisição vai para a nossa própria API (app/api/route.js),
	// e não mais diretamente para o OMDb
	const params = new URLSearchParams();
	if (titleSearchKey != "") params.set("titleSearchKey", titleSearchKey);
	if (yearSearchKey != "") params.set("yearSearchKey", yearSearchKey);
	const url = `/api?${params.toString()}`;

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
				{!loading && movies.length == 0 && (
					<p>Nenhum filme encontrado.</p>
				)}
				{!loading &&
					movies.map((m) => (
						<div key={m.imdbID}>
							{m.Title} --- {m.Year}
							{m.Poster && (
								<img
									src={m.Poster}
									style={{ display: "block" }}
								/>
							)}
						</div>
					))}
			</div>
		</div>
	);
}
