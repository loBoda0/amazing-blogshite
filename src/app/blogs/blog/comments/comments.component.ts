import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../blog.model';
import { BlogService } from '../../blogs.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comment: Comment
  @Input() userId: string
  @Input() blogId: number
  @Input('commentIdx') idx: number
  updateCommentForm: FormGroup
  isEditMode: boolean = false

  constructor(private blogsService: BlogService) { }

  ngOnInit(): void {
    this.updateCommentForm = new FormGroup({
      'comment': new FormControl(this.comment.commentBody, Validators.required)
    })
  }
  
  updateComment() {
    const body = this.updateCommentForm.value.comment
    this.blogsService.updateComment(this.blogId, this.idx, body)
    this.toggleEditMode()
  }
  
  deleteComment() {
    console.log(this.idx)
    this.blogsService.deleteComment(this.blogId, this.idx)
  }
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }
}
