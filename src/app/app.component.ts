import { Component } from '@angular/core';
import { BlogService } from './blogs/blogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amazing-blogshite';

  constructor(private blogsService: BlogService) {
    
    this.blogsService.setBlogs()
  }
}
