import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';
import { CustomerRequest } from 'src/app/models/CustomerRequest.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: CustomerRequest[];
  constructor(private orderService: OrdersService,  private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.orderService.getOrders().subscribe((Data) => {
      this.orders = Data.map( item => {
        return{
          $key :item.key,
          ...item.payload.val()
        }
      })
      this.spinner.hide()
    })
  }

}
