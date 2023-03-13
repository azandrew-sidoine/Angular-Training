class WebStorage {
  constructor(private storage: Storage) {}

  getItem(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

  setItem(key: string, value: unknown) {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
