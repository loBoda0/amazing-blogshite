import { Component, OnInit } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { Blog } from './blog.model'
import { BlogService } from './blogs.service'

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = []
  isLogedIn: boolean = false

  constructor(
    private blogsService: BlogService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.blogsService.updatedBlogs.subscribe((blogs) => {
      this.blogs.push(...blogs)
    })
    this.authService.userRegistered.subscribe((value) => {
      this.isLogedIn = value
    })
    this.blogs = this.blogsService.getBlogs()
  }

  onLogOut() {
    this.authService.signOut()
  }
}
