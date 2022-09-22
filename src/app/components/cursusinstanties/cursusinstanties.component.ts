import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service'
import { CursusInstantie } from 'src/models/cursusInstantie';
@Component({
  selector: 'app-cursusinstanties',
  templateUrl: './cursusinstanties.component.html',
  styleUrls: ['./cursusinstanties.component.scss']
})
export class CursusinstantiesComponent implements OnInit {
  cursusinstanties: CursusInstantie[] = [];
  date: string = "";
  addDateForm = new FormGroup({
    week: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true, 
    }),
    year: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    })
  });
  constructor(
    private cursusinstantiesService: CursusinstantiesService
  ) { }
  get week(){
    return this.addDateForm.controls.week.getRawValue()
  }
  get year(){
    return this.addDateForm.controls.year.getRawValue()
  }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    
    if(this.year != 0){
      let t = moment();
      let year: number = this.year == 0 ? 
        parseInt(moment().format('YYYY')) : this.year; 
      let week: number = this.week == 0 ? 
        parseInt(moment().format('ww')): this.week
      console.log("Week:", week)
      t.year(year);
      t.week(week);
      console.log("moment date", t);
      this.date = `${t.year()}-${t.month()+1}-${t.date()}`;
      console.log("new date", this.date);
    }
    this.cursusinstantiesService.getAll(this.date)
      .subscribe((cursusinstanties: CursusInstantie[]) => {
        this.cursusinstanties = cursusinstanties;
      })
  }
}
