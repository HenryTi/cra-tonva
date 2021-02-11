import { Entity } from "./entity";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqID<M> extends Entity {
	get typeName() {return 'id'}
	render: (item:M) => JSX.Element;
	setRender(render:(item:M) => JSX.Element) {
		this.render = render;
	}
}

export class ID extends UqID<any> {	
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIDX<M> extends Entity {
	get typeName() {return 'idx'}
	render: (item:M) => JSX.Element;
	setRender(render:(item:M) => JSX.Element) {
		this.render = render;
	}
}

export class IDX extends UqIDX<any> {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIX<M> extends Entity {
	get typeName() {return 'ix'}
	render: (item:M) => JSX.Element;
	setRender(render:(item:M) => JSX.Element) {
		this.render = render;
	}
}

export class IX extends UqIX<any> {
}

/* eslint-enable no-unused-vars */
