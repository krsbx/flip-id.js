import type Flip from '..';
import GeneralClass from './v2/GeneralClass';
import BillClass from './v2/BillClass';
import DisbursementAgentClass from './v2/DisbursementAgentClass';
import PaymentClass from './v2/PaymentClass';

class FlipV2 {
  #general: GeneralClass;
  #bill: BillClass;
  #disbursementAgent: DisbursementAgentClass;
  #payment: PaymentClass;

  constructor(flip: typeof Flip) {
    this.#general = new GeneralClass(flip);
    this.#bill = new BillClass(flip);
    this.#disbursementAgent = new DisbursementAgentClass(flip);
    this.#payment = new PaymentClass(flip);
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

  get payment() {
    return this.#payment;
  }
}

export = FlipV2;
