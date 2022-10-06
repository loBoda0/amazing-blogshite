import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Blog } from './blog.model';
import { BlogService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[]
  isLogedIn: boolean = false

  constructor(private blogsService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs()
    this.authService.userRegistered.subscribe(
      (value) => {
        this.isLogedIn = value
      }
    )
  }

  onLogOut() {
    this.authService.signOut()
  }
}
