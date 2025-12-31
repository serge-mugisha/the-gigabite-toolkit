import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Store } from '@/lib/types';
import { addStore } from '@/lib/stores';

interface AddStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStoreAdded: (store: Store) => void;
}

export function AddStoreDialog({ open, onOpenChange, onStoreAdded }: AddStoreDialogProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [invoiceCode, setInvoiceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !invoiceCode.trim()) return;

    const newStore = addStore({
      name: name.trim(),
      address: address.trim(),
      contact: contact.trim(),
      invoiceCode: invoiceCode.trim().toUpperCase(),
    });

    onStoreAdded(newStore);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName('');
    setAddress('');
    setContact('');
    setInvoiceCode('');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="dialog-header">
            <Dialog.Title className="dialog-title">Add New Store</Dialog.Title>
            <Dialog.Description className="dialog-description">
              Add a new store to generate invoices for.
            </Dialog.Description>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Store Name *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., La Frégate"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="invoiceCode">Invoice Code *</label>
              <input
                id="invoiceCode"
                type="text"
                value={invoiceCode}
                onChange={(e) => setInvoiceCode(e.target.value.toUpperCase())}
                placeholder="e.g., LFREA"
                maxLength={10}
                required
              />
              <p className="text-sm text-muted mt-2">
                Invoices will be formatted as #{invoiceCode || 'CODE'}001
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Toronto, ON"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                id="contact"
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="(416) 555-0101"
              />
            </div>

            <div className="dialog-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Store
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
