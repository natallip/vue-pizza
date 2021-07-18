<template>
  <div v-if="promotions.length !== 0">
    <div class="container">
      <h1 class="section-title">Акции</h1>
      <section class="promotions">
        <div
          class="promotions__item"
          v-for="item in promotions"
          :key="item.title"
        >
          <img
            :src="require(`../assets/${item.img}`)"
            :alt="item.title"
            class="promotions__img"
          />
          <h2 class="promotions__title">{{ item.title }}</h2>
          <p class="promotions__text">{{ item.text }}</p>
          <router-link class="promotions__link button" :to="item.link"
            >Посмотреть</router-link
          >
        </div>
      </section>
    </div>
  </div>
  <loader v-else />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loader from '@/components/Loader'

export default {
  name: 'Promotions',
  components: {
    Loader,
  },
  mounted() {
    this.loadPromotions()
  },
  computed: {
    ...mapState(['promotions']),
  },
  methods: {
    ...mapActions(['loadPromotions']),
  },
}
</script>

<style lang="scss">
.promotions {
  display: flex;
  flex-wrap: wrap;
  margin-left: -32px;
  &__item {
    width: calc((100% - 96px) / 3);
    box-shadow: 0px 0px 12px -4px #bcbcbc;
    border-radius: 12px;
    margin-left: 32px;
    margin-bottom: 32px;
    overflow: hidden;
    @media only screen and (max-width: 1200px) {
      width: calc((100% - 64px) / 2);
    }
    @media only screen and (max-width: 680px) {
      width: 100%;
    }
  }
  &__img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  &__title {
    padding: 0 20px;
    font-size: 22px;
  }
  &__text {
    padding: 0 20px;
    min-height: 110px;
  }
  &__link {
    margin-bottom: 20px;
  }
}
</style>
