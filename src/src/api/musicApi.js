/**
 * Created by Administrator on 2018/1/9.
 */

import jsonp from './jsonp'
import {commonParams, options} from './config'

export function searchMusics (searchKey, count) {
  const url = 'https://api.douban.com/v2/music/search'

  const data = Object.assign({}, commonParams, {
    q: searchKey,
    count: count
  })

  return jsonp(url, data, options)
}

export function getMusicdetail (id) {
  const url = `https://api.douban.com/v2/music/${id}`

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}
