import { Component, OnInit } from '@angular/core';
import { TxtFileHelper } from './TxtFileHelper';


@Component({
  selector: 'app-cursusplanningimport',
  templateUrl: './cursusplanningimport.component.html',
  styleUrls: ['./cursusplanningimport.component.scss']
})
export class CursusplanningimportComponent implements OnInit {

  constructor() { }

  CheckFile(t:any){
    let helper: TxtFileHelper;
    let fileList: FileList = t.target.files;
    fileList[0].text().then(x=> {
            helper = new TxtFileHelper(x);
    })
  }
  ngOnInit(): void {
  }

}
