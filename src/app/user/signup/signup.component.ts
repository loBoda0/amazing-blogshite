import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup
  formState: string
  sub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'verificationCode': new FormControl(null)
    })
    this.sub = this.authService.formState.subscribe(
      (value) => {
        if (value === 'accVerified') {
          this.router.navigate(['..'])
        }
        this.formState = value
      }
    )
  }

  onSubmit() {
    const username = this.signUpForm.value.username
    const password = this.signUpForm.value.password
    const email = this.signUpForm.value.email
    const verificationCode = this.signUpForm.value.verificationCode
    if (this.formState === 'signUp' ) {
      this.authService.signUp(username, password, email)
    } else if (this.formState === 'confirmSignUp') {
      this.authService.confirmSignUp(username, verificationCode)
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
