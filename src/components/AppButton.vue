<template>
  <button class="btn" :class="colorBtn" @click="$emit('click-btn')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  emits: ['clickBtn'],
  props: {
    colorBtn: {
      type: String,
      default: '',
      validator (value) {
        return ['', 'primary', 'danger'].includes(value)
      }
    }
  }

}
</script>

<style>

</style>
