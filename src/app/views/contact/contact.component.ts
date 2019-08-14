import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
require("../../../assets/js/map-script.js")

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  firstName: string
  lastName: string
  email: string
  message: string

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  sendMail(){
    console.log('asdasdasdsadsada')
    let quertyString = 'https://us-central1-picknwash-56236.cloudfunctions.net/sendMail?email='
                        +this.email+'&message='+this.message+'&subject=message from pick and wash web&name='
                        +this.firstName+' '+this.lastName
    this.httpClient.get(quertyString).subscribe((response)=>{
      alert(response["message"])
    })
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.message = ''
  }
}
