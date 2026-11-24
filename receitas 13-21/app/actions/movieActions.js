"use server";

export async function searchMovies(formData) {
	const titleSearchKey = formData.get("titleSearchKey");
	const yearSearchKey = formData.get("yearSearchKey");

	if (!titleSearchKey || titleSearchKey == "") return { Search: [] };

	const params = new URLSearchParams({ apikey: "f1cbc41e", s: titleSearchKey });

	// Refina a pesquisa pelo ano de lançamento, se informado
	if (yearSearchKey && yearSearchKey != "") params.append("y", yearSearchKey);

	try {
		const httpRes = await fetch(`http://www.omdbapi.com/?${params}`);
		const jsonRes = await httpRes.json();
		return jsonRes;
	} catch (err) {
		return { error: `Erro na requisição ${err}` };
	}
}
