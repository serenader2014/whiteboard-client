import { observable } from 'mobx'

export default class CategoryStore {
  @observable categories = []

  setCategories(list) {
    this.categories = list
  }
}
