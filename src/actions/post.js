import request, { GET } from '../utils/request'

export function requestEditablePostsList() {
  return GET('/api/v1/posts/editable', {
    query: {
      include: 'user,category'
    }
  }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}

export function requestDeletePost(id) {
  return request(`/api/v1/posts/${id}`, { method: 'DELETE' }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}

export function requestPostDetail(id) {
  return GET(`/api/v1/posts/${id}`, {
    query: {
      include: 'user,category'
    }
  }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}

export function requestCreatePost(post = {
  title: 'New post',
  featured: false,
  status: 'draft',
  category_id: 1,
  content: ''
}) {
  return request('/api/v1/posts', {
    method: 'POST',
    data: post
  }).promise.then(res => {
    if (res.status === 200) {
      return res.body
    } else {
      return Promise.reject(res.body)
    }
  })
}
