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

  notFinished = {
    'background-color': '#F5998E'
  }

  finsihed = {
    'background-color' : '#98D091'
  }

  styles:[{},{},{},{},{}];
  orderId: string;
  currentOrder:CustomerRequest;
  constructor(private orderService: OrdersService, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.acRoute.params.subscribe(params => {
      this.orderId = params['id']
      this.orderService.getOrder(this.orderId).subscribe((Data) => {
        this.currentOrder = Data.payload.val();
        this.setStyle()
      })
    })
    this.styles = [this.notFinished, this.notFinished, this.notFinished, this.notFinished, this.notFinished]
  }

  setStyle(){
    if(this.currentOrder.status == "Pickedup"){
      this.styles[0] = this.finsihed;
    }else if(this.currentOrder.status == "Onqueue"){
      this.styles[0] = this.finsihed;
      this.styles[1] = this.finsihed;
    }else if(this.currentOrder.status == "Cleaning"){
      this.styles[0] = this.finsihed;
      this.styles[1] = this.finsihed;
      this.styles[2] = this.finsihed;
    }else if(this.currentOrder.status == "Cleaned" || this.currentOrder.status == "Delivering"){
      this.styles[0] = this.finsihed;
      this.styles[1] = this.finsihed;
      this.styles[2] = this.finsihed;
      this.styles[3] = this.finsihed;
    }else if(this.currentOrder.status == "Finished"){
      this.styles[0] = this.finsihed;
      this.styles[1] = this.finsihed;
      this.styles[2] = this.finsihed;
      this.styles[3] = this.finsihed;
      this.styles[4] = this.finsihed;
    }
    // console.log(this.styles)
  }

}
