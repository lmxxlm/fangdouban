<template>
  <yd-layout>
    <nav-bar slot="navbar" navBarTitle="丛书系列">
      <div slot="left" style="font-size: 13px;color: #fff;" @click="backHandler">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        返回
      </div>
      <router-link to="/" slot="right">
        <yd-icon name="home-outline" color="#fff" size="18px"></yd-icon>
      </router-link>
    </nav-bar>
    <section class="series-wapper">
      <div style="display: flex;flex-direction: column;">
        <span style="font-size: 16px; font-weight: bold;">{{series.title}}</span>
        <span style="font-size: 12px;color: #8a8a8a;margin-top: 3px;">{{series.publisher}}</span>
      </div>

      <div style="margin-top: 20px;">
        <div class="head-tips">丛书简介</div>
        <div>{{series.abstract}}</div>
      </div>

      <section style="margin-top: 20px;" class="content-wapper" v-if="books.length>0">
        <div class="head-tips">前20册</div>
        <book-list :books="books" @selectBookemit="selectBook"></book-list>
      </section>
    </section>
  </yd-layout>
</template>

<script>
  import bookList from '@/base/book/bookList'
  import navBar from '@components/navbar/navbar'
  import {getseriesBooks} from '@/api/bookApi'
  import {mapMutations, mapGetters} from 'vuex'
  import Book from '@/common/js/book'

  const ERR_OK = 0

  export default{
    data () {
      return {
        series: {},
        books: []
      }
    },
    activated: function () {
      this.$nextTick(() => {
        this.series = this.bookseries
        if (!this.series.id) {
          this.$router.push('/')
        }

        this.getseriesBooksHandler()
      })
    },
    computed: {
      ...mapGetters([
        'bookseries'
      ])
    },
    methods: {
      ...mapMutations({
        setBookdetail: 'SET_BOOKDETAIL'
      }),
      selectBook: function (book) {
        var _that = this

        _that.$router.push({
          path: `/book/${book.id}`
        })
        _that.setBookdetail(book)
      },
      backHandler: function () {
        this.$router.go(-1)
      },
      getseriesBooksHandler: function () {
        var _that = this
        _that.$dialog.loading.open('努力搜索中')

        getseriesBooks(_that.series.id).then((res) => {
          _that.$dialog.loading.close()

          if (res.start === ERR_OK) {
            _that.books = _that._normalizeBook(res.books)
          }
        })
      },
      _normalizeBook: function (list) {
        let temp = []

        list.forEach((item, index) => {
          temp.push(new Book({
            id: item.id,
            title: item.title,
            orgtitle: item.origin_title,
            images: item.images,
            url: item.url,
            publisher: item.publisher,
            pubdate: item.pubdate,
            author: item.author,
            rating: item.rating,
            series: item.series
          }))
        })

        return temp
      }
    },
    components: {
      'navBar': navBar,
      'bookList': bookList
    }
  }
</script>

<style>
  .book-list li {
    padding: 10px 0 5px 0;
  }

  .series-wapper {
    margin: 15px;
  }

  .head-tips {
    color: rgb(138, 138, 138);
    margin-bottom: 5px;
    font-size: 12px;
  }
</style>
