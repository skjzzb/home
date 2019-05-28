import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';
import { OrderData } from 'src/app/models/Order.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirefunctionsService } from 'src/app/shared/firefunctions.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  total:number =0;
  tempOrders: OrderData [];
  approximatedDate: Date;
  appDate: string;

  constructor(public orderService: OrdersService, private spinner: NgxSpinnerService, private fbFunction: FirefunctionsService) { }

  ngOnInit() {
    this.spinner.show();
    this.orderService.getTempOrders().subscribe((Data) => {
      this.tempOrders = Data.map( item => {
        return{
          $key :item.key,
          ...item.payload.val()
        }
      })
      this.calTotal();
      this.spinner.hide();
    })
    this.fbFunction.getDate().subscribe((Data) => {
      let numDate = parseInt(Data["Days"]);
      this.approximatedDate = new Date(new Date().getTime()+ (numDate * 24 * 60 * 60 * 1000));
      this.appDate = this.formatDate(this.approximatedDate);
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

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
