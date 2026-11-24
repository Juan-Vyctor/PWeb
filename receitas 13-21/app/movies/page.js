import Link from "next/link";
import Image from "next/image";

export default async function Home({ searchParams }) {
	const { titleSearchKey = "bagdad" } = await searchParams;
	const { yearSearchKey = "" } = await searchParams;
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=f1cbc41e&
			s=${titleSearchKey}&
			y=${yearSearchKey}`,
	);
	const data = await res.json();

	// Quando a pesquisa não encontra nada, o OMDb não envia o campo Search
	const movies = data.Search || [];

	return (
		<div>
			<div>
				{movies.length == 0 && <p>Nenhum filme encontrado.</p>}
				{movies.map((m) => (
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
