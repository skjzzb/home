import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';
import { OrderData } from 'src/app/models/Order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  total:number =0;
  tempOrders: OrderData [];
  constructor(public orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getTempOrders().subscribe((Data) => {
      this.tempOrders = Data.map( item => {
        return{
          $key :item.key,
          ...item.payload.val()
        }
      })
      this.calTotal();
    })
  }

  calTotal(){
    this.total = 0;
    this.tempOrders.forEach((element) => {
      this.total+=element.price
    })
  }

  removeItem(orderId: string){
    this.orderService.removeTempOrder(orderId);
  }

}
