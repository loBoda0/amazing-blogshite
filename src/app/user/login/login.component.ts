import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup
  formState: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    })
    this.authService.formState.subscribe(
      (value) => {
        if (value === 'confirmSignUp') {
          this.router.navigate(['..'])
        }
        this.formState = value
      }
    )
  }

  onSubmit() {
    const username = this.logInForm.value.username
    const password = this.logInForm.value.password
    this.authService.logIn(username, password)
  }
}
