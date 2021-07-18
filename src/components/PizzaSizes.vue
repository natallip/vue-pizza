<template>
  <div class="img">
    <div class="img__size3">
      <svg
        width="450"
        height="450"
        viewBox="0 0 450 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          opacity="0.6"
          cx="225"
          cy="225"
          rx="224"
          ry="224"
          stroke="#6F6E6F"
          stroke-width="0.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="2 12.2"
        ></ellipse>
      </svg>
    </div>
    <div class="img__size2">
      <svg
        width="382"
        height="382"
        viewBox="0 0 382 382"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="191"
          cy="191"
          r="190"
          stroke="#6F6E6F"
          stroke-width="0.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="1 6.1"
        ></circle>
      </svg>
    </div>
    <img
      :class="{
        img__product: true,
        positionTop: size == 3,
        positionMiddle: size == 2,
        positionBottom: size == 1,
      }"
      :src="require(`../assets/${product.img}`)"
      :alt="product.title"
    />
  </div>
</template>

<script>
export default {
  name: 'PizzaSizes',
  props: {
    product: Object,
    size: [String, Number],
  },
}
</script>

<style lang="scss">
.img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &__size3,
  &__size2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__size3 {
    z-index: 4;
  }
  &__size2 {
    z-index: 2;
  }
  &__product {
    position: absolute;
    top: 0%;
    left: 2%;
    width: 100%;
    z-index: 1;
    transition: 0.3s ease;
  }
  .positionBottom {
    z-index: 1;
    transform: scale(0.68);
    transition: 0.2s ease;
  }
  .positionMiddle {
    z-index: 3;
    transform: scale(0.88);
    transition: 0.2s ease;
  }
  .positionTop {
    z-index: 5;
    transform: scale(1);
    transition: 0.2s ease;
  }
}
</style>
