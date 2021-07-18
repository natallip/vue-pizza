<template>
  <div v-if="pizza.length !== 0">
    <div class="container">
      <h1 class="section-title">Пицца</h1>
      <section id="pizza" class="section products" ref="pizza">
        <Product
          v-for="product in pizza"
          :key="product.id"
          :product="product"
        />
      </section>
      <h1 class="section-title">Закуски</h1>
      <section id="snacks" class="section products" ref="snacks">
        <Product
          v-for="product in snacks"
          :key="product.id"
          :product="product"
        />
      </section>
      <h1 class="section-title">Десерты</h1>
      <section id="desserts" class="section products" ref="desserts">
        <Product
          v-for="product in desserts"
          :key="product.id"
          :product="product"
        />
      </section>
      <h1 class="section-title">Напитки</h1>
      <section id="drinks" class="section products" ref="drinks">
        <Product
          v-for="product in drinks"
          :key="product.id"
          :product="product"
        />
      </section>
    </div>
  </div>
  <loader v-else />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Product from '@/components/Product'
import Loader from '@/components/Loader'

export default {
  name: 'Home',
  components: {
    Product,
    Loader
  },
  mounted() {
    this.loadItems()
  },
  computed: {
    ...mapState(['snacks', 'desserts', 'drinks', 'pizza']),
  },
  methods: {
    ...mapActions(['loadItems']),
    ...mapMutations(['setHash']),

    observe() {
      const sections = this.$refs

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.$router.replace(`/#${entry.target.id}`)
            }
          })
        },
        {
          threshold: 0.75,
        }
      )
      Object.values(sections).forEach((section) => {
        observer.observe(section)
      })
    },
  },
}
</script>

<style lang="scss">
.products {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
#drinks {
  .product__main {
    min-height: 77px;
  }
}
</style>
