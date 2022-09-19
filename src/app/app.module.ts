import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursusinstantiesComponent } from './components/cursusinstanties/cursusinstanties.component';
import { CursusplanningimportComponent } from './components/cursusplanningimport/cursusplanningimport.component';

@NgModule({
  declarations: [
    AppComponent,
    CursusinstantiesComponent,
    CursusplanningimportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
