import { MochiRequestClient } from './types';
export * from './types';

declare global {
  const request: MochiRequestClient;
}
