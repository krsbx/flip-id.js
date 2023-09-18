export const PLACE_TYPE = {
  COUNTRY: 'countries',
  PROVINCES: 'provinces',
  CITY: 'cities',
  DISTRICT: 'districts',
} as const;

export const PLACE_TYPE_PARAM = {
  [PLACE_TYPE.COUNTRY]: '',
  [PLACE_TYPE.PROVINCES]: 'country_id',
  [PLACE_TYPE.CITY]: 'province_id',
  [PLACE_TYPE.DISTRICT]: 'city_id',
} as const;
