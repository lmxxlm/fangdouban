import jsonp from './jsonp'
import {commonParams, options} from './config'

export function getIntheaters () {
  const url = 'https://api.douban.com/v2/movie/in_theaters'

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

export function getComingsoon () {
  const url = 'https://api.douban.com/v2/movie/coming_soon'

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

export function getDbtop250 (count) {
  const url = 'https://api.douban.com/v2/movie/top250'

  const data = Object.assign({}, commonParams, {
    count: count
  })

  return jsonp(url, data, options)
}

export function getMovieDetail (id) {
  const url = `https://api.douban.com/v2/movie/subject/${id}`

  const data = Object.assign({}, commonParams, {})

  return jsonp(url, data, options)
}

export function searchMovies (searchKey, count) {
  const url = 'https://api.douban.com/v2/movie/search'

  const data = Object.assign({}, commonParams, {
    q: searchKey,
    count: count
  })

  return jsonp(url, data, options)
}
