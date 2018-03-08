<template>
  <section class="list-content">
    <div class="content-item" v-for="(movie,$index,key) in movieList" :key="key" @click="selectMovie(movie)">
      <div class="img">
        <img v-lazy="movie.images.small">
      </div>
      <div class="item-wapper">
        <div v-if="showNumber">
          <span class="no-tag">No.{{($index+1) + (startNumber)}}</span>
        </div>
        <div class="title">{{movie.title}}</div>
        <div>
          <span v-if="movie.rating.average>0" class="rating"><yd-rate readonly slot="left"
                                                                      v-model="movie.rating.average"
                                                                      size="12px"></yd-rate>{{movie.rating.average}}</span>
          <span v-else style="color: #8a8a8a;padding:3px 0 3px 0;">暂无评分</span>
        </div>
        <div class="other">
          <span>{{movie.year}} / </span>
          <span v-if="movie.genres" v-for="(genre,$index) in movie.genres"> {{genre}} </span>
          <span v-if="movie.genres.length>0"> / </span>
          <span v-if="movie.directors" v-for="(director,$index) in movie.directors"> {{director.name}} </span>
          <span v-if="movie.directors.length>0"> / </span>
          <span v-if="movie.casts" v-for="(cast,$index) in movie.casts"> {{cast.name}} </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default{
    props: {
      startNumber: {
        type: Number,
        default: 0
      },
      showNumber: {
        type: Boolean,
        default: true
      },
      movieList: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectMovie: function (movie) {
        this.$emit('selectMovieemit', movie)
      }
    }
  }
</script>

<style>
  .content-item .item-wapper .other {
    margin-top: 3px;
    color: #8a8a8a;
  }

  .content-item .item-wapper .rating {
    display: inline-flex;
    color: #8a8a8a;
    padding: 3px 0 3px 0;
  }

  .content-item .item-wapper .title {
    font-size: 14px;
    font-weight: bold;
    margin: 3px 0px 3px 0px;
  }

  .content-item .item-wapper .no-tag {
    border: 1px solid #ffbf00;
    background-color: #ffbf00;
    color: #8a8a8a;
    padding: 0px 2px 0px 2px;
    border-radius: 3px;
  }

  .content-item .item-wapper {
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    margin: 0px 10px 0px 10px;
  }

  .list-content .content-item .img {
    width: 120px;
  }

  .list-content .content-item img {
    width: 80px;
  }

  .list-content .content-item {
    display: flex;
    padding: 10px 0px 10px 0px;
    border-bottom: 1px solid #d9d9d9;
  }

  .list-content {

  }
</style>
