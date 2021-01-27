import { Entity } from "./entity";

export class UqID<M> extends Entity {
	get typeName() {return 'id'}
}

export class ID extends UqID<any> {	
}

export class UqIDX<M> extends Entity {
	get typeName() {return 'idx'}
}

export class IDX extends UqIDX<any> {
}

export class UqID2<M> extends Entity {
	get typeName() {return 'id2'}
}

export class ID2 extends UqID2<any> {
}
