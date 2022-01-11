export type AlgoliaOptions = {
  applicationId: string;
  apiKey: string;
};

export type SearchParams = {
  query: string;
  requestOptions?: RequestOptions & SearchOptions;
  [key: string]: any;
};

export type SearchForFacetValuesParams = {
  facet: {
    name: string;
    query: string;
  };
  requestOptions?: RequestOptions & SearchOptions;
  [key: string]: any;
}

// Algolia types

export type FacetHit = {
  /**
   * The value of the facet.
   */
  readonly value: string;
  /**
   * The highlighted value.
   */
  readonly highlighted: string;
  /**
   * The count.
   */
  readonly count: number;
};

export type SearchForFacetValuesResponse = {
  /**
   * The list of facet hits.
   */
  facetHits: FacetHit[];
  /**
   * The exhaustive facets count.
   */
  exhaustiveFacetsCount: boolean;
  /**
   * The time that the API toke the process the request.
   */
  processingTimeMS?: number;
};

export declare type RequestOptions = {
  /**
   * If the given request should persist on the cache. Keep in mind,
   * that some methods may have this option enabled by default.
   */
  readonly cacheable?: boolean;
  /**
   * Custom timeout for the request. Note that, in normal situacions
   * the given timeout will be applied. But the transporter layer may
   * increase this timeout if there is need for it.
   */
  readonly timeout?: number;
  /**
   * Custom headers for the request. This headers are
   * going to be merged the transporter headers.
   */
  readonly headers?: Readonly<Record<string, string>>;
  /**
   * Custom query parameters for the request. This query parameters are
   * going to be merged the transporter query parameters.
   */
  readonly queryParameters?: Record<string, any>;
  /**
   * Custom data for the request. This data are
   * going to be merged the transporter data.
   */
  readonly data?: Record<string, any>;
  /**
   * Additional request body values. It's only taken in
   * consideration in `POST` and `PUT` requests.
   */
  [key: string]: any;
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

export declare type Settings = {
  /**
   * The complete list of attributes that will be used for searching.
   */
  readonly searchableAttributes?: readonly string[];
  /**
   * @deprecated Use `searchableAttributes` instead.
   */
  readonly attributesToIndex?: readonly string[];
  /**
   * The complete list of attributes that will be used for faceting.
   */
  readonly attributesForFaceting?: readonly string[];
  /**
   * List of attributes that cannot be retrieved at query time.
   */
  readonly unretrievableAttributes?: readonly string[];
  /**
   * Gives control over which attributes to retrieve and which not to retrieve.
   */
  readonly attributesToRetrieve?: readonly string[];
  /**
   * Controls the way results are sorted.
   */
  readonly ranking?: readonly string[];
  /**
   * Specifies the custom ranking criterion.
   */
  readonly customRanking?: readonly string[];
  /**
   * Creates replicas, exact copies of an index.
   */
  readonly replicas?: readonly string[];
  /**
   * @deprecated Use `replicas` instead.
   */
  readonly slaves?: readonly string[];
  /**
   * The primary parameter is automatically added to a replica's settings when the replica is created and cannot be modified.
   *
   * Can not be setted.
   */
  readonly primary?: string;
  /**
   * Maximum number of facet values to return for each facet during a regular search.
   */
  readonly maxValuesPerFacet?: number;
  /**
   * Controls how facet values are sorted.
   */
  readonly sortFacetValuesBy?: 'count' | 'alpha';
  /**
   * List of attributes to highlight.
   */
  readonly attributesToHighlight?: readonly string[];
  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   */
  readonly attributesToSnippet?: readonly string[];
  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   */
  readonly highlightPreTag?: string;
  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
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
   * Set the number of hits per page.
   */
  readonly hitsPerPage?: number;
  /**
   * Set the maximum number of hits accessible via pagination.
   */
  readonly paginationLimitedTo?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1 typo.
   */
  readonly minWordSizefor1Typo?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2 typos.
   */
  readonly minWordSizefor2Typos?: number;
  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   */
  readonly typoTolerance?: string | boolean;
  /**
   * hether to allow typos on numbers (“numeric tokens”) in the query string.
   */
  readonly allowTyposOnNumericTokens?: boolean;
  /**
   * List of attributes on which you want to disable typo tolerance.
   */
  readonly disableTypoToleranceOnAttributes?: readonly string[];
  /**
   * List of words on which you want to disable typo tolerance.
   */
  readonly disableTypoToleranceOnWords?: readonly string[];
  /**
   * Control which separators are indexed.
   */
  readonly separatorsToIndex?: string;
  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   */
  readonly ignorePlurals?: readonly string[] | boolean;
  /**
   * Sets the languages to be used by language-specific settings and functionalities such as ignorePlurals, removeStopWords, and CJK word-detection.
   */
  readonly queryLanguages?: readonly string[];
  /**
   * A list of language ISO code.
   */
  readonly indexLanguages?: readonly string[];
  /**
   * Whether rules should be globally enabled.
   */
  readonly enableRules?: boolean;
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
  readonly optionalWords?: readonly string[];
  /**
   * List of attributes on which you want to disable prefix matching.
   */
  readonly disablePrefixOnAttributes?: readonly string[];
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
   * Removes stop (common) words from the query before executing it.
   */
  readonly removeStopWords?: boolean | readonly string[];
  /**
   * List of numeric attributes that can be used as numerical filters.
   */
  readonly numericAttributesForFiltering?: readonly string[];
  /**
   * Enables compression of large integer arrays.
   */
  readonly allowCompressionOfIntegerArray?: boolean;
  /**
   * Name of the de-duplication attribute to be used with the distinct feature.
   */
  readonly attributeForDistinct?: string;
  /**
   * Enables de-duplication or grouping of results.
   */
  readonly distinct?: boolean | number;
  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym itself.
   */
  readonly replaceSynonymsInHighlight?: boolean;
  /**
   * Allows proximity to impact which searchable attribute is matched in the attribute ranking stage.
   */
  readonly attributeCriteriaComputedByMinProximity?: boolean;
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
   * List of attributes on which to do a decomposition of camel case words.
   */
  readonly camelCaseAttributes?: readonly string[];
  /**
   * Specify on which attributes in your index Algolia should apply word-splitting (“decompounding”)
   */
  readonly decompoundedAttributes?: Readonly<Record<string, readonly string[]>>;
  /**
   * Characters that should not be automatically normalized by the search engine.
   */
  readonly keepDiacriticsOnCharacters?: string;
  /**
   * Overrides Algolia's default normalization.
   */
  readonly customNormalization?: Readonly<Record<string, Readonly<Record<string, string>>>>;
  /**
   * Enable personalization for queries by default
   */
  readonly enablePersonalization?: boolean;
  /**
   * Custom userData that could be added to the Settings.
   */
  readonly userData?: any;
  /**
   * Enable word segmentation (also called decompounding) at query time for
   * compatible languages. For example, this turns the Dutch query
   * "spaanplaatbehang" into "spaan plaat behang" to retrieve more relevant
   * results.
   */
  readonly decompoundQuery?: boolean;
  /**
   * Specify on which attributes in your index Algolia should apply Japanese
   * transliteration to make words indexed in Katakana or Kanji searchable in Hiragana.
   */
  readonly attributesToTransliterate?: readonly string[];
  /**
   * The relevancy threshold to apply to search in a virtual index [0-100]. A Bigger
   * value means fewer, but more relevant results, smaller value means more, but
   * less relevant results.
   */
  readonly relevancyStrictness?: number;
  /**
   * Content defining how the search interface should be rendered.
   * This is set via the settings for a default value and can be overridden via rules
   */
  readonly renderingContent?: {
      /**
       * defining how facets should be ordered
       */
      readonly facetOrdering?: {
          /**
           * the ordering of facets (widgets)
           */
          readonly facets?: {
              /**
               * pinned order of facet lists
               */
              readonly order?: readonly string[];
          };
          /**
           * the ordering of facet values, within an individual list
           */
          readonly values?: {
              readonly [facet: string]: {
                  /**
                   * pinned order of facet values
                   */
                  readonly order?: readonly string[];
                  /**
                   * How to display the remaining items.
                   * - facet count (descending)
                   * - alphabetical (ascending)
                   * - hidden (show only pinned values)
                   */
                  readonly sortRemainingBy?: 'count' | 'alpha' | 'hidden';
              };
          };
      };
  };
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

export type SnippetResult<THit> = THit extends string | number ? SnippetMatch : {
  [KAttribute in keyof THit]: SnippetResult<THit[KAttribute]>;
};

export type HighlightMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
  readonly matchedWords: readonly string[];
  readonly fullyHighlighted?: boolean;
};

export type HighlightResult<THit> = THit extends string | number ? HighlightMatch : {
  [KAttribute in keyof THit]?: HighlightResult<THit[KAttribute]>;
};

export type Hit<THit> = THit & {
  readonly objectID: string;
  readonly _highlightResult?: HighlightResult<THit>;
  readonly _snippetResult?: SnippetResult<THit>;
  readonly _rankingInfo?: RankingInfo;
  readonly _distinctSeqID?: number;
};


export type SearchResponse<TObject = {}> = {
  /**
   * The hits returned by the search.
   *
   * Hits are ordered according to the ranking or sorting of the index being queried.
   */
  hits: Array<Hit<TObject>>;
  /**
   * Index of the current page (zero-based).
   */
  page: number;
  /**
   * Number of hits returned (used only with offset)
   */
  length?: number;
  /**
   * The offset of the first hit to returned.
   */
  offset?: number;
  /**
   * Number of hits matched by the query.
   */
  nbHits: number;
  /**
   * Subset of hits selected when relevancyStrictness is applied.
   */
  nbSortedHits?: number;
  /**
   * Number of pages returned.
   *
   * Calculation is based on the total number of hits (nbHits) divided by the
   * number of hits per page (hitsPerPage), rounded up to the nearest integer.
   */
  nbPages: number;
  /**
   * Maximum number of hits returned per page.
   */
  hitsPerPage: number;
  /**
   * Time the server took to process the request, in milliseconds. This does not include network time.
   */
  processingTimeMS: number;
  /**
   * Whether the nbHits is exhaustive (true) or approximate (false).
   *
   * An approximation is done when the query takes more than 50ms to be
   * processed (this can happen when using complex filters on millions on records).
   */
  exhaustiveNbHits: boolean;
  /**
   * Whether the facet count is exhaustive (true) or approximate (false).
   */
  exhaustiveFacetsCount?: boolean;
  /**
   * A mapping of each facet name to the corresponding facet counts.
   */
  facets?: Record<string, Record<string, number>>;
  /**
   * Statistics for numerical facets.
   */
  facets_stats?: Record<string, {
      /**
       * The minimum value in the result set.
       */
      min: number;
      /**
       * The maximum value in the result set.
       */
      max: number;
      /**
       * The average facet value in the result set.
       */
      avg: number;
      /**
       * The sum of all values in the result set.
       */
      sum: number;
  }>;
  /**
   * The query used to search. Accepts every character, and every character entered will be used in the search.
   *
   * An empty query can be used to fetch all records.
   */
  query: string;
  /**
   * A markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set.
   */
  queryAfterRemoval?: string;
  /**
   * A url-encoded string of all search parameters.
   */
  params: string;
  /**
   * Unique identifier of the search query, to be sent in Insights methods. This identifier links events back to the search query it represents.
   *
   * Returned only if clickAnalytics is true.
   */
  queryID?: string;
  /**
   * Used to return warnings about the query.
   */
  message?: string;
  /**
   * The computed geo location.
   *
   * Format: "lat,lng", where the latitude and longitude are expressed as decimal floating point number.
   */
  aroundLatLng?: string;
  /**
   * The automatically computed radius.
   */
  automaticRadius?: string;
  /**
   * Actual host name of the server that processed the request.
   *
   * Our DNS supports automatic failover and load balancing, so this may differ from the host name used in the request.
   */
  serverUsed?: string;
  /**
   * Index name used for the query.
   */
  index?: string;
  /**
   * Index name used for the query. In case of AB test, the index targetted isn’t always the index used by the query.
   */
  indexUsed?: string;
  /**
   * In case of AB test, reports the variant ID used. The variant ID is the position in the array of variants (starting at 1).
   */
  abTestVariantID?: number;
  /**
   * The query string that will be searched, after normalization.
   */
  parsedQuery?: string;
  /**
   * Custom user data.
   */
  userData?: any;
  /**
   * Rules applied to the query.
   */
  appliedRules?: Array<Record<string, any>>;
  /**
   * The explanation of the decompounding at query time.
   */
  explain?: {
      /**
       * The explain query match.
       */
      match: {
          /**
           * The explain query match alternatives.
           */
          alternatives: Array<{
              /**
               * The alternative type.
               */
              types: string[];
              /**
               * The list of alternative words.
               */
              words: string[];
              /**
               * The number of typos.
               */
              typos: number;
              /**
               * The offset.
               */
              offset: number;
              /**
               * The length.
               */
              length: number;
          }>;
      };
      /**
       * Query parameter reporting. Parameters are reported
       * as a JSON object with one field per parameter.
       */
      params?: Record<string, any>;
  };
  /**
   * The relevancy threshold applied to search in a virtual index.
   */
  appliedRelevancyStrictness?: number;
  renderingContent?: Settings['renderingContent'];
};
