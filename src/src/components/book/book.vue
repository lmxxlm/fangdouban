<template>
  <yd-layout>
    <nav-bar slot="navbar"></nav-bar>
    <section>
      <yd-search v-model="search_book" placeholder="搜索您想找的图书" :on-submit="searchBooksHandler"></yd-search>
      <section class="book-content-wapper" v-if="books.length>0">
        <yd-infinitescroll :callback="searchBooksHandler" ref="scrollBooks">
          <book-list slot="list" :books="books" @selectBookemit="selectBook"></book-list>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip">喵，已经全部加载完毕</span>
        </yd-infinitescroll>
      </section>
      <section class="nodata-tips" v-else>
        <yd-icon name="warn-outline" size="1.6rem" color="rgb(138, 138, 138)"></yd-icon>
        <div>空也</div>
        <div>不妨搜索您想找的图书</div>
      </section>
    </section>
    <tab-bar slot="tabbar" :activeIndex="1"></tab-bar>
  </yd-layout>
</template>

<script>
  import bookList from '@/base/book/bookList'
  import navBar from '@components/navbar/navbar'
  import tabBar from '@components/tabbar/tabbar'
  import {searchbooks} from '@/api/bookApi'
  import Book from '@/common/js/book'
  import {mapMutations} from 'vuex'

  const ERR_OK = 0
  export default{
    data () {
      return {
        search_book: '',
        count: 20,
        books: []
      }
    },
    methods: {
      selectBook: function (book) {
        var _that = this

        _that.$router.push({
          path: `/book/${book.id}`
        })
        _that.setBookdetail(book)
      },
      searchBooksHandler: function () {
        var _that = this
        _that.$dialog.loading.open('努力搜索中')

        searchbooks(_that.search_book, _that.count).then((res) => {
          _that.$dialog.loading.close()

          if (res.start === ERR_OK) {
            _that.books = _that._normalizeBook(res.books)
            if (_that.count >= res.total) {
              _that.$refs.scrollBooks.$emit('ydui.infinitescroll.loadedDone')
              return
            }
            _that.$refs.scrollBooks.$emit('ydui.infinitescroll.finishLoad')
            _that.count += 20
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
      },
      ...mapMutations({
        setBookdetail: 'SET_BOOKDETAIL'
      })
    },
    components: {
      'navBar': navBar,
      'tabBar': tabBar,
      'bookList': bookList
    }
  }
</script>

<style>
  .book-content-wapper {
    height: 100%;
    background-color: #ffffff;
  }


</style>
