import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { closeWindow } from '../../assets/js/closeModal'
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public customerData: any;
  public loginError: string;
  public signupError: string;

  constructor(private afAuth: AngularFireAuth, public ngZone:NgZone, public router:Router, private firebase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.customerData = user;
        localStorage.setItem('user',JSON.stringify(this.customerData))
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user',null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signin(email,password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['profile'])
      })
      this.updateUserData(result.user);
    }).catch((err) => {
      this.loginError = err
    })
  }

  signup(email,password,phone){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((result) => {
      this.sendVerificationMail();
      this.setUserData(result.user,phone)
    }).catch((err) => {
      this.signupError = err
      console.log(err)
      //window.alert(err.message)
    })
  }

  sendVerificationMail(){
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-password'])
    })
  }

  forgotPassword(passwordResetEmail){
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      window.alert('Password Reset Mail has send. Please check your inbox')
    }).catch((err) => {
      window.alert(err)
    })
  }

  GoogleAuth(){
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth(){
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  TwitterAuth(){
    return this.authLogin(new auth.TwitterAuthProvider());
  }

  authLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider).then((result) => {
      this.ngZone.run(() => {
        closeWindow()
        this.router.navigate(['profile'])
      })
      this.updateUserData(result.user)
    }).catch((err) => {
      window.alert(err)
    })
  }

  setUserData(user, phone){
    const userRef:AngularFireObject<Customer> = this.firebase.object<Customer>('RidersInformation/'+user.uid);
    const customerData: Customer = {
      email: user.email,
      name: user.displayName,
      avatarUrl: user.photoURL,
      phone: phone,
      rates: 0,
      emailVerified: user.emailVerified
    }
    return userRef.set(customerData)
  }

  updateUserData(user){
    const userRef:AngularFireObject<Customer> = this.firebase.object<Customer>('RidersInformation/'+user.uid);
    const customerData = {
      email: user.email,
      name: user.displayName,
      avatarUrl: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.update(customerData)
  }

  signout(){
    return this.afAuth.auth.signOut().then(() => {
      this.customerData = null
      localStorage.removeItem('user');
      this.router.navigate(['home'])
    })
  }

  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return(user!==null && user.emailVerified!==false)? true:false;
  }

}
