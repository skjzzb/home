import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  orderCount:number;
  constructor(public authService: AuthService, public orderService: OrdersService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    var user = JSON.parse(localStorage.getItem('user'))
    if(user){
      this.orderService.getNumberOfTempOrders().subscribe((Data) => {
        this.orderCount = Data
        this.spinner.hide();
      });
    }
    this.spinner.hide();
  }

}
