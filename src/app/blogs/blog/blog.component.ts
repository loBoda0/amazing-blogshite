import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { BlogService } from '../blogs.service'
import { Blog } from '../blog.model'
import { AuthService } from 'src/app/user/auth.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blog: Blog
  blogId: string
  message: string = ''
  userId: string = null
  username: string = null

  constructor(
    private blogsService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.blogId = params['id']
      this.blog = this.blogsService.getBlogById(this.blogId)
    })
    this.authService.userId.subscribe((value) => {
      this.userId = value
    })
    this.authService.username.subscribe((value) => {
      this.username = value
    })
  }

  postComment() {
    if (this.message !== '') {
      this.blogsService.addComment(this.blogId, this.username, this.message, this.userId)
      this.clearComment()
    }
  }

  clearComment() {
    this.message = ''
  }

  deletePost() {
    this.blogsService.deleteBlogPost(this.blogId)
    this.router.navigate(['/'])
  }
}
