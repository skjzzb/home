import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { Cloth } from 'src/app/models/Cloth.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/Category.model';
import { ClothsComponent } from 'src/app/views/packages/cloths/cloths.component'

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  @ViewChild(ClothsComponent) clothChild: ClothsComponent

  categories: Category[];
  currentCategory: Category
  weight: number = 0;
  constructor(private categoryService: CategoryService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.categoryService.getCategories().subscribe((Data) => {
      this.categories = Data.map( item => {
        return{
          $key :item.key,
          ...item.payload.val()
        }
      })
      if(this.categories.length>0){
        this.currentCategory = this.categories[0]
        // console.log(this.currentCategory)
      }
      console.log(this.categories)
      this.spinner.hide()
    })
  }

  changeCategory(category){
    this.currentCategory = category
    this.clothChild.changeCategory(category)
  }

}
