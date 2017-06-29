import AppStore from './app'
import MessageStore from './message'
import PostStore from './post'
import UserStore from './user'

const appStore = new AppStore()
const message = new MessageStore()
const postStore = new PostStore()
const userStore = new UserStore()

export default { appStore, message, postStore, userStore }
