<template>
  <div class="info">
    <h2 class="info__title">Пищевая ценность на 100 г</h2>
    <div class="info__section">
      <div>Энерг. ценность</div>
      <div>{{ product.info.energyValue }} ккал</div>
    </div>
    <div class="info__section">
      <div>Белки</div>
      <div>{{ product.info.protein }} г</div>
    </div>
    <div class="info__section">
      <div>Жиры</div>
      <div>{{ product.info.fats }} г</div>
    </div>
    <div class="info__section">
      <div>Углеводы</div>
      <div>{{ product.info.carbohydrates }} г</div>
    </div>
    <div class="info__section">
      <div>Вес</div>
      <div>{{ weight }} г</div>
    </div>
    <div class="info__section">
      <div>Диаметр</div>
      <div>{{ sizeValue }} см</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    product: Object,
    weight: [String, Number],
    sizeValue: [String, Number],
  },
}
</script>

<style lang="scss">
.info {
  position: absolute;
  top: 65px;
  right: 12px;
  width: 250px;
  background: #000;
  color: #fff;
  font-size: 12px;
  min-height: 45px;
  padding: 12px;
  border-radius: 10px;
  background-color: #373535;
  opacity: 1;
  &:before {
    content: '';
    position: absolute;
    top: -16px;
    right: 12px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent #373535 transparent;
  }
  &__title {
    text-align: left;
    font-size: 12px;
    opacity: 0.5;
    margin: 0px 0px 12px;
  }
  &__section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
