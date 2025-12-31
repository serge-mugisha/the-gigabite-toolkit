import { useState, useEffect, useRef } from 'react';
import { Store, InvoiceData } from '@/lib/types';
import { getStores } from '@/lib/stores';
import { StoreList } from '@/components/StoreList';
import { AddStoreDialog } from '@/components/AddStoreDialog';
import { DatePicker } from '@/components/DatePicker';
import { InvoicePage } from '@/components/InvoiceTemplate';

export function InvoiceMaker() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStores(getStores());
  }, []);

  const refreshStores = () => {
    setStores(getStores());
    setSelectedStore(null);
  };

  const handleStoreAdded = (store: Store) => {
    setStores(getStores());
    setSelectedStore(store);
  };

  const canGenerate = selectedStore && invoiceNumber && invoiceDate;

  const invoiceData: InvoiceData | null = canGenerate
    ? {
        store: selectedStore,
        invoiceNumber: parseInt(invoiceNumber, 10),
        date: invoiceDate,
        terms: 60,
      }
    : null;

  const handleGeneratePDF = () => {
    if (!invoiceData) return;
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  // Preview/Print Mode
  if (showPreview && invoiceData) {
    return (
      <>
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
            .print-area { 
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        `}</style>
        <div className="no-print" style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          background: '#fafafa', 
          padding: '12px 16px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}>
          <button className="btn btn-secondary" onClick={handleBack}>
            ← Back
          </button>
          <span className="text-muted">
            Invoice for {selectedStore?.name} - #{selectedStore?.invoiceCode}{invoiceNumber.padStart(3, '0')}
          </span>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print / Save PDF
          </button>
        </div>
        <div style={{ paddingTop: '60px' }}>
          <div className="print-area" ref={printRef}>
            <InvoicePage data={invoiceData} />
          </div>
        </div>
      </>
    );
  }

  // Form Mode
  return (
    <div className="container">
      <nav className="nav">
        <a href="#/" className="nav-brand">← Back to Toolkit</a>
      </nav>

      <div className="mb-6">
        <h1>Invoice Maker</h1>
        <p className="text-muted mt-2">Generate delivery invoices for stores.</p>
      </div>

      {/* Step 1: Select Store */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3>1. Select Store</h3>
          <button
            className="btn btn-secondary"
            onClick={() => setShowAddDialog(true)}
          >
            + Add Store
          </button>
        </div>
        <StoreList
          stores={stores}
          selectedStore={selectedStore}
          onSelect={setSelectedStore}
          onStoresChange={refreshStores}
        />
      </div>

      {/* Step 2: Invoice Details */}
      {selectedStore && (
        <div className="card mb-4">
          <h3 className="mb-4">2. Invoice Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <div className="flex items-center gap-2">
                <span className="text-muted">#{selectedStore.invoiceCode}</span>
                <input
                  id="invoiceNumber"
                  type="number"
                  min="1"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="001"
                  style={{ width: '100px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Invoice Date</label>
              <DatePicker
                value={invoiceDate}
                onChange={setInvoiceDate}
                placeholder="Select date"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Terms</label>
            <input
              type="text"
              value="60 days"
              disabled
              style={{ background: '#f5f5f5', color: '#666' }}
            />
          </div>
        </div>
      )}

      {/* Step 3: Generate */}
      {selectedStore && (
        <div className="card">
          <h3 className="mb-4">3. Generate Invoice</h3>
          <p className="text-muted text-sm mb-4">
            This will generate a page with 3 identical invoices ready for printing.
            Use your browser's "Print" or "Save as PDF" feature.
          </p>
          <button
            className="btn btn-primary btn-block"
            onClick={handleGeneratePDF}
            disabled={!canGenerate}
          >
            Generate Invoice Page
          </button>
        </div>
      )}

      <AddStoreDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onStoreAdded={handleStoreAdded}
      />
    </div>
  );
}
