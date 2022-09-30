import { Component, OnInit } from '@angular/core';
import { BlogService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: {title: string, body: string, image?: string}[]

  constructor(private blogsService: BlogService) { }

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs()
  }
}
