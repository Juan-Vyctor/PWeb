import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

// O arquivo do banco fica em <raiz do projeto>/dados/filmes.db
const pastaDados = path.join(process.cwd(), "dados");
const caminhoBanco = path.join(pastaDados, "filmes.db");

// Filmes usados para popular o banco na primeira execução
const filmesIniciais = [
	{ titulo: "The Thief of Bagdad", ano: "1924", imdbId: "tt0015532" },
	{ titulo: "The Thief of Bagdad", ano: "1940", imdbId: "tt0033152" },
	{ titulo: "The Godfather", ano: "1972", imdbId: "tt0068646" },
	{ titulo: "Star Wars", ano: "1977", imdbId: "tt0076759" },
	{ titulo: "Forrest Gump", ano: "1994", imdbId: "tt0109830" },
	{ titulo: "Pulp Fiction", ano: "1994", imdbId: "tt0110912" },
	{ titulo: "The Shawshank Redemption", ano: "1994", imdbId: "tt0111161" },
	{ titulo: "Central do Brasil", ano: "1998", imdbId: "tt0140888" },
	{ titulo: "The Matrix", ano: "1999", imdbId: "tt0133093" },
	{ titulo: "Fight Club", ano: "1999", imdbId: "tt0137523" },
	{ titulo: "Cidade de Deus", ano: "2002", imdbId: "tt0317248" },
	{ titulo: "The Matrix Reloaded", ano: "2003", imdbId: "tt0234215" },
	{ titulo: "The Matrix Revolutions", ano: "2003", imdbId: "tt0242653" },
	{ titulo: "Batman Begins", ano: "2005", imdbId: "tt0372784" },
	{ titulo: "The Dark Knight", ano: "2008", imdbId: "tt0468569" },
	{ titulo: "Inception", ano: "2010", imdbId: "tt1375666" },
	{ titulo: "Interstellar", ano: "2014", imdbId: "tt0816692" },
];

function abrirBanco() {
	mkdirSync(pastaDados, { recursive: true });
	const db = new DatabaseSync(caminhoBanco);

	db.exec(`
		CREATE TABLE IF NOT EXISTS filmes (
			id      INTEGER PRIMARY KEY AUTOINCREMENT,
			titulo  TEXT NOT NULL,
			ano     TEXT NOT NULL,
			imdb_id TEXT NOT NULL UNIQUE,
			poster  TEXT
		)
	`);

	// Popula a tabela apenas se ela estiver vazia
	const { total } = db.prepare("SELECT COUNT(*) AS total FROM filmes").get();
	if (total === 0) {
		const inserir = db.prepare(
			"INSERT INTO filmes (titulo, ano, imdb_id) VALUES (?, ?, ?)",
		);
		for (const f of filmesIniciais) {
			inserir.run(f.titulo, f.ano, f.imdbId);
		}
	}

	return db;
}

// Mantém uma única conexão aberta (reaproveitada entre requisições,
// inclusive após o hot reload do `next dev`)
const db = globalThis.bancoFilmes ?? abrirBanco();
globalThis.bancoFilmes = db;

// Busca filmes por parte do título e/ou ano exato.
// Os nomes das colunas retornadas imitam o formato do OMDb.
export function buscarFilmes({ titulo = "", ano = "" }) {
	const consulta = db.prepare(`
		SELECT imdb_id AS imdbID,
		       titulo  AS Title,
		       ano     AS Year,
		       poster  AS Poster
		FROM filmes
		WHERE titulo LIKE ?
		  AND (? = '' OR ano = ?)
		ORDER BY ano, titulo
	`);
	return consulta.all(`%${titulo}%`, ano, ano);
}
