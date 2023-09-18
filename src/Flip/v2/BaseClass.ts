import type Flip from '../..';

class BaseV2Class {
  private $flip: typeof Flip;

  constructor(flip: typeof Flip) {
    this.$flip = flip;
  }

  protected get baseUrl() {
    if (this.$flip.toSendBox) {
      return 'big_sandbox_api/v2';
    }

    return 'api/v2';
  }
}

export = BaseV2Class;
