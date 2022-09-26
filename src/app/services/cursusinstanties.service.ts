import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CursusInstantie } from 'src/models/cursusInstantie';
import { FeedbackImports } from 'src/models/FeedbackImport';
import { FavoriteWeek } from 'src/models/favoriteWeeks';

@Injectable({
  providedIn: 'root'
})
export class CursusinstantiesService {
  subject = new Subject<CursusInstantie[]>();
  weekSubject = new Subject<FavoriteWeek[]>();
  url: string = "https://localhost:7056/api/cursusinstantie";
  weekUrl: string = "https://localhost:7056/api/favoriteWeek"
  constructor(private httpClient: HttpClient) {    
  }
  cursusInstanties: CursusInstantie[] = [];
  favoriteWeek: FavoriteWeek[] = [];
  getAll(date: string): Observable<CursusInstantie[]> {
    let dateParameter = date != '' ? `?week=${date}`: '';
    this.httpClient
    //I don't know if this is injectable but the backend wants a date so probably not
      .get<CursusInstantie[]>(this.url + dateParameter)
      .subscribe((cursusInstanties: CursusInstantie[]) => {
        this.cursusInstanties = cursusInstanties;
        this.subject.next(cursusInstanties);
      })
      return this.subject.asObservable();
  }
  sendImport(cursusinstanties: CursusInstantie[], dateObject?: {startDate: Date, endDate: Date} | null): Observable<FeedbackImports>{
    let optionalParamaters: string = "";
    if(dateObject != null){
      console.log("Startdate: ", dateObject.startDate);
      console.log("Enddate: ", dateObject.endDate);
      optionalParamaters += `?startDate=${dateObject.startDate}`;
      optionalParamaters += `&endDate=${dateObject.endDate}`;
    }
    optionalParamaters =  optionalParamaters != '' ? optionalParamaters : ''
    return this.httpClient
      .post<FeedbackImports>(
        this.url + optionalParamaters, 
        JSON.stringify(cursusinstanties), 
        {headers:{'Content-Type': 'application/json'}})
  }
  AddToFavorite(week: number, year: number){
    this.httpClient.post(
      this.weekUrl, 
      JSON.stringify({week: week, year: year}), 
      {headers:{'Content-Type': 'application/json'}}).subscribe(x => {
        this.getAllFavoriteWeeks()
      });
  }
  getAllFavoriteWeeks(): Observable<FavoriteWeek[]>{
    this.httpClient.get<FavoriteWeek[]>(this.weekUrl)
    .subscribe((favoriteWeek: FavoriteWeek[]) => {
      this.favoriteWeek = favoriteWeek;
      this.weekSubject.next(favoriteWeek);
    })
    return this.weekSubject.asObservable();
  }
}
