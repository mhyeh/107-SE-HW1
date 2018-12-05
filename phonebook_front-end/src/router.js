import Vue from 'vue'
import Router from 'vue-router'
import PhoneBook from './views/PhoneBook.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sql',
      component: PhoneBook,
      props: {type: 'sql'}
    },
    {
      path: '/txt',
      name: 'txt',
      component: PhoneBook,
      props: {type: 'txt'}
    }
  ]
})
