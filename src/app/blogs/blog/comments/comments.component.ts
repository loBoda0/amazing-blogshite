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
  @Input() commentId: string
  updateCommentForm: FormGroup
  postReplyForm: FormGroup
  userId: string = null
  isEditMode: boolean = false
  isReply: boolean = false
  username: string = null
  voteCount: any
  voteStatus: number

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
    this.voteCount = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    if (this.comment.voting[this.userId]) {
      this.voteStatus = this.comment.voting[this.userId]
    }
  }
  
  updateComment() {
    const body = this.updateCommentForm.value.comment
    this.blogsService.updateComment(this.blogId, this.commentId, body)
    this.toggleEditMode()
  }
  
  deleteComment() {
    this.blogsService.deleteComment(this.blogId, this.commentId)
  }
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }
  
  postReply() {
    this.blogsService.addReply(this.blogId, this.userId, this.username, this.commentId, this.postReplyForm.value.reply)
    this.clearReply()
  }
  
  clearReply() {
    console.log('form cleared')
    this.postReplyForm.reset()
  }
  
  toggleReply() {
    this.isReply = !this.isReply
    this.clearReply()
  }

  updateVote(vote) {
    const {voteStatus, voteCount} = this.blogsService.setVotes(this.blogId, this.userId, vote)
    this.voteCount += voteCount
    this.voteStatus = voteStatus
  }
}
