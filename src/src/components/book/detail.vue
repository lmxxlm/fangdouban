<template>
  <yd-layout>
    <nav-bar slot="navbar" navBarTitle="豆瓣图书">
      <div slot="left" style="font-size: 13px;color: #fff;" @click="backHandler">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        返回
      </div>
      <router-link to="/" slot="right">
        <yd-icon name="home-outline" color="#fff" size="18px"></yd-icon>
      </router-link>
    </nav-bar>
    <section>
      <section class="img-wapper">
        <img :src="book.images.large">
      </section>
      <section class="main-wapper">
        <section class="main-title">
          <div class="main-title-left">
            <span class="book-name">{{book.title}}</span>
            <span class="zuozhe">作者：{{book.author}}</span>
            <span class="zuozhe">出版社：{{book.publisher}}</span>
            <span class="zuozhe">出版时间：{{book.pubdate}}</span>
          </div>
          <div class="main-title-right">
            <div class="rating-wapper">
              <span style="font-size: 11px;color: #8a8a8a">豆瓣评分</span>
              <span style="font-size: 20px; font-weight: bold">{{book.rating.average}}</span>
              <span style="padding:3px 0 3px 0;">
                <yd-rate slot="left" readonly v-model="book.rating.average" size="12px"></yd-rate>
              </span>
              <span style="font-size: 10px;color: rgb(93, 93, 93)">{{book.rating.numRaters}}人</span>
            </div>
          </div>
        </section>
        <section class="main-btn-wapper">
          <div class="btn-item" style="width: 25%">想读</div>
          <div class="btn-item" style="width: 25%;margin: 0 5px 0 5px;">在读</div>
          <div class="btn-item" style="width: 50%;display: inline-flex;justify-content: center;">
            读过&nbsp;<yd-rate slot="left" readonly size="12px" color="rgb(255, 93, 80)"></yd-rate>
          </div>
        </section>
      </section>
      <section class="summary-wapper">
        <div class="item">
          <div class="head-tips">热门标签</div>
          <div style="display: flex;flex-wrap:wrap">
            <div class="tag-item" v-for="tag in book_detail.tags">
              {{tag.name}}<span>&nbsp;{{tag.count}}</span>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="head-tips">简介</div>
          <span v-html="filteSummary"></span>
          <span style="color: #279337" v-if="filteSummary.length>0"
                @click="expandHandler('summary')" ref="expandSummarybtn"> ...展开</span>
        </div>
        <div class="item">
          <div class="head-tips">目录 / 试读</div>
          <span v-html="filteCatalog"></span>
          <span style="color: #279337" v-if="filteCatalog.length>0"
                @click="expandHandler('catalog')" ref="expandCatalogbtn"> ...展开</span>
        </div>
        <div class="item" v-if="series!=''">
          <div class="head-tips" style="display:flex; justify-content: space-between">
            <div>丛书系列</div>
            <div style="font-size: 12px;" @click="seriesDetailHandler">丛书详情 ></div>
          </div>
          <div style="display: flex;">
            <div style="margin: 5px 10px 0 0">
              <img :src="book.images.small">
            </div>
            <div style="display: inline-flex;flex-direction: column">
              <span style="font-size: 15px;">{{series.title}}</span>
              <span style="color: #8a8a8a; margin: 5px 0 5px 0">{{series.publisher}}</span>
              <span style="color: #8a8a8a;margin: 0 0 5px 0">共 {{series.total_number}} 册</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  </yd-layout>
</template>

<script>
  import navBar from '@components/navbar/navbar'
  import {getBookdetail, getseries} from '@/api/bookApi'
  import {mapGetters, mapMutations} from 'vuex'

  export default{
    data () {
      return {
        book: {},
        book_detail: {},
        series: '',
        summarylimitNum: 100,
        catalogNum: 50
      }
    },
    deactivated: function () {
      this.$destroy()
    },
    activated: function () {
      this.$nextTick(() => {
        this.book = this.bookdetail
        if (!this.book.id) {
          this.$router.push('/')
        }

        this._getBookdetail()
        this._getseries(this.book.series.id)
      })
    },
    computed: {
      filteSummary: function () {
        return this.book_detail.summary.slice(0, this.summarylimitNum)
      },
      filteCatalog: function () {
        return this.book_detail.catalog.slice(0, this.catalogNum)
      },
      ...mapGetters([
        'bookdetail'
      ])
    },
    methods: {
      ...mapMutations({
        setBookSeries: 'SET_BOOKSERIES'
      }),
      expandHandler: function (tag) {
        var _that = this
        if (tag === 'summary') {
          if (_that.summarylimitNum === _that.book_detail.summary.length) {
            _that.summarylimitNum = 100
            _that.$refs.expandSummarybtn.innerHTML = '...展开'

            console.log(_that.$refs)
            console.log(_that.$refs.expandSummarybtn)
          } else {
            _that.summarylimitNum = _that.book_detail.summary.length
            _that.$refs.expandSummarybtn.innerHTML = '...收起'
          }
        } else if (tag === 'catalog') {
          if (_that.catalogNum === _that.book_detail.catalog.length) {
            _that.catalogNum = 50
            _that.$refs.expandCatalogbtn.innerHTML = '...展开'
          } else {
            _that.catalogNum = _that.book_detail.catalog.length
            _that.$refs.expandCatalogbtn.innerHTML = '...收起'
          }
        }
      },
      seriesDetailHandler: function () {
        var _that = this

        _that.$router.push({
          path: `/series/${_that.series.id}`
        })
        _that.setBookSeries(_that.series)
      },
      backHandler: function () {
        this.$router.go(-1)
      },
      _getseries: function (id) {
        var _that = this

        getseries(id).then((res) => {
          _that.series = res
        })
      },
      _getBookdetail: function () {
        var _that = this
        _that.$dialog.loading.open('努力加载中')

        getBookdetail(this.book.id).then((res) => {
          _that.$dialog.loading.close()

          _that.book_detail = res

          _that.book_detail.summary = _that.book_detail.summary.replace(/\n/g, '<br><br>')
          _that.book_detail.catalog = _that.book_detail.catalog.replace(/\n/g, '<br><br>')
        })
      }
    },
    components: {
      'navBar': navBar
    }
  }
</script>

<style>
  .summary-wapper {
    margin: 20px;
  }

  .summary-wapper .head-tips {
    color: rgb(138, 138, 138);
    margin-bottom: 5px;
    font-size: 12px;
  }

  .summary-wapper .item {
    margin-bottom: 20px;
  }

  .summary-wapper .tag-item {
    margin: 5px;
    border: 1px solid #279337;
    border-radius: 8px;
    height: 22px;
    line-height: 22px;
    color: #279337;
    padding: 0 5px 0 5px;
  }

  .main-btn-wapper {
    margin-top: 15px;
    display: flex;
  }

  .btn-item {
    border: 1px solid rgb(255, 93, 80);
    color: rgb(255, 93, 80);
    font-size: 15px;
    padding: 5px 5px 5px 5px;
    text-align: center;
    border-radius: 3px;
  }

  body {
    background-color: #ffffff;
  }

  .main-wapper {
    margin: 20px;
  }

  .main-wapper .main-title {
    display: flex;
    justify-content: space-between;
  }

  .main-title .main-title-left {
    display: flex;
    flex-direction: column;
  }

  .main-title .main-title-left .zuozhe {
    font-size: 10px;
    color: rgb(93, 93, 93);
    margin: 1px 0 1px 0;
  }

  .main-title .main-title-left .book-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .main-wapper .rating-wapper {
    width: 90px;
    height: 90px;
    padding: 10px;
    background-color: #ffffff;
    box-shadow: 0px 1px 1px 1px rgb(202, 202, 202);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .yd-navbar:after {
    border-bottom: none;
  }

  .img-wapper {
    height: 240px;
    background-color: #279337;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-wapper img {
    width: 40%;
  }
</style>
