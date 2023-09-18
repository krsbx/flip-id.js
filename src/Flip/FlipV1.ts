import type Flip from '..';
import GeneralClass from './v1/GeneralClass';

class FlipV1 {
  #general: GeneralClass;

  constructor(flip: typeof Flip) {
    this.#general = new GeneralClass(flip);
  }

  get general() {
    return this.#general;
  }
}

export = FlipV1;
