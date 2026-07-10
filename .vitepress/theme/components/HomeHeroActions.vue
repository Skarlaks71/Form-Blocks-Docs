<script setup>
import { FbButton } from '@form-blocks/vue'
import { VPLink } from 'vitepress/theme';
import { useData } from 'vitepress'
import { computed } from 'vue';

const { theme, frontmatter, localeIndex } = useData()
const dataAll = useData()
console.log(dataAll)
const quickStartLink = computed(() => {
  // Pega o caminho configurado no locale atual, ou cai no padrão caso não ache
  const localePath = localeIndex.value !== 'root' ? `/${localeIndex.value}` : '/'
  
  // Limpa barras duplicadas caso o localePath termine em '/' e seu link comece com '/'
  const cleanBase = localePath.endsWith('/') ? localePath.slice(0, -1) : localePath
  
  return `${cleanBase}/guide/first-steps/getting-started`
})

// const quickStartLabel = computed(() => frontmatter.value.hero?.actions?.quickStart || 'Quick Start')
// const githubLabel = computed(() => frontmatter.value.hero?.actions?.github || 'Ver no GitHub')
</script>

<template>
  <div class="custom-actions">
    <fb-row class="custom-actions__row">
      <fb-col cols="6" md="2">
        <VPLink :href="quickStartLink">
          <fb-button
            texture="grid"
            pill
            label="Quick Start"
          />
        </VPLink>
      </fb-col>
      <fb-col cols="6" md="2">
        <VPLink href="https://github.com/Skarlaks71/form-blocks" target="_blank" rel="noopener">
          <fb-button
            variant="complementary"
            pill
            clean
            label="Ver no GitHub"
          />
        </VPLink>
      </fb-col>
    </fb-row>
  </div>
</template>

<style lang="scss">
.custom-actions {
  margin-top: 1rem;
  &__row {
    justify-content: center;
    a {
      text-decoration: none;
      &::after {
        display: none !important;
      }
    }
  }
}
</style>