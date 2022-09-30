import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "./blogs/blog/blog.component";

import { BlogsComponent } from "./blogs/blogs.component";
import { CreateBlogComponent } from "./blogs/create-blog/create-blog.component";
import { EditBlogComponent } from "./blogs/edit-blog/edit-blog.component";

const appRoutes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'new', component: CreateBlogComponent },
  { path: ':id', component: BlogComponent },
  { path: ':id/edit', component: EditBlogComponent },
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}