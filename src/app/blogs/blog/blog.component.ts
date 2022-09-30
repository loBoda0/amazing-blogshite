import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../blogs.service';
import { Blog } from '../blog.model';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog
  id: number
  isLogedIn: boolean = false

  constructor(private blogsService: BlogService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.blog = this.blogsService.getBlogById(this.id)
        }
      )
    this.isLogedIn = this.authService.getLogin()
  }

  deletePost() {
    this.blogsService.deleteBlogPost(this.id)
    this.router.navigate(['/'])
  }
}
