import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  logInForm: FormGroup
  formState: string
  errorMessage: string = null
  sub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    })
    this.sub = this.authService.formState.subscribe(
      (value) => {
        if (value === 'registered') {
          this.router.navigate(['..'])
        }
        this.formState = value
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  async onSubmit() {
    const username = this.logInForm.value.username
    const password = this.logInForm.value.password
    const { error } = await this.authService.logIn(username, password)
    this.errorMessage = error
  }
}
