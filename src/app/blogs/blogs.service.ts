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

  async deleteBlogPost(id: string) {
    const myInit = {
      body: id,
    }
    try {
      await API.del(this.apiName, this.path, myInit)
    } catch (err) {
      console.error(err);
      
    }
  }

  addComment(id: string, body: string, userId: string) {
    const comment = new Comment(userId, body)
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

  async createOrUpdateBlogPost(blog: Blog) {
    const myInit = {
      body: blog,
    }
    await API.post(this.apiName, this.path, myInit)
  }
}
