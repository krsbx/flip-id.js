import {
  BANK_STATUS,
  BANK_TYPE,
  BILL_STATUS,
  BILL_TYPE,
  CITY_COUNTRY_LIST_TYPE,
  CREATED_FROM,
  DISBURSEMENT_ORDER,
  DISBURSEMENT_REASON,
  DISBURSEMENT_STATUS,
  FLIP_API_VERSION,
  IDENTITY_TYPE,
  INQUIRY_STATUS,
  PAYMENT_STATUS,
  TRANSACTION_DIRECTION,
} from '../constants';

export type FlipApiVersion =
  | (typeof FLIP_API_VERSION)[keyof typeof FLIP_API_VERSION]
  | (string & NonNullable<unknown>);

export type BankStatus = (typeof BANK_STATUS)[keyof typeof BANK_STATUS];

export type BankInquiryPayload = {
  accountNumber: number;
  bankCode: string;
  inquiryKey?: string;
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

export type DisbursementPayload = {
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

export type DisbursementListQuery = {
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

export type BillType = (typeof BILL_TYPE)[keyof typeof BILL_TYPE];

export type BillStatus = (typeof BILL_STATUS)[keyof typeof BILL_STATUS];

export type BaseBillPayload = {
  title: string;
  type: BillType;
  amount: number;
  expiredDate: string;
  redirectUrl: string;
  isAddressRequired?: boolean;
  isPhoneNumberRequired?: boolean;
};

export type BillPayloadStep = BaseBillPayload & {
  senderName: string;
  senderEmail: string;
  senderPhoneNumber: string;
  senderAddress: string;
};

export type BillPayload =
  | (BaseBillPayload & {
      step: 1;
    })
  | (BillPayloadStep & {
      step: 2;
    })
  | (BillPayloadStep & {
      step: 3;
      senderBank: string;
      senderBankType: BankType;
    });

export type BaseBill = {
  link_id: string;
  link_url: string;
  title: string;
  type: BillType;
  amount: number;
  redirect_url: string;
  expired_date: string;
  created_from: CreatedFrom;
  status: BillStatus;
  is_address_required: number;
  is_phone_number_required: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type BillStep = BaseBill & {
  customer: Customer;
};

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export type BankType = (typeof BANK_TYPE)[keyof typeof BANK_TYPE];

export type BankAccount = {
  account_number: number;
  account_type: BankType;
  bank_code: string;
  account_holder: string;
};

export type BillPayment = {
  id: number;
  amount: number;
  unique_code: number;
  status: PaymentStatus;
  sender_bank: string;
  sender_bank_type: BankType;
  receiver_bank_account: BankAccount;
  user_address: string;
  user_phone: string;
  created_at: string;
};

export type Bill =
  | (BaseBill & { step: 1 })
  | (BillStep & { step: 2 })
  | (BillStep & {
      step: 3;
      bill_payment: BillPayment;
      payment_url: string;
    });

export type EditBillPayload = {
  title?: string;
  type?: BillType;
  amount?: number;
  expiredDate?: string;
  redirectUrl?: string;
  status?: BillStatus;
  isAddressRequired?: boolean;
  isPhoneNumberRequired?: boolean;
};

export type ListResponse<T> = {
  total_data: number;
  data_per_page: number;
  total_page: number;
  page: number;
  data: T[];
};

export type CityCountryList =
  (typeof CITY_COUNTRY_LIST_TYPE)[keyof typeof CITY_COUNTRY_LIST_TYPE];
