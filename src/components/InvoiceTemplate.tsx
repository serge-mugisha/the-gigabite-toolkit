import { InvoiceData } from '@/lib/types';
import { formatInvoiceNumber } from '@/lib/stores';
import './InvoiceTemplate.css';

interface InvoiceTemplateProps {
  data: InvoiceData;
}

function SingleInvoice({ data }: InvoiceTemplateProps) {
  const formattedDate = data.date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const invoiceNum = formatInvoiceNumber(data.store.invoiceCode, data.invoiceNumber);

  return (
    <div className="invoice-container">
      <div className="invoice-layout">
        {/* Left Column */}
        <div className="left-column">
          <div className="header">
            <div className="company-name">The GigaBite Pastry Inc.</div>
            <div className="company-tagline">
              thegigabite.ca<br />
              +1 (365) 809-1229 | hello@thegigabite.ca
            </div>
          </div>

          <div className="invoice-info">
            <div className="invoice-title">INVOICE</div>
            <div className="invoice-number">{invoiceNum}</div>
            <div className="invoice-details">
              <strong>Date:</strong> {formattedDate}<br />
              <strong>Terms:</strong> {data.terms} days
            </div>
          </div>

          <div className="bill-to">
            <h3>Bill To:</h3>
            <div className="bill-to-content">
              <div className="bill-to-line">Store: {data.store.name}</div>
              <div className="bill-to-line">Address: {data.store.address || '___________________'}</div>
              <div className="bill-to-line">Contact: {data.store.contact || '___________________'}</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="products-section">
            <div className="section-title">Products Delivered &amp; Returns</div>
            <div className="products-grid">
              <div className="product-item">
                <div className="product-name">Mandazi</div>
                <div className="product-price">$8.00/pack</div>
                <div className="qty-returns-row">
                  <div className="qty-section">
                    <div className="qty-label">Qty:</div>
                    <div className="qty-box"></div>
                  </div>
                  <div className="returns-section">
                    <div className="returns-label">Return:</div>
                    <div className="return-qty-box"></div>
                  </div>
                </div>
                <div className="total-box">Total: $__________</div>
              </div>
              <div className="product-item">
                <div className="product-name">Chapati</div>
                <div className="product-price">$9.00/pack</div>
                <div className="qty-returns-row">
                  <div className="qty-section">
                    <div className="qty-label">Qty:</div>
                    <div className="qty-box"></div>
                  </div>
                  <div className="returns-section">
                    <div className="returns-label">Return:</div>
                    <div className="return-qty-box"></div>
                  </div>
                </div>
                <div className="total-box">Total: $__________</div>
              </div>
              <div className="product-item">
                <div className="product-name">Sambusa</div>
                <div className="product-price">$12.50/pack</div>
                <div className="qty-returns-row">
                  <div className="qty-section">
                    <div className="qty-label">Qty:</div>
                    <div className="qty-box"></div>
                  </div>
                  <div className="returns-section">
                    <div className="returns-label">Return:</div>
                    <div className="return-qty-box"></div>
                  </div>
                </div>
                <div className="total-box">Total: $__________</div>
              </div>
            </div>
          </div>

          <div>
            <div className="totals-row">
              <span>Subtotal:</span>
              <span>$______________</span>
            </div>
            <div className="totals-row">
              <span>Returns Credit:</span>
              <span>-$______________</span>
            </div>
            <div className="totals-row grand-total">
              <span>AMOUNT DUE:</span>
              <span>$______________</span>
            </div>
          </div>

          <div className="bottom-section">
            <div className="signature-box">
              <div className="signature-title">Provider (Signature)</div>
              <div className="signature-line"></div>
              <div className="signature-label">Name: ______________________________</div>
            </div>
            <div className="signature-box">
              <div className="signature-title">Recipient (Signature)</div>
              <div className="signature-line"></div>
              <div className="signature-label">Name: ______________________________</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InvoicePageProps {
  data: InvoiceData;
}

export function InvoicePage({ data }: InvoicePageProps) {
  return (
    <div className="page-container">
      <SingleInvoice data={data} />
      <SingleInvoice data={data} />
      <SingleInvoice data={data} />
    </div>
  );
}
