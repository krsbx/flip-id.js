import type Flip from '..';
import GeneralClass from './v2/GeneralClass';
import BillClass from './v2/BillClass';
import DisbursementAgentClass from './v2/DisbursementAgentClass';
import PaymentClass from './v2/PaymentClass';
import InternationalClass from './v2/InternationalClass';
import AgentClass from './v2/AgentClass';

class FlipV2 {
  #general: GeneralClass;
  #bill: BillClass;
  #agent: AgentClass;
  #disbursementAgent: DisbursementAgentClass;
  #payment: PaymentClass;
  #international: InternationalClass;

  constructor(flip: typeof Flip) {
    this.#general = new GeneralClass(flip);
    this.#agent = new AgentClass(flip);
    this.#bill = new BillClass(flip);
    this.#disbursementAgent = new DisbursementAgentClass(flip);
    this.#payment = new PaymentClass(flip);
    this.#international = new InternationalClass(flip);
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

  get international() {
    return this.#international;
  }

  get agent() {
    return this.#agent;
  }
}

export = FlipV2;
