import { observable } from 'mobx'

export default class PostStore {
  @observable postsList = []
  @observable postsListMeta = {}

  updatePostsList(posts) {
    this.postsList = posts.data
    this.postsListMeta = posts.meta
  }

  deletePost(id) {
    this.postsList = this.postsList.filter(item => item.id !== id)
    this.postsListMeta.rowCount = this.postsListMeta.rowCount - 1
  }
}
