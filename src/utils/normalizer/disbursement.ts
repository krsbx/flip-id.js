import { Disbursement, DisbursementSender } from '../type/common';

export function normalizeDisbursementSender(sender: DisbursementSender) {
  return {
    senderName: sender.sender_name,
    placeOfBirth: sender.place_of_birth,
    dateOfBirth: sender.date_of_birth,
    address: sender.address,
    senderIdentityType: sender.sender_identity_type,
    senderIdentityNumber: sender.sender_identity_number,
    senderCountry: sender.sender_country,
    job: sender.job,
  };
}

export function normalizeDisbursement(disbursement: Disbursement) {
  return {
    id: disbursement.id,
    userId: disbursement.user_id,
    amount: disbursement.amount,
    status: disbursement.status,
    reason: disbursement.reason,
    timestamp: disbursement.timestamp,
    bankCode: disbursement.bank_code,
    accountNumber: disbursement.account_number,
    recipientName: disbursement.recipient_name,
    senderBank: disbursement.sender_bank,
    remark: disbursement.remark,
    receipt: disbursement.receipt,
    timeServed: disbursement.time_served,
    bundleId: disbursement.bundle_id,
    companyId: disbursement.company_id,
    recipientCity: disbursement.recipient_city,
    createdFrom: disbursement.created_from,
    direction: disbursement.direction,
    sender: disbursement.sender
      ? normalizeDisbursementSender(disbursement.sender)
      : null,
    fee: disbursement.fee,
    beneficiaryEmail: disbursement.beneficiary_email.split(','),
    idempotencyKey: disbursement.idempotency_key,
  };
}
