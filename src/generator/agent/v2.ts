import { AgentIdentityPayload } from '../../utils/type';

export function createAgentIdentityRequest(payload: AgentIdentityPayload) {
  return {
    name: payload.name,
    identity_type: payload.identityType,
    identity_number: payload.identityNumber,
    birth_date: payload.birthDate,
    birth_place: payload.birthPlace,
    country_id: payload.countryId,
    province_id: payload.provinceId,
    city_id: payload.cityId,
    district_id: payload.districtId,
    address: payload.address,
    gender: payload.gender,
    occupation: payload.occupation,
    phone_number: payload.phoneNumber,
    use_identity_address: payload.useIdentityAddress,
    residence_country_id: payload.residenceCountryId,
    residence_province_id: payload.residenceProvinceId,
    residence_city_id: payload.residenceCityId,
    residence_district_id: payload.residenceDistrictId,
    residence_address: payload.residenceAddress,
    email: payload.email,
  };
}
