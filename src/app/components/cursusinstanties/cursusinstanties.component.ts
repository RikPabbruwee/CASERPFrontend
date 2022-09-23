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
  minusOneWeek(){
    this.addDateForm.controls.week.setValue(this.week - 1);
    this.getData();
  }
  plusOneWeek(){
    this.addDateForm.controls.week.setValue(this.week + 1);
    this.getData();
  }
  ngOnInit(): void {
    moment.locale('nl')
    this.addDateForm.controls.week.setValue(moment().week());
    this.addDateForm.controls.year.setValue(moment().year());
    this.getData();
  }
  getData(){    
    if(this.year != 0){
      let currentDate = moment();
      let year: number = this.year == 0 ? 
        parseInt(moment().format('YYYY')) : this.year; 
      let week: number = this.week == 0 ? 
        parseInt(moment().format('ww')): this.week
      currentDate.year(year);
      currentDate.week(week);
      this.date = `${currentDate.year()}-${currentDate.month()+1}-${currentDate.date()}`;
    }
    this.cursusinstantiesService.getAll(this.date)
      .subscribe((cursusinstanties: CursusInstantie[]) => {
        this.cursusinstanties = cursusinstanties;
      })
  }
}
