import { Injectable } from '@angular/core'
import { Blog, Comment } from './blog.model'
import { API } from 'aws-amplify'
import { Subject } from 'rxjs'

@Injectable()
export class BlogService {
  apiName = 'blogsApi'
  path = '/blogs'
  updatedBlogs = new Subject<Blog[]>()

  blogs: Blog[] = []

  async setBlogs() {
    const { data } = await API.get(this.apiName, this.path, {})
    this.updatedBlogs.next(data)
    this.blogs = data
  }

  getBlogs() {
    return this.blogs
  }

  getBlogById(id: string) {
    return this.blogs.find((blog) => blog.id == id)
  }

  async createBlog(blog: Blog) {
    this.blogs.push(blog)
    this.createOrUpdateBlogPost(blog)
  }

  async updateBlogPost(id: string, updatedBlog: Blog) {
    this.blogs.map((blog) => {
      if (blog.id === id) {
        return updatedBlog
      }
      return blog
    })
    this.createOrUpdateBlogPost(updatedBlog)
  }

  deleteBlogPost(id: string) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === id)
    const myInit = {
      body: this.blogs[blogIdx],
    }
    try {
      API.put(this.apiName, this.path, myInit)
      delete this.blogs[blogIdx]
      this.updatedBlogs.next(this.blogs)
    } catch (err) {
      console.error(err);
    }
  }

  addComment(id: string, username: string, body: string, userId: string) {
    const comment = new Comment(userId, username, body)
    let blogIdx = this.blogs.findIndex(blog => blog.id === id)
    this.blogs.map((blog) => {
      if (blog.id === id) {
        return blog.comments.push(comment)
      }
      return blog
    })
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
  }

  updateComment(postId: string, commentId: string, textBody: string) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    this.blogs[blogIdx].comments.map(comment => {
      if (comment.id === commentId) {
        return comment.commentBody = textBody
      }
      return comment
    })
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
  }

  deleteComment(postId: string, commentId: string) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    let commentIdx = this.blogs[blogIdx].comments.findIndex(comment => comment.id === commentId)
    this.blogs[blogIdx].comments.splice(commentIdx, 1)
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
  }
  
  addReply(postId: string, userId: string, username: string, commentId: string, body: string) {
    const reply = new Comment(userId, username, body)
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    let commentIdx = this.blogs[blogIdx].comments.findIndex(comment => comment.id === commentId)
    this.blogs[blogIdx].comments[commentIdx].replies.push(reply)
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
  }

  updateReply(postId: string, commentId: string, replyId: string, body: string) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    let commentIdx = this.blogs[blogIdx].comments.findIndex(comment => comment.id === commentId)
    let replyIdx = this.blogs[blogIdx].comments[commentIdx].replies.findIndex(reply => reply.id === replyId)
    this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].commentBody = body
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
  }
  
  removeReply(postId: string, commentId: string, replyId: string) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    let commentIdx = this.blogs[blogIdx].comments.findIndex(comment => comment.id === commentId)
    let replyIdx = this.blogs[blogIdx].comments[commentIdx].replies.findIndex(reply => reply.id === replyId)
    this.blogs[blogIdx].comments[commentIdx].replies.splice(replyIdx, 1)
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
  }
  
  setVotes(postId: string, commentId: string, userId: string, vote: number) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    let commentIdx = this.blogs[blogIdx].comments.findIndex(comment => comment.id === commentId)
    if (this.blogs[blogIdx].comments[commentIdx].voting[userId] !== undefined) {
      if (this.blogs[blogIdx].comments[commentIdx].voting[userId] == vote) {
        delete this.blogs[blogIdx].comments[commentIdx].voting[userId]
      }
      else 
      this.blogs[blogIdx].comments[commentIdx].voting[userId] = vote
    } else {
      this.blogs[blogIdx].comments[commentIdx].voting[userId] = vote
    }
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
    let values: number[] = Object.values(this.blogs[blogIdx].comments[commentIdx].voting)
    return values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  }

  setReplyVotes(postId: string, commentId: string, replyId: string, userId: string, vote: number) {
    let blogIdx = this.blogs.findIndex(blog => blog.id === postId)
    let commentIdx = this.blogs[blogIdx].comments.findIndex(comment => comment.id === commentId)
    let replyIdx = this.blogs[blogIdx].comments[commentIdx].replies.findIndex(reply => reply.id === replyId)
    if (this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].voting[userId] !== undefined) {
      if (this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].voting[userId] == vote) {
        delete this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].voting[userId]
      }
      else 
      this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].voting[userId] = vote
    } else {
      this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].voting[userId] = vote
    }
    this.createOrUpdateBlogPost(this.blogs[blogIdx])
    let values: number[] = Object.values(this.blogs[blogIdx].comments[commentIdx].replies[replyIdx].voting)
    return values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  }
  
  async createOrUpdateBlogPost(blog: Blog) {
    const myInit = {
      body: blog,
    }
    await API.post(this.apiName, this.path, myInit)
  }
}
