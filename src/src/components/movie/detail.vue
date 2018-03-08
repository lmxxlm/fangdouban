<template>
  <yd-layout>
    <nav-bar slot="navbar" :navBarTitle="movie.title">
      <div slot="left" style="font-size: 13px;color: #fff;" @click="backHandler">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        返回
      </div>
      <router-link to="/movie" slot="right">
        <yd-icon name="home-outline" color="#fff" size="18px"></yd-icon>
      </router-link>
    </nav-bar>

    <section>
      <section class="img-wapper">
        <img :src="movie.images.large">
      </section>
      <section class="main-wapper">
        <section class="main-title">
          <div class="main-title-left">
            <span class="name">{{movie.title}}</span>
            <span class="zuozhe">
            {{movie.year}}
            <span v-if="movie.countries" v-for="countrie in movie.countries"> / {{countrie}}</span>

          </span>
            <span class="zuozhe">
            <span v-if="movie.genres" v-for="(genre,$index) in movie.genres">{{genre}}
              <span v-if="movie.genres.length !=($index+1)"> / </span>
          </span>
          </span>
          </div>
          <div class="main-title-right">
            <div class="rating-wapper">
              <span style="font-size: 11px;color: #8a8a8a">豆瓣评分</span>
              <span style="font-size: 20px; font-weight: bold">{{movie.rating.average}}</span>
              <span style="padding:3px 0 3px 0;">
                <yd-rate slot="left" readonly v-model="movie.rating.average" size="12px"></yd-rate>
              </span>
              <span style="font-size: 10px;color: rgb(93, 93, 93)">{{movie.ratings_count}}人</span>
            </div>
          </div>
        </section>
        <section class="main-btn-wapper">
          <div class="btn-item" style="width: 30%">想看</div>
          <div class="btn-item" style="margin-left: 10px; width: 70%;display: inline-flex;justify-content: center;">
            看过&nbsp;<yd-rate readonly slot="left" size="12px" color="rgb(255, 93, 80)"></yd-rate>
          </div>
        </section>

      </section>
      <section>
        <div class="movie-head-tips">
          <div class="movie-tips-name">影片简介</div>
        </div>
        <div class="movie-content">
          <span v-html="filteSummary"></span>
          <span style="color: #279337" v-if="filteSummary.length>0"
                @click="expandHandler('summary')" ref="expandSummarybtn"> ...展开</span>
        </div>
      </section>
      <section>
        <div class="movie-head-tips">
          <div class="movie-tips-name">影人</div>
        </div>
        <div class="movie-content">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="director in movie.directors" :key="director.id">
              <div class="m-movie-wapper">
                <img class="movie-img" v-if="director.avatars" :src="director.avatars.small">
                <img class="movie-img" v-else src="../../../static/img/404.jpg"/>
                <div class="movie-title">{{director.name}}</div>
                <span style="color: #8a8a8a">导演</span>
              </div>
            </swiper-slide>
            <swiper-slide v-for="cast in movie.casts" :key="cast.id">
              <div class="m-movie-wapper">
                <img class="movie-img" v-if="cast.avatars" :src="cast.avatars.small">
                <img class="movie-img" v-else src="../../../static/img/404.jpg"/>
                <div class="movie-title">{{cast.name}}</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="m-all-wapper">
                <div class="txt-u">全部</div>
                <div class="txt-b"></div>
                <div class="txt-d">影人资料</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </section>
    </section>
  </yd-layout>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import navBar from '@components/navbar/navbar'
  import {getMovieDetail} from '@/api/movieApi'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default{
    data () {
      return {
        swiperOptions: {
          effect: 'slide',
          spaceBetween: 40,
          slidesPerView: 3
        },
        summarylimitNum: 100,
        movie: ''
      }
    },
    computed: {
      filteSummary: function () {
        return this.movie.summary.slice(0, this.summarylimitNum)
      }
    },
    components: {
      'navBar': navBar,
      swiper,
      swiperSlide
    },
    deactivated: function () {
      this.$destroy()
    },
    activated: function () {
      this.$nextTick(() => {
        this._getMovieDetail(this.$route.params.id)
      })
    },
    methods: {
      expandHandler: function (tag) {
        var _that = this
        if (tag === 'summary') {
          if (_that.summarylimitNum === _that.movie.summary.length) {
            _that.summarylimitNum = 100
            _that.$refs.expandSummarybtn.innerHTML = '...展开'
          } else {
            _that.summarylimitNum = _that.movie.summary.length
            _that.$refs.expandSummarybtn.innerHTML = '...收起'
          }
        }
      },
      _getMovieDetail: function (id) {
        var _that = this
        _that.$dialog.loading.open('努力加载中')

        getMovieDetail(id).then((res) => {
          _that.movie = res
          _that.$dialog.loading.close()
        })
      },
      backHandler: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  body {
    background-color: #ffffff;
  }

  .movie-content {
    margin: 0 20px 20px 20px;
  }

  .movie-head-tips {
    margin: 20px 20px 5px 20px;
    display: flex;
    font-size: 12px;
    justify-content: space-between
  }

  .movie-head-tips .movie-tips-name {
    color: rgb(138, 138, 138);
  }

  .movie-head-tips .tips-right {
    font-size: 11px !important;
    color: #8a8a8a;
    cursor: pointer;
  }

  .m-all-wapper {
    background-color: #d9d9d9;
    height: 140px;
    width: 100px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
  }

  .m-all-wapper .txt-d {
    font-size: 12px;
    color: #8a8a8a
  }

  .m-all-wapper .txt-b {
    border-top: 1px solid #8a8a8a;
    width: 40px
  }

  .m-all-wapper .txt-u {
    font-size: 14px;
    color: #8a8a8a
  }

  .m-movie-wapper {
    height: 180px;
    width: 100px;
    text-align: center;
  }

  .m-movie-wapper .movie-img {
    width: 100px;
    height: 140px;
  }

  .m-movie-wapper .movie-title {
    width: 100px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .main-title .main-title-left .name {
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
