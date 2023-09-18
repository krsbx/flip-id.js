import FlipV1 from './Flip/FlipV1';
import FlipV2 from './Flip/FlipV2';
import FlipV3 from './Flip/FlipV3';
import instance from './axios';
import v1Instance from './axios/v1';

class Flip {
  // eslint-disable-next-line no-use-before-define
  static #instance: Flip;
  #secretKey: string | null;
  #toSendBox: boolean;
  #v1: FlipV1;
  #v2: FlipV2;
  #v3: FlipV3;

  constructor() {
    this.#toSendBox = true;
    this.#secretKey = null;
    this.#v1 = new FlipV1(this);
    this.#v2 = new FlipV2(this);
    this.#v3 = new FlipV3(this);
  }

  set secretKey(value: string) {
    this.#secretKey = value;

    const encoded = btoa(`${value}:`);
    instance.defaults.headers.Authorization = `Basic ${encoded}`;
    v1Instance.defaults.headers.Authorization = `Basic ${encoded}`;
  }

  get secretKey(): string | null {
    return this.#secretKey;
  }

  get toSendBox() {
    return this.#toSendBox;
  }

  set toSendBox(value: boolean) {
    this.#toSendBox = value;
  }

  static get instance() {
    if (!Flip.#instance) Flip.#instance = new Flip();

    return Flip.#instance;
  }

  get v1() {
    return this.#v1;
  }

  get v2() {
    return this.#v2;
  }

  get v3() {
    return this.#v3;
  }
}

export = Flip.instance;
