import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { OrderData } from '../models/Order.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  tempOrders: AngularFireList<OrderData>;
  countTempOrders: Observable<OrderData[]>;
  count: Observable<number>;
  constructor(private firebase: AngularFireDatabase) { }

  getTempOrders(){
    const user = JSON.parse(localStorage.getItem('user'));
    this.tempOrders = this.firebase.list('tempOrders/'+user.uid);
    return this.tempOrders.snapshotChanges();
  }

  public getNumberOfTempOrders(){
    return this.getTempOrders().pipe(
      map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        })).length
      }));
    
  }
}
