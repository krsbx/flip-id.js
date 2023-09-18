import {
  Beneficiary,
  ExchangeRate,
  InternationalFormData,
  InternationalTransfer,
  NationalityCountry,
  Sender,
} from '../type/v2';

export function normalizeExchangeRate(exchangeRate: ExchangeRate) {
  return {
    currencyCode: exchangeRate.currency_code,
    countryCode: exchangeRate.country_code,
    countryName: exchangeRate.country_name,
    countryIsoCode: exchangeRate.country_iso_code,
    flipExchangeRate: exchangeRate.flip_exchange_rate,
    flipTransferFee: exchangeRate.flip_transfer_fee,
    minimumAmmount: exchangeRate.minimum_amount,
    maximumAmmount: exchangeRate.maximum_amount,
    paymentSpeed: exchangeRate.payment_speed,
    arrivalMessage: exchangeRate.arrival_message,
    notes: exchangeRate.notes,
    transactionType: exchangeRate.transaction_type,
    flipCutoffTime: exchangeRate.flip_cutoff_time,
    flipArrivalTime: exchangeRate.flip_arrival_time,
    isActive: exchangeRate.is_active,
  };
}

export function normalizeNationalityCountry(
  nationalityCountry: NationalityCountry
) {
  return {
    isoCode: nationalityCountry.iso_code,
    name: nationalityCountry.name,
    countryCode: nationalityCountry.country_code,
  };
}

export function normalizeInternationalFormData(
  formData: InternationalFormData
) {
  return {
    countryIsoCode: formData.country_iso_code,
    currencyCode: formData.currency_code,
    beneficiaryRelationships: formData.beneficiary_relationships,
    sourceOfFounds: formData.source_of_funds,
    remittancePurposes: formData.remittance_purposes,
    banks: formData.banks,
    specialIdentifiers: formData.special_identifiers,
    regions: formData.regions,
    nationalityCountries: formData.nationality_countries.map(
      normalizeNationalityCountry
    ),
  };
}

export function normalizeBeneficiary(beneficiary: Beneficiary) {
  return {
    idNumber: beneficiary.id_number,
    idExpirationDate: beneficiary.id_expiration_date,
    fullName: beneficiary.full_name,
    bankAccountNumber: beneficiary.bank_account_number,
    bank: beneficiary.bank,
    email: beneficiary.email,
    msisdn: beneficiary.msisdn,
    nationality: beneficiary.nationality,
    country: beneficiary.country,
    province: beneficiary.province,
    city: beneficiary.city,
    address: beneficiary.address,
    postalCode: beneficiary.postal_code,
    relationship: beneficiary.relationship,
    sourceOfFunds: beneficiary.source_of_funds,
    remittancePurpose: beneficiary.remittance_purpose,
    iban: beneficiary.iban,
    swiftBicCode: beneficiary.swift_bic_code,
    sortCode: beneficiary.sort_code,
    ifsCode: beneficiary.ifs_code,
    bsbNumber: beneficiary.bsb_number,
    branchNumber: beneficiary.branch_number,
    documentReferenceNumber: beneficiary.document_reference_number,
    registrationNumber: beneficiary.registration_number,
  };
}

export function normalizeSender(sender: Sender) {
  return {
    name: sender.name,
    placeOfBirth: sender.place_of_birth,
    dateOfBirth: sender.date_of_birth,
    address: sender.address,
    identityType: sender.identity_type,
    identityNumber: sender.identity_number,
    country: sender.country,
    job: sender.job,
    city: sender.city,
    phoneNumber: sender.phone_number,
  };
}

export function normalizeInternationalTransfer(
  transfer: InternationalTransfer
) {
  return {
    id: transfer.id,
    userId: transfer.user_id,
    companyId: transfer.company_id,
    exchangeRate: transfer.exchange_rate,
    fee: transfer.fee,
    amount: transfer.amount,
    sourceCountry: transfer.source_country,
    destinationCountry: transfer.destination_country,
    beneficiaryAmount: transfer.beneficiary_amount,
    beneficiaryCurrencyCode: transfer.beneficiary_currency_code,
    status: transfer.status,
    timestamp: transfer.timestamp,
    timeServed: transfer.time_served,
    createdFrom: transfer.created_from,
    receipt: transfer.receipt,
    transactionType: transfer.transaction_type,
    idempotencyKey: transfer.idempotency_key,
    beneficiary: normalizeBeneficiary(transfer.beneficiary),
    sender: normalizeSender(transfer.sender),
  };
}
