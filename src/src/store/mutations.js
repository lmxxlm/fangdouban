import * as types from './mutation-types'

const mutations = {
  [types.SET_BOOKDETAIL] (state, bookdetail) {
    state.bookdetail = bookdetail
  },
  [types.SET_BOOKSERIES] (state, series) {
    state.bookseries = series
  },
  [types.SET_EVENT] (state, event) {
    state.event = event
  },
  [types.SET_LOC] (state, loc) {
    state.loc = loc
  }
}

export default mutations
