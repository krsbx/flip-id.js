export const BANK_TYPE = {
  BANK_ACCOUNT: 'bank_account',
  VIRTUAL_ACCOUNT: 'virtual_account',
  WALLET_ACCOUNT: 'wallet_account',
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

export const BANK_STATUS = {
  OPERATIONAL: 'OPERATIONAL',
  DISTRIBUTED: 'DISTURBED',
  HEAVILY_DISTURBED: 'HEAVILY_DISTURBED',
} as const;

export const CITY_COUNTRY_LIST_TYPE = {
  CITY: 'city',
  CITY_COUNTRY: 'city-country',
  COUNTRY: 'country',
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
