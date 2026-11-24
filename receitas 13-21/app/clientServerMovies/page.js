"use client";

import { searchMovies } from "../actions/movieActions";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const [data, setData] = useState({});

	async function handleAction(formData) {
		const res = await searchMovies(formData);
		setData(res);
	}

	return (
		<div>
			<MovieForm actionHandler={handleAction} />
			{data.Search && <MovieTable movies={data.Search} />}
			{data.Error && <div>{data.Error}</div>}
		</div>
	);
}

export function MovieForm({ actionHandler }) {
	return (
		<Form action={actionHandler}>
			<label htmlFor="idTitleSearchKey">Título</label>
			<input id="idTitleSearchKey" name="titleSearchKey" />
			<label htmlFor="idYearSearchKey">Ano</label>
			<input
				id="idYearSearchKey"
				name="yearSearchKey"
				type="number"
				min="1888"
				max="2100"
			/>
			<button type="submit">Pesquisar</button>
		</Form>
	);
}

export function MovieTable({ movies }) {
	return (
		<div>
			<div>
				{movies.map((m) => (
					<div key={m.imdbID}>
						<Link href={`/movie/${m.imdbID}`}>
							{m.Title} --- {m.Year}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
