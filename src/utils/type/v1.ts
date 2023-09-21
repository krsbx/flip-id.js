import { PLACE_TYPE } from '../constants/v1';
import { Job } from './common';

export type PlaceTypeList = (typeof PLACE_TYPE)[keyof typeof PLACE_TYPE];

export type Country = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Province = {
  id: number;
  name: string;
  country_id: number;
};

export type City = {
  id: number;
  name: string;
  country_id: number;
  province_id: number;
};

export type District = {
  id: number;
  name: string;
};

export type PlaceListResp = {
  [PLACE_TYPE.COUNTRY]: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  [PLACE_TYPE.PROVINCES]: {
    id: number;
    name: string;
    countryId: number;
  };
  [PLACE_TYPE.CITY]: {
    id: number;
    name: string;
    countryId: number;
    provinceId: number;
  };
  [PLACE_TYPE.DISTRICT]: {
    id: number;
    name: string;
  };
};

export type AgentIdentityImagePayload = {
  image: Blob;
  identityType: number;
  selfie?: boolean;
};

export type SupportingDocumentPayload = {
  userId: string;
  studentCard?: Blob;
  studentCardSelfie?: Blob;
  employeeCard?: Blob;
  employeeCardSelfie?: Blob;
  lastCertificate?: Blob;
  lastCertificateSelfie?: Blob;
  passport?: Blob;
  passportSelfie?: Blob;
  familyCard?: Blob;
  familyCardSelfie?: Blob;
  marriedCard?: Blob;
  marriedCardSelfie?: Blob;
  npwp?: Blob;
  npwpSelfie?: Blob;
  bpjsKesehatan?: Blob;
  bpjsKesehatanSelfie?: Blob;
};

export type SupportingDocument = {
  id: string;
  type: number;
  selfie: boolean;
  path: string;
  created_at: string;
  updated_at: string;
};

export type RepairDataPayload = {
  name?: string;
  identityType?: number;
  identityNumber?: number;
  birthDate?: string;
  birthPlace?: string;
  gender?: number;
  occupation?: Job;
  countryId?: number;
  provinceId?: number;
  cityId?: number;
  districtId?: number;
  address?: string;
  residenceCountryId?: number;
  residenceProvinceId?: number;
  residenceCityId?: number;
  residenceDistrictId?: number;
  residenceAddress?: string;
};
