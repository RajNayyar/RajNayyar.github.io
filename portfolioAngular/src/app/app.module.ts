import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { TimelineComponentComponent } from './timeline-component/timeline-component.component';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { AboutComponentComponent } from './about-component/about-component.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    TimelineComponentComponent,
    AboutComponentComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    VerticalTimelineModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
