import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CursusInstantie } from 'src/models/cursusInstantie';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CursusinstantiesService {
  subject = new Subject<CursusInstantie[]>();
  url: string = "https://localhost:7056/api/cursusinstantie";
  constructor(private httpClient: HttpClient) {    
  }
  cursusInstanties: CursusInstantie[] = [];

  getAll(): Observable<CursusInstantie[]> {
    this.httpClient
      .get<CursusInstantie[]>(this.url)
      .subscribe((cursusInstanties: CursusInstantie[]) => {
        this.cursusInstanties = cursusInstanties;
        this.subject.next(cursusInstanties);
      })
      return this.subject.asObservable();
  }
  sendImport(cursusinstanties: CursusInstantie[]){
    this.httpClient
      .post(this.url, JSON.stringify(cursusinstanties), {headers:{'Content-Type': 'application/json'}})
      .subscribe((x) => {
        console.log(x);
      })
  }
}
