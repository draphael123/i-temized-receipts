import { openDB, type IDBPDatabase } from 'idb';
import type { ReceiptData } from './types';

const DB_NAME = 'itemized-receipts';
const DB_VERSION = 1;
const STORE_NAME = 'receipts';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  return dbPromise;
}

export async function saveReceipt(data: ReceiptData): Promise<number> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const id = await store.add({
    ...data,
    createdAt: new Date().toISOString(),
  });
  await tx.done;
  return id as number;
}

export async function getReceipt(id: number): Promise<ReceiptData | undefined> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const receipt = await store.get(id);
  await tx.done;
  return receipt;
}

export async function getAllReceipts(): Promise<Array<ReceiptData & { id: number }>> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const receipts = await store.getAll();
  await tx.done;
  return receipts;
}

export async function deleteReceipt(id: number): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
}

export async function clearAllReceipts(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  await tx.done;
}

