import AppStore from './app'
import MessageStore from './message'
import PostStore from './post'
import UserStore from './user'
import CategoryStore from './category'

const appStore = new AppStore()
const message = new MessageStore()
const postStore = new PostStore()
const userStore = new UserStore()
const categoryStore = new CategoryStore()

export default { appStore, message, postStore, userStore, categoryStore }
