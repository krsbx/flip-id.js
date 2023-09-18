import {
  DisbursementSortAsc,
  DisbursementSortDesc,
  IdentityType,
  TransactionDirection,
} from './common';

export type DisbursementPayload = {
  accountNumber: number;
  bankCode: string;
  amount: number;
  remark?: string;
  recipientCity: string;
  beneficiaryEmail?: string | string[];
};

export type SpecialDisbursementPayload = {
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

export type DisbursementListQuery = {
  pagination?: number;
  page?: number;
  sort?: DisbursementSortAsc | DisbursementSortDesc;
};
