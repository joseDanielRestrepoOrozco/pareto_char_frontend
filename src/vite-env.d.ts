/// <reference types="vite/client" />

// Extend Window interface to include Buffer
declare global {
  interface Window {
    Buffer: typeof import('buffer').Buffer;
  }
}

export {};
