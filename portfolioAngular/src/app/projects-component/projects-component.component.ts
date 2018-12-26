import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'projects-component' ,
  templateUrl: './projects-component.component.html',
  styleUrls: ['./projects-component.component.css'],
  providers: [NgbCarouselConfig]
})
export class ProjectsComponentComponent implements OnInit {
  
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
   }
   CarouselData = [
     {
        "image": "./src/assets/angular.png",
        "label" : "iOS Projects",
        "desc" : "projects",
     },
     {
      "image": "./src/assets/ios.jpg",
      "label" : "FrontEnd Projects",
      "desc" : "projects",
     },
     {
        "image": "./src/assets/fe.png",
        "label" : "Tavisca Projects",
        "desc" : "projects",
     }
   ]
   images = []
  ngOnInit () {
    this.images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  }

}
