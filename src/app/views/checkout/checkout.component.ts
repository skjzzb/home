import { Component, OnInit } from '@angular/core';
import {CustomerRequest} from '../../models/CustomerRequest.model'
import { OrdersService } from 'src/app/shared/orders.service';
import { OrderData } from 'src/app/models/Order.model';
import { Router } from '@angular/router';
import { FirefunctionsService } from 'src/app/shared/firefunctions.service';

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
  tempOrders: OrderData [];
  total: number = 0;
  pieces: number =0;
  pickupDate: string;

  constructor(private orderService: OrdersService, private router: Router, private fbFunction: FirefunctionsService) { }

  ngOnInit() { 
    this.orderService.getTempOrders().subscribe((Data) => {
      this.tempOrders = Data.map( item => {
        return{
          $key :item.key,
          ...item.payload.val()
        }
      })
      if(this.tempOrders.length==0){
        this.router.navigate(['packages'])
      }
      this.calTotal();
    })
    this.fbFunction.getDate().subscribe((Data) => {
      console.log(Data)
    })
  }

  handlePickupChange(event){
    this.pickupLocation = event.geometry.location.lat()+","+event.geometry.location.lng();
  }

  handleDropoffChange(event){
    this.dropoffLocation = event.geometry.location.lat()+","+event.geometry.location.lng();
  }

  proceedOrder(pickupDate: string){
    var user = JSON.parse(localStorage.getItem('user'))
    var today = this.getTodayDate()
    var time = this.getTime();
    var pDate = this.getPickupTime(pickupDate,0);
    var pTime = this.getPickupTime(pickupDate,1);
    // console.log(pDate+'>'+pTime)

    var customeReq: CustomerRequest = {
      currentTime: '',
      customerEmail: user.email,
      orderPlacedDate: today,
      driverEmail: "",
      dropOffLocation: this.dropoffLocation,
      order: null,
      pickupLocation: this.pickupLocation,
      status: 1,
      orderPlacedTime: time,
      totalPrice: this.total.toString(),
      totalItems: this.pieces.toString(),
      scheduledDate: pDate,
    }

    this.orderService.saveOrder(customeReq, this.tempOrders);

  }

  getTodayDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var year = today.getFullYear();

    return year+"/"+mm+"/"+dd;
  }

  getTime(){
    var today = new Date();
    return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }

  calTotal(){
    this.total = 0;
    this.pieces = 0;
    this.tempOrders.forEach((element) => {
      this.total +=element.price
      this.pieces += parseFloat(element.pieces.toString())
      // console.log(this.weight+" "+element.weight)
    })
  }

  getPickupTime(pickupTime: string, index: number){
    var pDate = pickupTime.split(',');
    return pDate[index];
  }

}
