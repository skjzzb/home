import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private firebase: AngularFireDatabase) { }

  public saveDriver(name:string, email: string, phone:string){
    this.firebase.list('PendingDrivers').push({
      name: name,
      email: email,
      phone: phone
    })
  }
}
