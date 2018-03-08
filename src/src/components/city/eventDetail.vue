<template>
  <yd-layout class="all">
    <nav-bar slot="navbar" navBarTitle="测试" class="navbar">
       <router-link :to="'/city?id='+loc.locId+'&name='+loc.locName" slot="left" >
         <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
       </router-link>
      <span slot="center"><i class="iconfont icon-zhaoxiang" ></i>{{eventDetail.category_name}}</span>
       <span slot="right"><i class="iconfont icon-fenxiang" ></i></span>
    </nav-bar>
    <div class="content">
      <yd-flexbox direction="vertical">
        <yd-flexbox-item class="wrap_img">
          <!-- 放大图片 -->
          　　<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
            <img id="smallImg" :src="eventDetail.image"  @click="clickImg($event)" alt="">
        </yd-flexbox-item>
        <yd-flexbox-item>
          <h2 class="title">{{eventDetail.title}}</h2>
          <p class="join_num"><span>{{eventDetail.participant_count}}感兴趣</span>/<span>{{eventDetail.wisher_count}}人要参加</span></p>
        </yd-flexbox-item>
      </yd-flexbox>
      <yd-flexbox class="tags">
        <yd-flexbox-item>
          <router-link name="inter" to="/">感兴趣</router-link>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <router-link name="join" to="/">要参加</router-link>
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-cell-group>
        <yd-cell-item arrow>
          <i class="iconfont icon-shijian" slot="icon" ></i>
          <span slot="left">活动时间</span>
          <span slot="right">{{eventDetail.time_str}}</span>
        </yd-cell-item>

        <yd-cell-item arrow>
          <i class="iconfont icon-dizhi" slot="icon"></i>
          <span slot="left">举办地址</span>
          <span slot="right">{{eventDetail.address}}</span>
        </yd-cell-item>

        <yd-cell-item arrow>
          <i class="iconfont icon-goupiao1" slot="icon"></i>
          <span slot="left">购票直通车</span>
          <span slot="right">{{eventDetail.fee_str}}</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <i class="iconfont icon-rexian" slot="icon"></i>
          <span slot="left">购票客服热线</span>
          <span slot="right">{{eventDetail.album}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-flexbox class="event_detail">
        <yd-flexbox-item>
          <p class="title">活动详情</p>
          <div v-html="eventDetail.content">
          </div>
        </yd-flexbox-item>

      </yd-flexbox>

    </div>
  </yd-layout>
</template>

<script>
  import navBar from '@components/navbar/navbar'
  import {getEventdetail} from '@/api/cityApi'
  import {mapGetters} from 'vuex'
  import BigImg from './BigImg.vue'
   export default{
      data(){
        return {
          msg: '',
          eventDetail: '',
          showImg: false,
          imgSrc: ''
        }
      },
     deactivated: function () {
       this.$destroy()
     },
     activated: function () {
       this.$nextTick(() => {
         this.eventDetail = this.event
         if (!this.eventDetail.id) {
           //this.$router.push('/city')
           this._getEventdetail();
         }

       })
     },
     computed:{
       ...mapGetters([
         'event',
         'loc'
       ])
     },
     created(){
          let that = this;
     },
     methods:{
       _getEventdetail: function () {
         var _that = this
         _that.$dialog.loading.open('努力加载中')

         getEventdetail(this.$route.query.id).then((res) => {
           _that.$dialog.loading.close()
           _that.eventDetail = res
           console.log(_that.eventDetail);
         })
       },
       clickImg(e) {
         this.showImg = true;
         // 获取当前图片地址
         this.imgSrc = e.currentTarget.src;
       },
       viewImg(){
         this.showImg = false;
       },
     },
    components: {
      'navBar': navBar,
      'big-img':BigImg
    }
  }
</script>

<style scoped>
  .event_detail .title{
    color:#DAD8D8;
  }
  .all{
    background:#fff;
  }
  .tags{
    padding-top:30px;
    padding-bottom:30px;
  }
  .tags a{
    text-align:center;
    display:inline-block;
    width:100%;
    border:1px solid #FFCC97;
    border-radius:5px;
    color:#FFA63A;
    height:30px;
    line-height:30px;
    font-size:16px;
  }
  .content .title{
    padding-top:20px;
    padding-bottom:10px;
    font-size:16px;
  }
  .content .join_num{
    color:#bAA8D8;
  }
 .content .yd-flexbox-item{
    padding-left:15px;
    padding-right:15px;
  }
  .navbar .iconfont{
     color:#fff;
     font-size:16px;
   }
 .navbar span{
    color:#fff;
  }
  .navbar .title{
    padding-left:10px;
  }

  .wrap_img{
    padding-top:20px;
    padding-bottom:20px;
    background:#089242;
    text-align:center;
  }
</style>
