import axios from '../../axios';
import type Flip from '../..';
import { Bill, BillPayload, EditBillPayload } from '../../utils/type';
import { createBillRequest, editBillRequest } from '../../generator/payment/v2';
import { normalizeBill } from '../../utils/common';

class BillClass {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  get #baseUrl() {
    if (this.#flip.toSendBox) {
      return 'big_sandbox_api/v2';
    }

    return 'api/v2';
  }

  async create(payload: BillPayload) {
    const { data } = await axios.post<Bill>(
      `${this.#baseUrl}/pwf/bill`,
      createBillRequest(payload)
    );

    return normalizeBill(data);
  }

  async edit(id: string, payload: EditBillPayload) {
    const { data } = await axios.put<Bill>(
      `${this.#baseUrl}/pwf/${id}bill`,
      editBillRequest(payload)
    );

    return normalizeBill(data);
  }

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async byId(id: string) {
        const { data } = await axios.get<Bill>(`${baseUrl}/pwf/${id}bill`);

        return normalizeBill(data);
      },
      async list() {
        const { data } = await axios.get<Bill[]>(`${baseUrl}/pwf/bill`);

        return data.map(normalizeBill);
      },
    };
  }
}

export default BillClass;
