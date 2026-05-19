import type { DocSearchTranslations } from '@docsearch/react'
import type {
  InternalDocSearchHit,
  StoredDocSearchHit
} from '@docsearch/react/dist/esm/types'

import type { SearchResponse } from 'algoliasearch'

export interface AlgoliaIndices {}

export type RequestOptionsObject = {
  // eslint-disable-next-line
  requestOptions?: RequestOptions;
};

// TODO: check how this can be fixed, or if it needs to
// export type TypedSearchIndex<K extends keyof AlgoliaIndices> = {
//   readonly search: (
//     ...args: any
//   ) => Readonly<Promise<SearchResponse<AlgoliaIndices[K]>>>;
// } & Omit<SearchIndex, 'search'>;

// Have to add some types manually as the imports are failing the build process of the module
// Algolia types

// See node_modules/@algolia/client-common/dist/common.d.ts
export declare type RequestOptions = {
  /**
   * If the given request should persist on the cache. Keep in mind,
   * that some methods may have this option enabled by default.
   */
  cacheable?: boolean | undefined;
  /**
   * Custom timeout for the request. Note that, in normal situations
   * the given timeout will be applied. But the transporter layer may
   * increase this timeout if there is need for it.
   */
  timeouts?:
    | Partial<{
        /**
         * Timeout in milliseconds before the connection is established.
         */
        connect: number;
        /**
         * Timeout in milliseconds before reading the response on a read request.
         */
        read: number;
        /**
         * Timeout in milliseconds before reading the response on a write request.
         */
        write: number;
      }>
    | undefined;
  /**
   * Custom headers for the request. This headers are
   * going to be merged the transporter headers.
   */
  headers?: Record<string, string> | undefined;
  /**
   * Custom query parameters for the request. This query parameters are
   * going to be merged the transporter query parameters.
   */
  queryParameters?: Record<string, any> | undefined;
  /**
   * Custom data for the request. This data is
   * going to be merged the transporter data.
   */
  data?: Array<Record<string, any>> | Record<string, any> | undefined;
};

export declare type SearchOptions = {
  /**
   * Create a new query with an empty search query.
   */
  readonly query?: string;
  /**
   * Allows a search for similar objects, but the query has to be constructed on your end and included alongside an empty query.
   *
   * The similarQuery should be made from the tags and keywords of the relevant object.
   */
  readonly similarQuery?: string;
  /**
   *  Filter hits by facet value.
   */
  readonly facetFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;
  /**
   * Create filters for ranking purposes, where records that match the filter are ranked highest.
   */
  readonly optionalFilters?: string | readonly string[] | ReadonlyArray<readonly string[] | string>;
  /**
   * Filter on numeric attributes.
   */
  readonly numericFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;
  /**
   * Filter hits by tags. tagFilters is a different way of filtering, which relies on the _tags
   * attribute. It uses a simpler syntax than filters. You can use it when you want to do
   * simple filtering based on tags.
   */
  readonly tagFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;
  /**
   * Determines how to calculate the total score for filtering.
   */
  readonly sumOrFiltersScores?: boolean;
  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  readonly filters?: string;
  /**
   * Specify the page to retrieve.
   */
  readonly page?: number;
  /**
   * Set the number of hits per page.
   */
  readonly hitsPerPage?: number;
  /**
   * Specify the offset of the first hit to return.
   */
  readonly offset?: number;
  /**
   * Set the number of hits to retrieve (used only with offset).
   */
  readonly length?: number;
  /**
   * List of attributes to highlight.
   */
  readonly attributesToHighlight?: readonly string[];
  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   */
  readonly attributesToSnippet?: readonly string[];
  /**
   * Gives control over which attributes to retrieve and which not to retrieve.
   */
  readonly attributesToRetrieve?: readonly string[];
  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   */
  readonly highlightPreTag?: string;
  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results
   */
  readonly highlightPostTag?: string;
  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   */
  readonly snippetEllipsisText?: string;
  /**
   * Restrict highlighting and snippeting to items that matched the query.
   */
  readonly restrictHighlightAndSnippetArrays?: boolean;
  /**
   * Facets to retrieve.
   */
  readonly facets?: readonly string[];
  /**
   * Maximum number of facet values to return for each facet during a regular search.
   */
  readonly maxValuesPerFacet?: number;
  /**
   *  Force faceting to be applied after de-duplication (via the Distinct setting).
   */
  readonly facetingAfterDistinct?: boolean;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1 typo
   */
  readonly minWordSizefor1Typo?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2 typos.
   */
  readonly minWordSizefor2Typos?: number;
  /**
   * Whether to allow typos on numbers (“numeric tokens”) in the query string.
   */
  readonly allowTyposOnNumericTokens?: boolean;
  /**
   * List of attributes on which you want to disable typo tolerance.
   */
  readonly disableTypoToleranceOnAttributes?: readonly string[];
  /**
   * Controls if and how query words are interpreted as prefixes.
   */
  readonly queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone';
  /**
   * Selects a strategy to remove words from the query when it doesn’t match any hits.
   */
  readonly removeWordsIfNoResults?: 'none' | 'lastWords' | 'firstWords' | 'allOptional';
  /**
   * Enables the advanced query syntax.
   */
  readonly advancedSyntax?: boolean;
  /**
   * AdvancedSyntaxFeatures can be exactPhrase or excludeWords
   */
  readonly advancedSyntaxFeatures?: ReadonlyArray<'exactPhrase' | 'excludeWords'>;
  /**
   * A list of words that should be considered as optional when found in the query.
   */
  readonly optionalWords?: string | readonly string[];
  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   */
  readonly disableExactOnAttributes?: readonly string[];
  /**
   * Controls how the exact ranking criterion is computed when the query contains only one word.
   */
  readonly exactOnSingleWordQuery?: 'attribute' | 'none' | 'word';
  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   */
  readonly alternativesAsExact?: ReadonlyArray<'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym'>;
  /**
   * Whether rules should be globally enabled.
   */
  readonly enableRules?: boolean;
  /**
   * Enables contextual rules.
   */
  readonly ruleContexts?: readonly string[];
  /**
   * Enables de-duplication or grouping of results.
   */
  readonly distinct?: boolean | number;
  /**
   * Whether the current query will be taken into account in the Analytics
   */
  readonly analytics?: boolean;
  /**
   * List of tags to apply to the query in the analytics.
   */
  readonly analyticsTags?: readonly string[];
  /**
   * Whether to take into account an index’s synonyms for a particular search.
   */
  readonly synonyms?: boolean;
  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym itself.
   */
  readonly replaceSynonymsInHighlight?: boolean;
  /**
   * Precision of the proximity ranking criterion.
   */
  readonly minProximity?: number;
  /**
   * Choose which fields the response will contain. Applies to search and browse queries.
   */
  readonly responseFields?: readonly string[];
  /**
   * Maximum number of facet hits to return during a search for facet values.
   */
  readonly maxFacetHits?: number;
  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   */
  readonly percentileComputation?: boolean;
  /**
   * Enable the Click Analytics feature.
   */
  readonly clickAnalytics?: boolean;
  /**
   * The `personalizationImpact` parameter sets the percentage of the impact that personalization has on ranking records. The
   * value must be between 0 and 100 (inclusive). This parameter will not be taken into account if `enablePersonalization`
   * is **false**.
   */
  readonly personalizationImpact?: number;
  /**
   * Enable personalization for the query
   */
  readonly enablePersonalization?: boolean;
  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   */
  readonly restrictSearchableAttributes?: readonly string[];
  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   */
  readonly sortFacetValuesBy?: 'count' | 'alpha';
  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   */
  readonly typoTolerance?: boolean | 'min' | 'strict';
  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  readonly aroundLatLng?: string;
  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  readonly aroundLatLngViaIP?: boolean;
  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  readonly aroundRadius?: number | 'all';
  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   */
  readonly aroundPrecision?: number | ReadonlyArray<{
      readonly from: number;
      readonly value: number;
  }>;
  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set.
   */
  readonly minimumAroundRadius?: number;
  /**
   * Search inside a rectangular area (in geo coordinates).
   */
  readonly insideBoundingBox?: ReadonlyArray<readonly number[]> | string;
  /**
   * Search inside a polygon (in geo coordinates).
   */
  readonly insidePolygon?: ReadonlyArray<readonly number[]>;
  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   */
  readonly ignorePlurals?: boolean | readonly string[];
  /**
   * Removes stop (common) words from the query before executing it.
   */
  readonly removeStopWords?: boolean | readonly string[];
  /**
   * List of supported languages with their associated language ISO code.
   *
   * Apply a set of natural language best practices such as ignorePlurals,
   * removeStopWords, removeWordsIfNoResults, analyticsTags and ruleContexts.
   */
  readonly naturalLanguages?: readonly string[];
  /**
   * When true, each hit in the response contains an additional _rankingInfo object.
   */
  readonly getRankingInfo?: boolean;
  /**
   * A user identifier.
   * Format: alpha numeric string [a-zA-Z0-9_-]
   * Length: between 1 and 64 characters.
   */
  readonly userToken?: string;
  /**
   * Can be to enable or disable A/B tests at query time.
   * Engine's default: true
   */
  readonly enableABTest?: boolean;
  /**
   * Enable word segmentation (also called decompounding) at query time for
   * compatible languages. For example, this turns the Dutch query
   * "spaanplaatbehang" into "spaan plaat behang" to retrieve more relevant
   * results.
   */
  readonly decompoundQuery?: boolean;
  /**
   * The relevancy threshold to apply to search in a virtual index [0-100]. A Bigger
   * value means fewer, but more relevant results, smaller value means more, but
   * less relevant results.
   */
  readonly relevancyStrictness?: number;
  /**
   * Whether this search should use Dynamic Re-Ranking.
   * @link https://www.algolia.com/doc/guides/algolia-ai/re-ranking/
   *
   * Note: You need to turn on Dynamic Re-Ranking on your index for it to have an effect on
   * your search results. You can do this through the Re-Ranking page on the dashboard.
   * This parameter is only used to turn off Dynamic Re-Ranking (with false) at search time.
   */
  readonly enableReRanking?: boolean;
};

export declare type RankingInfo = {
  readonly promoted: boolean;
  readonly nbTypos: number;
  readonly firstMatchedWord: number;
  readonly proximityDistance?: number;
  readonly geoDistance: number;
  readonly geoPrecision?: number;
  readonly nbExactWords: number;
  readonly words: number;
  readonly filters: number;
  readonly userScore: number;
  readonly matchedGeoLocation?: {
    readonly lat: number;
    readonly lng: number;
    readonly distance: number;
  };
  readonly personalization?: {
    readonly filtersScore: number;
    readonly rankingScore: number;
    readonly score: number;
  };
};

export type SnippetMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
};

export type SnippetResult<THit> = THit extends string | number
  ? SnippetMatch
  : {
      [KAttribute in keyof THit]: SnippetResult<THit[KAttribute]>;
    };

export type HighlightMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
  readonly matchedWords: readonly string[];
  readonly fullyHighlighted?: boolean;
};

export type HighlightResult<THit> = THit extends string | number
  ? HighlightMatch
  : {
      [KAttribute in keyof THit]?: HighlightResult<THit[KAttribute]>;
    };

export type Hit<THit> = THit & {
  readonly objectID: string;
  readonly _highlightResult?: HighlightResult<THit>;
  readonly _snippetResult?: SnippetResult<THit>;
  readonly _rankingInfo?: RankingInfo;
  readonly _distinctSeqID?: number;
};

export interface DocSearchOptions {
  /**
   * Your Algolia application ID.
   *
   * {@link https://docsearch.algolia.com/docs/api#appid}
   */
  applicationId: string;
  /**
   * Your Algolia Search API key.
   *
   * {@link https://docsearch.algolia.com/docs/api#apikey}
   */
  apiKey: string;
  /**
   * Your Algolia index name.
   *
   * {@link https://docsearch.algolia.com/docs/api#indexname}
   */
  indexName: string;
  /**
   * The placeholder of the input of the DocSearch pop-up modal.
   *
   * {@link https://docsearch.algolia.com/docs/api#placeholder}
   */
  placeholder?: string;
  /**
   * The Algolia Search Parameters.
   *
   * {@link https://docsearch.algolia.com/docs/api#searchparameters}
   */
  indices?: SearchOptions;
  /**
   * Disable saving recent searches and favorites to the local storage.
   *
   * {@link https://docsearch.algolia.com/docs/api#transformsearchclient}
   */
  disableUserPersonalization?: boolean;
  /**
   * The search input initial query.
   * {@link https://docsearch.algolia.com/docs/api#initialquery}
   */
  initialQuery?: string;
  /**
   * Allow translations of any raw text and aria-labels present in the DocSearch button or modal components.
   * {@link https://docsearch.algolia.com/docs/api#translations}
   */
  translations?: DocSearchTranslations;
  /**
   * The facetFilters to use in your search parameters.
   * This is local shorthand and provided by @nuxtjs/algolia.
   * This will be overwritten if you add `facetFilters` into your `searchOptions` object.
   * {@link https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/}
   */
  facetFilters?: string;
  /**
   * The language to prefix all your facetFilters with.
   * This will be overwritten if you add `facetFilters` into your `searchOptions` object.
   * This is local shorthand and provided by @nuxtjs/algolia.
   */
  langAttribute?: string;
  /**
   * Default language to be used on the Algolia DocSearch client.
   */
  lang?: string;
}

export type HitComponentFunc = (props: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  // Avoid importing React types there
  children: any; // React.ReactNode;
}) => any;

export enum InstantSearchThemes {
  'reset',
  'algolia',
  'satellite',
}

interface Indexer {
  storyblok: {
    accessToken: string;
    algoliaAdminApiKey: string;
    indexName: string;
    secret: string;
    contentVersion: 'draft' | 'published';
  };
}

export interface ModuleBaseOptions {
  applicationId: string;
  apiKey: string;
  globalIndex: string;
  lite?: boolean;
  cache?: boolean;
  instantSearch?: boolean | { theme: keyof typeof InstantSearchThemes };
  recommend?: boolean;
  docSearch?: Partial<DocSearchOptions>;
  indexer?: Indexer;
  useFetch?: boolean;
}
