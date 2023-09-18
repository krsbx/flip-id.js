import { hasOwnProperty } from '../common';
import { BankInfo, BankInquiry } from '../type/v2';
import {
  City,
  Country,
  District,
  PlaceListResp,
  PlaceTypeList,
  Province,
} from '../type/v1';

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

export function normalizePlaceList<T extends PlaceTypeList>(
  type: T,
  data: { [key: string]: unknown[] }
) {
  return data[type].map((value) => {
    const item = value as Country | Province | City | District;

    return {
      id: item.id,
      name: item.name,
      ...(hasOwnProperty<number>(item, 'country_id') && {
        countryId: item.country_id,
      }),
      ...(hasOwnProperty<number>(item, 'province_id') && {
        provinceId: item.province_id,
      }),
      ...(hasOwnProperty<number>(item, 'created_at') && {
        createdAt: item.created_at,
      }),
      ...(hasOwnProperty<number>(item, 'updated_at') && {
        updatedAt: item.updated_at,
      }),
    };
  }) as unknown as PlaceListResp[T][];
}
