import FlipV2 from './FlipV2';
import FlipV3 from './FlipV3';
import instance from './axios';

class Flip {
  // eslint-disable-next-line no-use-before-define
  static #instance: Flip;
  #secretKey: string | null;
  #toSendBox: boolean;
  #v2: FlipV2;
  #v3: FlipV3;

  constructor() {
    this.#toSendBox = true;
    this.#secretKey = null;
    this.#v2 = new FlipV2(this);
    this.#v3 = new FlipV3(this);
  }

  public set secretKey(value: string) {
    this.#secretKey = value;

    const encoded = btoa(`${value}:`);
    instance.defaults.headers.Authorization = `Basic ${encoded}`;
  }

  public get secretKey(): string | null {
    return this.#secretKey;
  }

  public get toSendBox() {
    return this.#toSendBox;
  }

  public set toSendBox(value: boolean) {
    this.#toSendBox = value;
  }

  public static get instance() {
    if (!Flip.#instance) Flip.#instance = new Flip();

    return Flip.#instance;
  }

  public get v2() {
    return this.#v2;
  }

  public get v3() {
    return this.#v3;
  }
}

export = Flip.instance;
