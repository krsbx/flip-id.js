import { ListResponse } from '../type/common';

export function normalizeBeneficiaryEmail(
  email: string | string[] | undefined
) {
  if (!email) return undefined;

  return (Array.isArray(email) ? email : [email]).join(',');
}

export function normalizeListResponse<
  T,
  U extends ListResponse<T>,
  W extends (value: U['data'][number], index: number, array: T[]) => unknown
>(data: U, normalizer: W) {
  return {
    totalData: data.total_data,
    dataPerPage: data.data_per_page,
    totalPage: data.total_page,
    page: data.page,
    data: data.data.map(normalizer) as ReturnType<W>[],
  };
}
