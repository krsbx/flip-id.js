import { normalizeBeneficiaryEmail } from '../../utils/normalizer/common';
import {
  DisbursementPayload,
  SpecialDisbursementPayload,
} from '../../utils/type';

export function createDisbursementRequest(payload: DisbursementPayload) {
  return {
    account_number: payload.accountNumber,
    amount: payload.amount,
    bank_code: payload.bankCode,
    remark: payload.remark,
    recipient_city: payload.recipientCity,
    beneficiary_email: normalizeBeneficiaryEmail(payload.beneficiaryEmail),
  };
}

export function createSpecialDisbursementRequest(
  payload: SpecialDisbursementPayload
) {
  return {
    account_number: payload.accountNumber,
    bank_code: payload.bankCode,
    amount: payload.amount,
    remark: payload.remark,
    recipient_city: payload.recipientCity,
    sender_country: payload.senderCountry,
    sender_place_of_birth: payload.senderPlaceOfBirth,
    sender_date_of_birth: payload.senderDateOfBirth,
    sender_identity_type: payload.senderIdentityType,
    sender_name: payload.senderName,
    sender_address: payload.senderAddress,
    sender_identity_number: payload.senderIdentityNumber,
    sender_job: payload.senderJob,
    direction: payload.direction,
    beneficiary_email: normalizeBeneficiaryEmail(payload.beneficiaryEmail),
  };
}
