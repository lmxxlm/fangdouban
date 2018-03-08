export default class Movie {
  constructor ({id, title, subtype, directors, year, images, casts, rating}) {
    this.id = id
    this.title = title
    this.subtype = subtype
    this.directors = directors
    this.year = year
    this.images = images
    this.casts = casts
    this.rating = rating
  }
}
