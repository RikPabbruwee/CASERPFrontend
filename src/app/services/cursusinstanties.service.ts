import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CursusInstantie } from 'src/models/cursusInstantie';
import { FeedbackImports } from 'src/models/FeedbackImport';

@Injectable({
  providedIn: 'root'
})
export class CursusinstantiesService {
  subject = new Subject<CursusInstantie[]>();
  url: string = "https://localhost:7056/api/cursusinstantie";
  constructor(private httpClient: HttpClient) {    
  }
  cursusInstanties: CursusInstantie[] = [];

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
}
