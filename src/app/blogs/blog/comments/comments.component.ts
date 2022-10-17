import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/user/auth.service';
import { Comment } from '../../blog.model';
import { BlogService } from '../../blogs.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comment: Comment
  @Input() blogId: string
  @Input('commentIdx') idx: string
  userId: string = null
  updateCommentForm: FormGroup
  postReplyForm: FormGroup
  isEditMode: boolean = false
  isReply: boolean = false
  username: string = null
  voteCount: any

  constructor(private blogsService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.updateCommentForm = new FormGroup({
      'comment': new FormControl(this.comment.commentBody, Validators.required)
    })
    this.postReplyForm = new FormGroup({
      'reply': new FormControl(null, Validators.required)
    })
    this.authService.userId.subscribe((value) => {
      this.userId = value
    })
    this.authService.username.subscribe((value) => {
      this.username = value
    })
    let values: number[] = Object.values(this.comment.voting)
    /* let sum = 0
    this.comment.voting.forEach(element => {
      
    });*/
    this.voteCount = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    /* this.voteCount = Object.values(this.comment.voting).reduce((sum, current) => sum + current) */
  }
  
  updateComment() {
    const body = this.updateCommentForm.value.comment
    this.blogsService.updateComment(this.blogId, this.idx, body)
    this.toggleEditMode()
  }
  
  deleteComment() {
    this.blogsService.deleteComment(this.blogId, this.idx)
  }
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }

  postReply() {
    this.blogsService.addReply(this.blogId, this.userId, this.username, this.idx, this.postReplyForm.value.reply)
  }

  deleteReply(replyId) {
    this.blogsService.removeReply(this.blogId, this.idx, replyId)
  }

  toggleReply() {
    this.isReply = !this.isReply
  }

  updateVote(vote) {
    this.voteCount = this.blogsService.setVotes(this.blogId, this.idx, this.userId, vote)
  }
}
