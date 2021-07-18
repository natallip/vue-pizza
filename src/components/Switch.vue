<template>
  <div class="switch size" ref="size">
    <input
      id="size1"
      type="radio"
      name="size"
      value="1"
      checked
      v-model="size"
      @change="changeSize"
    />
    <label for="size1">Маленькая</label>
    <input
      id="size2"
      type="radio"
      name="size"
      value="2"
      v-model="size"
      @change="changeSize"
    />
    <label for="size2">Средняя</label>
    <input
      id="size3"
      type="radio"
      name="size"
      value="3"
      v-model="size"
      @change="changeSize"
    />
    <label for="size3">Большая</label>
  </div>

  <div class="switch dough" ref="dough">
    <input
      id="dough1"
      type="radio"
      name="dough"
      value="1"
      checked
      v-model="dough"
      @change="changeDough"
    />
    <label for="dough1">Традиционное</label>
    <input
      id="dough2"
      type="radio"
      name="dough"
      value="2"
      v-model="dough"
      @change="changeDough"
    />
    <label for="dough2">Тонкое</label>
  </div>
</template>

<script>
export default {
  name: 'Switch',
  emits: {
    changeSize: null,
    changeDough: null,
  },
  data() {
    return {
      size: 1,
      dough: 1,
    }
  },
  methods: {
    changeSize() {
      this.$emit('changeSize', this.size)
    },
    changeDough() {
      this.$emit('changeDough', this.dough)
    },
  },
}
</script>

<style lang="scss">
.switch {
  display: flex;
  border-radius: 999px;
  background-color: #f3f3f7;
  height: 32px;
  padding: 2px;
  margin: 3px 0;
  overflow: hidden;
  input[type='radio'] {
    display: none;
  }
  input:checked + label {
    font-weight: 600;
    background: #fff;
    border-radius: 999px;
    box-shadow: #0605321f 0px 0px 8px;
  }
  &:first-of-type label {
    flex-basis: 33%;
  }
  &:last-of-type label {
    flex-basis: 50%;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    border-radius: 999px;
    color: #000;
    font-size: 12px;
    line-height: 100%;
    text-align: center;
    transition: 150ms ease;    
  }
  &__case {
    display: block;
    cursor: pointer;
    transition: color 150ms ease 0s;
  }
}
</style>
