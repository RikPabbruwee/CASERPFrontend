import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursusinstantiesComponent } from './components/cursusinstanties/cursusinstanties.component';
import { CursusplanningimportComponent } from './components/cursusplanningimport/cursusplanningimport.component';
import { CursusinstantieTableComponent } from './components/cursusinstantie-table/cursusinstantie-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CursusinstantiesComponent,
    CursusplanningimportComponent,
    CursusinstantieTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
