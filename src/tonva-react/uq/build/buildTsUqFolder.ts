import fs from "fs";
import { capitalCase } from "tonva-react/tool";
import { UqMan } from "../uqMan";
import { buildUQ } from "./buildUQ";
import { buildTsHeader, overrideTsFile, saveTsFileIfNotExists } from "./tools";

export function buildTsUqFolder(uq: UqMan, uqsFolder:string, uqAlias:string) {
	let uqFolder = uqsFolder + '/' + uqAlias;
	if (fs.existsSync(uqFolder) === false) {
		fs.mkdirSync(uqFolder);
	}
	let tsUq = buildTsHeader();
	tsUq += buildUQ(uq, uqAlias);
	overrideTsFile(uqFolder, uqAlias, tsUq);

	saveTsIndexAndRender(uqFolder, uq, uqAlias);
}

function saveTsIndexAndRender(uqFolder:string, uq: UqMan, uqAlias:string) {
	let imports = '', sets = '';
	let {idArr, idxArr, ixArr} = uq;
	for (let i of [...idArr, ...idxArr, ...ixArr]) {
		let cName = capitalCase(i.name);
		imports += `\nimport { render${cName} } from './${cName}.render';`;
		sets += `\n	uq.${cName}.setRender(render${cName});`;

		let tsRender = `import { ${cName} } from "./${uqAlias}";

export function render${cName}(item: ${cName}):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
`;
		saveTsFileIfNotExists(uqFolder, `${cName}.render`, tsRender, 'tsx');
	}

	let tsIndex = `import { UqExt as Uq } from './${uqAlias}';${imports}

export function setRenders(uq: Uq) {${sets}
}
export * from './${uqAlias}';
`;
	overrideTsFile(uqFolder, 'index', tsIndex);
}

