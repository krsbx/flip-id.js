import { Bill } from '../type';

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
      customer: {
        name: bill.customer.name,
        email: bill.customer.email,
        phone: bill.customer.phone,
        address: bill.customer.address,
      },
    }),
    ...(bill.step === 3 && {
      paymentUrl: bill.payment_url,
      billPayment: {
        id: bill.bill_payment.id,
        amount: bill.bill_payment.amount,
        uniqueCode: bill.bill_payment.unique_code,
        status: bill.bill_payment.status,
        senderBank: bill.bill_payment.sender_bank,
        senderBankType: bill.bill_payment.sender_bank_type,
        userAddress: bill.bill_payment.user_address,
        userPhone: bill.bill_payment.user_phone,
        createdAt: bill.bill_payment.created_at,
        receiverBankAccount: {
          accountNumber: bill.bill_payment.receiver_bank_account.account_number,
          accountType: bill.bill_payment.receiver_bank_account.account_type,
          bankCode: bill.bill_payment.receiver_bank_account.bank_code,
          accountHolder: bill.bill_payment.receiver_bank_account.account_holder,
        },
      },
    }),
  };
}
