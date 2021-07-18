<template>
  <div class="card-wrap">
    <div class="card">
      <div class="card__box">
        <div class="card__col1">
          <PizzaSizes :product="product" :size="size" />
        </div>
        <div class="card__col2">
          <div class="card__content">
            <div class="card__title-wrap">
              <h2 class="card__title">{{ product.title }}</h2>
              <button
                type="button"
                :class="{ card__info: true, active: showInfo }"
                @click="showInfo = !showInfo"
              >
                i
              </button>
              <transition name="fade">
                <Info
                  v-if="showInfo"
                  :product="product"
                  :weight="weight"
                  :sizeValue="sizeValue"
                />
              </transition>
            </div>
            <p class="card__descr">
              {{ sizeValue }} см, {{ doughValue }} тесто, {{ weight }} г
            </p>
            <p class="card__composition">{{ product.composition }}</p>

            <div class="card__switch">
              <Switch @changeSize="changeSize" @changeDough="changeDough" />
            </div>

            <div class="card__ingredients">
              <Ingredients
                :ingredients="ingredients"
                @checkIngredients="checkIngredients"
              />
            </div>
          </div>

          <div class="card__btn button button--accent" @click="addItem">
            Добавить в корзину за {{ totalPrice }} руб.
          </div>
        </div>
      </div>
      <div class="card__close" @click="$emit('close')">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
            fill="white"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import PizzaSizes from '@/components/PizzaSizes'
import Info from '@/components/Info'
import Ingredients from '@/components/Ingredients'
import Switch from '@/components/Switch'
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    product: Object,
  },
  components: {
    Info,
    Switch,
    Ingredients,
    PizzaSizes,
  },
  emits: {
    addToOrder: null,
    close: null,
  },
  data() {
    return {
      showInfo: false,
      size: 1,
      dough: 1,
      ingredientsChecked: [],
    }
  },
  computed: {
    ...mapState(['groups']),
    ...mapGetters(['getSizeById', 'getDoughById', 'getIngredientsById']),
    sizeValue() {
      return this.getSizeById(this.size)
    },
    sizeName() {
      let sizeName
      switch (this.sizeValue) {
        case '30': {
          sizeName = 'Маленькая'
          break
        }
        case '35': {
          sizeName = 'Средняя'
          break
        }
        case '40': {
          sizeName = 'Большая'
          break
        }
      }
      return sizeName
    },
    doughValue() {
      return this.getDoughById(this.dough)
    },
    price() {
      return this.findValue('prices', this.size)
    },
    priceIngredients() {
      let priceIngr = 0
      this.ingredientsChecked.map((item) => {
        priceIngr += item.price
      })
      return priceIngr.toFixed(2)
    },
    totalPrice() {
      return (this.price * 100 + this.priceIngredients * 100) / 100
    },
    weight() {
      return this.findValue('weights', this.size)
    },
    ingredients() {
      return this.getIngredientsById(this.product.ingredients)
    },
    item() {
      return {
        countText: this.sizeValue + ' cm',
        size: this.sizeName,
        dough: this.doughValue + ' тесто',
        ingredients: this.ingredientsChecked,
        count: 1,
        price: this.totalPrice,
        priceTotal: +this.totalPrice.toFixed(2),
      }
    },
  },
  methods: {
    findValue(group, key) {
      let value = this.groups.find((item) => {
        return item.articles.includes(this.product.id)
      })
      value = value[group][key - 1]
      return value
    },
    checkIngredients(items) {
      this.ingredientsChecked = items
    },
    changeSize(value) {
      this.size = +value
    },
    changeDough(value) {
      this.dough = +value
    },
    addItem() {
      this.$emit('addToOrder', this.item)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.card-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
  background: rgba(#000, 0.65);
  transition: opacity 150ms ease 0s;
}
.card {
  display: flex;
  &__close {
    width: 40px;
    height: 40px;
    padding-left: 10px;
    padding-top: 10px;
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      padding-left: 8px;
      transform: scale(1.1);
      transition: transform 0.2s;
    }
  }
  &__title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__box {
    display: flex;
    width: 924px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    @media only screen and (max-width: 1000px) {
      width: 80%;
    }
    @media only screen and (max-width: 700px) {
      width: 95%;
    }
  }
  &__col1 {
    padding: 20px 20px;
    width: 530px;
    flex-shrink: 0;
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
  &__col2 {
    position: relative;
    padding: 20px 20px;
    flex-grow: 1;
    background: #fcfcfc;
  }
  &__title {
    font-size: 24px;
    line-height: 1.2;
    text-align: left;
    font-weight: 500;
    margin-bottom: 5px;
  }
  &__descr {
    text-align: left;
    color: #73798c;
    font-size: 14px;
    line-height: 1.6;
  }
  &__composition {
    text-align: left;
    margin-bottom: 12px;
  }
  &__switch {
    margin-bottom: 5px;
  }
  &__ingredients {
    min-height: 204px;
    margin: 20px 0;
  }
  &__btn {
    @media only screen and (max-width: 400px) {
      height: 50px;
    }
  }
}

.card__info {
  border: none;
  background: #ecebeb;
  border-radius: 999px;
  color: #000;
  cursor: pointer;
  outline: transparent;
  width: 24px;
  height: 24px;
  transition: 150ms ease;
  &:hover,
  &.active {
    background: #454b54;
    color: #fff;
    transition: 150ms ease;
  }
}
</style>
