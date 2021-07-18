<template>
  <div class="tooltip">
    <div>{{ action === 'add' ? 'Добавлено' : 'Удалено' }}:</div>
    <div>{{ info }}</div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    action: String,
  },
  computed: {
    info() {
      let str
      this.product.title.indexOf(this.product.countText) !== -1
        ? (str = this.product.title)
        : (str = `${this.product.title}, ${this.product.countText}`)
      return str
    },
  },
}
</script>

<style lang="scss">
.tooltip {
  position: absolute;
  top: 50px;
  right: 0;
  background: #353535;
  color: #fff;
  font-size: 14px;
  text-align: left;
  width: 210px;
  padding: 10px 10px;
  border-radius: 8px;
}
</style>
