import Rota1 from "./rota1/page";
import Rota2 from "./rota2/page";
import {Teste1} from "./rota1/page";
import {Teste2} from "./rota2/page";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<Image
					className="dark:invert h-5 w-[100px]"
					src="/next.svg"
					alt="Next.js logo"
					width={100}
					height={20}
					priority
				/>
				<Rota1 />
				<Rota2 />
				<Teste1 />
				<Teste2 />
			</main>
		</div>
	);
}
