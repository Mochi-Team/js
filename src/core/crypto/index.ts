export * from './types';

// TODO: Add support for crypto
declare global {
  const __crypto__: object;
}
