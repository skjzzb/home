import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Cloth } from '../models/Cloth.model';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryList: AngularFireList<Category>

  constructor(private firebase: AngularFireDatabase) { }

  public getCategories(){
    this.categoryList = this.firebase.list('Categories');
    return this.categoryList.snapshotChanges();
  }

  public addToCart(packagedata: Cloth, pieces:number){
    console.log(packagedata)
    const user = JSON.parse(localStorage.getItem('user'));
    const price = packagedata.clothPrice * pieces

    return this.firebase.list('tempOrders/'+user.uid).push({
      clothId: packagedata.clothId,
      clothName: packagedata.clothName,
      price: price,
      pieces: pieces
    })
  }

  public getCategory(categoryId: string){
    return this.firebase.object<Category>(`Categories/${categoryId}`).snapshotChanges();
  }

  public getCloths(categoryId: string){
    return this.firebase.list<Cloth>(`Categories/${categoryId}/clothes`).snapshotChanges();
  }
  
}
