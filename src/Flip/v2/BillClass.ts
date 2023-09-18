import axios from '../../axios';
import type Flip from '../..';
import { Bill, BillPayload, EditBillPayload } from '../../utils/type/v2';
import { createBillRequest, editBillRequest } from '../../generator/payment/v2';
import { normalizeBill } from '../../utils/normalizer/payment';
import BaseV2Class from './BaseClass';

class BillClass extends BaseV2Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public async create(payload: BillPayload) {
    const { data } = await axios.post<Bill>(
      `${this.baseUrl}/pwf/bill`,
      createBillRequest(payload)
    );

    return normalizeBill(data);
  }

  public async edit(billId: number, payload: EditBillPayload) {
    const { data } = await axios.put<Bill>(
      `${this.baseUrl}/pwf/${billId}bill`,
      editBillRequest(payload)
    );

    return normalizeBill(data);
  }

  public get get() {
    const { baseUrl } = this;

    return {
      async byId(billId: number) {
        const { data } = await axios.get<Bill>(`${baseUrl}/pwf/${billId}bill`);

        return normalizeBill(data);
      },
      async list() {
        const { data } = await axios.get<Bill[]>(`${baseUrl}/pwf/bill`);

        return data.map(normalizeBill);
      },
    };
  }
}

export = BillClass;
