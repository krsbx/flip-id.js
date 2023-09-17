import { Disbursement } from '../type';

export function normalizeDisbursement(item: Disbursement) {
  return {
    id: item.id,
    userId: item.userId,
    amount: item.amount,
    status: item.status,
    reason: item.reason,
    timestamp: item.timestamp,
    bankCode: item.bank_code,
    accountNumber: item.account_number,
    recipientName: item.recipient_name,
    senderBank: item.sender_bank,
    remark: item.remark,
    receipt: item.receipt,
    timeServed: item.time_served,
    bundleId: item.bundle_id,
    companyId: item.company_id,
    recipientCity: item.recipient_city,
    createdFrom: item.created_from,
    direction: item.direction,
    sender: item.sender,
    fee: item.fee,
    beneficiaryEmail: item.beneficiary_email.split(','),
    idempotencyKey: item.idempotency_key,
  };
}
