<template>
  <header ref="header">
    <div class="container">
      <div class="header">
        <router-link to="/" exact class="logo">
          <div class="logo__icon">
            <img src="../assets/pizza.svg" alt="PIZZA STAR" />
          </div>
          <div class="logo__title"><span>Pizza Star</span>отличный выбор</div>
        </router-link>

        <div v-if="$route.path === '/order'">
          <div class="header__steps">
            <ul class="steps">
              <li class="steps__item steps__item--current">
                <span class="steps__bubble">1</span
                ><span class="steps__label">Корзина</span>
              </li>
              <li class="steps__item">
                <span class="steps__bubble">2</span>
                <span class="steps__label">Оформление заказа</span>
              </li>
              <li class="steps__item">
                <span class="steps__bubble">3</span
                ><span class="steps__label">Заказ принят</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      hash: null,
    }
  },
  computed: {
    ...mapGetters(['getOrderItems']),
  },
}
</script>

<style lang="scss">
header {
  background: #fff;
  padding-top: 8px;
  &.header-order {
    border-bottom: 1px solid #e0e0e0;
    padding: 15px 0;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  margin-right: 40px;
  &__icon {
    margin-right: 10px;
    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
    @media only screen and (max-width: 320px) {
      display: none;
    }
  }
  &__title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-transform: lowercase;
    font-weight: 500;
    font-size: 13px;
    span {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 16px;
    }
  }
}
.steps {
  display: flex;
  align-items: center;
  &__item {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 164px;
    list-style: none;
    cursor: default;
    &:last-child::before {
      display: none;
    }
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 16px;
      width: 100%;
      height: 1px;
      background-color: #afafaf;
      background-image: repeating-linear-gradient(
        90deg,
        #afafaf,
        #afafaf 2px,
        #ffffff 3px,
        #ffffff 8px
      );
    }
    &--current {
      .steps__bubble {
        border-color: #000;
        color: #000;
      }
    }
  }
  &__bubble {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 14px;
    color: #afafaf;
    font-weight: bold;
    background-color: #fff;
    box-shadow: #fff 0px 0px 0px 4px;
    border: 1px solid #d8d8d8;
    border-radius: 50%;
  }
  &__label {
    display: block;
    max-width: 140px;
    margin: 4px auto 0px;
    color: #afafaf;
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
    white-space: normal;
  }
}
</style>
