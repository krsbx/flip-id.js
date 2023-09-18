import { Bill, BillPayment } from '../type/v2';

export function normalizeBillPayment(payment: BillPayment) {
  return {
    id: payment.id,
    amount: payment.amount,
    uniqueCode: payment.unique_code,
    status: payment.status,
    senderBank: payment.sender_bank,
    senderBankType: payment.sender_bank_type,
    userAddress: payment.user_address,
    userPhone: payment.user_phone,
    createdAt: payment.created_at,
    receiverBankAccount: {
      accountNumber: payment.receiver_bank_account.account_number,
      accountType: payment.receiver_bank_account.account_type,
      bankCode: payment.receiver_bank_account.bank_code,
      accountHolder: payment.receiver_bank_account.account_holder,
    },
  };
}

export function normalizeBill(bill: Bill) {
  return {
    linkId: bill.link_id,
    linkUrl: bill.link_url,
    title: bill.title,
    type: bill.type,
    amount: bill.amount,
    redirectUrl: bill.redirect_url,
    expiredDate: bill.expired_date,
    createdFrom: bill.created_from,
    status: bill.status,
    isAddressRequired: Boolean(bill.is_address_required),
    isPhoneNumberRequired: Boolean(bill.is_phone_number_required),
    step: bill.step,
    ...((bill.step === 2 || bill.step === 3) && {
      customer: bill.customer,
    }),
    ...(bill.step === 3 && {
      paymentUrl: bill.payment_url,
      billPayment: normalizeBillPayment(bill.bill_payment),
    }),
  };
}
