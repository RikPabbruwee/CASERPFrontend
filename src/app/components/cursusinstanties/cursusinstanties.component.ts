import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service'
import { CursusInstantie } from 'src/models/cursusInstantie';
import { ActivatedRoute } from '@angular/router';
import { FavoriteWeek } from 'src/models/favoriteWeeks';
@Component({
  selector: 'app-cursusinstanties',
  templateUrl: './cursusinstanties.component.html',
  styleUrls: ['./cursusinstanties.component.scss']
})
export class CursusinstantiesComponent implements OnInit {
  cursusinstanties: CursusInstantie[] = [];
  favoriteWeeks: FavoriteWeek[] = [];
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
    private cursusinstantiesService: CursusinstantiesService,
    private route: ActivatedRoute
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
    this.getFavoriteWeeks();
    this.route.queryParams
      .subscribe(params => {
        if(params['week']){
          this.addDateForm.controls.week.setValue(parseInt(params['week']));
        }
        if(params['year']){
          this.addDateForm.controls.year.setValue(parseInt(params['year']));
        }
        this.getData();
      })
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
  addToFavoriteWeek(){
    console.log("Favorite week ADD called");
    this.cursusinstantiesService.AddToFavorite(this.week, this.year);
    this.getFavoriteWeeks();
  }
  getFavoriteWeeks(){
    this.cursusinstantiesService.getAllFavoriteWeeks()
      .subscribe((favoriteWeeks: FavoriteWeek[]) => {
        this.favoriteWeeks = favoriteWeeks;
      })
  }
}
