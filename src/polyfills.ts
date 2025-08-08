import { Buffer } from 'buffer';

// Polyfill Buffer for browser environment
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  (globalThis as typeof globalThis & { Buffer: typeof Buffer }).Buffer = Buffer;
}
