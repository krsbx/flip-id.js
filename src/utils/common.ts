import { Bill, Disbursement } from './type';

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

export function normalizeBeneficiaryEmail(
  email: string | string[] | undefined
) {
  if (!email) return undefined;

  return (Array.isArray(email) ? email : [email]).join(',');
}
