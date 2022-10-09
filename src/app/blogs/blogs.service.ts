import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Blog, Comment } from "./blog.model"
import { Auth } from "aws-amplify"


@Injectable()
export class BlogService {
  constructor(private http: HttpClient) {}

  private blogs: Blog[] = [
    new Blog("6971ae53-074c-4f08-a0e9-28672d10746a", "Tern, white-winged",
      "Person on outside of car injured in collision with two- or three-wheeled motor vehicle in traffic accident, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("6971ae53-074c-4f08-a0e9-28672d10746a", "Monitor, water",
      "Unspecified traumatic spondylolisthesis of third cervical vertebra",
      "https://picsum.photos/200"
    ),
      new Blog("6971ae53-074c-4f08-a0e9-28672d10746a", "Woylie",
      "Complete lesion at C1 level of cervical spinal cord",
    ),
    new Blog("6971ae53-074c-4f08-a0e9-28672d10746a", "Tortoise, galapagos",
      "Fracture of unspecified part of neck of femur",
      "https://picsum.photos/200"
    ),
    new Blog("6971ae53-074c-4f08-a0e9-28672d10746a", "Sarus crane",
      "Acute rheumatic pericarditis"
    ),
    new Blog("619cfb57-58ba-42a4-84a2-3337b1352f51", "Vulture, white-rumped",
      "Furuncle of umbilicus",
      "https://picsum.photos/200"
    ),
    new Blog("619cfb57-58ba-42a4-84a2-3337b1352f51", "White-tailed deer",
      "Insect bite (nonvenomous) of right ear, initial encounter",
      "https://picsum.photos/200"
    ),
    new Blog("619cfb57-58ba-42a4-84a2-3337b1352f51", "Skunk, striped",
      "Corrosion of first degree of unspecified axilla, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("619cfb57-58ba-42a4-84a2-3337b1352f51", "Francolin, swainson's",
      "Toxic effect of venom of ants, accidental (unintentional), initial encounter"
    ),
    new Blog("619cfb57-58ba-42a4-84a2-3337b1352f51", "Bahama pintail",
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
  }

  updateComment(postId: number, commentId: number, textBody: string) {
    this.blogs[postId].comments[commentId].commentBody = textBody
  }

  deleteComment(postId: number, commentId: number) {
    this.blogs[postId].comments.splice(commentId, 1)
  }
}