import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  options = {
    types: [],
    componentRestrictions: { country: 'LK' }
  }

  pickupLocation = "";
  dropoffLocation = "";

  constructor() { }

  ngOnInit() {  }

  handlePickupChange(event){
    this.pickupLocation = event.geometry.location.lat()+","+event.geometry.location.lng();
  }

  handleDropoffChange(event){
    this.dropoffLocation = event.geometry.location.lat()+","+event.geometry.location.lng();
  }
}
