import { useNuxtApp } from "#app"
import { SearchClient } from "algoliasearch/lite";

export const useAlgolia = (): SearchClient => {
  const nuxtApp = useNuxtApp();
  const algolia: SearchClient = nuxtApp.$algolia;

  return algolia;
}
