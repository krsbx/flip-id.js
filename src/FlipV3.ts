import type Flip from '.';
import axios from './axios';
import { normalizeDisbursement } from './common';
import {
  CreateDisbursementPayload,
  CreateSpecialDisbursementPayload,
  Disbursement,
  DisbursementAgentQuery,
  IdempotencyHeader,
} from './type';

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
    payload: CreateDisbursementPayload,
    header: IdempotencyHeader
  ) {
    const { data } = await axios.post<Disbursement>(
      `${this.baseUrl}/disbursement`,
      {
        account_number: payload.accountNumber,
        amount: payload.amount,
        bank_code: payload.bankCode,
        remark: payload.remark,
        recipient_city: payload.recipientCity,
        beneficiary_email: payload.beneficiaryEmail
          ? (Array.isArray(payload.beneficiaryEmail)
              ? payload.beneficiaryEmail
              : [payload.beneficiaryEmail]
            ).join(',')
          : undefined,
      },
      {
        headers: {
          'idempotency-key': header.idempotencyKey,
          'X-TIMESTAMP': header.xTimestamp,
        },
      }
    );

    return normalizeDisbursement(data);
  }

  public async getDisbursementList(
    query: DisbursementAgentQuery = {},
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
    payload: CreateSpecialDisbursementPayload,
    header: IdempotencyHeader
  ) {
    const { data } = await axios.post<Disbursement>(
      `${this.baseUrl}/special-disbursement`,
      {
        account_number: payload.accountNumber,
        bank_code: payload.bankCode,
        amount: payload.amount,
        remark: payload.remark,
        recipient_city: payload.recipientCity,
        sender_country: payload.senderCountry,
        sender_place_of_birth: payload.senderPlaceOfBirth,
        sender_date_of_birth: payload.senderDateOfBirth,
        sender_identity_type: payload.senderIdentityType,
        sender_name: payload.senderName,
        sender_address: payload.senderAddress,
        sender_identity_number: payload.senderIdentityNumber,
        sender_job: payload.senderJob,
        direction: payload.direction,
        beneficiary_email: payload.beneficiaryEmail
          ? (Array.isArray(payload.beneficiaryEmail)
              ? payload.beneficiaryEmail
              : [payload.beneficiaryEmail]
            ).join(',')
          : undefined,
      },
      {
        headers: {
          'idempotency-key': header.idempotencyKey,
          'X-TIMESTAMP': header.xTimestamp,
        },
      }
    );

    return normalizeDisbursement(data);
  }
}

export = FlipV3;
