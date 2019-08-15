import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/shared/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private driverService: DriverService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  save(name: string, email: string, phone: string){
    this.driverService.saveDriver(name, email, phone);
    this.toastr.success('We will contact you ASAP', 'Registration Successfull');
  }

}
