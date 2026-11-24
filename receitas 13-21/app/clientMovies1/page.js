"use client";

import { useState, memo } from "react";
import Link from "next/link";

export default function Home() {
	const [resultMovies, setResultMovies] = useState([]);
	const [titleSearchKey, setTitleSearchKey] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleAction(formData) {
		setLoading(true);

		const titleSearchKey = formData.get("titleSearchKey");
		const httpRes = await fetch(
			`http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`,
		);
		const jsonRes = await httpRes.json();
		setResultMovies(jsonRes.Search || []);

		setLoading(false);
	}

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "40px auto",
				padding: "25px",
				fontFamily: "Arial, sans-serif",
				backgroundColor: "#f1f5f9",
				minHeight: "100vh",
				color: "#1e293b",
			}}
		>
			<MovieForm
				handleAction={handleAction}
				titleSearchKey={titleSearchKey}
				setTitleSearchKey={setTitleSearchKey}
				loading={loading}
			/>

			<MovieTable movies={resultMovies} />
		</div>
	);
}

export const MovieForm = memo(function MovieForm({
	handleAction,
	titleSearchKey,
	setTitleSearchKey,
	loading,
}) {
	console.log("MovieForm redesenhado");

	return (
		<form
			action={handleAction}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				padding: "25px",
				marginBottom: "30px",
				backgroundColor: "white",
				borderRadius: "12px",
				boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
			}}
		>
			<label
				htmlFor="idTitleSearchKey"
				style={{ fontSize: "16px", fontWeight: "bold" }}
			>
				Título
			</label>

			<input
				id="idTitleSearchKey"
				name="titleSearchKey"
				value={titleSearchKey}
				onChange={(e) => setTitleSearchKey(e.target.value)}
				style={{
					padding: "12px",
					border: "1px solid #cbd5e1",
					borderRadius: "7px",
					fontSize: "15px",
					outline: "none",
				}}
			/>

			<button
				type="submit"
				disabled={loading}
				style={{
					padding: "12px",
					backgroundColor: loading ? "#94a3b8" : "#2563eb",
					color: "white",
					border: "none",
					borderRadius: "7px",
					fontSize: "15px",
					fontWeight: "bold",
					cursor: loading ? "not-allowed" : "pointer",
				}}
			>
				{loading ? "Pesquisando" : "Pesquisar"}
			</button>
		</form>
	);
});

export function MovieTable({ movies }) {
	console.log("MovieTable redesenhado");

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "10px",
			}}
		>
			<div>
				{movies.map((m) => (
					<div
						key={m.imdbID}
						style={{
							padding: "18px 20px",
							marginBottom: "10px",
							backgroundColor: "white",
							borderLeft: "4px solid #2563eb",
							borderRadius: "8px",
							boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
							fontSize: "15px",
						}}
					>
						<Link href={`/movie/${m.imdbID}`}>
							{m.Title} --- {m.Year}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
