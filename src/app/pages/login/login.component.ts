import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.serv';
import { Employee } from '../../types/employee.type';
import { AuthService } from '../../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginWrong: boolean;
  isSubmited: boolean;
  message: string;
  loginForm: FormGroup;
  noConnection: boolean;

  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder, private session: SessionService) {
    this.loginForm = fb.group({
      username: ['contribuyente', Validators.required],
      password: ['contribuyente', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLogin() {
    let emp: Employee;
    if (this.loginForm.get('username').value === 'contribuyente') {
      emp = {
        name: this.loginForm.get('username').value,
        role: {
          name: 'contribuyente'
        }
      };
    } else {
      emp = {
        name: this.loginForm.get('username').value,
        role: {
          name: 'contador'
        }
      };
    }
    this.auth.loginSuccess(emp, '');
    this.router.navigate(['/inicio']);
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      if (this.loginForm.valid) {
        this.onLogin();
      }
    }
  }

}// class
