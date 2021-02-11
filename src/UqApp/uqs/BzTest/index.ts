import { UqExt as Uq } from './BzTest';
import { renderX1 } from './X1.render';
import { renderVid1 } from './Vid1.render';
import { renderOrderDetail } from './OrderDetail.render';
import { renderOrderMaster } from './OrderMaster.render';
import { renderTag } from './Tag.render';
import { renderIBook1 } from './IBook1.render';
import { renderAssign1 } from './Assign1.render';
import { renderCustomerTag } from './CustomerTag.render';

export function setRenders(uq: Uq) {
	uq.X1.setRender(renderX1);
	uq.Vid1.setRender(renderVid1);
	uq.OrderDetail.setRender(renderOrderDetail);
	uq.OrderMaster.setRender(renderOrderMaster);
	uq.Tag.setRender(renderTag);
	uq.IBook1.setRender(renderIBook1);
	uq.Assign1.setRender(renderAssign1);
	uq.CustomerTag.setRender(renderCustomerTag);
}
export * from './BzTest';
