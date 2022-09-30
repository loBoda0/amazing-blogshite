import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../blogs.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blog: Blog
  id: number

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.blog = this.blogService.getBlogById(this.id)
      }
    )
  }

  updateBlog() {
    this.blogService.updateBlogPost(this.id, this.blog)
    this.router.navigate(['/'])
  }
}
