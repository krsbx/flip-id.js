import type Flip from '..';
import axios from '../axios';
import { createBillRequest, editBillRequest } from '../generator/payment/v2';
import { normalizeBill, normalizeDisbursement } from '../utils/common';
import { createIdempotencyKeyHeader } from '../generator/common';
import {
  createBankAccountInquiryRequest,
  createDisbursementAgentRequest,
} from '../generator/disbursement/v2';
import {
  BankInquiryPayload,
  DisbursementAgentPayload,
  IdempotencyHeader,
  DisbursementAgentListQuery,
  BankInfo,
  BankInquiry,
  CityCountry,
  Disbursement,
  BillPayload,
  Bill,
} from '../utils/type';

class FlipV2 {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  private get flip() {
    return this.#flip;
  }

  private get baseUrl() {
    if (this.flip.toSendBox) {
      return 'big_sandbox_api/v2';
    }

    return 'api/v2';
  }

  public async getBalance() {
    const { data } = await axios.get<{
      balance: number;
    }>(`${this.baseUrl}/general/balance`);

    return data;
  }

  public async getBankInfo(bankCode: string = '') {
    const { data } = await axios.get<BankInfo[]>(
      `${this.baseUrl}/general/banks?code=${bankCode}`
    );

    return data.map((item) => ({
      bankCode: item.bank_code,
      name: item.name,
      fee: item.fee,
      queue: item.queue,
      status: item.status,
    }));
  }

  public isMaintenance() {
    return axios.get<{
      maintenance: boolean;
    }>(`${this.baseUrl}/general/maintenance`);
  }

  public async bankAccountInquiry(payload: BankInquiryPayload) {
    const { data } = await axios.post<BankInquiry>(
      `${this.baseUrl}/disbursement/bank-account-inquiry`,
      createBankAccountInquiryRequest(payload)
    );

    return {
      bankCode: data.bank_code,
      accountNumber: data.account_number,
      accountHolder: data.account_holder,
      status: data.status,
      inquiryKey: data.inquiry_key,
    };
  }

  public async cityList() {
    const { data } = await axios.get<CityCountry>(
      `${this.baseUrl}/disbursement/city-list`
    );

    return data;
  }

  public async countryList() {
    const { data } = await axios.get<CityCountry>(
      `${this.baseUrl}/disbursement/country-list`
    );

    return data;
  }

  public async cityCountryList() {
    const { data } = await axios.get<CityCountry>(
      `${this.baseUrl}/disbursement/city-country-list`
    );

    return data;
  }

  public async createDisbursementAgent(
    payload: DisbursementAgentPayload,
    header: IdempotencyHeader
  ) {
    const { data } = await axios.post<Disbursement>(
      `${this.baseUrl}/agent-disbursements`,
      createDisbursementAgentRequest(payload),
      createIdempotencyKeyHeader(header)
    );

    return normalizeDisbursement(data);
  }

  public async getDisbursementAgentById(transactionId: string) {
    const { data } = await axios.get<Disbursement>(
      `${this.baseUrl}/agent-disbursements/${transactionId}`
    );

    return normalizeDisbursement(data);
  }

  public async getDisbursementAgentList(
    query: DisbursementAgentListQuery = {}
  ) {
    const { data } = await axios.get<{
      total_data: number;
      data_per_page: number;
      total_page: number;
      page: number;
      data: Disbursement[];
    }>(
      `${this.baseUrl}/agent-disbursements?${[
        typeof query.agentId !== 'undefined' && `agent_id=${query.agentId}`,
        typeof query.pagination !== 'undefined' &&
          `pagination=${query.pagination}`,
        typeof query.page !== 'undefined' && `page=${query.page}`,
        typeof query.sort !== 'undefined' && `sort=${query.sort}`,
      ]
        .filter((item) => item)
        .join('&')}`
    );

    return {
      totalData: data.total_data,
      dataPerPage: data.data_per_page,
      totalPage: data.total_page,
      page: data.page,
      data: data.data.map(normalizeDisbursement),
    };
  }

  public async createBill(payload: BillPayload) {
    const { data } = await axios.post<Bill>(
      `${this.baseUrl}/pwf/bill`,
      createBillRequest(payload)
    );

    return normalizeBill(data);
  }

  public async editBill(billId: string, payload: BillPayload) {
    const { data } = await axios.put<Bill>(
      `${this.baseUrl}/pwf/${billId}bill`,
      editBillRequest(payload)
    );

    return normalizeBill(data);
  }

  public async getBillById(billId: string) {
    const { data } = await axios.get<Bill>(`${this.baseUrl}/pwf/${billId}bill`);

    return normalizeBill(data);
  }

  public async getBillList() {
    const { data } = await axios.get<Bill[]>(`${this.baseUrl}/pwf/bill`);

    return data.map(normalizeBill);
  }
}

export default FlipV2;
