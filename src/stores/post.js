import { observable } from 'mobx'

export default class PostStore {
  @observable postsList = []
  @observable postsListMeta = {}

  updatePostsList(posts) {
    this.postsList = posts.data
    this.postsListMeta = posts.meta
  }
}
