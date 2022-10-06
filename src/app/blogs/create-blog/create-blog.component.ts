import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  newBlogPost: FormGroup
  userId: string = ''

  constructor(private blogService: BlogService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.userId.subscribe(
      (value) => {
        this.userId = value
      }
    )
    this.newBlogPost = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'body': new FormControl(null, Validators.required),
      'image': new FormControl(null),
    })
  }

  createBlog() {
    const { title,body, image } = this.newBlogPost.value
    const blog = new Blog(this.userId, title, body, image)
    this.blogService.createBlog(blog)
    this.router.navigate(['/'])
  }
}
