<template>
  <nav ref="nav">
    <div class="container">
      <div class="nav-wrapper">
        <div class="logo-nav">
          <router-link to="/" exact>
            <div class="logo-nav__icon">
              <img src="../assets/pizza.svg" alt="PIZZA STAR" />
            </div>
          </router-link>
        </div>
        <ul class="nav">
          <li class="nav__item">
            <router-link to="/#pizza" :class="{ active: hash === 'pizza' }"
              >Пицца</router-link
            >
          </li>
          <li class="nav__item">
            <router-link to="/#snacks" :class="{ active: hash === 'snacks' }"
              >Закуски</router-link
            >
          </li>
          <li class="nav__item">
            <router-link
              to="/#desserts"
              :class="{ active: hash === 'desserts' }"
              >Десерты</router-link
            >
          </li>
          <li class="nav__item">
            <router-link to="/#drinks" :class="{ active: hash === 'drinks' }"
              >Напитки</router-link
            >
          </li>
          <li class="nav__item">
            <router-link
              to="/promotions"
              :class="{ active: hash === 'promotions' }"
              exact
              >Акции</router-link
            >
          </li>
        </ul>
      </div>

      <div @mouseover="enter" @mouseout="out">
        <div id="basket" class="basket-box">
          <router-link
            to="/order"
            :class="{
              basket: true,
              button: true,
              accent: true,
              notEmpty: getOrderItems,
            }"
          >
            <div class="basket__title">Корзина</div>
            <div class="basket__line" v-if="getOrderItems"></div>
            <div class="basket__count" v-if="getOrderItems">
              {{ getOrderItems }}
            </div>
          </router-link>

          <div class="basket-wrapper" v-show="showBasket && getOrderItems">
            <Basket />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Basket from '@/components/Basket'
import { mapGetters } from 'vuex'

export default {
  name: 'Nav',
  data() {
    return {
      hash: null,
      showBasket: false,
    }
  },
  components: {
    Basket,
  },
  computed: {
    ...mapGetters(['getOrderItems']),
    isActive() {
      return this.hash === this.$refs[this.hash]
    },
  },
  mounted() {
    const nav = this.$refs.nav
    const topOffset = nav.getBoundingClientRect().top

    const scrollHandler = () => {
      let scrollTop = window.pageYOffset

      if (scrollTop >= topOffset) {
        nav.classList.add('fixed')
      }

      if (scrollTop < topOffset) {
        nav.classList.remove('fixed')
      }
    }
    window.addEventListener('scroll', scrollHandler)
  },
  methods: {
    enter() {
      this.showBasket = true
    },
    out() {
      this.showBasket = false
    },
  },
  watch: {
    $route(to, from) {
      this.hash = to.hash.replace('#', '')
    },
  },
}
</script>

<style lang="scss">
.active {
  color: #b31010;
}
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
}
.nav-wrapper {
  display: flex;
  align-items: center;
  transform: translateX(-40px);
  transition: transform 0.25s ease 0s;
  @media only screen and (max-width: 560px) {
    transform: translateX(0px);
  }
}
nav.fixed {
  box-shadow: 0px 4px 20px #0605321f;
  @media only screen and (max-width: 560px) {
    padding-right: 120px;
  }
  .nav-wrapper {
    transform: translateX(0px);
    transition: transform 0.25s ease 0s;
  }
  .logo-nav__icon {
    opacity: 1;
    transition: opacity 0.25s ease 0s;
  }
}
.logo-nav {
  &__icon {
    height: 30px;
    margin-right: 10px;
    opacity: 0;
    transition: opacity 0s ease 0.15s;
    img {
      display: block;
      height: 100%;
      object-fit: contain;
    }
    @media only screen and (max-width: 560px) {
      display: none;
    }
  }
}
.nav {
  &__item {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    font-weight: 500;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      a {
        color: #b31010;
        transition: 0.2s;
      }
    }
    &:first-child {
      margin-left: 0;
    }
    a {
      display: inline-block;
      padding: 20px 0;
      font-size: 14px;
      line-height: 1;
    }
  }
}
.basket-box {
  position: fixed;
  top: 8px;
  right: 0vw;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.basket-wrapper {
  margin-top: 15px;
  width: 350px;
  max-height: 500px;
  background: #fff;
  box-shadow: 0px 0px 12px -4px #bcbcbc;
  border-radius: 12px;
  padding: 10px;
  animation: show 0.3s ease-in-out backwards;
  .order-list {
    max-height: 450px;
    overflow-y: scroll;
  }
}
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.basket-wrapper {
  .order-list {
    &__item {
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      &:first-child {
        border-top: none;
      }
    }
    &__img {
      width: 45px;
      height: 45px;
      order: 0;
    }
    &__main {
      width: 66%;
      order: 1;
      margin-bottom: 10px;
    }
    &__name {
      font-size: 15px;
    }
    &__delete {
      margin: 0;
      order: 2;
    }
    &__count {
      order: 3;
      margin: 0;
      margin-left: 55px;
    }
    &__price {
      order: 4;
      font-size: 16px;
    }
    &__total-price,
    &__total-price span {
      font-size: 16px;
      color: #000;
    }
  }
}
.basket {
  &__line {
    height: 24px;
    width: 1px;
    margin: 0px 12px;
    background: #fff;
    opacity: 0.4;
  }
  &__count {
    transition: transform 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;
    opacity: 1;
    transform: translateX(0px);
  }
  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
  transform: translateY(-15px);
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(15px);
  opacity: 0;
}
.notEmpty {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 14px;
    right: 16px;
    width: 13px;
    height: 11px;
    background: url('../assets/arrow.svg') no-repeat, 50% 90%/13px 11px;
    transition: transform 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;
    opacity: 0;
    transform: translateX(-5px);
  }
  &:hover:before {
    opacity: 1;
    transform: translateX(0px);
  }
  &:hover .basket__count {
    opacity: 0;
    transform: translateX(2px);
  }
}
</style>
