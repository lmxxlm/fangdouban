/**
 * Created by Administrator on 2017/12/28.
 */
export default class City {
  constructor ({image, adapturl, locname, alt, url, id,owner, category, title, begintime,pricerange,address}) {
    this.image = image
    this.adapturl = adapturl
    this.locname = locname
    this.alt = alt
    this.url = url
    this.id = id
    this.owner = owner
    this.category = category
    this.begintime = begintime
    this.pricerange = pricerange
    this.address = address
  }
}
