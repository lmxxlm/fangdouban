<template>
  <div class="index-list">
    <div class="current-wapper">{{currentIndicator}}</div>
    <ul class="index-list-wrap" ref="indexWrap" @scroll="onListWrapScroll">
      <li v-for="(group,index) in data" :key="index" class="index-group" ref="indexGroup">
        <h3 class="index-group-title">{{group.title}}</h3>
        <ul class="ul-wapper">
          <li @click="clickItem(item)" v-for="(item,index) in group.items" :key="index" class="index-group-item">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="index-nav">
      <ul>
        <li v-for="(item,index) in indexList" :key="index" @touchstart.prevent="_onTouchStartIndex(index)"
            :data-index="index" class="nav-item" :class="{'active':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="index-indicator" v-show="moving">{{currentIndicator}}</div>
    </transition>
  </div>
</template>

<script>
  const INDICATOR_INDURATION = 1000
  const TITLE_HEIGHT = 25

  export default {
    name: 'index-list',
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        currentIndex: 0,
        moving: false,
        currentIndicator: '热门'
      }
    },
    watch: {
      currentIndex (newVal) {
        clearTimeout(this.timer)
        this.currentIndicator = this.indexList[this.currentIndex]
        this.moving = true
        this.timer = setTimeout(() => {
          this.moving = false
        }, INDICATOR_INDURATION)
      }
    },
    computed: {
      indexList () {
        return this.data.map((group) => {
          return group.title.substring(0, 1)
        })
      }
    },
    created () {
      this.listHeight = []
      this.timer = null
      this.scrollTimer = null
    },
    mounted () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    methods: {
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.indexGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _onTouchStartIndex (index) {
        this.currentIndex = index
        this.$refs.indexWrap.scrollTop = this.listHeight[index]
      },
      clickItem (item) {
        this.$emit('chooseHandler', item)
      },
      onListWrapScroll (e) {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          let scrollTop = this.$refs.indexWrap.scrollTop
          const listHeight = this.listHeight
          for (let i = 0; i < listHeight.length - 1; i++) {
            if (scrollTop <= (listHeight[i + 1] - TITLE_HEIGHT) && scrollTop >= listHeight[i]) {
              this.currentIndex = i
              return
            }
          }
        }, 20)
      }
    },
    destroyed () {
      clearTimeout(this.timer)
      clearTimeout(this.scrollTimer)
    }
  }
</script>

<style>
  .current-wapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 25px;
    width: 100%;
    line-height: 25px;
    padding-left: 10px;
    font-size: 12px;
    color: #000;
    background: #dfdfdf;
    font-weight: bold;
  }

  .index-list {
    position: relative;
    width: 100%;
    height: 100%;
    background: #dfdfdf;
  }

  .index-list-wrap {
    height: 100%;
    overflow: auto;
  }

  .index-group {
    padding-bottom: 10px
  }

  .index-group-title {
    height: 25px;
    line-height: 25px;
    padding-left: 10px;
    font-size: 12px;
    color: #000;
  }

  .ul-wapper {
    background-color: #ffffff;
  }

  .active {
    color: #ffcd32 !important;
  }

  .index-group-item {
    display: flex;
    align-items: center;
    height: 45px;
    list-style: none;
    border-bottom: 1px solid #d9d9d9;
  }

  .name {
    margin-left: 10px;
    color: #000;
    font-size: 14px;
  }

  .index-nav {
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 100;
    width: 20px;
    padding: 10px 0;
    text-align: center;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-50%);
  }

  .index-nav .nav-item {
    padding: 1px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    list-style: none;
  }

  .index-indicator {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 50px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 22px;
    border-radius: 5px;
    pointer-events: none;
  }

  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
