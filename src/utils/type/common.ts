import {
  CREATED_FROM,
  DISBURSEMENT_ORDER,
  IDENTITY_TYPE,
  JOB,
  TRANSACTION_DIRECTION,
  GENDER,
} from '../constants/common';
import { DISBURSEMENT_REASON, DISBURSEMENT_STATUS } from '../constants/v3';

export type Job = (typeof JOB)[keyof typeof JOB];

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export type IdentityType = (typeof IDENTITY_TYPE)[keyof typeof IDENTITY_TYPE];

export type CreatedFrom = (typeof CREATED_FROM)[keyof typeof CREATED_FROM];

export type TransactionDirection =
  (typeof TRANSACTION_DIRECTION)[keyof typeof TRANSACTION_DIRECTION];

export type DisbursementSortAsc =
  (typeof DISBURSEMENT_ORDER)[keyof typeof DISBURSEMENT_ORDER];

export type DisbursementSortDesc = `-${DisbursementSortAsc}`;

export type DisbursementStatus =
  (typeof DISBURSEMENT_STATUS)[keyof typeof DISBURSEMENT_STATUS];

export type DisbursementReason =
  (typeof DISBURSEMENT_REASON)[keyof typeof DISBURSEMENT_REASON];

export type ListResponse<T> = {
  total_data: number;
  data_per_page: number;
  total_page: number;
  page: number;
  data: T[];
};

export type IdempotencyHeader = {
  idempotencyKey: string;
  xTimestamp: string;
};

export type DisbursementSender = {
  sender_name: string;
  place_of_birth: number;
  date_of_birth: string;
  address: string;
  sender_identity_type: IdentityType;
  sender_identity_number: string;
  sender_country: string;
  job: Job;
};

export type Disbursement = {
  id: number;
  user_id: number;
  amount: number;
  status: DisbursementStatus;
  reason: DisbursementReason;
  timestamp: string;
  bank_code: string;
  account_number: string;
  recipient_name: string;
  sender_bank: string;
  remark: string;
  receipt: string;
  time_served: string;
  bundle_id: number;
  company_id: number;
  recipient_city: number;
  created_from: CreatedFrom;
  direction: TransactionDirection;
  sender: DisbursementSender | null;
  fee: number;
  beneficiary_email: string;
  idempotency_key: string;
};
