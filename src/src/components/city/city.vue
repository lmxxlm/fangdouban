<template>
  <yd-layout class="main_body">
    <nav-bar slot="navbar"></nav-bar>
    <yd-grids-group :rows="2" class="comm_top">
      <yd-grids-item link="/testLocalList">
        <div slot="else" class="comm_tab">
          <span>当前城市</span><span class="red" :id="$route.query.id">{{$route.query.id}}{{$route.query.name}}</span>
          <yd-navbar-next-icon class="icon_right"></yd-navbar-next-icon>
        </div>
      </yd-grids-item>
      <yd-grids-item>
        <a slot="else" class="comm_tab">
          <span>类型</span><span>时间</span><span>地点</span>
          <yd-navbar-next-icon class="icon_right"></yd-navbar-next-icon>
        </a>
      </yd-grids-item>
    </yd-grids-group>

    <section>
      <div class="block">
        <div class="block_head">
          <router-link to="/">
            <span class="main_title comm_vc">热门活动</span> <span class="count comm_vc">全部<em>{{hotEvent.count}}</em><i
            class="iconfont icon-youjian"></i></span>
          </router-link>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in events">
            <img :src="item.image" alt="" width="100%" @click="eventDetail(item,$route.query.id,$route.query.name)">
            <div class="describe">
              <div class="img_title"> {{item.title}}</div>
              <p class="begin_time">{{item.begin_time | filDate}}</p>
            </div>

          </swiper-slide>
        </swiper>
      </div>
    </section>


    <tab-bar slot="tabbar" :activeIndex="4"></tab-bar>
  </yd-layout>
</template>

<script>
  import navBar from '@components/navbar/navbar'
  import tabBar from '@components/tabbar/tabbar'
  import {getEventList} from '@/api/cityApi'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapMutations} from 'vuex'
  import Vue from 'vue'
  Vue.filter('filDate', function (value) {
    return value.split(' ')[0];
  })

  export default{
    data () {
      return {
        hotEvent: '',
        events: '',
        id: '',
        swiperOption: {
          effect: 'slide',
          spaceBetween: 10,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
          slidesPerView: 3
        }
      }
    },
    deactivated: function () {
      this.$destroy()
    },
    activated: function () {
        let _that =this;
      _that.id = this.$route.query.id;
      if (!_that.id) {
        this.$dialog.alert({mes: '当前没有城市，请选择城市'});
      } else {
        //let testId = this.id
        this.$nextTick(() => {
          console.log("测试2"+_that.id);

          _that._getEventList(_that.id);
        })
      }
    },
    methods: {
      _getEventList(id){
        let _that = this
        _that.$dialog.loading.open('努力加载中');
        console.log(typeof(id));
        getEventList(id, 'week', 'all').then((res) => {

          _that.$dialog.loading.close()
          _that.hotEvent = res;
          _that.events = res.events;
          console.log(res);
        },(err,data)=>{
          console.log(err);
        })

      },
      eventDetail(item,locId,locName){
        let _this = this
        _this.setEvent(item);
        let loc={
          locId:locId,
          locName:locName
        }
        _this.setLoc(loc);
        _this.$router.push({
          /*path:'/city/eventDetail',query:{obj:eventObj}*/
          path: `/city/${item.id}`, query: {id: item.id, name: item.category_name}
        })

      },
      ...mapMutations({
        setEvent: 'SET_EVENT',
        setLoc:'SET_LOC'
      })

    },
    components: {
      'navBar': navBar,
      'tabBar': tabBar
    }
  }
</script>

<style scoped>
  .img_title {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 30px;
  }

  .block_head {
    height: 30px;
    line-height: 30x;
    position: relative;

  }

  .block_head .main_title {
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .comm_vc {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .block_head .count {
    color: #A6A29D;
    right: 10px;

  }

  /*去掉下划线*/
  .comm_top .yd-grids-2:before, .comm_top .yd-grids-item:after {
    border-bottom: hidden;
  }

  .swiper-container {
    background: #fff;
  }

  .iconfont {
    font-size: 13px;
  }

  .swiper-container .yd-list-item .yd-list-title {
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    overflow: hidden;
    text-align: justify;
    height: inherit;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .comm_title {
    padding-left: 10px;
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
  }

  .comm_title span:first-child {
    font-size: 17px;
    font-weight: bold;
  }

  .comm_title a {
    font-size: 14px;
    color: #A5A19C;
  }

  .comm_tab {
    display: block;
    width: 100%;
    padding-left: 10px;
    padding-right: 5px;
  }

  .comm_tab span:not(last-child) {
    padding-right: 5px;
  }

  .comm_tab span.red {
    color: red;
  }

  .icon_right {
    float: right;
    clear: both;
  }

  .main_body {
    background: #fff;
  }
</style>
