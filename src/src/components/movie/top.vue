<template>
  <yd-layout>
    <nav-bar slot="navbar" navBarTitle="豆瓣Top250">
      <div slot="left" style="font-size: 13px;color: #fff;" @click="backHandler">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        返回
      </div>
    </nav-bar>
    <section class="number-wapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,$index,key) in sliceNumber" :key="key">
          <div class="number-item"
               @click="numberClickHandler(item)"
               :style="{ color: activited === item.min ? '#f23030' :'#8a8a8a' }">{{item.text}}
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <section class="content-wapper">
      <movie-list :movieList="sliceDbtop250" :startNumber="startNumber" @selectMovieemit="selectMovie"></movie-list>
    </section>
  </yd-layout>
</template>

<script>
  import movieList from '@/base/movie/movieList'
  import navBar from '@components/navbar/navbar'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getDbtop250} from '@/api/movieApi'

  const ERR_OK = 0

  export default{
    data () {
      return {
        swiperOption: {
          effect: 'slide',
          spaceBetween: 10,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
          slidesPerView: 3
        },
        activited: 1,
        db_top250: [],
        startNumber: 0,
        endNumber: 20
      }
    },
    created: function () {
      this.$nextTick(() => {
        this.getDbtop250()
      })
    },
    computed: {
      sliceNumber: function () {
        var toList = []
        var n = 20
        var startNumber = 0
        var endNumber = startNumber + n
        var totalLength = 100  // this.db_top250.length

        var splitNumber = Math.ceil(totalLength / 20)

        while (splitNumber > 0) {
          if (splitNumber === 1) {
            endNumber = totalLength
          }

          toList.push({
            text: 'Top' + (startNumber + 1) + '-' + endNumber,
            min: (startNumber + 1),
            max: endNumber
          })
          startNumber += n
          endNumber += n

          splitNumber--
        }

        return toList
      },
      sliceDbtop250: function () {
        var _that = this

        return _that.db_top250.slice(_that.startNumber, _that.endNumber)
      }
    },
    methods: {
      selectMovie: function (movie) {
        var _that = this

        _that.$router.push({
          path: `/movie/${movie.id}`
        })
      },
      numberClickHandler: function (item) {
        var _that = this

        _that.activited = item.min
        _that.startNumber = (item.min - 1)
        _that.endNumber = item.max
      },
      getDbtop250: function () {
        var _that = this
        _that.$dialog.loading.open('努力加载中')

        getDbtop250(250).then((res) => {
          if (res.start === ERR_OK) {
            _that.db_top250 = res.subjects
            _that.$dialog.loading.close()
          }
        })
      },
      backHandler: function () {
        this.$router.go(-1)
      }
    },
    components: {
      swiper,
      swiperSlide,
      'navBar': navBar,
      'movieList': movieList
    }
  }
</script>

<style>
  .content-wapper {
    margin: 60px 0px 20px 10px;
  }

  .number-wapper {
    position: fixed;
    left: 0;
    top: .8rem;
    background-color: rgb(39, 147, 55);
    height: 50px;
    z-index: 2;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .number-wapper .number-item {
    font-size: 13px;
    width: 80px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: 1px solid #ffffff;
    background-color: #ffffff;
  }

  body {
    background-color: #ffffff;
  }
</style>
