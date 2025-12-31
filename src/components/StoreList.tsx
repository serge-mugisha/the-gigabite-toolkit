import { Store } from '@/lib/types';
import { deleteStore } from '@/lib/stores';

interface StoreListProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelect: (store: Store) => void;
  onStoresChange: () => void;
}

export function StoreList({ stores, selectedStore, onSelect, onStoresChange }: StoreListProps) {
  const handleDelete = (e: React.MouseEvent, store: Store) => {
    e.stopPropagation();
    if (confirm(`Delete "${store.name}"? This cannot be undone.`)) {
      deleteStore(store.id);
      onStoresChange();
    }
  };

  if (stores.length === 0) {
    return (
      <div className="empty-state">
        <p>No stores added yet.</p>
        <p className="text-sm mt-2">Add a store to get started.</p>
      </div>
    );
  }

  return (
    <div className="store-list">
      {stores.map((store) => (
        <div
          key={store.id}
          className={`store-item ${selectedStore?.id === store.id ? 'selected' : ''}`}
          onClick={() => onSelect(store)}
        >
          <div className="store-info">
            <div className="store-name">{store.name}</div>
            <div className="store-details">
              {store.address && <span>{store.address}</span>}
              {store.address && store.contact && <span> • </span>}
              {store.contact && <span>{store.contact}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="store-code">{store.invoiceCode}</span>
            <button
              className="btn btn-ghost"
              onClick={(e) => handleDelete(e, store)}
              title="Delete store"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
