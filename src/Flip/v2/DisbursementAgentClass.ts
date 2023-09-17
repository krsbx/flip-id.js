import axios from '../../axios';
import type Flip from '../..';
import {
  Disbursement,
  DisbursementAgentPayload,
  DisbursementAgentListQuery,
  IdempotencyHeader,
  ListResponse,
} from '../../utils/type';
import { createDisbursementAgentRequest } from '../../generator/disbursement/v2';
import { createIdempotencyKeyHeader } from '../../generator/common';
import { normalizeDisbursement } from '../../utils/common';
import { normalizeListResponse } from '../../utils/normalizer/common';

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

class DisbursementAgentClass {
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

  async create(payload: DisbursementAgentPayload, header: IdempotencyHeader) {
    const { data } = await axios.post<Disbursement>(
      `${this.#baseUrl}/agent-disbursements`,
      createDisbursementAgentRequest(payload),
      createIdempotencyKeyHeader(header)
    );

    return normalizeDisbursement(data);
  }

  get get() {
    const baseUrl = this.#baseUrl;

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

export default DisbursementAgentClass;
