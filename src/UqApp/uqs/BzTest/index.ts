import { UqExt as Uq } from './BzTest';
import * as X1 from './X1.ui';
import * as Vid1 from './Vid1.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMaster from './OrderMaster.ui';
import * as Tag from './Tag.ui';
import * as IBook1 from './IBook1.ui';
import * as Assign1 from './Assign1.ui';
import * as CustomerTag from './CustomerTag.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.X1, X1);
	Object.assign(uq.Vid1, Vid1);
	Object.assign(uq.OrderDetail, OrderDetail);
	Object.assign(uq.OrderMaster, OrderMaster);
	Object.assign(uq.Tag, Tag);
	Object.assign(uq.IBook1, IBook1);
	Object.assign(uq.Assign1, Assign1);
	Object.assign(uq.CustomerTag, CustomerTag);
}
export * from './BzTest';
