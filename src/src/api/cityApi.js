/**
 * Created by Administrator on 2017/12/28.
 */

import jsonp from './jsonp'
import {commonParams, options} from './config'

export function getLocList () {
  const url = 'https://api.douban.com/v2/loc/list'

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

//获取活动列表
export function getEventList (loc, day_type, type) {
  const url = 'https://api.douban.com/v2/event/list'

  const data = Object.assign({}, commonParams, {
    loc:loc,
    day_type:day_type,
    type:type
  })

  return jsonp(url, data, options)
}

//获取活动详情
export function getEventdetail (id) {
  const url = `https://api.douban.com/v2/event/${id}`

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

