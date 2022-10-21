import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogService } from './blogs/blogs.service';
import { BlogComponent } from './blogs/blog/blog.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { AuthService } from './user/auth.service';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CommentsComponent } from './blogs/blog/comments/comments.component';
import { RepliesComponent } from './blogs/blog/comments/replies/replies.component';
import { ShortenPipe } from './blogs/shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogComponent,
    CreateBlogComponent,
    EditBlogComponent,
    LoginComponent,
    SignupComponent,
    CommentsComponent,
    RepliesComponent,
    ShortenPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BlogService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
