import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const root = createRoot(document.getElementById('root'));


const PUBLISHABLE_KEY = import.meta.env;
const publishablekey="pk_test_dmFzdC13cmVuLTc5LmNsZXJrLmFjY291bnRzLmRldiQ"
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
root.render(
  
    <React.StrictMode>
    <ClerkProvider publishableKey={publishablekey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,

);