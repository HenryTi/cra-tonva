import { ReactElement, useEffect, useState } from "react";
import { UQs } from "UqApp";

export class TagUQs {
	private uqs: UQs;
	private tagID: string;
	private tagID2: string;
	constructor(uqs: UQs, tagID: string, tagID2: string) {
		this.uqs = uqs;
		this.tagID = tagID;
		this.tagID2 = tagID2;
	}

}

export function Tag(props: {tagUQs:TagUQs, id:number, render?: (tags:string[]) => ReactElement}) {
	let {render} = props;
	const [count, setCount] = useState(0);
	useEffect(() => {
		//setCount(1);
	});
	let tags:string[] = ['a'];

	if (render) return render(tags);
	let click = () => {
		setCount(count + 1);
	}
	return (<div>
		<p>{count}</p>
		<span onClick={click}>TTTTT {count} TAG</span>
		<button onClick={() => setCount(count + 1)}>
		  Click me
		</button>
		<button onClick={() => setCount(count + 1)}>
		  Click me
		</button>
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