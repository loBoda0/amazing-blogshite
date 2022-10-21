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
    this.blogs.forEach(blog => {
      if (blog.id === id) {
        blog = updatedBlog
      }
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

  addComment(postId: string, username: string, body: string, userId: string) {
    const comment = new Comment(userId, username, body)
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.push(comment)
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
  }

  updateComment(postId: string, commentId: string, textBody: string) {
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.forEach(comment => {
          if (comment.id === commentId) {
            comment.commentBody = textBody
          }
        })
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
  }

  deleteComment(postId: string, commentId: string) {
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        let idx = blog.comments.findIndex(comment => comment.id === commentId)
        blog.comments.splice(idx, 1)
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
  }
  
  addReply(postId: string, userId: string, username: string, commentId: string, body: string) {
    const reply = new Comment(userId, username, body)
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.forEach(comment => {
          if (comment.id === commentId) {
            comment.replies.push(reply)
          }
        })
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
  }

  updateReply(postId: string, commentId: string, replyId: string, body: string) {
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.forEach(comment => {
          if (comment.id === commentId) {
            comment.replies.forEach(reply => {
              if (reply.id === replyId) {
                reply.commentBody = body
              }
            })
          }
        })
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
  }
  
  removeReply(postId: string, commentId: string, replyId: string) {
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.forEach(comment => {
          if (comment.id === commentId) {
            let idx = comment.replies.findIndex(reply => reply.id === replyId)
            comment.replies.splice(idx, 1)
          }
        })
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
  }
  
  setVotes(postId: string, userId: string, vote: number) {
    let voteCount = vote
    let voteStatus = vote
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.forEach(comment => {
          if (comment.voting[userId] === vote) {
            voteStatus = 0
            voteCount = -1*vote
            delete comment.voting[userId]
          } else {
            if (comment.voting[userId] !== undefined) {
              voteCount *= 2
            }
            comment.voting[userId] = vote
          } 
        });
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
    return {voteStatus, voteCount}
  }

  setReplyVotes(postId: string, commentId: string, userId: string, vote: number) {
    let voteCount = vote
    let voteStatus = vote
    this.blogs.forEach(blog => {
      if (blog.id === postId) {
        blog.comments.forEach(comment => {
          if (comment.id === commentId) {
            comment.replies.forEach(reply => {
              if (reply.voting[userId] === vote) {
                voteStatus = 0
                voteCount = -1*vote
                delete reply.voting[userId]
              } else {
                if (reply.voting[userId] !== undefined) {
                  voteCount *= 2
                }
                reply.voting[userId] = vote
              } 
            })
          }
        });
      }
    })
    this.createOrUpdateBlogPost(this.blogs.find(blog => blog.id === postId))
    return {voteStatus, voteCount}
  }
  
  async createOrUpdateBlogPost(blog: Blog) {
    const myInit = {
      body: blog,
    }
    await API.post(this.apiName, this.path, myInit)
  }
}
