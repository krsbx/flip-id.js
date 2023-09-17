import type Flip from '..';
import axios from '../axios';
import { normalizeDisbursement } from '../utils/normalizer/disbursement';
import { createIdempotencyKeyHeader } from '../generator/common';
import {
  createDisbursementRequest,
  createSpecialDisbursementRequest,
} from '../generator/disbursement/v3';
import {
  DisbursementPayload,
  SpecialDisbursementPayload,
  Disbursement,
  DisbursementListQuery,
  IdempotencyHeader,
} from '../utils/type';

class FlipV3 {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  private get flip() {
    return this.#flip;
  }

  private get baseUrl() {
    if (this.flip.toSendBox) {
      return 'big_sandbox_api/v3';
    }

    return 'api/v3';
  }

  public async createDisbursement(
    payload: DisbursementPayload,
    header: IdempotencyHeader
  ) {
    const { data } = await axios.post<Disbursement>(
      `${this.baseUrl}/disbursement`,
      createDisbursementRequest(payload),
      createIdempotencyKeyHeader(header)
    );

    return normalizeDisbursement(data);
  }

  public async getDisbursementList(
    query: DisbursementListQuery = {},
    attribute: [string, string][] = []
  ) {
    const { data } = await axios.get<{
      total_data: number;
      data_per_page: number;
      total_page: number;
      page: number;
      data: Disbursement[];
    }>(
      `${this.baseUrl}/disbursements?${[
        typeof query.page !== 'undefined' && `page=${query.page}`,
        typeof query.pagination !== 'undefined' &&
          `pagination=${query.pagination}`,
        typeof query.sort !== 'undefined' && `.sort=${query.sort}`,
        ...attribute.map(([key, value]) => `${key}=${value}`),
      ]
        .filter((item) => item)
        .join('&')}`
    );

    return {
      totalData: data.total_data,
      dataPerPage: data.data_per_page,
      totalPage: data.total_page,
      page: data.page,
      data: data.data.map(normalizeDisbursement),
    };
  }

  private async getDisbursement(param: [string, string]) {
    const { data } = await axios.get<Disbursement>(
      `${this.baseUrl}/get-disbursement?${param[0]}=${param[1]}`
    );

    return normalizeDisbursement(data);
  }

  public async getDisbursementByIdempotencyKey(idempotencyKey: string) {
    return this.getDisbursement(['idempotency_key', idempotencyKey]);
  }

  public async getDisbursementById(id: string) {
    return this.getDisbursement(['id', id]);
  }

  public async createSpecialDisbursement(
    payload: SpecialDisbursementPayload,
    header: IdempotencyHeader
  ) {
    const { data } = await axios.post<Disbursement>(
      `${this.baseUrl}/special-disbursement`,
      createSpecialDisbursementRequest(payload),
      createIdempotencyKeyHeader(header)
    );

    return normalizeDisbursement(data);
  }
}

export default FlipV3;
