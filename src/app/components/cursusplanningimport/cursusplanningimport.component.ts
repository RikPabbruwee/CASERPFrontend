import { Component, OnInit } from '@angular/core';
import { TxtFileHelper } from './TxtFileHelper';
import { TxtFileHelperObject, TxtFileHelperObjectFactory } from "src/models/txtFileHelperObject";
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service';


@Component({
  selector: 'app-cursusplanningimport',
  templateUrl: './cursusplanningimport.component.html',
  styleUrls: ['./cursusplanningimport.component.scss']
})
export class CursusplanningimportComponent implements OnInit {
  public processedFile: TxtFileHelperObject = TxtFileHelperObjectFactory.create();
  
  constructor(private cursusinstantiesService: CursusinstantiesService) { }
  
  CheckFile(t:any){
    let helper: TxtFileHelper;
    let fileList: FileList = t.target.files;
    fileList[0].text().then(x=> {
            helper = new TxtFileHelper(x);
            this.processedFile = helper.Loop();
    })
  }
  sendToBackend(){
    this.cursusinstantiesService.sendImport(this.processedFile.cursusInstanties)
  }
  ngOnInit(): void {
  }

}
