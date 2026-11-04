import Link from "next/link";

export default function Home() {
	return (
		<div>
			<div>
				<h1>Viva Santana!</h1>
				<Link href="/novarota">Nova rota</Link> <br />
				<br />
				<a href="/novarota">Nova rota, jeito antigo</a> <br />
				<br />
				<Link href="/rota1">Rota 1</Link> <br />
				<br />
				<a href="/rota1">Rota 1, jeito antigo</a> <br />
				<br />
				<Link href="/rota2">Rota2</Link> <br />
				<br />
				<a href="/rota2">Rota 2, jeito antigo</a> <br />
				<br />
			</div>
		</div>
	);
}
