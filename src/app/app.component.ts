import { Component } from '@angular/core';
import { BlogService } from './blogs/blogs.service';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amazing-blogshite';

  constructor(private blogsService: BlogService, private authService: AuthService) {
    if (localStorage.getItem("userCredentials")) {
      let {username, password} = JSON.parse(localStorage.getItem("userCredentials"))
      this.authService.logIn(username, password)
    }
    this.blogsService.setBlogs()
  }
}
