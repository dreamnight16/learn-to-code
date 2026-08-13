import { logger } from "./logger";

export interface StorageRepository {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class LocalStorageRepository implements StorageRepository {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      logger.warn("localStorage.setItem failed", {
        key,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.warn("localStorage.removeItem failed", {
        key,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

export class MemoryRepository implements StorageRepository {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}

let globalRepo: StorageRepository | null = null;

export function createRepository(): StorageRepository {
  if (typeof window !== "undefined" && window.localStorage) {
    return new LocalStorageRepository();
  }
  return new MemoryRepository();
}

export function getRepository(): StorageRepository {
  if (!globalRepo) {
    globalRepo = createRepository();
  }
  return globalRepo;
}

export function setRepository(repo: StorageRepository): void {
  globalRepo = repo;
}
