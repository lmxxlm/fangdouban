/**
 * Created by Administrator on 2018/1/10.
 */
import jsonp from './jsonp'
import {commonParams, options} from './config'

export function getLocList (count) {
  const url = `https://api.douban.com/v2/loc/list`

  const data = Object.assign({}, commonParams, {
    count: count
  })

  return jsonp(url, data, options)
}
