import { BillPayload, EditBillPayload } from '../../utils/type';

export function createBillRequest(payload: BillPayload) {
  return {
    title: payload.title,
    type: payload.type,
    amount: payload.amount,
    expired_date: payload.expiredDate,
    redirect_url: payload.redirectUrl,
    is_address_required: +(payload.isAddressRequired ?? false),
    is_phone_number_required: +(payload.isPhoneNumberRequired ?? false),
    ...((payload.step === 2 || payload.step === 3) && {
      sender_name: payload.senderName,
      sender_email: payload.senderEmail,
      sender_phone_number: payload.senderPhoneNumber,
      sender_address: payload.senderAddress,
    }),
    ...(payload.step === 3 && {
      sender_bank: payload.senderBank,
      sender_bank_type: payload.senderBankType,
    }),
  };
}

export function editBillRequest(payload: EditBillPayload) {
  return {
    title: payload.title,
    type: payload.type,
    amount: payload.amount,
    expired_date: payload.expiredDate,
    redirect_url: payload.redirectUrl,
    status: payload.status,
    is_address_required: +(payload.isAddressRequired ?? false),
    is_phone_number_required: +(payload.isPhoneNumberRequired ?? false),
  };
}
