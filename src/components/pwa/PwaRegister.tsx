'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (process.env.NODE_ENV !== 'production') {
              console.log('[RideBridge PWA] Service worker registered:', registration.scope);
            }
          })
          .catch((error) => {
            console.warn('[RideBridge PWA] Service worker registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}
