import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CursusInstantie } from 'src/models/cursusInstantie';
import { JsonPipe } from '@angular/common';
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
    let test = date != '' ? `?week=${date}`: '';
    console.log("Date in getAll", test);
    this.httpClient
    //I don't know if this is injectable but the backend wants a date so probably not
      .get<CursusInstantie[]>(this.url + test)
      .subscribe((cursusInstanties: CursusInstantie[]) => {
        this.cursusInstanties = cursusInstanties;
        this.subject.next(cursusInstanties);
      })
      return this.subject.asObservable();
  }
  sendImport(cursusinstanties: CursusInstantie[]): Observable<FeedbackImports>{
    return this.httpClient
      .post<FeedbackImports>(
        this.url, 
        JSON.stringify(cursusinstanties), 
        {headers:{'Content-Type': 'application/json'}})
  }
}
