import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { BlogService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: {title: string, body: string, image?: string}[]
  isLogedIn: boolean = false

  constructor(private blogsService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs()
  }

  changeLogin() {
    this.authService.setLogin()
    this.isLogedIn = this.authService.getLogin()
  }
}
