import axios from '../../axios';
import type Flip from '../..';
import {
  ListResponse,
  BillPayment,
  PaymentListQuery,
  ConfirmPayment,
} from '../../utils/type';
import { normalizeListResponse } from '../../utils/normalizer/common';
import { normalizeBillPayment } from '../../utils/normalizer/payment';

function getByIdQueries(query: PaymentListQuery) {
  return [
    typeof query.startDate !== 'undefined' && `start_date=${query.startDate}`,
    typeof query.endDate !== 'undefined' && `end_date=${query.endDate}`,
    typeof query.pagination !== 'undefined' && `pagination=${query.pagination}`,
    typeof query.page !== 'undefined' && `page=${query.page}`,
    typeof query.sortBy !== 'undefined' && `sort_by=${query.sortBy}`,
    typeof query.sortType !== 'undefined' && `sort_type=sort_${query.sortType}`,
  ]
    .filter((item) => item)
    .join('&');
}

class PaymentClass {
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

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async byId(billId: string, query: PaymentListQuery = {}) {
        const { data } = await axios.get<ListResponse<BillPayment>>(
          `${baseUrl}/pwf/${billId}/payment?${getByIdQueries(query)}`
        );

        return normalizeListResponse(data, normalizeBillPayment);
      },
      async list(query: PaymentListQuery = {}) {
        const { data } = await axios.get<ListResponse<BillPayment>>(
          `${baseUrl}/pwf/payment?${getByIdQueries(query)}`
        );

        return normalizeListResponse(data, normalizeBillPayment);
      },
    };
  }

  async confirm(transactionId: string) {
    const { data } = await axios.put<ConfirmPayment>(
      `${this.#baseUrl}/pwf/bill-payment/${transactionId}/confirm`
    );

    return data;
  }
}

export = PaymentClass;
