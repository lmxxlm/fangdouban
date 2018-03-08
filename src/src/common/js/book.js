/**
 * Created by Administrator on 2017/12/28.
 */
export default class Book {
  constructor ({id, title, orgtitle, images, url, publisher, pubdate, author, rating, series}) {
    this.id = id
    this.title = title
    this.orgtitle = orgtitle
    this.images = images
    this.url = url
    this.publisher = publisher
    this.pubdate = pubdate
    this.author = author[0]
    this.rating = rating
    this.series = series
  }
}
