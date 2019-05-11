import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  customerData: any;
  currentCustomer: Observable<Customer>;
  customer:Customer;

  constructor(private afAuth: AngularFireAuth) {
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
}
