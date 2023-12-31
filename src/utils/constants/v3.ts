export const DISBURSEMENT_STATUS = {
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  DONE: 'DONE',
} as const;

export const DISBURSEMENT_REASON = {
  INACTIVE_ACCOUNT: 'INACTIVE_ACCOUNT',
  NOT_REGISTERED_ACCOUNT: 'NOT_REGISTERED_ACCOUNT',
  CANT_RECEIVE_TRANSFER: 'CANT_RECEIVE_TRANSFER',
  INTERMITTENT_DISTURBANCE_ON_BENEFICIARY_BANK:
    'INTERMITTENT_DISTURBANCE_ON_BENEFICIARY_BANK',
  BENEFICIARY_ACCOUNT_NOT_VERIFIED: 'BENEFICIARY_ACCOUNT_NOT_VERIFIED',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
} as const;
