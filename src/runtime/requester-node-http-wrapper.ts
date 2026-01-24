// Wrapper to make @algolia/requester-fetch compatible with @algolia/requester-node-http
// This allows algoliasearch to use fetch requester on server instead of node-http
import { createFetchRequester } from '@algolia/requester-fetch'

// Export createHttpRequester that uses createFetchRequester internally
export const createHttpRequester = createFetchRequester

// Also export as default for compatibility
export default createHttpRequester
