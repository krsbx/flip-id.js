import axios from '../../axios';
import type Flip from '../..';
import { ListResponse, IdempotencyHeader } from '../../utils/type/common';
import {
  ExchangeRate,
  InternationalFormData,
  InternationalTransfer,
  TransactionType,
  InternationalTransferListQuery,
} from '../../utils/type/v2';
import {
  normalizeExchangeRate,
  normalizeInternationalFormData,
  normalizeInternationalTransfer,
} from '../../utils/normalizer/international';
import { normalizeListResponse } from '../../utils/normalizer/common';
import { createIdempotencyKeyHeader } from '../../generator/common';
import BaseV2Class from './BaseClass';

function getListQueries(query: InternationalTransferListQuery) {
  return [
    typeof query.pagination !== 'undefined' && `pagination=${query.pagination}`,
    typeof query.page !== 'undefined' && `page=${query.page}`,
    typeof query.sortBy !== 'undefined' && `sort_by=${query.sortBy}`,
  ]
    .filter((item) => item)
    .join('&');
}

class InternationalClass extends BaseV2Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public get create() {
    const { baseUrl } = this;

    return {
      get transfer() {
        return {
          async c2c(payload: unknown, header: IdempotencyHeader) {
            const { data } = await axios.post<InternationalTransfer>(
              `${baseUrl}/international-disbursement`,
              payload,
              createIdempotencyKeyHeader(header)
            );

            return normalizeInternationalTransfer(data);
          },
          async c2b(payload: unknown, header: IdempotencyHeader) {
            return this.c2c(payload, header);
          },
          async b2c(payload: unknown, header: IdempotencyHeader) {
            const { data } = await axios.post<InternationalTransfer>(
              `${baseUrl}/international-disbursement/create-with-attachment`,
              payload,
              createIdempotencyKeyHeader(header)
            );

            return normalizeInternationalTransfer(data);
          },
          async b2b(payload: unknown, header: IdempotencyHeader) {
            return this.b2c(payload, header);
          },
        };
      },
    };
  }

  public get get() {
    const { baseUrl } = this;

    return {
      async exchangeRate(
        transactionType: TransactionType,
        countryCode: string = ''
      ) {
        const { data } = await axios.get<ExchangeRate[]>(
          `${baseUrl}/international-disbursement/exchange-rates?${[
            `transaction_type=${transactionType}`,
            countryCode && `country_iso_code=${countryCode}`,
          ]
            .map((item) => item)
            .join('&')}`
        );

        return data.map(normalizeExchangeRate);
      },
      async formData(transactionType: TransactionType, countryCode: string) {
        const { data } = await axios.get<InternationalFormData>(
          `${baseUrl}/international-disbursement/form-data?${[
            `transaction_type=${transactionType}`,
            `country_iso_code=${countryCode}`,
          ]
            .map((item) => item)
            .join('&')}`
        );

        return normalizeInternationalFormData(data);
      },
      get transfer() {
        return {
          async byId(transactionId: string) {
            const { data } = await axios.get<InternationalTransfer>(
              `${baseUrl}/international-disbursement/${transactionId}`
            );

            return normalizeInternationalTransfer(data);
          },
          async list(query: InternationalTransferListQuery = {}) {
            const { data } = await axios.get<
              ListResponse<InternationalTransfer>
            >(`${baseUrl}/international-disbursement?${getListQueries(query)}`);

            return normalizeListResponse(data, normalizeInternationalTransfer);
          },
        };
      },
    };
  }
}

export = InternationalClass;
