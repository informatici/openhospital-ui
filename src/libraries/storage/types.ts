export type IStorageWrite = (key: string, value: any) => void;

export type IStorageRead = (key: string) => any;

export type IStorageRemove = (key: string) => void;

export type IStorageClear = () => void;

export interface IStorage {
  write: IStorageWrite;
  read: IStorageRead;
  remove: IStorageRemove;
  clear: IStorageClear;
}
