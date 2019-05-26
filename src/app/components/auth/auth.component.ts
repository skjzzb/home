import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { closeWindow } from '../../../assets/js/closeModal.js'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email: string;
  password: string;
  phoneNumber: string;
  hasLoginError: boolean;
  hasSignupError: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signin(){
    this.authService.signin(this.email,this.password).then(() => {
      if(this.authService.loginError){
        this.hasLoginError = true
      }else{
        closeWindow()
      }
    })
  }

  signup(){
    this.authService.signup(this.email, this.password, this.phoneNumber).then(() => {
      if(this.authService.signupError){
        this.hasSignupError = true
      }else{
        closeWindow()
      }
    })
  }

}
