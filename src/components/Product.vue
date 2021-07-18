<template>
  <div class="product">
    <div class="product__wrapper">
      <div class="product__img-wrap" @click="showCard = true">
        <img
          class="product__img"
          :src="require(`../assets/${product.img}`)"
          :alt="product.title"
        />
      </div>
      <div class="product__main">
        <h2 class="product__title">{{ product.title }}</h2>
        <p class="product__composition">
          {{
            product.category === 'drinks'
              ? product.countText
              : product.composition
          }}
        </p>
      </div>
      <div class="product__footer">
        <div class="product__price">
          от
          <span>{{
            product.category === 'pizza' ? price : product.price
          }}</span>
          руб.
        </div>
        <button
          v-if="product.category === 'pizza'"
          class="product__button button"
          @click="add"
        >
          Выбрать
        </button>

        <button
          v-if="!isInOrder && product.category !== 'pizza'"
          class="product__button button"
          @click="add"
        >
          В корзину
        </button>
        <CountBtns
          v-if="isInOrder && product.category !== 'pizza'"
          :item="itemInOrder"
        />
      </div>
    </div>
  </div>

  <teleport to="#app">
    <Card
      v-if="product.category === 'pizza' && showCard"
      @close="showCard = false"
      :product="product"
      @addToOrder="addPizza($event)"
    />
  </teleport>
  <teleport to="#basket">
    <transition name="fade">
      <Tooltip v-if="showTooltip" :product="item" :action="action" />
    </transition>
  </teleport>
</template>

<script>
import Card from '@/components/Card'
import CountBtns from '@/components/CountBtns'
import Tooltip from './Tooltip'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    product: Object
  },
  data() {
    return {
      showCard: false,
      showTooltip: false,
      showBtns: false,
      showBtn: true,
      action: 'add',
      timer: null,
      countTotal: 0,
      item: {
        id: this.product.id,
        category: this.product.category,
        img: this.product.img,
        title: this.product.title,
        count: 1,
        countText: this.product.countText || null,
        price: this.product.price,
        priceTotal: +this.product.price,
      },
    }
  },
  components: {
    Card,
    Tooltip,
    CountBtns,
  },
  computed: {
    ...mapState(['order']),
    ...mapGetters(['getDefaultPrice']),
    price($event) {
      if (this.product.category === 'pizza') {
        return this.getDefaultPrice($event.product.id)
      }
      return this.product.price
    },
    isInOrder() {
      return this.itemInOrder
    },
    itemInOrder() {
      if (this.product.category === 'pizza') {
        return this.order.find((el) => {
          let single = { ...el }
          single.priceTotal = single.price
          single.count = 1

          let price = +this.item.priceTotal
          price = +price.toFixed(2)

          return JSON.stringify(single) === JSON.stringify(this.item)
        })
      } else {
        return this.order.find((el) => {
          return el.id === this.item.id || null
        })
      }
    },
  },
  mounted() {},
  methods: {
    ...mapMutations([
      'addToOrder',
      'deleteFromOrder',
      'enlargeCount',
      'decreaseCount',
    ]),
    add() {
      if (this.product.category === 'pizza') {
        this.showCard = true
      } else {
        this.addToOrder(this.item)
        this.showTooltip = true
      }
    },
    addPizza(pizza) {
      this.item = Object.assign({}, this.item, pizza)

      if (this.isInOrder) {
        this.enlargeCount(this.item.id)
      } else {
        this.item.id = Math.floor(Math.random() * 1000)
        this.addToOrder(this.item)
      }
      this.showTooltip = true
    },
  },
  watch: {
    showTooltip() {
      this.timer = setTimeout(() => {
        this.showTooltip = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
.product {
  width: 25%;
  margin-bottom: 50px;
  @media only screen and (max-width: 1180px) {
    width: calc(100% / 3);
  }
  @media only screen and (max-width: 840px) {
    width: 50%;
  }
  @media only screen and (max-width: 580px) {
    width: 100%;
  }
  &:hover {
    .product__img {
      transform: translateY(8px);
      transition: 0.2s ease;
    }
  }
  &__wrapper {
    max-width: 220px;
    margin: 0 auto;
    @media only screen and (max-width: 580px) {
      max-width: 260px;
    }
  }
  &__main {
    min-height: 140px;
  }
  &__title {
    font-size: 22px;
    line-height: 24px;
    font-weight: 500;
    text-align: left;
  }
  &__composition {
    color: #474a53;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }
  &__img-wrap {
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
    width: 95%;
    margin-left: 5%;
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: 50% 50%;
    transition: 0.2s ease;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    span {
      display: inline-block;
      min-width: 25px;
    }
  }
}
.product {
  .count {
    height: 40px;
    min-width: 120px;
  }
}
</style>
