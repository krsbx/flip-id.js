import axios from '../../axios';
import type Flip from '../..';
import {
  ExchangeRate,
  InternationalFormData,
  InternationalTransfer,
  ListResponse,
  TransactionType,
  InternationalTransferListQuery,
  IdempotencyHeader,
} from '../../utils/type';
import {
  normalizeExchangeRate,
  normalizeInternationalFormData,
  normalizeInternationalTransfer,
} from '../../utils/normalizer/international';
import { normalizeListResponse } from '../../utils/normalizer/common';
import { createIdempotencyKeyHeader } from '../../generator/common';

function getListQueries(query: InternationalTransferListQuery) {
  return [
    typeof query.pagination !== 'undefined' && `pagination=${query.pagination}`,
    typeof query.page !== 'undefined' && `page=${query.page}`,
    typeof query.sortBy !== 'undefined' && `sort_by=${query.sortBy}`,
  ]
    .filter((item) => item)
    .join('&');
}

class InternationalClass {
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

  get create() {
    const baseUrl = this.#baseUrl;

    return {
      get transfer() {
        return {
          async c2c(payload: unknown, header: IdempotencyHeader) {
            const { data } = await axios.post<InternationalTransfer>(
              `${baseUrl}/international-disbursement`,
              payload,
              createIdempotencyKeyHeader(header)
            );

            return data;
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

            return data;
          },
          async b2b(payload: unknown, header: IdempotencyHeader) {
            return this.b2c(payload, header);
          },
        };
      },
    };
  }

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async exchangeRate(
        transactionType: TransactionType,
        countryCode: string = ''
      ) {
        const { data } = await axios.get<ExchangeRate>(
          `${baseUrl}/international-disbursement/exchange-rates?${[
            `transaction_type=${transactionType}`,
            countryCode && `country_iso_code=${countryCode}`,
          ]
            .map((item) => item)
            .join('&')}`
        );

        return normalizeExchangeRate(data);
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
      async byId(transactionId: string) {
        const { data } = await axios.get<InternationalTransfer>(
          `${baseUrl}/international-disbursement/${transactionId}`
        );

        return normalizeInternationalTransfer(data);
      },
      async list(query: InternationalTransferListQuery = {}) {
        const { data } = await axios.get<ListResponse<InternationalTransfer>>(
          `${baseUrl}/international-disbursement?${getListQueries(query)}`
        );

        return normalizeListResponse(data, normalizeInternationalTransfer);
      },
    };
  }
}

export = InternationalClass;
