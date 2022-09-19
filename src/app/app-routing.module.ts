import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursusinstantiesComponent } from './components/cursusinstanties/cursusinstanties.component';
import { CursusplanningimportComponent } from './components/cursusplanningimport/cursusplanningimport.component';

const routes: Routes = [
  {path: 'cursusinstanties', component: CursusinstantiesComponent},
  {path: 'cursusimport', component: CursusplanningimportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
