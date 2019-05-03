import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';


@Component({
  selector: 'cdk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private token: TokenStorage,
    private loginservice: LoginService
  ) { }
  username = 'javainuse'
  password = ''
  invalidLogin = false

  
  
  
  
  checkLogin() {
    
  }
  ngOnInit() {
  }
}
