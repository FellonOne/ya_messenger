interface StorageSource {
  setItem(key: string, value: string): void;
  getItem(key: string): string;
  removeItem(key: string): void;
}

export class Storage {
  private static storageSource: StorageSource = window.localStorage as StorageSource;

  public static saveItemByKey(key: string, item: string): void {
    Storage.storageSource.setItem(key, item);
  }

  public static getItemByKey(key: string): string | null {
    const res = Storage.storageSource.getItem(key);

    if (!res) return null;
    return res;
  }

  public static removeItemByKey(key: string): void {
    Storage.storageSource.removeItem(key);
  }

  public static getObjectByKey<T>(key: string): T | null {
    const res = Storage.getItemByKey(key);
    if (!res) return null;

    const obj: T = JSON.parse(res);
    if (!obj) return null;

    return obj;
  }
}
