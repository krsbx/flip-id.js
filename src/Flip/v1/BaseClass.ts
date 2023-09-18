import type Flip from '../..';

class BaseV1Class {
  private $flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.$flip = flip;
  }

  protected get baseUrl() {
    if (this.$flip.toSendBox) {
      return 'kyc-sandbox/api/v1';
    }

    return 'kyc/api/v1';
  }
}

export = BaseV1Class;
