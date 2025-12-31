import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { InvoiceMaker } from './pages/InvoiceMaker';
import './index.css';

type Route = 'home' | 'invoice';

function getRouteFromHash(): Route {
  const hash = window.location.hash;
  if (hash === '#/invoice') return 'invoice';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  switch (route) {
    case 'invoice':
      return <InvoiceMaker />;
    case 'home':
    default:
      return <Home />;
  }
}
