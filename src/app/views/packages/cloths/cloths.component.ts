import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { Cloth } from 'src/app/models/Cloth.model';

@Component({
  selector: 'app-cloths',
  templateUrl: './cloths.component.html',
  styleUrls: ['./cloths.component.css']
})
export class ClothsComponent implements OnInit {

  @Input() category: string
  currentCategory: Category
  clothes=[];
  pieces: number = 0;

  constructor(public categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCloths(this.category).subscribe((Data)=>{
      this.clothes = []
      Data.forEach((cloth)=>{
        this.clothes.push(cloth.payload.val())
      })
      console.log(this.clothes)
    })
  }

  changeCategory(category){
    this.categoryService.getCloths(category.$key).subscribe((Data)=>{
      this.clothes = []
      Data.forEach((cloth)=>{
        this.clothes.push(cloth.payload.val())
      })
    })
  }

  addToCart(packagedata){
    if(this.pieces!=0){
      this.categoryService.addToCart(packagedata, this.pieces);
      this.pieces = 0;
    }
  }

}
