import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Customer } from 'src/app/models/Customer.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer: Customer

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.customer = this.authService.customerData
    console.log(this.customer)
  }

}
