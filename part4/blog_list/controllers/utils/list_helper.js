const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const getSumOfLikes = (sum, blog) => {
  return sum + blog.likes
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(getSumOfLikes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  
  const result = blogs.reduce((maxItem, currentItem) => {
    return maxItem.likes > currentItem.likes ? maxItem : currentItem
  })
  
  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const groupedBlogs = _.groupBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(_.keys(groupedBlogs), (author) => groupedBlogs[author].length)

  return {
    author: authorWithMostBlogs,
    blogs: groupedBlogs[authorWithMostBlogs].length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const groupedBlogs = _.groupBy(blogs, 'author')
  const authorLikesPairs = _.map(groupedBlogs, (blogs, author) => ({
    author: author,
    likes: _.sumBy(blogs, 'likes')
  }))

  const maxLikesPair = _.maxBy(authorLikesPairs, 'likes')
  return {
    author: maxLikesPair.author,
    likes: maxLikesPair.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}