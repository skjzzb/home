import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerRequest } from 'src/app/models/CustomerRequest.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderId: string;
  currentOrder = {};
  constructor(private orderService: OrdersService, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.acRoute.params.subscribe(params => {
      this.orderId = params['id']
      this.orderService.getOrder(this.orderId).subscribe((Data) => {
        this.currentOrder = Data.payload.val();
      })
    })
  }

}
