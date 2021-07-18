<template>
  <div class="order-list">
    <div class="order-list__item" v-for="item in order" :key="item.title">
      <img
        :src="require(`../assets/${item.img}`)"
        :alt="item.title"
        class="order-list__img"
      />
      <div class="order-list__main">
        <h3 class="order-list__name">{{ item.title }}</h3>

        <template v-if="item.category === 'pizza'">
          <div class="order-list__text">
            {{ item.size }} {{ item.countText }}, {{ item.dough }}
          </div>
          <div class="order-list__text">
            <span v-if="item.ingredients.length">{{
              item.ingredients.length ? '+' : ''
            }}</span>
            <span v-for="(ing, i) in item.ingredients" :key="ing.title"
              >{{ ing.title.toLowerCase()
              }}{{ item.ingredients.length - 1 > i ? ', ' : '' }}</span
            >
          </div>
        </template>

        <div v-else class="order-list__text">{{ item.countText }}</div>
      </div>
      <div class="order-list__count">
        <CountBtns :item="item" />
      </div>
      <div class="order-list__price">{{ item.priceTotal.toFixed(2) }} руб.</div>
      <div class="order-list__delete" @click="deleteFromOrder(item.id)">
        <svg width="20" height="20" fill="none" class="icon-delete">
          <path
            d="M14.75 6h-9.5l.66 9.805c.061 1.013.598 1.695 1.489 1.695H12.6c.89 0 1.412-.682 1.49-1.695L14.75 6z"
            fill="#373536"
          ></path>
          <path
            d="M13.85 3.007H6.196C4.984 2.887 5.021 4.365 5 5h9.992c.024-.62.07-1.873-1.142-1.993z"
            fill="#373535"
          ></path>
        </svg>
      </div>
    </div>
    <div class="order-list__total-price" v-if="order.length">
      Сумма заказа:&nbsp; <span>{{ orderPrice.toFixed(2) }} руб.</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CountBtns from '@/components/CountBtns'

export default {
  name: 'Basket',
  components: {
    CountBtns,
  },
  computed: {
    ...mapState(['order']),
    orderPrice() {
      let total = this.order.reduce((sum, current) => {
        return sum + current.priceTotal
      }, 0)
      return total
    },
  },
  methods: {
    ...mapMutations(['deleteFromOrder']),
  },
}
</script>

<style lang="scss">
.order-list {
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
    width: 110px;
    font-size: 18px;
    text-align: right;
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
}
@media only screen and (max-width: 600px) {
  .order-list {
    &__item {
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
    }
    &__img {
      order: 0;
    }
    &__main {
      width: 66%;
      order: 1;
      margin-bottom: 10px;
    }
    &__name {
      font-size: 16px;
    }
    &__delete {
      margin: 0;
      order: 2;
    }
    &__count {
      order: 3;
      margin: 0;
      margin-left: 75px;
    }
    &__price {
      order: 4;
    }
  }
}
</style>
