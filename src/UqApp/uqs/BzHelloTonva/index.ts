import { UqExt as Uq } from './BzHelloTonva';
import { renderCustomer } from './Customer.render';
import { renderOrderMaster } from './OrderMaster.render';
import { renderOrderDetail } from './OrderDetail.render';
import { renderTag } from './Tag.render';
import { renderCustomerTag } from './CustomerTag.render';

export function setRenders(uq: Uq) {
	uq.Customer.setRender(renderCustomer);
	uq.OrderMaster.setRender(renderOrderMaster);
	uq.OrderDetail.setRender(renderOrderDetail);
	uq.Tag.setRender(renderTag);
	uq.CustomerTag.setRender(renderCustomerTag);
}
export * from './BzHelloTonva';
