import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { PackageData } from '../models/Package.model';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  packageList: AngularFireList<PackageData>

  constructor(private firebase: AngularFireDatabase) { }

  public getPackages(){
    this.packageList = this.firebase.list('Clothes');
    return this.packageList.snapshotChanges();
  }

  public addToCart(packagedata: PackageData, Weight:number){
    const user = JSON.parse(localStorage.getItem('user'));
    const price = packagedata.clothPrice * Weight

    return this.firebase.list('tempOrders/'+user.uid).push({
      clothId: packagedata.clothId,
      clothName: packagedata.clothName,
      price: price,
      weight: Weight
    })
  }
}
