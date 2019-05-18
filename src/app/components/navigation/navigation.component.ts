import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  orderCount:number;
  constructor(public authService: AuthService, public orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getNumberOfTempOrders().subscribe((Data) => {
      this.orderCount = Data
    });
  }

}
