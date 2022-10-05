import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Blog, Comment } from "./blog.model"
import { Auth } from "aws-amplify"


@Injectable()
export class BlogService {
  constructor(private http: HttpClient) {}

  private blogs: Blog[] = [
    new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Tern, white-winged",
      "Person on outside of car injured in collision with two- or three-wheeled motor vehicle in traffic accident, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Monitor, water",
      "Unspecified traumatic spondylolisthesis of third cervical vertebra",
      "https://picsum.photos/200"
    ),
      new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Woylie",
      "Complete lesion at C1 level of cervical spinal cord",
    ),
    new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Tortoise, galapagos",
      "Fracture of unspecified part of neck of femur",
      "https://picsum.photos/200"
    ),
    new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Sarus crane",
      "Acute rheumatic pericarditis"
    ),
    new Blog("4aaacf88-8723-4565-a8c0-39c92fb3d605", "Vulture, white-rumped",
      "Furuncle of umbilicus",
      "https://picsum.photos/200"
    ),
    new Blog("4aaacf88-8723-4565-a8c0-39c92fb3d605", "White-tailed deer",
      "Insect bite (nonvenomous) of right ear, initial encounter",
      "https://picsum.photos/200"
    ),
    new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Skunk, striped",
      "Corrosion of first degree of unspecified axilla, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("51c565e1-6985-40cf-bbdd-bde028c3da26", "Francolin, swainson's",
      "Toxic effect of venom of ants, accidental (unintentional), initial encounter"
    ),
    new Blog("4aaacf88-8723-4565-a8c0-39c92fb3d605", "Bahama pintail",
      "Multiple fractures of ribs",
      "https://picsum.photos/200"
    )
  ]
  
  getBlogs() {
    return this.blogs
  }

  getBlogById(id: number) {
    return this.blogs[id]
  }

  createBlog(blog: Blog) {
    this.blogs.push(blog)
    console.log(this.blogs)
    /* Auth.currentSession().then(res => {
      let jwt = res.getAccessToken().getJwtToken()
      this.http.post('https://hh5ayl145i.execute-api.eu-central-1.amazonaws.com/dev/blogs', blog , {
        headers: new HttpHeaders({'Authorization': jwt})
      })
    }) */
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
    console.log(this.blogs[id].comments)
  }

  updateComment(postId: number, commentId: number, textBody: Comment) {
    this.blogs[postId].comments[commentId] = textBody
  }

  deleteComment(postId: number, commentId: number) {
    this.blogs[postId].comments.splice(commentId, 1)
  }
}