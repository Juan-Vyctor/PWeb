const carregarDiv = (
	cs,
	id = "dinossauroDiv",
	cabecalhos = ["Nome científico", "Nome comum", "Localização"],
	propriedades = ["binomialName", "commonName", "location"],
) => {
	const div = document.getElementById(id);
	const cabecalhosHtml = cabecalhos.map(
		(item) =>
			` <th style=" border: 1px solid black; padding: 10px; background-color: lightgray; "> ${item} </th> `,
	);
	const itensHtml = cs.map(
		(item) =>
			` <tr> ${propriedades.map((propriedade) => ` <td style=" border: 1px solid black; padding: 10px; "> ${item[propriedade]} </td> `).join("")} </tr> `,
	);
	div.innerHTML = ` <table style=" border-collapse: collapse; margin-top: 20px; text-align: center; "> <tr> ${cabecalhosHtml.join("")} </tr> ${itensHtml.join("")} </table> `;
};