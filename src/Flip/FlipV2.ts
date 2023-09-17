import type Flip from '..';
import GeneralClass from './v2/GeneralClass';
import BillClass from './v2/BillClass';
import DisbursementAgentClass from './v2/DisbursementAgentClass';

class FlipV2 {
  #general: GeneralClass;
  #bill: BillClass;
  #disbursementAgent: DisbursementAgentClass;

  constructor(flip: typeof Flip) {
    this.#general = new GeneralClass(flip);
    this.#bill = new BillClass(flip);
    this.#disbursementAgent = new DisbursementAgentClass(flip);
  }

  get general() {
    return this.#general;
  }

  get bill() {
    return this.#bill;
  }

  get disbursementAgent() {
    return this.#disbursementAgent;
  }
}

export default FlipV2;
