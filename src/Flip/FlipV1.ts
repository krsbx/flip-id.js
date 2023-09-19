import type Flip from '..';
import RepairClass from './v1/RepairClass';
import GeneralClass from './v1/GeneralClass';
import AgentClass from './v2/AgentClass';

class FlipV1 {
  #general: GeneralClass;
  #agent: AgentClass;
  #repair: RepairClass;

  constructor(flip: typeof Flip) {
    this.#general = new GeneralClass(flip);
    this.#agent = new AgentClass(flip);
    this.#repair = new RepairClass(flip);
  }

  public get general() {
    return this.#general;
  }

  public get agent() {
    return this.#agent;
  }

  public get repair() {
    return this.#repair;
  }
}

export = FlipV1;
