interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

function ToolCard({ title, description, href }: ToolCardProps) {
  return (
    <a href={href} className="tool-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </a>
  );
}

export function Home() {
  return (
    <div className="container">
      <div className="mb-6">
        <h1>The GigaBite Toolkit</h1>
        <p className="text-muted mt-2">Tools for The GigaBite Pastry Inc.</p>
      </div>

      <div className="flex flex-col gap-4">
        <ToolCard
          title="Invoice Maker"
          description="Generate delivery invoices for stores. Select a store, set the invoice number and date, then print to PDF."
          href="#/invoice"
        />
        {/* Add more tools here as needed */}
      </div>
    </div>
  );
}
