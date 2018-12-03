import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
  // ...
} from '@angular/animations';



@Component({
  selector: 'timeline-component',
  templateUrl: './timeline-component.component.html',
  styleUrls: ['./timeline-component.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query(':self, .logo > *, .viking', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('50000ms ease-out', style({ opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class TimelineComponentComponent implements OnInit {

 timelineContent = [
    {date: "1998",
     work: "Born",
     workDesc: "Born on 5th Feb, 1998 in Chandigarh, India",
     logo: "../src/assets/baby.png"
    },
    {date: "2015-2019",
    work: "Bache",
    workDesc: "Hey there",
    logo: "../src/assets/chitkara.png"
    },
    {date: "2015",
     work: "Born",
    workDesc: "Hey there",
    logo: "../src/assets/chitkara.png"
    }
  ]
  constructor() {
    
   }

  
  ngOnInit() {
  }

}
