import { Blog } from "./blog.model"

export class BlogService {
  private blogs: Blog[] = [
    new Blog("Tern, white-winged",
      "Person on outside of car injured in collision with two- or three-wheeled motor vehicle in traffic accident, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("Monitor, water",
      "Unspecified traumatic spondylolisthesis of third cervical vertebra",
      "https://picsum.photos/200"
    ),
      new Blog("Woylie",
      "Complete lesion at C1 level of cervical spinal cord",
    ),
    new Blog("Tortoise, galapagos",
      "Fracture of unspecified part of neck of femur",
      "https://picsum.photos/200"
    ),
    new Blog("Sarus crane",
      "Acute rheumatic pericarditis"
    ),
    new Blog("Vulture, white-rumped",
      "Furuncle of umbilicus",
      "https://picsum.photos/200"
    ),
    new Blog("White-tailed deer",
      "Insect bite (nonvenomous) of right ear, initial encounter",
      "https://picsum.photos/200"
    ),
    new Blog("Skunk, striped",
      "Corrosion of first degree of unspecified axilla, subsequent encounter",
      "https://picsum.photos/200"
    ),
    new Blog("Francolin, swainson's",
      "Toxic effect of venom of ants, accidental (unintentional), initial encounter"
    ),
    new Blog("Bahama pintail",
      "Multiple fractures of ribs",
      "https://picsum.photos/200"
    )
  ]
  
  getBlogs() {
    return this.blogs.slice()
  }

  getBlogById(id: number) {
    return this.blogs[id]
  }

  createBlog(blog: Blog) {
    this.blogs.push(blog)
    console.log(this.blogs)
  }
}