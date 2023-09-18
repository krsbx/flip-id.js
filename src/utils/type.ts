import {
  BANK_STATUS,
  BANK_TYPE,
  BILL_STATUS,
  BILL_TYPE,
  CITY_COUNTRY_LIST_TYPE,
  CITY_DISTRICT_COUNTRY_LIST_TYPE,
  CREATED_FROM,
  DISBURSEMENT_ORDER,
  DISBURSEMENT_REASON,
  DISBURSEMENT_STATUS,
  FLIP_API_VERSION,
  IDENTITY_TYPE,
  INQUIRY_STATUS,
  JOB,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  TRANSACTION_DIRECTION,
  TRANSACTION_TYPE,
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

export type CityDistrictCountryList =
  (typeof CITY_DISTRICT_COUNTRY_LIST_TYPE)[keyof typeof CITY_DISTRICT_COUNTRY_LIST_TYPE];

export type PaymentListQuery = {
  startDate?: string;
  endDate?: string;
  pagination?: number;
  page?: number;
  sortBy?: 'id' | 'bill_link' | 'bill_title' | 'amount' | 'created_at';
  sortType?: 'asc' | 'desc';
};

export type ConfirmPayment = {
  confirmed_at: string;
  payment_url: string;
};

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export type PaymentSpeed =
  | (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE]
  | `+${number} day`;

export type ExchangeRate = {
  currency_code: string;
  country_code: string;
  country_name: string;
  country_iso_code: string;
  flip_exchange_rate: number;
  flip_transfer_fee: number;
  minimum_amount: number;
  maximum_amount: number;
  payment_speed: PaymentSpeed;
  arrival_message: {
    id: string;
    en: string;
  } | null;
  notes: string | null;
  transaction_type: TransactionType;
  flip_cutoff_time: string;
  flip_arrival_time: string;
  is_active: boolean;
};

export type NationalityCountry = {
  iso_code: string;
  name: string;
  country_code: string;
};

export type InternationalFormData = {
  country_iso_code: string;
  currency_code: string;
  beneficiary_relationships: Record<string, string>;
  source_of_funds: Record<string, string>;
  remittance_purposes: Record<string, string>;
  banks: Record<string, string>;
  special_identifiers: string[];
  regions: Record<string, unknown>[];
  nationality_countries: NationalityCountry[];
};

export type Beneficiary = {
  id_number: number;
  id_expiration_date: string;
  full_name: string;
  bank_account_number: number;
  bank: string;
  email: string;
  msisdn: number;
  nationality: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  relationship: string;
  source_of_funds: string;
  remittance_purpose: string;
  iban: unknown;
  swift_bic_code: string;
  sort_code: string;
  ifs_code: string;
  bsb_number: number;
  branch_number: number;
  document_reference_number: number;
  registration_number: number;
};

export type Job = (typeof JOB)[keyof typeof JOB];

export type Sender = {
  name: string;
  place_of_birth: string;
  date_of_birth: string;
  address: string;
  identity_type: IdentityType;
  identity_number: string;
  country: string;
  job: Job;
  city: string;
  phone_number: string;
};

export type InternationalTransfer = {
  id: string;
  user_id: string;
  company_id: string;
  exchange_rate: number;
  fee: number;
  amount: number;
  source_country: string;
  destination_country: string;
  beneficiary_amount: number;
  beneficiary_currency_code: string;
  status: Exclude<DisbursementStatus, 'FAILED'> | 'DONE';
  timestamp: string;
  time_served: string;
  created_from: CreatedFrom;
  receipt: string;
  transaction_type: TransactionType;
  idempotency_key: string;
  beneficiary: Beneficiary;
  sender: Sender;
};

export type InternationalTransferListQuery = {
  pagination?: number;
  page?: number;
  sortBy?: string;
};

export type AgentIdentityPayload = {
  name: string;
  identityType: IdentityType;
  identityNumber: number;
  birthDate: string;
  birthPlace: string;
  countryId: number;
  provinceId: number;
  cityId: number;
  districtId: number;
  address: string;
  gender: string;
  occupation: Job | 'company';
  phoneNumber: string;
  useIdentityAddress?: boolean;
  residenceCountryId?: number;
  residenceProvinceId?: number;
  residenceCityId?: number;
  residenceDistrictId?: number;
  residenceAddress?: string;
  email?: string;
};

export type AgentIdentity = {
  id: number;
  company_id: number;
  name: string;
  identity_type: IdentityType;
  identity_number: number;
  birth_date: string;
  birth_place: string;
  gender: string;
  country_id: number;
  country_name: string;
  province_id: number;
  provice_name: string;
  city_id: number;
  city_name: string;
  district_id: number;
  district_name: string;
  address: string;
  residence_country_id: number;
  residence_country_name: string;
  residence_province_id: number;
  residence_provice_name: string;
  residence_city_id: number;
  residence_city_name: string;
  residence_district_id: number;
  residence_district_name: string;
  residence_address: string;
  occupation: Job | 'company';
  phone_number: string;
  email: string;
  kyc_status: string; // Create Type Later
};

export type AgentIdentityById = Pick<
  AgentIdentity,
  | 'id'
  | 'company_id'
  | 'name'
  | 'identity_type'
  | 'identity_number'
  | 'phone_number'
  | 'email'
  | 'kyc_status'
> & {
  rejected_reason_code: unknown;
  rejected_reason: unknown;
  status: number;
  created_at: string;
};
