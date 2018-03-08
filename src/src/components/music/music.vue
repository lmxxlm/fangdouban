<template>
  <yd-layout>
    <nav-bar slot="navbar" navBarTitle="豆瓣音乐"></nav-bar>
    <section>
      <yd-search v-model="search_music" placeholder="搜唱片" :on-submit="searchMusicHandler"></yd-search>

      <section class="music-content-wapper" v-if="musicList.length>0">
        <yd-infinitescroll :callback="searchMusicHandler" ref="scrollMusics">
          <ul slot="list" class="music-list">
            <li v-for="music in musicList">
              <div class="img">
                <img v-lazy="music.image">
              </div>
              <div class="music-detail">
                <span class="title">{{music.title}}</span>
                <span v-if="music.rating.average>0" style="display: inline-flex;color: #8a8a8a;padding:3px 0 3px 0;">
                <yd-rate slot="left" readonly v-model="music.rating.average" size="12px"></yd-rate>{{music.rating.average}}
              </span>
                <span v-else style="color: #8a8a8a;padding:3px 0 3px 0;">暂无评分</span>
                <span style="color: #8a8a8a;" v-if="music.attrs">
                <span v-if="music.attrs.singer.length>0" v-for="(singer) in music.attrs.singer">{{singer}}&nbsp;</span>
                  <span v-if="music.attrs.pubdate!=undefined">/</span>
                  <span v-if="music.attrs.pubdate!=undefined" v-for="(pubdate) in music.attrs.pubdate">{{pubdate}}&nbsp;</span>
              </span>
              </div>
            </li>
          </ul>
          <span slot="doneTip">喵，已经全部加载完毕</span>
        </yd-infinitescroll>
      </section>
      <section class="nodata-tips" v-else>
        <yd-icon name="warn-outline" size="1.6rem" color="rgb(138, 138, 138)"></yd-icon>
        <div>空也</div>
        <div>不妨搜索您想找的唱片</div>
      </section>
    </section>

    <tab-bar slot="tabbar" :activeIndex="3"></tab-bar>
  </yd-layout>
</template>

<script>
  import navBar from '@components/navbar/navbar'
  import tabBar from '@components/tabbar/tabbar'
  import {searchMusics} from '@/api/musicApi'
  import Music from '@/common/js/music'

  const ERR_OK = 0
  export default{
    data () {
      return {
        search_music: '',
        count: 20,
        musicList: []
      }
    },
    methods: {
      searchMusicHandler: function () {
        var _that = this
        _that.$dialog.loading.open('努力搜索中')

        searchMusics(_that.search_music, _that.count).then((res) => {
          _that.$dialog.loading.close()

          if (res.start === ERR_OK) {
            _that.musicList = _that._normalizeMusic(res.musics)

            if (res.total < _that.count) {
              _that.$refs.scrollMusics.$emit('ydui.infinitescroll.loadedDone')
              return
            }

            _that.$refs.scrollMusics.$emit('ydui.infinitescroll.finishLoad')
            _that.count += 20
          }
        })
      },
      _normalizeMusic: function (list) {
        let temp = []

        list.forEach((item, index) => {
          temp.push(new Music({
            id: item.id,
            title: item.title,
            author: item.author,
            image: item.image,
            tags: item.tags,
            attrs: item.attrs,
            rating: item.rating
          }))
        })

        return temp
      }
    },
    components: {
      'navBar': navBar,
      'tabBar': tabBar
    }
  }
</script>

<style>
  body {
    background-color: #fff;
  }

  .music-list {

  }

  .music-list li {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid rgb(222, 222, 222);
  }

  .music-list img {
    width: 70px;
    padding-right: 10px;
  }

  .music-list .music-detail {
    display: inline-flex;
    flex-direction: column;
  }

  .music-detail .title {
    font-size: 15px;
    font-weight: bold;
  }
</style>
