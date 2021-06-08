export default class Uid {
  static generate() {
    const array = new Uint32Array(1);
    return window.crypto.getRandomValues(array).toString();
  }
}