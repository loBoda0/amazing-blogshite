import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogService } from './blogs/blogs.service';
import { BlogComponent } from './blogs/blog/blog.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogComponent,
    CreateBlogComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
