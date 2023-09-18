import { v4 as uuid } from 'uuid';
import axios from '../../axios/v1';
import type Flip from '../..';
import { CityDistrictCountryList } from '../../utils/type';
import { CITY_DISTRICT_COUNTRY_LIST_TYPE } from '../../constants';

function getListUrl(type: CityDistrictCountryList, id: string = '') {
  let idParam = '';

  switch (type) {
    case CITY_DISTRICT_COUNTRY_LIST_TYPE.DISTRICT:
      idParam = 'city_id';
      break;

    case CITY_DISTRICT_COUNTRY_LIST_TYPE.CITY:
      idParam = 'province_id';
      break;

    case CITY_DISTRICT_COUNTRY_LIST_TYPE.PROVINCES:
      idParam = 'country_id';
      break;
  }

  const queries = [
    type !== CITY_DISTRICT_COUNTRY_LIST_TYPE.COUNTRY && `${idParam}=${id}`,
    'user_type=1',
  ]
    .filter((item) => item)
    .join('&');

  return `${type}?${queries}`;
}

class GeneralClass {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  get #baseUrl() {
    if (this.#flip.toSendBox) {
      return 'big_sandbox_api/v1';
    }

    return 'api/v1';
  }

  get get() {
    const baseUrl = this.#baseUrl;

    return {
      async list(type: CityDistrictCountryList, id: string = '') {
        const { data } = await axios.get<{ id: number; name: string }[]>(
          `${baseUrl}/${getListUrl(type, id)}`,
          {
            headers: {
              'Request-ID': `bigflip-${uuid()}`,
            },
          }
        );

        return data;
      },
    };
  }
}

export = GeneralClass;
