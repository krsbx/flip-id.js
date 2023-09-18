import { AgentIdentity, AgentIdentityById } from '../type';

export function normalizeAgentIdentity(data: AgentIdentity) {
  return {
    id: data.id,
    companyId: data.company_id,
    name: data.name,
    identityType: data.identity_type,
    identityNumber: data.identity_number,
    birthDate: data.birth_date,
    birthPlace: data.birth_place,
    gender: data.gender,
    countryId: data.country_id,
    countryName: data.country_name,
    provinceId: data.province_id,
    provinceName: data.provice_name,
    cityId: data.city_id,
    cityName: data.city_name,
    districtId: data.district_id,
    districtName: data.district_name,
    address: data.address,
    residenceCountryId: data.residence_country_id,
    residenceCountryName: data.residence_country_name,
    residenceProvinceId: data.residence_province_id,
    residenceProvinceName: data.residence_provice_name,
    residenceCityId: data.residence_city_id,
    residenceCityName: data.residence_city_name,
    residenceDistrictId: data.residence_district_id,
    residenceDistrictName: data.residence_district_name,
    residenceAddress: data.residence_address,
    occupation: data.occupation,
    phoneNumber: data.phone_number,
    email: data.email,
    kycStatus: data.kyc_status,
  };
}

export function normalizeAgentIdentityById(data: AgentIdentityById) {
  return {
    id: data.id,
    companyId: data.company_id,
    name: data.name,
    identityType: data.identity_type,
    identityNumber: data.identity_number,
    phoneNumber: data.phone_number,
    email: data.email,
    kycStatus: data.kyc_status,
    rejectedReasonCode: data.rejected_reason_code,
    rejectedReason: data.rejected_reason,
    status: data.status,
    createdAt: data.created_at,
  };
}
