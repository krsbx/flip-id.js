import { normalizeBeneficiaryEmail } from '../../utils/normalizer/common';
import { BankInquiryPayload, DisbursementAgentPayload } from '../../utils/type';

export function createDisbursementAgentRequest(
  payload: DisbursementAgentPayload
) {
  return {
    agent_id: payload.agentId,
    account_number: payload.accountNumber,
    amount: payload.amount,
    bank_code: payload.bankCode,
    direction: payload.direction,
    remark: payload.remark,
    beneficiary_email: normalizeBeneficiaryEmail(payload.beneficiaryEmail),
  };
}

export function createBankAccountInquiryRequest(payload: BankInquiryPayload) {
  return {
    account_number: payload.accountNumber,
    bank_code: payload.bankCode,
    inquiry_key: payload.inquiryKey,
  };
}
