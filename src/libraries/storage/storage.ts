import {
  IStorageWrite,
  IStorageRead,
  IStorageRemove,
  IStorageClear,
  IStorage,
} from "./types";
import { STORAGE_NOT_AVAILABLE } from "./consts";

/**
 * Safe localStorage and sessinStorage
 * use it instead of native objects:
 * - check storage existence
 * - stringify values
 * - re-hydrate values
 * - catch errors
 *
 * Caveats:
 * - accepts only JSON, string, number, boolean, null, undefined and JSON.serializable objects
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const write = (storage?: Storage): IStorageWrite => (key, value) => {
  if (!storage) {
    console.warn(STORAGE_NOT_AVAILABLE);
    return;
  }
  try {
    const _value = JSON.stringify(value);
    storage.setItem(key, _value);
  } catch {
    console.error(`Can't write in storage`);
  }
};

const read = (storage?: Storage): IStorageRead => (key: string): any => {
  if (!storage) {
    console.warn(STORAGE_NOT_AVAILABLE);
    return null;
  }
  const value = storage.getItem(key);
  try {
    if (value) {
      return JSON.parse(value);
    }
    return value;
  } catch {
    return value;
  }
};

const remove = (storage: Storage): IStorageRemove => (key) => {
  if (!storage) {
    console.warn(STORAGE_NOT_AVAILABLE);
    return;
  }
  storage.removeItem(key);
};

const clear = (storage: Storage): IStorageClear => () => {
  if (!storage) {
    console.warn(STORAGE_NOT_AVAILABLE);
    return;
  }
  storage.clear();
};

export const LocalStorage: IStorage = {
  write: write(window.localStorage),
  read: read(window.localStorage),
  remove: remove(window.localStorage),
  clear: clear(window.localStorage),
};

export const SessionStorage = {
  write: write(window.sessionStorage),
  read: read(window.sessionStorage),
  remove: remove(window.sessionStorage),
  clear: clear(window.sessionStorage),
};
