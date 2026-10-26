export default async function Home({ searchParams }) {
	const { titleSearchKey = "bagdad" } = await searchParams;
	const { yearSearchKey = "" } = await searchParams;
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=f1cbc41e&
			s=${titleSearchKey}&
			y=${yearSearchKey}`,
	);
	const data = await res.json();

	return (
		<div>
			<div>
				{data.Search.map((m) => (
					<div key={m.imdbID}>
						{m.Title} --- {m.Year}
						<img src={m.Poster} style={{display: "block"}}/>
					</div>
				))}
			</div>
		</div>
	);
}
