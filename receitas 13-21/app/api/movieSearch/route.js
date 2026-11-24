import { buscarFilmes } from "../../../lib/banco";

export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const titleSearchKey = searchParams.get("titleSearchKey") ?? "";
	const yearSearchKey = searchParams.get("yearSearchKey") ?? "";

	// Em vez de consultar o OMDb, consulta a base de dados local (SQLite)
	const filmes = buscarFilmes({ titulo: titleSearchKey, ano: yearSearchKey });

	return Response.json({
		Search: filmes,
		totalResults: String(filmes.length),
		Response: filmes.length > 0 ? "True" : "False",
	});
}
