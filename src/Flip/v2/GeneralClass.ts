import axios from '../../axios';
import type Flip from '../..';
import {
  BankInfo,
  BankInquiry,
  BankInquiryPayload,
  CityCountryList,
  CityCountry,
} from '../../utils/type';
import {
  normalizeBankAccountInquiry,
  normalizeBankInfo,
} from '../../utils/normalizer/general';
import { createBankAccountInquiryRequest } from '../../generator/disbursement/v2';

class GeneralClass {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  get #baseUrl() {
    if (this.#flip.toSendBox) {
      return 'big_sandbox_api/v2';
    }

    return 'api/v2';
  }

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async balance() {
        const { data } = await axios.get<{
          balance: number;
        }>(`${baseUrl}/general/balance`);

        return data;
      },
      async bankInfo(bankCode: string = '') {
        const { data } = await axios.get<BankInfo[]>(
          `${baseUrl}/general/banks?code=${bankCode}`
        );

        return data.map(normalizeBankInfo);
      },
      async maintenanceStatus() {
        const { data } = await axios.get<{
          maintenance: boolean;
        }>(`${baseUrl}/general/maintenance`);

        return data;
      },
      async list(type: CityCountryList) {
        const { data } = await axios.get<CityCountry>(
          `${baseUrl}/disbursement/${type.toLowerCase()}-list`
        );

        return data;
      },
      async bankAccountInquiry(payload: BankInquiryPayload) {
        const { data } = await axios.post<BankInquiry>(
          `${baseUrl}/disbursement/bank-account-inquiry`,
          createBankAccountInquiryRequest(payload)
        );

        return normalizeBankAccountInquiry(data);
      },
    };
  }
}

export default GeneralClass;
