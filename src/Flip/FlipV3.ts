import type Flip from '..';
import DisbursementClass from './v3/DisbursementClass';

class FlipV3 {
  #disbursement: DisbursementClass;

  constructor(flip: typeof Flip) {
    this.#disbursement = new DisbursementClass(flip);
  }

  get disbursement() {
    return this.#disbursement;
  }
}

export default FlipV3;
