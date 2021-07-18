<template>
  <div class="count">
    <button type="button" class="count__button" @click="decreaseCount(item.id)">
      <svg width="10" height="10" class="icon">
        <rect fill="#454B54" y="4" width="10" height="2" rx="1"></rect>
      </svg>
    </button>
    <div class="count__text">{{ item.count }}</div>
    <button type="button" class="count__button" @click="enlargeCount(item.id)">
      <svg width="10" height="10" class="icon">
        <g fill="#454B54">
          <rect x="4" width="2" height="10" ry="1"></rect>
          <rect y="4" width="10" height="2" rx="1"></rect>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    item: Object,
  },
  computed: {
    ...mapState(['order']),
  },
  methods: {
    ...mapMutations(['deleteFromOrder', 'enlargeCount', 'decreaseCount']),
  },
}
</script>

<style lang="scss">
.count {
  display: flex;
  width: 96px;
  height: 32px;
  background-color: #f3f3f7;
  border-radius: 999px;
  justify-content: space-between;
  &__button {
    margin: 0px;
    background: none;
    outline: transparent;
    cursor: pointer;
    position: relative;
    height: 100%;
    padding: 0px 8px;
    width: 35.41%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    &:hover {
      svg g,
      svg rect {
        fill: #000;
        transition: 0.2s;
      }
    }
  }
  &__text {
    color: #5c6370;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
}
</style>
