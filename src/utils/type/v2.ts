import {
  BANK_TYPE,
  BANK_STATUS,
  BILL_STATUS,
  BILL_TYPE,
  CITY_COUNTRY_LIST_TYPE,
  INQUIRY_STATUS,
  PAYMENT_STATUS,
  BILL_PAYMENT_STATUS,
  PAYMENT_TYPE,
  TRANSACTION_TYPE,
} from '../constants/v2';
import {
  IdentityType,
  Job,
  CreatedFrom,
  TransactionDirection,
  DisbursementSortAsc,
  DisbursementSortDesc,
  DisbursementStatus,
  Gender,
} from './common';

export type CityCountryList =
  (typeof CITY_COUNTRY_LIST_TYPE)[keyof typeof CITY_COUNTRY_LIST_TYPE];

export type BankStatus = (typeof BANK_STATUS)[keyof typeof BANK_STATUS];

export type InquiryStatus =
  (typeof INQUIRY_STATUS)[keyof typeof INQUIRY_STATUS];

export type BankInquiryPayload = {
  accountNumber: string;
  bankCode: string;
  inquiryKey?: string;
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
  account_number: string;
  account_holder: string;
  status: InquiryStatus;
  inquiry_key: string;
};

export type CityCountry = Record<string, string>;

export type AgentIdentityPayload = {
  name: string;
  identityType: IdentityType;
  identityNumber: string;
  birthDate: string;
  birthPlace: string;
  countryId: number;
  provinceId: number;
  cityId: number;
  districtId: number;
  address: string;
  gender: Gender;
  occupation: Job;
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
  identity_number: string;
  birth_date: string;
  birth_place: string;
  gender: Gender;
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
  occupation: Job;
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

export type BillType = (typeof BILL_TYPE)[keyof typeof BILL_TYPE];

export type BillStatus = (typeof BILL_STATUS)[keyof typeof BILL_STATUS];

export type BaseBillPayload = {
  title: string;
  type: BillType;
  expiredDate?: string;
  redirectUrl?: string;
};

export type BillPayloadPhone =
  | {
      isPhoneNumberRequired: true;
      senderPhoneNumber: string;
    }
  | {
      isPhoneNumberRequired: false;
      senderPhoneNumber?: string;
    };

export type BillPayloadAddress =
  | {
      isAddressRequired: true;
      senderAddress: string;
    }
  | {
      isAddressRequired: false;
      senderAddress?: string;
    };

export type BillPayloadPhoneAddress = BillPayloadPhone & BillPayloadAddress;

export type BillPayloadStep =
  | BaseBillPayload & {
      amount: number;
      senderName: string;
      senderEmail: string;
    } & BillPayloadPhoneAddress;

export type BillPayload =
  | (BaseBillPayload & {
      isAddressRequired?: boolean;
      isPhoneNumberRequired?: boolean;
      amount?: number;
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

export type BillPaymentStatus =
  (typeof BILL_PAYMENT_STATUS)[keyof typeof BILL_PAYMENT_STATUS];

export type BankType = (typeof BANK_TYPE)[keyof typeof BANK_TYPE];

export type BankAccount = {
  account_number: string;
  account_type: BankType;
  bank_code: string;
  account_holder: string;
};

export type BillPayment = {
  id: number;
  amount: number;
  unique_code: number;
  status: BillPaymentStatus;
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

export type DisbursementAgentPayload = {
  agentId: string;
  accountNumber: string;
  amount: number;
  bankCode: string;
  direction: TransactionDirection;
  remark?: string;
  beneficiaryEmail?: string | string[];
};

export type DisbursementAgentListQuery = {
  agentId?: string;
  pagination?: number;
  page?: number;
  sort?: DisbursementSortAsc | DisbursementSortDesc;
};

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
  id_number: string;
  id_expiration_date: string;
  full_name: string;
  bank_account_number: string;
  bank: string;
  email: string;
  msisdn: string;
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
  bsb_number: string;
  branch_number: string;
  document_reference_number: string;
  registration_number: string;
};

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

export type C2C_C2B_Payload = {
  idNumber?: string;
  idExpirationDate?: string;
  amount: number;
  sourceCountry: string;
  destinationCountry: string;
  transactionType: TransactionType;
  beneficiaryFullName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBankId: string;
  beneficiaryBankName?: string;
  beneficiaryEmail?: string;
  beneficiaryMsisdn?: string;
  beneficiaryNationality: string;
  beneficiaryProvince: string;
  beneficiaryCity: string;
  beneficiaryAddress: string;
  beneficiaryPostalCode?: string;
  beneficiaryRelationship: string;
  beneficiarySourceOfFunds: string;
  beneficiaryRemittancePurposes: string;
  beneficiaryIban?: string;
  beneficiarySwiftBicCode?: string;
  beneficiarySortCode?: string;
  beneficiaryIfsCode?: string;
  beneficiaryBsbNumber?: string;
  beneficiaryBranchNumber?: string;
  beneficiaryDocumentReferenceNumber?: string;
  beneficiaryRegistrationNumber?: string;
  beneficiaryRegion?: string;
  senderName: string;
  senderCountry: number;
  senderPlaceOfBirth: string;
  senderDateOfBirth: string;
  senderAddress: string;
  senderIdentityType: IdentityType;
  senderidentityNumber: string;
  senderJob: Job;
  senderEmail: string;
  senderCity: string;
  senderPhoneNumber: string;
};

export type B2C_B2B_Payload = {
  destinationCountry: string;
  sourceCountry: string;
  transactionType: TransactionType;
  amount: number;
  attachmentData?: Blob;
  attachmentType?: string;
  beneficiaryAccountNumber: string;
  beneficiaryAchCode?: string;
  beneficiaryAddress: string;
  beneficiaryBankId: string;
  beneficiaryBankName: string;
  beneficiaryBranchNumber?: string;
  beneficiaryBsbNumber?: string;
  beneficiaryCity?: string;
  beneficiaryDocumentReferenceNumber?: string;
  beneficiaryEmail?: string;
  beneficiaryFullName?: string;
  beneficiaryIban?: string;
  beneficiaryIdExpirationDate?: string;
  beneficiaryIfsCode?: string;
  beneficiaryIdNumber?: string;
  beneficiaryMsisdn?: string;
  beneficiaryNationality: string;
  beneficiaryPostalCode?: string;
  beneficiaryRelationship?: string;
  beneficiarySortCode?: string;
  beneficiarySourceOfFunds?: string;
};
