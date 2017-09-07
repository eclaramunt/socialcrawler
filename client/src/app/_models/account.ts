export class Account {
  type: String;

  constructor(obj: Object) {
    this.type = obj['type'];
  }

  static fromJSONArray(array: Array<Object>): Account[] {
    return array.map(obj => new Account(obj));
  }

  getEntries() {
    if (this.type == 'facebook') {

    }
    return 'lalala';
  }

  isFacebook(): boolean {
    return this.type === 'facebook';
  }



}
