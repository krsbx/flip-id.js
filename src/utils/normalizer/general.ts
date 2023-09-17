import { BankInfo, BankInquiry } from '../type';

export function normalizeBankInfo(bankInfo: BankInfo) {
  return {
    bankCode: bankInfo.bank_code,
    name: bankInfo.name,
    fee: bankInfo.fee,
    queue: bankInfo.queue,
    status: bankInfo.status,
  };
}

export function normalizeBankAccountInquiry(inquiry: BankInquiry) {
  return {
    bankCode: inquiry.bank_code,
    accountNumber: inquiry.account_number,
    accountHolder: inquiry.account_holder,
    status: inquiry.status,
    inquiryKey: inquiry.inquiry_key,
  };
}
