<script setup>

</script>

<template>
  <div class="sample-box">
    <slot />
    <details class="sample-box__details">
      <summary class="sample-box__details__summary">
        <slot name="summary-title"><span>Ver Código Fonte</span></slot>
      </summary>
      <slot name="details-content" />
    </details>
  </div>
</template>

<style lang="scss">
.sample-box {
  margin-bottom: 16px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  &__details {
    cursor: pointer;
    &__summary {
      font-size: 0.9em;
      color: var(--vp-c-text-2);
      font-weight: bold;
    }
  }
}
</style>