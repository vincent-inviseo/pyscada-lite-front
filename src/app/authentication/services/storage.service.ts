/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

export const JSON_TYPE = 'json';

export const BOOL_TYPE = 'bool';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  protected storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public set(key: string, value: any): any {
    if (typeof value !== 'string') {
      this.storage.setItem(key, JSON.stringify(value));
      return this.storage.getItem(key);
    }

    this.storage.setItem(key, value);
  }

  public get(key: string, expected?: string): any {
    const value = this.storage.getItem(key);

    if (value === null) {
      return null;
    }

    switch (expected) {
      case JSON_TYPE:
        return JSON.parse(value);
      case BOOL_TYPE:
        return value === 'true';
      default:
        return value;
    }
  }

  public has(key: string): boolean {
    return this.storage.getItem(key) !== null
      && this.storage.getItem(key) !== 'null';
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
