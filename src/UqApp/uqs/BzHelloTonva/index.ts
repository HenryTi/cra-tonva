import { UqExt as Uq } from './BzHelloTonva';
import * as Customer from './Customer.ui';
import * as OrderMaster from './OrderMaster.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as Tag from './Tag.ui';
import * as CustomerTag from './CustomerTag.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.Customer, Customer);
	Object.assign(uq.OrderMaster, OrderMaster);
	Object.assign(uq.OrderDetail, OrderDetail);
	Object.assign(uq.Tag, Tag);
	Object.assign(uq.CustomerTag, CustomerTag);
}
export * from './BzHelloTonva';
