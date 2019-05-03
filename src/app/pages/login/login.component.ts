import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': '',
    'incorrecrpassword':''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService) {
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [Validators.required]
      ],
      'password': ['',[Validators.required]],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }

  invalidLogin = false

 
  


  login() {
   
    this.loginService.authenticate(this.userForm.value.email, this.userForm.value.password).subscribe(data => {
      console.dir(data);
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.router.navigate(['dashboard']);
    }, error => { 
        alert(error.error.error_description)
    });
   
    
  }

  logout() {
      this.loginService.logout();
 }
} 

