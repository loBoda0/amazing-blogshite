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
  isLogedIn: boolean = false
  userId: string = ''

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
    this.authService.userRegistered.subscribe((value) => {
      this.isLogedIn = value
    })
    this.authService.userId.subscribe((value) => {
      this.userId = value
    })
  }

  postComment() {
    this.blogsService.addComment(this.blogId, this.message, this.userId)
  }

  deletePost() {
    this.blogsService.deleteBlogPost(this.blogId)
    this.router.navigate(['/'])
  }
}
