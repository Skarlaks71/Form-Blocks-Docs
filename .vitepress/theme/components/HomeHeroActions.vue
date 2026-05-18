<script setup>
import { FbButton } from '@form-blocks/vue'
import { VPLink } from 'vitepress/theme';
</script>

<template>
  <div class="custom-actions">
    <fb-row class="custom-actions__row">
      <fb-col cols="2">
        <VPLink href="/guide/getting-started">
          <fb-button
            texture="grid"
            pill
            label="Quick Start"
          />
        </VPLink>
      </fb-col>
      <fb-col cols="2">
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