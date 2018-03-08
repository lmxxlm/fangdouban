/**
 * Created by Administrator on 2017/12/28.
 */

import jsonp from './jsonp'
import {commonParams, options} from './config'

export function searchbooks (searchKey, count) {
  const url = 'https://api.douban.com/v2/book/search'

  const data = Object.assign({}, commonParams, {
    q: searchKey,
    count: count
  })

  return jsonp(url, data, options)
}

export function getBookdetail (id) {
  const url = `https://api.douban.com/v2/book/${id}`

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

export function getseries (id) {
  const url = `https://api.douban.com/v2/book/series/${id}`

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

export function getseriesBooks (id) {
  const url = `https://api.douban.com/v2/book/series/${id}/books`

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}
