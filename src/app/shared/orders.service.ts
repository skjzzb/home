import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { OrderData } from '../models/Order.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { CustomerRequest } from '../models/CustomerRequest.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  tempOrders: AngularFireList<OrderData>;
  orders: AngularFireList<CustomerRequest>
  countTempOrders: Observable<OrderData[]>;
  count: Observable<number>;
  constructor(private firebase: AngularFireDatabase, private toastr: ToastrService, private router: Router) { }

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

  public removeTempOrder(orderId){
    const user = JSON.parse(localStorage.getItem('user'));
    return this.firebase.object('tempOrders/'+user.uid+"/"+orderId).remove();
  }

  public saveOrder(order: CustomerRequest, tempOrderData: OrderData[]){
    var timestamp = new Date().getTime();
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user.uid +'>' +timestamp)
    this.firebase.object('CustomerRequests/'+user.uid+'/'+timestamp).set(order);
    var count = 0
    tempOrderData.forEach((element) => {
      var tempOrder:OrderData = {
        clothId: element.clothId,
        clothName: element.clothName,
        price: element.price,
        weight: element.weight
      }
      this.firebase.object('CustomerRequests/'+user.uid+'/'+timestamp+'/order/'+count).set(tempOrder);
      count++
    })
    this.firebase.object('tempOrders/'+user.uid).remove()
    this.showSuccess()
    this.router.navigate(['orders']);
  }

  showSuccess(){
    this.toastr.success('Check my Order for more details', 'OrderPlaced');
  }

  getOrders(){
    const user = JSON.parse(localStorage.getItem('user'));
    this.orders = this.firebase.list('CustomerRequests/'+user.uid);
    return this.orders.snapshotChanges();
  }

  getOrder(id: string){
    const user = JSON.parse(localStorage.getItem('user'));
    return this.firebase.object<CustomerRequest>('CustomerRequests/'+user.uid+'/'+id).snapshotChanges();
  }
}
