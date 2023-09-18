import axios from '../../axios';
import type Flip from '../..';
import { Disbursement } from '../../utils/type/common';
import {
  DisbursementPayload,
  SpecialDisbursementPayload,
  DisbursementListQuery,
} from '../../utils/type/v3';
import { ListResponse, IdempotencyHeader } from '../../utils/type/common';
import { normalizeDisbursement } from '../../utils/normalizer/disbursement';
import {
  createDisbursementRequest,
  createSpecialDisbursementRequest,
} from '../../generator/disbursement/v3';
import { createIdempotencyKeyHeader } from '../../generator/common';
import { normalizeListResponse } from '../../utils/normalizer/common';
import BaseV3Class from './BaseClass';

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

class DisbursementClass extends BaseV3Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public get create() {
    const { baseUrl } = this;

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

  public get get() {
    const { baseUrl } = this;

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

export = DisbursementClass;
