<template>
  <div class="container">
    <section class="order">
      <h1 class="section-title">Корзина</h1>
      <h3 class="section-subtitle" v-if="!order.length">
        Добавьте что-нибудь из меню
      </h3>
      <Basket />
      <div class="order__btns">
        <router-link to="/" class="button order__btn">
          Вернуться в меню
          <svg width="24" height="24" fill="none" class="arrow-left">
            <path
              d="M10 18l6-6-6-6"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Basket from '@/components/Basket'
export default {
  name: 'Order',
  components: {
    Basket,
  },
  computed: {
    ...mapState(['order']),
  },
}
</script>

<style lang="scss">
.order {
  max-width: 614px;
  margin: 0 auto;
  padding-top: 20px;
  &__item {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #e2e2e9;
    padding: 16px 0px;
    &:first-of-type {
      border-top: 1px solid #e2e2e9;
    }
  }
  &__img {
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-right: 12px;
  }
  &__main {
    flex-grow: 1;
    text-align: left;
  }
  &__name {
    margin: 0 0 4px;
  }
  &__text {
    font-size: 12px;
    line-height: 16px;
    color: #73798c;
  }
  &__count {
    margin: 16px;
  }
  &__price {
    width: 100px;
    font-size: 18px;
  }
  &__delete {
    width: 20px;
    height: 20px;
    margin-bottom: 4px;
    margin-left: 6px;
    cursor: pointer;
    path {
      transition: 0.2s;
    }
    &:hover path {
      fill: #c01111;
      transform-origin: 17px 5px;
      transition: transform 0.2s ease-in-out 0s, fill;
    }
    &:hover path:not(:first-child) {
      transform: rotate(10deg);
      fill: #c01111;
    }
  }
  &__total-price {
    font-size: 21px;
    font-weight: bold;
    margin-bottom: 40px;
    margin-top: 40px;
    text-align: right;
    span {
      color: #c01111;
      font-size: 24px;
    }
  }
  &__btn {
    padding: 12px 54px 12px 48px;
    color: #5c6370;
    background-color: #f3f3f7;
    font-weight: bold;
    transition: 0.2s;
    svg {
      transition: 0.2s;
      opacity: 0.5;
    }
    &:hover {
      color: #000;
      background-color: #f3f3f7;
      transition: 0.2s;
      svg {
        opacity: 1;
        transition: 0.2s;
      }
    }
    &.accent:hover {
      color: #fff;
      svg {
        opacity: 1;
      }
    }
    .arrow-right {
      position: absolute;
      right: 8px;
      top: calc(50% - 13px);
      height: 24px;
    }
    .arrow-left {
      position: absolute;
      left: 8px;
      top: calc(50% - 13px);
      height: 24px;
      transform: rotate(180deg);
    }
  }
  &__btns {
    display: flex;
    justify-content: space-between;
  }
}
</style>
