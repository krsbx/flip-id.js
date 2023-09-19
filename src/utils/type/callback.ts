import {
  CreatedFrom,
  Disbursement,
  DisbursementReason,
  DisbursementStatus,
  IdentityType,
  Job,
  TransactionDirection,
} from './common';
import {
  BankStatus,
  InquiryStatus,
  InternationalTransfer,
  PaymentStatus,
} from './v2';

export type BankInquiryCb = {
  bank_code: string;
  account_number: string;
  account_holder: string;
  status: InquiryStatus;
  inquiry_key: string;
};

export type DisbursementCb = Omit<
  Disbursement,
  'beneficiary_email' | 'idempotency_key'
>;

export type SpecialDisbursementCb = DisbursementCb;

export type PaymentCb = {
  id: string;
  bill_link: string;
  bill_link_id: number;
  bill_title: string;
  sender_name: string;
  sender_bank: string;
  sender_email: string;
  amount: number;
  status: PaymentStatus;
  sender_bank_type: string;
  created_at: string;
};

export type InternationalTransferCb = InternationalTransfer;

export type AgentKycCb = {
  agent_id: number;
  agent_name: string;
  kyc_status: string;
  rejected_reason_code: number;
  rejected_reason: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  verified_at: string;
};

export type BankStatusCb = {
  bank_code: string;
  status: BankStatus;
  message: string;
  updated_at: string;
}[];
