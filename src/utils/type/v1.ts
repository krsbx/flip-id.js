import { PLACE_TYPE } from '../constants/v1';

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
