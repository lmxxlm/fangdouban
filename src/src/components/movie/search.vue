<template>
  <section class="search-wapper">
    <yd-layout>
      <nav-bar slot="navbar" navBarTitle="电影搜索">
        <div slot="left" style="font-size: 13px;color: #fff;" @click="backHandler">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
          返回
        </div>
      </nav-bar>
      <section>
        <yd-search v-model="search_movie" placeholder="电影名称、导演、演员" :on-submit="searchMovieHandler"></yd-search>
        <section class="movie-content-wapper" v-if="search_movies.length>0">
          <yd-infinitescroll :callback="searchMovieHandler" ref="scrollMovies">
            <movie-list slot="list" :movieList="search_movies" :showNumber="showNumber"
                        @selectMovieemit="selectMovie"></movie-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">喵，已经全部加载完毕</span>
          </yd-infinitescroll>
        </section>

        <section class="nodata-tips" v-else>
          <yd-icon name="warn-outline" size="1.6rem" color="rgb(138, 138, 138)"></yd-icon>
          <div>空也</div>
          <div>不妨搜索您想找的电影</div>
        </section>
      </section>
    </yd-layout>
  </section>
</template>

<script>
  import navBar from '@components/navbar/navbar'
  import {searchMovies} from '@/api/movieApi'
  import Movie from '@/common/js/movie'
  import movieList from '@/base/movie/movieList'

  const ERR_OK = 0
  export default{
    data () {
      return {
        count: 20,
        showNumber: false,
        search_movie: '',
        search_movies: []
      }
    },
    methods: {
      selectMovie: function (movie) {
        var _that = this

        _that.$router.push({
          path: `/movie/${movie.id}`
        })
      },
      backHandler: function () {
        this.$router.go(-1)
      },
      searchMovieHandler: function () {
        var _that = this
        _that.$dialog.loading.open('努力搜索中')

        searchMovies(_that.search_movie, _that.count).then((res) => {
          _that.$dialog.loading.close()

          if (res.start === ERR_OK) {
            _that.search_movies = res.subjects
            if (_that.count >= 20) {
              _that.$refs.scrollMovies.$emit('ydui.infinitescroll.loadedDone')
              return
            }

            _that.$refs.scrollMovies.$emit('ydui.infinitescroll.finishLoad')
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
      'navBar': navBar,
      'movieList': movieList
    }
  }
</script>

<style>
  .search-wapper {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
  }

  .movie-content-wapper {
    margin: 0px 0px 0px 10px;
  }

  .nodata-tips {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(138, 138, 138);
    font-size: 14px;
    margin-top: 50px;
  }
</style>
