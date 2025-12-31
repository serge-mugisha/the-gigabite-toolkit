# The GigaBite Toolkit

Online tools for **The GigaBite Pastry Inc.**

## Tools

- **Invoice Maker** - Generate delivery invoices for stores

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment to GitHub Pages

1. Build the project: `npm run build`
2. The `dist/` folder contains the static files
3. Deploy the contents of `dist/` to GitHub Pages

Or set up GitHub Actions to auto-deploy on push.

## Adding Default Stores

Edit `src/lib/stores.ts` and add your stores to the `DEFAULT_STORES` array:

```typescript
export const DEFAULT_STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Store Name',
    address: '123 Address St, City, Province',
    contact: '(123) 456-7890',
    invoiceCode: 'CODE', // Invoices will be #CODE001, #CODE002, etc.
  },
  // Add more stores...
];
```

Stores added via the UI are saved to localStorage and will persist in the browser.
