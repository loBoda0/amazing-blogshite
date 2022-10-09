import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../blogs.service';
import { Blog } from '../blog.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  editBlogForm: FormGroup
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
    this.editBlogForm = new FormGroup({
      'title': new FormControl(this.blog.title, Validators.required),
      'body': new FormControl(this.blog.body, Validators.required),
      'image': new FormControl(this.blog.image)
    })
  }

  updateBlog() {
    const {title, body, image } = this.editBlogForm.value
    this.blog.title = title
    this.blog.body = body
    this.blog.image = image
    this.blogService.updateBlogPost(this.id, this.blog)
    this.router.navigate(['/'])
  }
}
