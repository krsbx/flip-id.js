import axios from '../../axios';
import type Flip from '../..';
import { Disbursement } from '../../utils/type/common';
import {
  DisbursementAgentPayload,
  DisbursementAgentListQuery,
} from '../../utils/type/v2';
import { IdempotencyHeader, ListResponse } from '../../utils/type/common';
import { createDisbursementAgentRequest } from '../../generator/disbursement/v2';
import { createIdempotencyKeyHeader } from '../../generator/common';
import { normalizeDisbursement } from '../../utils/normalizer/disbursement';
import { normalizeListResponse } from '../../utils/normalizer/common';
import BaseV2Class from './BaseClass';

function getListQueries(query: DisbursementAgentListQuery) {
  [
    typeof query.agentId !== 'undefined' && `agent_id=${query.agentId}`,
    typeof query.pagination !== 'undefined' && `pagination=${query.pagination}`,
    typeof query.page !== 'undefined' && `page=${query.page}`,
    typeof query.sort !== 'undefined' && `sort=${query.sort}`,
  ]
    .filter((item) => item)
    .join('&');
}

class DisbursementAgentClass extends BaseV2Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public async create(
    payload: DisbursementAgentPayload,
    header: IdempotencyHeader
  ) {
    const { data } = await axios.post<Disbursement>(
      `${this.baseUrl}/agent-disbursements`,
      createDisbursementAgentRequest(payload),
      createIdempotencyKeyHeader(header)
    );

    return normalizeDisbursement(data);
  }

  public get get() {
    const { baseUrl } = this;

    return {
      async byId(transactionId: string) {
        const { data } = await axios.get<Disbursement>(
          `${baseUrl}/agent-disbursements/${transactionId}`
        );

        return normalizeDisbursement(data);
      },
      async list(query: DisbursementAgentListQuery = {}) {
        const { data } = await axios.get<ListResponse<Disbursement>>(
          `${baseUrl}/agent-disbursements?${getListQueries(query)}`
        );

        return normalizeListResponse(data, normalizeDisbursement);
      },
    };
  }
}

export = DisbursementAgentClass;
