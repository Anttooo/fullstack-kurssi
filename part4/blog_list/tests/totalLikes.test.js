const listHelper = require('../utils/list_helper')

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const oneBlog = [{ likes: 1 }]
    expect(listHelper.totalLikes(oneBlog)).toBe(1)
  })
  test('of a bigger list is calculated right', () => {
    const blogs = [{ likes: 1 }, { likes: 2 }, { likes: 7 }, { likes: 5 }]
    expect(listHelper.totalLikes(blogs)).toBe(15)
  })

})