<template>

  <yd-layout class="parent">
     <div class="nav-head">
       <yd-navbar >
         <router-link to="#" slot="left">
           <yd-navbar-back-icon></yd-navbar-back-icon>
         </router-link>
         <div slot="center">
           <yd-button type="primary">国内</yd-button>
           <yd-button type="warning">国外</yd-button>
         </div>
       </yd-navbar>
       <yd-search :result="result" fullpage v-model="value2" :item-click="itemClickHandler" :on-submit="submitHandler"></yd-search>
     </div>


    <div class="content">

     <yd-grids-group :rows="3" title="热门城市" class="hotCity" >
       <yd-grids-item v-for="loc,key in locs" :key  type="link" :link="{name:'city',query:{id:loc.id,name:loc.name}}">
         <span slot="text" :id="loc.id">{{loc.name}}</span>
       </yd-grids-item>
     </yd-grids-group>
     <!--显示右侧字幕表-->

     <div :style="letter_right" >
       <ul v-for="item in letter">
         <li><a :href="'#'+item.letter">{{item.letter}}</a></li>
       </ul>
     </div>


     <yd-cell-group v-for="item in showCity" id="showCity">
       <div class="letter">
         <a :id="item.letter">{{item.letter}}</a>
       </div>
       <yd-cell-item v-for="i in item.citylist">
         <div slot="left"  >
           {{i}}
         </div>
       </yd-cell-item>
     </yd-cell-group>

   </div>



  </yd-layout>

</template>

<script>
  import {getLocList} from '@/api/cityApi'
  import vueResouce from 'vue-resource'
  import Vue from 'vue'
  Vue.use(vueResouce);
  //import pinyin from 'pinyin/lib/pinyin'
  const pinyin = require('pinyin');
  const ERR_OK = 0

  export default {
    data () {
      return {
        locs: [],
        value2: '',
        result: [],
        letter:[],
        cityNames:[],
        cityLists:[],
        cityNamesFilter:[],
        showCity:[],
        showCityTemp:[],
        flag:true,
        letter_right:{
          backgroundColor:'rgba(246,245,244,0.5)',
          position: 'fixed',
          top:'50%',
          transform: 'translateY(-50%)',
          right:'0px',
          'z-index':'999',
          width:'20px',
          'text-align':'center',
          'line-height':'20px',
          color:'blue'
        }
      }
    },
    ready () {
      window.addEventListener('scroll', this.handleScroll);
    },
    created: function () {
        //监听滚动事件
      this.$nextTick(() => {
        this.getLocList()
        this.$http.get('./../static/city.json').then(response =>{
          let cityList = response.body.provinces;
          for(let i in cityList){
              this.cityLists = cityList[i].citys;
              for(let j in this.cityLists){
                  this.cityNames.push(this.cityLists[j].citysName)
              }
          }
          this.cityNamesFilter=this.cityNames;
          this.buildItem(this.cityNames);
        })

      })
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    watch: {
      value2(val) {
        this.result = this.getResult(val);
      }
    },
    methods: {
      getResult(val) {
        if (!val) return [];
        this.cityFilter(val);
        let list=[];
        for(let i in this.showCity){
            list=list.concat(this.showCity[i]['citylist'])
        }
        return list;
        /*for(let i in this.showCity){
            list.push(this.showCity[i].citylist.toString())
        }
        console.log(list);
        return list;*/
      },
      itemClickHandler(item) {
        this.$dialog.toast({mes: `搜索：${item}`});
      },
      submitHandler(value) {
        this.$dialog.toast({mes: `搜索：${value}`});
      },
      getLocList: function(){
        getLocList().then((res)=>{
          this.locs=res.locs;
        })


      },
      getFirstLetter: function (str) { //  得到城市第一个字的首字母
        return pinyin(str)[0][0].charAt(0).toUpperCase()
      },
      buildLetter: function () {  // 构建字母项
        this.letter = []
        for (let i = 0; i < 26; i++) {
          let obj = {}
          obj.letter = String.fromCharCode((65 + i))
          obj.citylist = []
          this.letter.push(obj)
        }
        return this.letter;
      },
      //构建城市
      buildItem: function (cityNamesFilter) {  // 构建城市
        let letter=this.buildLetter()
        let _this = this
        for (let i = 0; i < 26; i++) {
          this.letter[i].citylist = []
        }
        for (let i = 0; i < cityNamesFilter.length; i++) {
          let _index = Number(_this.getFirstLetter(cityNamesFilter[i]).charCodeAt() - 65)
          if (_index >= 0 && _index < 26) {
            letter[_index].citylist.push(cityNamesFilter[i])
          }
        }
        // 如果letter中citylist中没有值的话，过滤这一项
        this.showCity = this.showCityTemp = letter.filter(function (value) {
          let len = value.citylist.length
          return len > 0
        })
      },
      //筛选城市
      cityFilter:function(city){
        this.buildItem(this.cityNamesFilter)
        let test_temp= this.showCityTemp
        let test_showCity = test_temp.filter(function (value) {
          let test_cityList =value.citylist.filter(function (val) {
            return (val.indexOf(city) > -1)
          })
          value.citylist = test_cityList
          return value.citylist.length > 0
        })
        this.showCity = test_showCity
      },
      //点击城市回到同城页面
      goBackCity:function(cityId,cityName){
          alert(123);
        this.$router.push({
          path: `/city/${cityId}`
        })
      }

    }
  }
</script>

<style>
  .letter{
    padding-left:10px;
    background:#F6F5F4;
  }
  .parent{position:relative;}
  .nav-head{
    position:fixed;
    top:0;
    z-index:998;
    width:100%;
  }
  .content{
    padding-top:100px;
  }


</style>


