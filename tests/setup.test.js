import EmptyBaseModel from './dummy/models/EmptyBaseModel'

import Post from './dummy/models/Post'
import User from './dummy/models/User'

describe('Setup models', () => {

  let errorModel = {}

  test('it throws an error if $http property has not been set', () => {
    EmptyBaseModel.reset().withBaseURL().withRequest()

    errorModel = () => {
      new EmptyBaseModel()
    }

    expect(errorModel).toThrow('You must set $http property')
  })

  test('it throws an error if baseURL() method was not declared', () => {
    EmptyBaseModel.reset().withRequest().withHttp()

    errorModel = () => {
      new EmptyBaseModel()
    }
    expect(errorModel).toThrow('You must declare baseURL() method.')
  })

  test('it throws an error if request() method was not declared', () => {
    EmptyBaseModel.reset().withBaseURL().withHttp()

    errorModel = () => {
      new EmptyBaseModel()
    }
    expect(errorModel).toThrow('You must declare request() method.')
  })

  test('the resource() method pluralizes the class name', () => {
    const post = new Post()
    expect(post.resource()).toEqual('posts')
  })

  test('the resource() method can be overrided', () => {
    Post.prototype['resource'] = () => {
      return 'postz'
    }

    const post = new Post()

    expect(post.resource()).toEqual('postz')

    delete Post.prototype['resource']
  })

  test('the hasMany() is set up', () => {
    const user = new User({ id: 1 })
    const posts = user.posts()

    expect(posts).toBeInstanceOf(Post)
    expect(posts._fromResource).toEqual(user.baseURL() + '/users/1/posts')
  })
})