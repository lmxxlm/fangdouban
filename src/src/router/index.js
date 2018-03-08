import Vue from 'vue'
import Router from 'vue-router'
import book from '@/components/book/book.vue'
import bookDeatil from '@/components/book/detail.vue'
import bookSeries from '@/components/book/series.vue'
import movie from '@/components/movie/movie.vue'
import movieDetail from '@/components/movie/detail.vue'
import movieTop from '@/components/movie/top.vue'
import movieSearch from '@/components/movie/search.vue'
import music from '@/components/music/music.vue'
import indexList from '@/components/indexlist/index.vue'

import city from '@/components/city/city.vue'
import localList from '@/components/city/localList.vue'
import testLocalList from '@/components/city/testLocalList.vue'
import eventDetail from '@/components/city/eventDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/city',
      name: 'city',
      component: city
    },
    {
      path: '/city/:id',
      name: 'eventDetail',
      component: eventDetail
    },
    {
      path: '/localList',
      name: 'localList',
      component: localList
    },
    {
      path: '/testLocalList',
      name: 'testLocalList',
      component: testLocalList
    },
    {
      path: '/',
      name: 'book',
      component: book
    },
    {
      path: '/book/:id',
      name: 'bookdetail',
      component: bookDeatil
    },
    {
      path: '/series/:id',
      name: 'bookseries',
      component: bookSeries
    },
    {
      path: '/movie',
      name: 'movie',
      component: movie
    },
    {
      path: '/movie/:id',
      name: 'movieDetail',
      component: movieDetail
    },
    {
      path: '/top250',
      name: 'movieTop',
      component: movieTop
    },
    {
      path: '/movie_search',
      name: 'movie_search',
      component: movieSearch
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/indexlist',
      name: 'indexlist',
      component: indexList
    }
  ]
})
