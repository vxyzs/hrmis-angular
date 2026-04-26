import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { UnauthorizedComponent } from './features/auth/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { 
      delay: 500,
      dataEncapsulation: false 
    }),
    MaterialModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }