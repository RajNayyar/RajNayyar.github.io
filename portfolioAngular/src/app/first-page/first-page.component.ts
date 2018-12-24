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
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query(':self', [
          style({ opacity: 0 }),
            animate('5000ms ease-out', style({ opacity: 1 }))
     
        ])
      ])
    ])
  ]
})
export class FirstPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
