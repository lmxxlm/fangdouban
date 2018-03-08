<template>
  <section>
    <ul class="book-list">
      <li v-for="(book,index)  in books" @click="selectBook(book)">
        <div class="img">
          <img v-lazy="book.images.small">
        </div>
        <div class="book-detail">
          <span class="title">{{book.title}}</span>
          <span v-if="book.rating.average>0" style="display: inline-flex;color: #8a8a8a;padding:3px 0 3px 0;">
                <yd-rate slot="left" readonly v-model="book.rating.average" size="12px"></yd-rate>{{book.rating.average}}
          </span>
          <span v-else style="color: #8a8a8a;padding:3px 0 3px 0;">暂无评分</span>
          <span style="color: #8a8a8a;" v-if="book.author">{{book.author}}</span>
          <span style="color: #8a8a8a;" v-if="book.publisher">{{book.publisher}} / {{book.pubdate}}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default{
    props: {
      books: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectBook: function (book) {
        this.$emit('selectBookemit', book)
      }
    }
  }
</script>

<style>
  .book-list {

  }

  .book-list li {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid rgb(222, 222, 222);
  }

  .book-list img {
    width: 70px;
    padding-right: 10px;
  }

  .book-list .book-detail {
    display: inline-flex;
    flex-direction: column;
  }

  .book-detail .title {
    font-size: 15px;
    font-weight: bold;
  }
</style>
