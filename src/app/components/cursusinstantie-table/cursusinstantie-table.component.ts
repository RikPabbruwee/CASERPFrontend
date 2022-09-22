import { Component, OnInit, Input } from '@angular/core';
import { CursusInstantie } from 'src/models/cursusInstantie';

@Component({
  selector: 'app-cursusinstantie-table',
  templateUrl: './cursusinstantie-table.component.html',
  styleUrls: ['./cursusinstantie-table.component.scss']
})
export class CursusinstantieTableComponent implements OnInit {
  @Input() data: CursusInstantie[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
