export const FLIP_API_VERSION = {
  V2: 'v2',
  V3: 'v3',
} as const;

export const BANK_STATUS = {
  OPERATIONAL: 'OPERATIONAL',
  DISTRIBUTED: 'DISTURBED',
  HEAVILY_DISTURBED: 'HEAVILY_DISTURBED',
} as const;

export const INQUIRY_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  INVALID_ACCOUNT_NUMBER: 'INVALID_ACCOUNT_NUMBER',
  SUSPECTED_ACCOUNT: 'SUSPECTED_ACCOUNT',
  BLACK_LISTED: 'BLACK_LISTED',
  FAILED: 'FAILED',
  CLOSED: 'CLOSED',
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

export const DISBURSEMENT_STATUS = {
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
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

export const CREATED_FROM = {
  API: 'API',
  DASHBOARD: 'DASHBOARD',
} as const;

export const IDENTITY_TYPE = {
  NATIONAL_ID: 'nat_id',
  DRIVING_LICENSE: 'drv_lic',
  PASSPORT: 'passport',
  BANK_ACCOUNT: 'bank_acc',
} as const;

export const BILL_TYPE = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
} as const;

export const BILL_STATUS = {
  NOT_CONFIRMED: 'NOT_CONFIRMED',
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
  DONE: 'DONE',
} as const;

export const PAYMENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export const BANK_TYPE = {
  BANK_ACCOUNT: 'bank_account',
  VIRTUAL_ACCOUNT: 'virtual_account',
  WALLET_ACCOUNT: 'wallet_account',
} as const;

export const CITY_COUNTRY_LIST_TYPE = {
  CITY: 'city',
  CITY_COUNTRY: 'city-country',
  COUNTRY: 'country',
} as const;

export const CITY_DISTRICT_COUNTRY_LIST_TYPE = {
  COUNTRY: 'countries',
  PROVINCES: 'provinces',
  CITY: 'cities',
  DISTRICT: 'districts',
} as const;

export const TRANSACTION_TYPE = {
  C2C: 'C2C',
  C2B: 'C2B',
  B2C: 'B2C',
  B2B: 'B2B',
} as const;

export const PAYMENT_TYPE = {
  REAL_TIME: 'Real Time',
  SAME_DAY: 'Same Day',
} as const;

export const JOB = {
  HOUSE_WIFE: 'housewife',
  ENTERPRENEUR: 'entrepreneur',
  PRIVATE_EMPLOYEE: 'private_employee',
  GOVERNMENT_EMPLOYEE: 'government_employee',
  FOUNDATION_BOARD: 'foundation_board',
  INDONESIA_MIGRANT_WORKER: 'indonesia_migrant_worker',
  OTHERS: 'others',
} as const;
