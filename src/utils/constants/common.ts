export const IDENTITY_TYPE = {
  NATIONAL_ID: 'nat_id',
  DRIVING_LICENSE: 'drv_lic',
  PASSPORT: 'passport',
  BANK_ACCOUNT: 'bank_acc',
} as const;

export const JOB = {
  HOUSE_WIFE: 'housewife',
  ENTERPRENEUR: 'entrepreneur',
  PRIVATE_EMPLOYEE: 'private_employee',
  GOVERNMENT_EMPLOYEE: 'government_employee',
  FOUNDATION_BOARD: 'foundation_board',
  INDONESIA_MIGRANT_WORKER: 'indonesia_migrant_worker',
  COMPANY: 'company',
  OTHERS: 'others',
} as const;

export const CREATED_FROM = {
  API: 'API',
  DASHBOARD: 'DASHBOARD',
} as const;

export const TRANSACTION_DIRECTION = {
  DOMESTIC_TRANSFER: 'DOMESTIC_TRANSFER',
  DOMESTIC_SPECIAL_TRANSFER: 'DOMESTIC_SPECIAL_TRANSFER',
  FOREIGN_INBOUND_SPECIAL_TRANSFER: 'FOREIGN_INBOUND_SPECIAL_TRANSFER',
} as const;

export const DISBURSEMENT_ORDER = {
  ID: 'id',
  AMOUNT: 'amount',
  STATUS: 'status',
} as const;

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
} as const;
