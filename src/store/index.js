import axios from 'axios'
import { createStore } from 'vuex'
import config from '../config.json'

export default createStore({
  state: {
    pizza: [],
    snacks: [],
    desserts: [],
    drinks: [],
    ingredients: [
      {
        id: 1,
        img: 'cheeseBorder.png',
        title: 'Сырный бортик',
        price: 2.9,
      },
      {
        id: 2,
        img: 'feta.png',
        title: 'Брынза',
        price: 1.8,
      },
      {
        id: 3,
        img: 'cheddar.png',
        title: 'Чеддер',
        price: 2.5,
      },
      {
        id: 4,
        img: 'chick.png',
        title: 'Цыпленок',
        price: 2.2,
      },
      {
        id: 5,
        img: 'tomato.png',
        title: 'Томаты',
        price: 1.8,
      },
      {
        id: 6,
        img: 'ham.png',
        title: 'Ветчина',
        price: 2.5,
      },
      {
        id: 7,
        img: 'mushrooms.png',
        title: 'Шампиньоны',
        price: 1.2,
      },
    ],
    groups: [
      {
        articles: [1, 2, 3, 4],
        prices: [5.9, 7.9, 9.9],
        weights: [420, 550, 700],
      },
      {
        articles: [5, 6, 7, 8],
        prices: [6.9, 8.9, 10.9],
        weights: [480, 600, 750],
      },
      {
        articles: [9, 10, 11, 12],
        prices: [7.9, 9.9, 11.9],
        weights: [500, 650, 800],
      },
    ],
    sizes: {
      1: '30',
      2: '35',
      3: '40',
    },
    dough: {
      1: 'традиционное',
      2: 'тонкое',
    },
    hash: null,
    order: [],
    promotions: [],
  },
  getters: {
    getSizeById: (state) => (id) => {
      return state.sizes[id]
    },
    getDoughById: (state) => (id) => {
      return state.dough[id]
    },
    getIngredientsById: (state) => (arrId) => {
      return state.ingredients.filter((item) => arrId.includes(item.id))
    },
    getDefaultPrice: (state) => (id) => {
      let value = state.groups.find((item) => {
        return item.articles.includes(id)
      })
      return value.prices[0]
    },
    getOrderItems: (state) => {
      return state.order.length
    },
  },
  mutations: {
    setItems(state, items) {
      state.pizza = items[0]
      state.snacks = items[1]
      state.desserts = items[2]
      state.drinks = items[3]
    },
    setPromotions(state, items) {
      state.promotions = items
    },
    addToOrder(state, item) {
      let price = +item.priceTotal
      price = +price.toFixed(2)
      state.order.push(item)
    },
    deleteFromOrder(state, id) {
      state.order = state.order.filter((item) => {
        return item.id !== id
      })
    },
    enlargeCount(state, id) {
      let el = state.order.find((item) => {
        return item.id === id
      })
      el.count += 1
      el.priceTotal = +el.priceTotal + +el.price
      el.priceTotal = +el.priceTotal.toFixed(2)
    },
    decreaseCount(state, id) {
      let el = state.order.find((item) => {
        return item.id === id
      })
      el.count -= 1
      el.priceTotal -= el.price
      if (el.count === 0) {
        this.commit('deleteFromOrder', id)
      }
    },
    setHash(state, id) {
      state.hash = id
    },
  },
  actions: {
    loadItems({ commit }) {
      axios
        .get(`${config.URL}/items`)
        .then((response) => commit('setItems', response.data))
    },
    loadPromotions({ commit }) {
      axios
        .get(`${config.URL}/promotions`)
        .then((response) => commit('setPromotions', response.data))
    },
  },
})
