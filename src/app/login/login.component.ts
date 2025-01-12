import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  // userLogin!: FormGroup;
  value!: string;

  constructor(private fb: FormBuilder, private router: Router) {
    // Define form structure and validation
    // this.loginForm = this.fb.group({
    //   username: [''],
    //   password: [''],
    // });
    // console.log(this.loginForm);
  }
  ngOnInit(): void {
    // this.userLogin = this.fb.group({
    //   username: ['', [Validators.required]],
    //   password: ['', [Validators.required, Validators.minLength(4)]],
    // });
  }

  onLogin() {
    // this.router.navigate(['./products']);
  }
}
