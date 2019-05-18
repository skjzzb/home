import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/shared/packages.service';
import { PackageData } from 'src/app/models/Package.model';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages: PackageData[];
  weight: number
  constructor(private packageService: PackagesService) { }

  ngOnInit() {
    this.packageService.getPackages().subscribe((Data) => {
      this.packages = Data.map( item => {
        return{
          $key :item.key,
          ...item.payload.val()
        }
      })
    })
  }

  addToCart(packagedata){
    this.packageService.addToCart(packagedata, this.weight);
    this.weight = 0;
  }

}
