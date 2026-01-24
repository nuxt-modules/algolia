<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-0.5">
          <UIcon name="i-ph-house" class="w-6 h-6" />
          <span class="text-xl font-bold text-primary">Nuxt Algolia</span>
        </NuxtLink>
      </template>
      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />

        <UButton to="https://github.com/nuxt-ui-templates/starter" target="_blank" icon="i-simple-icons-github"
          aria-label="GitHub" color="neutral" variant="ghost" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton to="https://github.com/nuxt-ui-templates/starter" target="_blank" icon="i-simple-icons-github"
          aria-label="GitHub" color="neutral" variant="ghost" />
      </template>
    </UFooter>
  </UApp>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Algolia Playground",
    icon: "i-ph-play-circle",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "DocSearch Examples",
    description: "Examples of DocSearch with different configurations",
    icon: "i-ph-book",
    to: "/docsearch",
    active: route.path.startsWith("/docsearch"),
    children: [
      {
        label: "Overview",
        description: "Overview of DocSearch examples with basic configuration",
        icon: "i-ph-list",
        to: "/docsearch",
        active: route.path === "/docsearch",
      },
      {
        label: "Transform Items",
        description: "Customize search results using transformItems",
        icon: "i-ph-arrows-clockwise",
        to: "/docsearch/transform-items",
        active: route.path === "/docsearch/transform-items",
      },
      {
        label: "Debounce Search",
        description: "Optimize performance with debounce search",
        icon: "i-ph-timer",
        to: "/docsearch/debounce-search",
        active: route.path === "/docsearch/debounce-search",
      },
    ],
  }
]);
</script>