import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  blog: Blog
  userId: string = ''
  blogTitle = ''
  blogBody = ''
  blogImage = ''

  constructor(private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userId.subscribe(
      (value) => {
        this.userId = value
      }
    )
  }

  storeData() {
    this.blog = new Blog(this.userId, this.blogTitle, this.blogBody, this.blogImage)
    this.blogService.createBlog(this.blog)
  }
}
