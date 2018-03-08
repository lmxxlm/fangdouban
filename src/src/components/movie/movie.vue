<template>
  <yd-layout>
    <nav-bar slot="navbar" navBarTitle="豆瓣电影">
      <router-link to="/movie_search" slot="right">
        <yd-icon name="search" size="18px" color="#fff"></yd-icon>
      </router-link>
    </nav-bar>

    <div style="height: 10px;"></div>
    <section class="in_theaters-wapper">
      <div class="head-tips">
        <div class="tips-name">影院热映</div>
        <div class="tips-right">全部<span v-if="in_theaters.length>0">{{in_theaters.length}}</span> ></div>
      </div>
      <swiper :options="swiperOption" v-if="in_theaters.length>0">
        <swiper-slide v-for="item in sliceIn_theaters" :key="item.id">
          <div class="movie-wapper" @click="selectMovie(item.id)">
            <img class="movie-img" :src="item.images.small">
            <div class="movie-title">{{item.title}}</div>
              <span style="display: inline-flex">
              <yd-rate slot="left" readonly v-model="item.rating.average"
                       size="12px"></yd-rate> &nbsp;{{item.rating.average}}</span>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="all-wapper">
            <div class="txt-u">全部</div>
            <div class="txt-b"></div>
            <div class="txt-d">{{in_theaters.length}}部</div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <div style="height: 20px;"></div>
    <section class="in_theaters-wapper">
      <div class="head-tips">
        <div class="tips-name">即将上映</div>
        <div class="tips-right">全部<span v-if="coming_soon.length>0">{{coming_soon.length}}</span> ></div>
      </div>
      <swiper :options="swiperOption" v-if="coming_soon.length>0">
        <swiper-slide v-for="item in sliceComing_soon" :key="item.id">
          <div class="movie-wapper" @click="selectMovie(item.id)">
            <img class="movie-img" :src="item.images.small">
            <div class="movie-title">{{item.title}}</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="all-wapper">
            <div class="txt-u">全部</div>
            <div class="txt-b"></div>
            <div class="txt-d">{{coming_soon.length}}部</div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <div style="height: 20px;"></div>
    <section class="in_theaters-wapper">
      <div class="head-tips">
        <div class="tips-name">豆瓣Top250</div>
        <div class="tips-right" @click="topHandler">全部Top ></div>
      </div>
      <div style="display: flex;margin: 10px;" v-for="(item,$index) in db_top250" :key="item.id"
           @click="selectMovie(item.id)">
        <div style="margin-right:15px;font-size: 15px;">{{$index+1}}</div>
        <div style="width: 20%;">
          <img :src="item.images.small" style="width: 60%;">
        </div>
        <div style="width: 100%;border-bottom: 1px solid rgb(222, 222, 222)">
          <div style="font-size: 14px;">{{item.title}}</div>
          <div style="display: inline-flex; padding-top: 5px;">
            <yd-rate slot="left" readonly v-model="item.rating.average" size="12px"></yd-rate>
            &nbsp;{{item.rating.average}}
          </div>
        </div>
      </div>
    </section>

    <tab-bar slot="tabbar" :activeIndex="2"></tab-bar>

    <router-view></router-view>
  </yd-layout>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import navBar from '@components/navbar/navbar'
  import tabBar from '@components/tabbar/tabbar'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getIntheaters, getComingsoon, getDbtop250} from '@/api/movieApi'
  import Movie from '@/common/js/movie'

  const ERR_OK = 0
  export default {
    data () {
      return {
        swiperOption: {
          effect: 'slide',
          spaceBetween: 10,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
          slidesPerView: 3
        },
        in_theaters: [],
        coming_soon: [],
        db_top250: []
      }
    },
    computed: {
      sliceIn_theaters: function () {
        return this.in_theaters.slice(0, 8)
      },
      sliceComing_soon: function () {
        return this.coming_soon.slice(0, 8)
      }
    },
    created: function () {
      this.$nextTick(() => {
        this.getIntheaters()
        this.getComingsoon()
        this.getDbtop250()
      })
    },
    methods: {
      topHandler: function () {
        this.$router.push({
          path: `/top250`
        })
      },
      selectMovie: function () {
        var _that = this

        _that.$router.push({
          path: `/movie/${arguments[0]}`
        })
      },
      getDbtop250: function () {
        var _that = this
        getDbtop250(5).then((res) => {
          if (res.start === ERR_OK) {
            _that.db_top250 = _that._normalizeMovie(res.subjects)
          }
        })
      },
      getIntheaters: function () {
        var _that = this
        getIntheaters().then((res) => {
          if (res.start === ERR_OK) {
            _that.in_theaters = _that._normalizeMovie(res.subjects)
          }
        })
      },
      getComingsoon: function () {
        var _that = this
        getComingsoon().then((res) => {
          if (res.start === ERR_OK) {
            _that.coming_soon = _that._normalizeMovie(res.subjects)
          }
        })
      },
      _normalizeMovie: function (list) {
        let temp = []

        list.forEach((item, index) => {
          temp.push(new Movie({
            id: item.id,
            title: item.title,
            subtype: item.subtype,
            directors: item.directors,
            year: item.year,
            images: item.images,
            casts: item.casts,
            rating: item.rating
          }))
        })
        return temp
      }
    },
    components: {
      swiper,
      swiperSlide,
      'navBar': navBar,
      'tabBar': tabBar
    }
  }
</script>

<style>
  body {
    background-color: #fff;
  }

  .all-wapper {
    background-color: #d9d9d9;
    height: 140px;
    width: 100px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
  }

  .all-wapper .txt-d {
    font-size: 12px;
    color: #8a8a8a
  }

  .all-wapper .txt-b {
    border-top: 1px solid #8a8a8a;
    width: 40px
  }

  .all-wapper .txt-u {
    font-size: 14px;
    color: #8a8a8a
  }

  .movie-wapper {
    height: 180px;
    width: 100px;
  }

  .movie-wapper .movie-img {
    width: 100px;
    height: 140px;
  }

  .movie-wapper .movie-title {
    width: 100px;
    font-size: 13px;
    font-weight: bolder;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .in_theaters-wapper {
  }

  .in_theaters-wapper .head-tips {
    margin: 10px;
    display: flex;
    justify-content: space-between
  }

  .in_theaters-wapper .head-tips .tips-name {
    font-size: 13px;
    font-weight: bolder;
  }

  .in_theaters-wapper .head-tips .tips-right {
    font-size: 11px !important;
    color: #8a8a8a;
    cursor: pointer;
  }
</style>
