import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../blogs.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog
  id: number

  constructor(private blogsService: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.blog = this.blogsService.getBlogById(this.id)
        }
      )
  }

  deletePost() {
    this.blogsService.deleteBlogPost(this.id)
    this.router.navigate(['/'])
  }
}
