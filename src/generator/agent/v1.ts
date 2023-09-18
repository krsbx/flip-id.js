import {
  AgentIdentityImagePayload,
  RepairDataPayload,
  SupportingDocumentPayload,
} from '../../utils/type/v1';

export function uploadIdentityImageRequest(payload: AgentIdentityImagePayload) {
  const { identityType, image, selfie } = payload;

  const formData = new FormData();
  formData.append('image', image);
  formData.append('user_type', '1');
  formData.append('identity_type', identityType.toString());
  formData.append('selfie', (+Boolean(selfie ?? false)).toString());

  return formData;
}

export function uploadSupportingDocumentRequest(
  agentId: number,
  payload: SupportingDocumentPayload
) {
  const formData = new FormData();
  formData.append('user_type', '1');
  formData.append('user_id', agentId.toString());

  if (payload.studentCard) {
    formData.append('student_card', payload.studentCard);
  }

  if (payload.studentCardSelfie) {
    formData.append('student_card_selfie', payload.studentCardSelfie);
  }

  if (payload.employeeCard) {
    formData.append('employee_card', payload.employeeCard);
  }

  if (payload.employeeCardSelfie) {
    formData.append('employee_card_selfie', payload.employeeCardSelfie);
  }

  if (payload.lastCertificate) {
    formData.append('last_certificate', payload.lastCertificate);
  }

  if (payload.lastCertificateSelfie) {
    formData.append('last_certificate_selfie', payload.lastCertificateSelfie);
  }

  if (payload.passport) {
    formData.append('passport', payload.passport);
  }

  if (payload.passportSelfie) {
    formData.append('passport_selfie', payload.passportSelfie);
  }

  if (payload.familyCard) {
    formData.append('family_card', payload.familyCard);
  }

  if (payload.familyCardSelfie) {
    formData.append('family_card_selfie', payload.familyCardSelfie);
  }

  if (payload.marriedCard) {
    formData.append('married_card', payload.marriedCard);
  }

  if (payload.marriedCardSelfie) {
    formData.append('married_card_selfie', payload.marriedCardSelfie);
  }

  if (payload.npwp) {
    formData.append('npwp', payload.npwp);
  }

  if (payload.npwpSelfie) {
    formData.append('npwp_selfie', payload.npwpSelfie);
  }

  if (payload.bpjsKesehatan) {
    formData.append('bpjs_kesehatan', payload.bpjsKesehatan);
  }

  if (payload.bpjsKesehatanSelfie) {
    formData.append('bpjs_kesehatan_selfie', payload.bpjsKesehatanSelfie);
  }

  return formData;
}

export function repairAgentIdentityRequest(payload: RepairDataPayload) {
  return {
    user_type: 1,
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
    residence_country_id: payload.residenceCountryId,
    residence_province_id: payload.residenceProvinceId,
    residence_city_id: payload.residenceCityId,
    residence_district_id: payload.residenceDistrictId,
    residence_address: payload.residenceAddress,
  };
}
