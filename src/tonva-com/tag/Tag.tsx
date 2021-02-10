import { ReactElement, useEffect, useState } from "react";
import { MidTag } from "./Mid";

type TypeNames = [string, string[]];

export function Tag(props: {qTag:MidTag, id:number, onClick?:()=>void; render?: (typeNamesArr:TypeNames[]) => ReactElement}) {
	let {qTag: tagUQs, id, onClick, render} = props;
	const [typeNamesArr, setTypeNamesArr] = useState<TypeNames[]>(undefined);
	useEffect(() => {
		async function loadTags() {
			let ret = await tagUQs.load(id);
			let arr:TypeNames[] = []
			let typeNamesObj:{[type:string]:TypeNames} = {};
			for (let item of ret) {
				let {type, name} = item;
				if (!type) continue;
				let typeNames = typeNamesObj[type];
				if (!typeNames) {
					typeNamesObj[type] = typeNames = [type, [name]];
					arr.push(typeNames);
				}
				else {
					typeNames[1].push(name);
				}
			}
			setTypeNamesArr(arr);
		};
		loadTags();
	}, []);

	if (render) return render(typeNamesArr);
	return (<div onClick={onClick}>
		{
			typeNamesArr === undefined? 
			<>...</>
			:
			typeNamesArr.map(v => {
				return <span key={v[0]} className="mr-2">[
					<b>{v[0]}</b>: 
					{v[1].join()}
				]</span>;
			})
		}
	</div>);
}

export function Example() {
	const [count, setCount] = useState(0);
  
	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
	  // Update the document title using the browser API
	  document.title = `You clicked ${count} times`;
	});
  
	return (
	  <div>
		<p>You clicked {count} times</p>
		<button onClick={() => setCount(count + 1)}>
		  Click me
		</button>
	  </div>
	);
  }