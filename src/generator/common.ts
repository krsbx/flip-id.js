import { IdempotencyHeader } from '../utils/type/common';

export function createIdempotencyKeyHeader(header: IdempotencyHeader) {
  return {
    headers: {
      'idempotency-key': header.idempotencyKey,
      'X-TIMESTAMP': header.xTimestamp,
    },
  };
}
