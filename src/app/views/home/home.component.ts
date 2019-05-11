import { Component, OnInit } from '@angular/core';
require("../../../assets/js/main-slider-script.js")
require("../../../assets/js/map-script.js")

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //console.log('hi')
    loadSlider()
    MapLoadScript()
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //require("../../../assets/js/main-slider-script.js")
  }

}
