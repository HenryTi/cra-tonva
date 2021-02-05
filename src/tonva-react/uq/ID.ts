import { Entity } from "./entity";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqID<M> extends Entity {
	get typeName() {return 'id'}
}

export class ID extends UqID<any> {	
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIDX<M> extends Entity {
	get typeName() {return 'idx'}
}

export class IDX extends UqIDX<any> {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqID2<M> extends Entity {
	get typeName() {return 'id2'}
}

export class ID2 extends UqID2<any> {
}

/* eslint-enable no-unused-vars */
