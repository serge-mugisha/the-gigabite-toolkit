import { Store } from './types';

// Default stores - you can edit this list with your actual stores
export const DEFAULT_STORES: Store[] = [
  // Example stores - replace with your actual store data
  // {
  //   id: 'store-1',
  //   name: 'La Frégate',
  //   address: '123 Main St, Toronto, ON',
  //   contact: '(416) 555-0101',
  //   invoiceCode: 'LFREA',
  // },
];

const STORAGE_KEY = 'gigabite-stores';

export function getStores(): Store[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Store[];
      // Merge with defaults (defaults that don't exist in stored)
      const storedIds = new Set(parsed.map(s => s.id));
      const missingDefaults = DEFAULT_STORES.filter(s => !storedIds.has(s.id));
      return [...parsed, ...missingDefaults];
    }
  } catch {
    // If parsing fails, return defaults
  }
  return [...DEFAULT_STORES];
}

export function saveStores(stores: Store[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
}

export function addStore(store: Omit<Store, 'id'>): Store {
  const stores = getStores();
  const newStore: Store = {
    ...store,
    id: `store-${Date.now()}`,
  };
  stores.push(newStore);
  saveStores(stores);
  return newStore;
}

export function updateStore(id: string, updates: Partial<Omit<Store, 'id'>>): Store | null {
  const stores = getStores();
  const index = stores.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  stores[index] = { ...stores[index], ...updates };
  saveStores(stores);
  return stores[index];
}

export function deleteStore(id: string): boolean {
  const stores = getStores();
  const filtered = stores.filter(s => s.id !== id);
  if (filtered.length === stores.length) return false;
  
  saveStores(filtered);
  return true;
}

export function formatInvoiceNumber(code: string, number: number): string {
  return `#${code}${number.toString().padStart(3, '0')}`;
}
