import fs from "fs";
import { capitalCase } from "tonva-react/tool";
import { ID, IDX, IX } from "../ID";
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
		imports += `\nimport * as ${cName} from './${cName}.ui';`;
		sets += `\n	Object.assign(uq.${cName}, ${cName});`;

		let tsUI = `import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldUI, FieldUIString } from "tonva-react";
import { ${cName} } from "./${uqAlias}";

export function render(item: ${cName}):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
`;

		let tsFieldItems:string = buildFieldItems(i);
		let tsFieldUIs:string = buildFieldUIs(i);

		tsUI += `\n` + tsFieldItems 
			+ `/*==fieldItems==\n` + tsFieldItems + `==fieldItems==*/\n`;
		tsUI += `\n` + tsFieldUIs
			+ `/*==fieldUIs==\n` + tsFieldUIs + `==fieldUIs==*/\n`;

		tsUI += `
export const ui:UI = {
	label: "${cName}",
	fieldItems,
	fieldUIs,
};
`;

		tsUI += `
export const res:Res<any> = {
	zh: {
	},
	en: {
	}
};
`;
		saveTsFileIfNotExists(uqFolder, `${cName}.ui`, tsUI, 'tsx');
		replaceTsFileString(uqFolder, `${cName}.ui`, 'tsx', 
			[
				{begin:'/*==fieldItems==\n', end: '==fieldItems==*/\n', content:tsFieldItems},
				{begin:'/*==fieldUIs==\n', end: '==fieldUIs==*/\n', content:tsFieldUIs},
			]);
	}

	let tsIndex = `import { UqExt as Uq } from './${uqAlias}';${imports}

export function setUI(uq: Uq) {${sets}
}
export * from './${uqAlias}';
`;
	overrideTsFile(uqFolder, 'index', tsIndex);
}

function buildFieldItems(i:ID|IDX|IX):string {
	switch (i.typeName) {
		case 'id': return buildIDFieldItems(i);
		case 'idx': return buildIDXFieldItems(i);
		case 'ix': return buildIXFieldItems(i);
	}
};

function buildIDFieldItems(ID:ID):string {
	let ts = `const fieldItems:FieldItem[] = [`;
	let {schema} = ID;
	let {keys, fields} = schema;
	for (let f of fields) {
		let {name} = f;
		let isKey = (keys as any[]).findIndex(v => v.name === name) >= 0;
		ts += `\n${buildFieldItem(f, isKey)},`;
	}

	ts += `\n];\n`;
	return ts;
}
function buildIDXFieldItems(IDX:IDX):string {
	return `const fieldItems:FieldItem[] = [
// IDX
];
`;
};

function buildIXFieldItems(IX:IX):string {
	return `const fieldItems:FieldItem[] = [
// IX
];
`;
};


function buildFieldUIs(i:ID|IDX|IX):string {
	switch (i.typeName) {
		case 'id': return buildIDFieldUIs(i);
		case 'idx': return buildIDXFieldUIs(i);
		case 'ix': return buildIXFieldUIs(i);
	}
};

function buildIDFieldUIs(ID:ID):string {
	return `const fieldUIs:{[name:string]:FieldUI} = {
	"a": {
		label: "中文",
		placeholder: undefined,
		// ID
		widget: "string",
	} as FieldUIString,
};
`;
};

function buildIDXFieldUIs(IDX:IDX):string {
	return `const fieldUIs:{[name:string]:FieldUI} = {
	"a": {
		label: "中文",
		placeholder: undefined,
		// IDX
		widget: "string",
	} as FieldUIString,
};
`;
};

function buildIXFieldUIs(IX:IX):string {
	return `const fieldUIs:{[name:string]:FieldUI} = {
	"a": {
		label: "中文",
		placeholder: undefined,
		// IX
		widget: "string",
	} as FieldUIString,
};
`;
};

function buildFieldItem(field:any, isKey:boolean, indent:number=1):string {
	let {name} = field;
	let tab = '\t'.repeat(indent);
	let tab1 = tab + '\t';
	let ts = `${tab}{`;
	ts += `\n${tab1}name: '${name}',`;	
	ts += `\n${tab1}key: ${isKey},`;
	ts += `\n${tab}}`;
	return ts;
}

function buildFieldUI(field:any):string {
	return '';
}

interface ReplaceSection {
	begin: string;
	end: string;
	content: string;
};
function replaceTsFileString(uqFolder:string, file:string, suffix:string, secs:ReplaceSection[]) {
	let path = `${uqFolder}/${file}.${suffix}`;
	let text = fs.readFileSync(path).toString();
	for (let sec of secs) {
		let {begin, end, content} = sec;		
		let b = text.indexOf(begin);
		if (b < 0) continue;
		let e = text.indexOf(end);
		if (e < 0) continue;
		text = text.substring(0, b) + begin + content + text.substr(e);
	}
	fs.writeFileSync(path, text);
}
