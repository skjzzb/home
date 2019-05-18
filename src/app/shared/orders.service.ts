import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  tempOrders=[];
  constructor(private firebase: AngularFireDatabase) { }

  getTempOrders(){

  }
}
