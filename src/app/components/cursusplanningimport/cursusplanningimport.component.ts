import { Component, OnInit } from '@angular/core';
import { TxtFileHelper } from './TxtFileHelper';
import { TxtFileHelperObject, TxtFileHelperObjectFactory } from "src/models/txtFileHelperObject";
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service';
import { FeedbackImports } from 'src/models/FeedbackImport';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidator } from './dateValidator';

@Component({
  selector: 'app-cursusplanningimport',
  templateUrl: './cursusplanningimport.component.html',
  styleUrls: ['./cursusplanningimport.component.scss']
})
export class CursusplanningimportComponent implements OnInit {
  public processedFile: TxtFileHelperObject = TxtFileHelperObjectFactory.create();
  public feedback: FeedbackImports = {
    duplicateCursusInstanties: [],
    newCursusInstanties: [],
    outOfRangeCursusInstanties: [],
    newCursus: []
  }
  dateForm = new FormGroup({
    startDate: new FormControl(new Date, {
      validators: [Validators.required],
      nonNullable: true, 
    }),
    endDate: new FormControl(new Date, {
      validators: [Validators.required, DateValidator.dateLessThan()],      
      nonNullable: true, 
    })
  })
  get startDate() {
    return this.dateForm.controls.startDate;
  }
  get endDate() {
    return this.dateForm.controls.endDate;
  }
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
    let dateObject: {startDate: Date, endDate: Date} | null = null;
    if(this.dateForm.controls.startDate.dirty && this.dateForm.controls.endDate.dirty){
      dateObject = {startDate: this.dateForm.controls.startDate.getRawValue(), endDate: this.dateForm.controls.endDate.getRawValue() };
    }
    this.cursusinstantiesService.sendImport(this.processedFile.cursusInstanties, dateObject)
      .subscribe((x) => {
        this.feedback = x;
        console.log(this.feedback);
      });
    
  }
  ngOnInit(): void {
  }

}
