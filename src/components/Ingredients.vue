<template>
  <div class="ingredients">
    <div v-if="ingredients.length" class="ingredients__title">
      Добавить в пиццу
    </div>
    <div class="ingredients__list">
      <div
        v-for="item in ingredients"
        :key="item.title"
        class="ingredients__item-wrap"
      >
        <input
          type="checkbox"
          name="ingredients"
          :id="'ingredient' + item.id"
          :value="item"
          v-model="ingredientsChecked"
          @change="checkIngredients"
        />

        <label :for="'ingredient' + item.id" class="ingredients__item">
          <img
            :src="require(`../assets/${item.img}`)"
            :alt="item.title"
            class="ingredients__img"
          />
          <h2 class="ingredients__name">{{ item.title }}</h2>
          <div class="ingredients__price">{{ item.price }} руб.</div>
          <svg width="20" height="20" fill="none" class="ingredients__checked">
            <circle cx="10" cy="10" r="10" fill="#fff"></circle>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 3.25c3.74 0 6.75 3.01 6.75 6.75s-3.01 6.75-6.75 6.75S3.25 13.74 3.25 10 6.26 3.25 10 3.25zM18.25 10c0-4.57-3.68-8.25-8.25-8.25S1.75 5.43 1.75 10s3.68 8.25 8.25 8.25 8.25-3.68 8.25-8.25z"
              fill="#c01111"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.881 8.076a.6.6 0 010 .848l-3.638 3.639a.6.6 0 01-.849 0l-1.818-1.82a.6.6 0 11.848-.848L8.82 11.29l3.214-3.214a.6.6 0 01.848 0z"
              fill="#c01111"
            ></path>
          </svg>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ingredients',
  props: {
    ingredients: Object,
  },
  emits: ['checkIngredients'],
  data() {
    return {
      ingredientsChecked: [],
    }
  },
  methods: {
    checkIngredients() {
      this.$emit('checkIngredients', this.ingredientsChecked)
    },
  },
}
</script>

<style lang="scss">
.ingredients {
  input[type='checkbox'] {
    display: none;
  }
  input:checked + label {
    border: 1px solid #c01111;
    .ingredients__checked {
      opacity: 1;
      transition: opacity 150ms ease-out 0s;
    }
  }
  &__title {
    font-size: 18px;
    line-height: 1;
    font-weight: 500;
    margin-bottom: 12px;
    text-align: left;
  }
  &__list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-right: -8px;
  }
  &__item-wrap {
    width: calc(33.3333% - 8px);
    box-shadow: 0px 4px 20px #0605321f;
    margin: 0px 8px 0px 0px;
    transition: box-shadow 150ms ease-out 0s, border;
    border-radius: 12px;
    overflow: hidden;
    &:hover {
      box-shadow: 0px 2px 5px #0605321f;
    }
    @media only screen and (max-width: 400px) {
      width: calc(50% - 8px);
      margin-bottom: 10px;
    }
  }
  &__item {
    position: relative;
    cursor: pointer;
    touch-action: manipulation;
    display: flex;
    align-items: center;
    background: #fff;
    flex-flow: column;
    padding: 8px 8px 12px;
    border-radius: 12px;
    overflow: hidden;
  }
  &__img {
    height: 90px;
  }
  &__name {
    font-size: 12px;
    line-height: 1.2;
    height: 20px;
    font-weight: normal;
  }
  &__price {
    font-weight: 600;
  }
  &__checked {
    position: absolute;
    top: 8px;
    right: 8px;
    opacity: 0;
    transition: opacity 150ms ease-out 0s;
  }  
}
</style>
