import {
  BANK_STATUS,
  CREATED_FROM,
  DISBURSEMENT_ORDER,
  DISBURSEMENT_REASON,
  DISBURSEMENT_STATUS,
  FLIP_API_VERSION,
  IDENTITY_TYPE,
  INQUIRY_STATUS,
  TRANSACTION_DIRECTION,
} from './constants';

export type FlipApiVersion =
  | (typeof FLIP_API_VERSION)[keyof typeof FLIP_API_VERSION]
  | (string & NonNullable<unknown>);

export type BankStatus = (typeof BANK_STATUS)[keyof typeof BANK_STATUS];

export type BankInquiryPayload = {
  accountNumber: number;
  bankCode: string;
  inquiryKey: string;
};

export type InquiryStatus =
  (typeof INQUIRY_STATUS)[keyof typeof INQUIRY_STATUS];

export type TransactionDirection =
  (typeof TRANSACTION_DIRECTION)[keyof typeof TRANSACTION_DIRECTION];

export type DisbursementAgentPayload = {
  agentId: number;
  accountNumber: number;
  amount: number;
  bankCode: string;
  direction: TransactionDirection;
  remark?: string;
  beneficiaryEmail?: string | string[];
};

export type IdempotencyHeader = {
  idempotencyKey: string;
  xTimestamp: string;
};

export type CreateDisbursementPayload = {
  accountNumber: number;
  bankCode: string;
  amount: number;
  remark?: string;
  recipientCity: string;
  beneficiaryEmail?: string | string[];
};

export type DisbursementSortAsc =
  (typeof DISBURSEMENT_ORDER)[keyof typeof DISBURSEMENT_ORDER];

export type DisbursementSortDesc = `-${DisbursementSortAsc}`;

export type DisbursementAgentQuery = {
  pagination?: number;
  page?: number;
  sort?: DisbursementSortAsc | DisbursementSortDesc;
};

export type DisbursementAgentListQuery = {
  agentId?: number;
  pagination?: number;
  page?: number;
  sort?: DisbursementSortAsc | DisbursementSortDesc;
};

export type BankInfo = {
  bank_code: string;
  name: string;
  fee: number;
  queue: number;
  status: BankStatus;
};

export type BankInquiry = {
  bank_code: string;
  account_number: number;
  account_holder: string;
  status: InquiryStatus;
  inquiry_key: string;
};

export type CityCountry = Record<string, string>;

export type DisbursementStatus =
  (typeof DISBURSEMENT_STATUS)[keyof typeof DISBURSEMENT_STATUS];

export type DisbursementReason =
  (typeof DISBURSEMENT_REASON)[keyof typeof DISBURSEMENT_REASON];

export type CreatedFrom = (typeof CREATED_FROM)[keyof typeof CREATED_FROM];

export type Disbursement = {
  id: number;
  userId: number;
  amount: number;
  status: DisbursementStatus;
  reason: DisbursementReason;
  timestamp: string;
  bank_code: string;
  account_number: number;
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
  sender: null | object;
  fee: number;
  beneficiary_email: string;
  idempotency_key: string;
};

export type IdentityType = (typeof IDENTITY_TYPE)[keyof typeof IDENTITY_TYPE];

export type CreateSpecialDisbursementPayload = {
  accountNumber: number;
  bankCode: string;
  amount: number;
  remark?: string;
  recipientCity?: number;
  senderCountry?: number;
  senderPlaceOfBirth?: number;
  senderDateOfBirth?: string;
  senderIdentityType?: IdentityType;
  senderName: string;
  senderAddress: string;
  senderIdentityNumber?: string;
  senderJob: string;
  direction: TransactionDirection;
  beneficiaryEmail?: string | string[];
};
