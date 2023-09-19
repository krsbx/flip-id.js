import type Flip from '../..';

class BaseV3Class {
  #flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.#flip = flip;
  }

  protected get baseUrl() {
    if (this.#flip.toSendBox) {
      return 'big_sandbox_api/v3';
    }

    return 'api/v3';
  }
}

export = BaseV3Class;
