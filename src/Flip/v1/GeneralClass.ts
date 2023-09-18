import axios from '../../axios/v1';
import type Flip from '../..';
import { PlaceTypeList } from '../../utils/type/v1';
import { PLACE_TYPE, PLACE_TYPE_PARAM } from '../../utils/constants/v1';
import { normalizePlaceList } from '../../utils/normalizer/general';
import BaseV1Class from './BaseClass';

function getListUrl(type: PlaceTypeList, id: string = '') {
  const idParam = PLACE_TYPE_PARAM[type];
  const isCountry = type === PLACE_TYPE.COUNTRY;

  const queries = [!isCountry && id && `${idParam}=${id}`, 'user_type=1']
    .filter((item) => item)
    .join('&');

  return `${type}?${queries}`;
}

class GeneralClass extends BaseV1Class {
  constructor(flip: typeof Flip) {
    super(flip);
  }

  public get get() {
    const { baseUrl } = this;

    return {
      async list<T extends PlaceTypeList>(type: T, id: string = '') {
        const { data } = await axios.get(`${baseUrl}/${getListUrl(type, id)}`);

        return normalizePlaceList<T>(type, data);
      },
    };
  }
}

export = GeneralClass;
