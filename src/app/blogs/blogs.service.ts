import { Injectable } from "@angular/core"
import { Blog, Comment } from "./blog.model"
import { API } from "aws-amplify"
import { BehaviorSubject } from "rxjs"


@Injectable()
export class BlogService {
  apiName = 'blogsApi'
  path = '/blogs'
  /* blogs = new BehaviorSubject<Blog[]>([]) */

  private blogs: Blog[] = [
    new Blog("64552671-d0ae-4f04-9479-1190e737c1ee", "Tern, white-winged",
      "Person on outside of car injured in collision with two- or three-wheeled motor vehicle in traffic accident, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("64552671-d0ae-4f04-9479-1190e737c1ee", "Monitor, water",
      "Unspecified traumatic spondylolisthesis of third cervical vertebra",
      "https://picsum.photos/200"
    ),
      new Blog("64552671-d0ae-4f04-9479-1190e737c1ee", "Woylie",
      "Complete lesion at C1 level of cervical spinal cord",
    ),
    new Blog("64552671-d0ae-4f04-9479-1190e737c1ee", "Tortoise, galapagos",
      "Fracture of unspecified part of neck of femur",
      "https://picsum.photos/200"
    ),
    new Blog("64552671-d0ae-4f04-9479-1190e737c1ee", "Sarus crane",
      "Acute rheumatic pericarditis"
    ),
    new Blog("5e7b9ab6-7d56-41e0-a9bb-fd077b669117", "Vulture, white-rumped",
      "Furuncle of umbilicus",
      "https://picsum.photos/200"
    ),
    new Blog("5e7b9ab6-7d56-41e0-a9bb-fd077b669117", "White-tailed deer",
      "Insect bite (nonvenomous) of right ear, initial encounter",
      "https://picsum.photos/200"
    ),
    new Blog("5e7b9ab6-7d56-41e0-a9bb-fd077b669117", "Skunk, striped",
      "Corrosion of first degree of unspecified axilla, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("5e7b9ab6-7d56-41e0-a9bb-fd077b669117", "Francolin, swainson's",
      "Toxic effect of venom of ants, accidental (unintentional), initial encounter"
    ),
    new Blog("5e7b9ab6-7d56-41e0-a9bb-fd077b669117", "Bahama pintail",
      "Multiple fractures of ribs",
      "https://picsum.photos/200"
    )
  ]
  
  /* async getBlogs() {
    const data = await API.get(this.apiName, this.path, {})
    console.log(data)
    return this.blogs
  } */

  getBlogs() {
    return this.blogs
  }

  getBlogById(id: number) {
    return this.blogs[id]
  }

  async createBlog(blog: Blog) {
    this.blogs.push(blog)
    const myInit = {
      body: blog
    }
    console.log(myInit)
    await API.post(this.apiName, this.path, myInit)
  }
  
  updateBlogPost(id: number, blog: Blog) {
    this.blogs[id] = blog;
  }
  
  deleteBlogPost(id: number) {
    this.blogs.splice(id, 1)
  }

  addComment(id: number, body: string, userId: string) {
    const comment = new Comment(userId, body)
    this.blogs[id].comments.push(comment)
  }

  updateComment(postId: number, commentId: number, textBody: string) {
    this.blogs[postId].comments[commentId].commentBody = textBody
  }

  deleteComment(postId: number, commentId: number) {
    this.blogs[postId].comments.splice(commentId, 1)
  }
}