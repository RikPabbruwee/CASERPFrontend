import { Component, OnInit } from '@angular/core';
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service'
import { CursusInstantie } from 'src/models/cursusInstantie';

@Component({
  selector: 'app-cursusinstanties',
  templateUrl: './cursusinstanties.component.html',
  styleUrls: ['./cursusinstanties.component.scss']
})
export class CursusinstantiesComponent implements OnInit {
  cursusinstanties: CursusInstantie[] = [];
  constructor(
    private cursusinstantiesService: CursusinstantiesService
  ) { }

  ngOnInit(): void {
    this.cursusinstantiesService.getAll()
      .subscribe((cursusinstanties: CursusInstantie[]) => {
        this.cursusinstanties = cursusinstanties;
      })
  }

}
