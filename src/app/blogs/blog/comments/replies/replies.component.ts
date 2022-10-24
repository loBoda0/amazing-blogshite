import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/blogs/blog.model';
import { BlogService } from 'src/app/blogs/blogs.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {
  @Input() reply: Comment
  @Input() blogId: string
  @Input() commentId: string
  updateReplyForm: FormGroup
  username: string
  userId: string
  isEditMode: boolean = false
  voteCount: number
  voteStatus: number

  constructor(private blogsService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userId.subscribe((value) => {
      this.userId = value
    })
    this.authService.username.subscribe((value) => {
      this.username = value
    })
    this.updateReplyForm = new FormGroup({
      reply: new FormControl(this.reply.commentBody, Validators.required)
    })
    let values: number[] = Object.values(this.reply.voting)
    this.voteCount = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    if (this.reply.voting[this.userId]) {
      this.voteStatus = this.reply.voting[this.userId]
    }
  }

  deleteReply(replyId: string) {
    this.blogsService.removeReply(this.blogId, this.commentId, replyId)
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }

  updateReply() {
    const body = this.updateReplyForm.value.reply
    this.blogsService.updateReply(this.blogId, this.commentId, this.reply.id, body)
    this.toggleEditMode()
  }

  updateVote(vote: number) {
    const {voteStatus, voteCount} = this.blogsService.setReplyVotes(this.blogId, this.commentId, this.reply.id, this.userId, vote)
    this.voteCount += voteCount
    this.voteStatus = voteStatus
  }
}
