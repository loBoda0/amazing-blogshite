import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  blog: Blog
  blogTitle = ''
  blogBody = ''
  blogImage = ''

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  storeData() {
    this.blog = new Blog(this.blogTitle, this.blogBody, this.blogImage)
    console.log(this.blog)
    this.blogService.createBlog(this.blog)
  }
}
