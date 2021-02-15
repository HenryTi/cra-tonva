import { Res } from "tonva-react/res";
import { Entity } from "./entity";
import { FieldItem, Render, UI, FieldUI} from '../ui';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqID<M> extends Entity {
	get typeName() {return 'id'}
	readonly ui: UI;
	readonly render: Render<M>;
	readonly res: Res<any>;
}

export class ID extends UqID<any> {	
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIDX<M> extends Entity {
	get typeName() {return 'idx'}
	readonly ui: UI;
	readonly render: Render<M>;
	readonly res: Res<any>;
}

export class IDX extends UqIDX<any> {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIX<M> extends Entity {
	get typeName() {return 'ix'}
	readonly ui: UI;
	readonly render: Render<M>;
	readonly res: Res<any>;
}

export class IX extends UqIX<any> {
}

/* eslint-enable no-unused-vars */
