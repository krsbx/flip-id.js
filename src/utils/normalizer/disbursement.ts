import { Disbursement } from '../type/common';

export function normalizeDisbursement(disbursement: Disbursement) {
  return {
    id: disbursement.id,
    userId: disbursement.userId,
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
    sender: disbursement.sender,
    fee: disbursement.fee,
    beneficiaryEmail: disbursement.beneficiary_email.split(','),
    idempotencyKey: disbursement.idempotency_key,
  };
}
