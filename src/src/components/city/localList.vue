<template>
  <section>
    <yd-search v-model="search_city" placeholder="快速检索城市" class="search—city"></yd-search>
    <div class="wrap">
      <index-list :data="getSearchCity" @chooseHandler="onChoose" v-if="getSearchCity.length"></index-list>
      <div v-else class="nocity-tips">抱歉，没有找到您想要的城市</div>
    </div>
  </section>

</template>

<script>
  import indexList from '@/base/indexlist/index-list'
  import {getLocList} from '@/api/locApi'

  const HOT_LEN = 5
  const HOT_NAME = '热门'
  const ERR_OK = 0
  export default{
    data () {
      return {
        search_city: '',
        locList: []
      }
    },
    created: function () {
      this.getLocList()
    },
    computed: {
      getSearchCity: function () {
        var search = this.search_city
        if (search) {
          let res = []
          this.locList.forEach((item) => {
            if (item.title !== HOT_NAME) {
              item.items.forEach((city) => {
                if (city.name.indexOf(search) > -1) {
                  res.push(city)
                }
              })
            }
          })
          return this._normalizeLocs(res)
        }
        return this.locList
      }
    },
    methods: {
      getLocList: function () {
        var _that = this
        _that.$dialog.loading.open('努力搜索中')

        getLocList(100).then((res) => {
          _that.$dialog.loading.close()

          if (res.start === ERR_OK) {
            _that.locList = _that._normalizeLocs(res.locs)
          }
        })
      },
      _normalizeLocs: function (list) {
        if (list.length <= 0) {
          return []
        }

        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((item, index) => {
          if (index < HOT_LEN) {
            map.hot.items.push({
              uid: item.uid,
              id: item.id,
              name: item.name
            })
          }
          const key = item.uid.substring(0, 1).toUpperCase()
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push({
            uid: item.uid,
            id: item.id,
            name: item.name
          })
        })

        // 为了得到有序列表，处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      onChoose: function (item) {
        console.log(item)
      }
    },
    components: {
      indexList
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .wrap {
    position: fixed;
    top: 50px;
    bottom: 0;
    width: 100%;
  }

  .search—city {
    position: fixed;
    z-index: 2999;
    top: 0;
    left: 0;
    width: 100%;
  }

  .current-wapper {
    top: 50px !important;
  }

  .nocity-tips {
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #8a8a8a;
  }
</style>


