import axios from '../../axios';
import type Flip from '../..';
import {
  Disbursement,
  DisbursementPayload,
  SpecialDisbursementPayload,
  IdempotencyHeader,
  DisbursementListQuery,
  ListResponse,
} from '../../utils/type';
import { normalizeDisbursement } from '../../utils/normalizer/disbursement';
import {
  createDisbursementRequest,
  createSpecialDisbursementRequest,
} from '../../generator/disbursement/v3';
import { createIdempotencyKeyHeader } from '../../generator/common';
import { normalizeListResponse } from '../../utils/normalizer/common';

async function getDisbursement(baseUrl: string, param: [string, string]) {
  const { data } = await axios.get<Disbursement>(
    `${baseUrl}/get-disbursement?${param[0]}=${param[1]}`
  );

  return normalizeDisbursement(data);
}

function getListQueries(
  query: DisbursementListQuery,
  attribute: [string, string][] = []
) {
  return [
    typeof query.page !== 'undefined' && `page=${query.page}`,
    typeof query.pagination !== 'undefined' && `pagination=${query.pagination}`,
    typeof query.sort !== 'undefined' && `.sort=${query.sort}`,
    ...attribute.map(([key, value]) => `${key}=${value}`),
  ]
    .filter((item) => item)
    .join('&');
}

class DisbursementClass {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  get #baseUrl() {
    if (this.#flip.toSendBox) {
      return 'big_sandbox_api/v3';
    }

    return 'api/v3';
  }

  get create() {
    const baseUrl = this.#baseUrl;

    return {
      async normal(payload: DisbursementPayload, header: IdempotencyHeader) {
        const { data } = await axios.post<Disbursement>(
          `${baseUrl}/disbursement`,
          createDisbursementRequest(payload),
          createIdempotencyKeyHeader(header)
        );

        return normalizeDisbursement(data);
      },
      async special(
        payload: SpecialDisbursementPayload,
        header: IdempotencyHeader
      ) {
        const { data } = await axios.post<Disbursement>(
          `${baseUrl}/special-disbursement`,
          createSpecialDisbursementRequest(payload),
          createIdempotencyKeyHeader(header)
        );

        return normalizeDisbursement(data);
      },
    };
  }

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async byId(id: string) {
        return getDisbursement(baseUrl, ['id', id]);
      },
      async byIdempotencyKey(idempotencyKey: string) {
        return getDisbursement(baseUrl, ['idempotency_key', idempotencyKey]);
      },
      async list(
        query: DisbursementListQuery = {},
        attribute: [string, string][] = []
      ) {
        const { data } = await axios.get<ListResponse<Disbursement>>(
          `${baseUrl}/disbursement?${getListQueries(query, attribute)}`
        );

        return normalizeListResponse(data, normalizeDisbursement);
      },
    };
  }
}

export default DisbursementClass;
