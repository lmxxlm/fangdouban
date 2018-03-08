/**
 * Created by Administrator on 2018/1/9.
 */
export default class Music {
  constructor ({id, title, author, image, tags, attrs, rating}) {
    this.id = id
    this.title = title
    this.author = author
    this.image = image
    this.tags = tags
    this.attrs = attrs
    this.rating = rating
  }
}
