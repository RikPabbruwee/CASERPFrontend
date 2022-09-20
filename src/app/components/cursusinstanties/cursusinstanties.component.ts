import { AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { CursusinstantiesService } from 'src/app/services/cursusinstanties.service'
import { CursusInstantie } from 'src/models/cursusInstantie';
import {MatTableModule, MatTableDataSource} from '@angular/material/table'
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
@Component({
  selector: 'app-cursusinstanties',
  templateUrl: './cursusinstanties.component.html',
  styleUrls: ['./cursusinstanties.component.scss']
})
export class CursusinstantiesComponent implements OnInit, AfterViewInit {
  cursusinstanties: CursusInstantie[] = [];
  displayedColumns: string[] = ['Start', 'Duur', 'Titel', 'Cursisten'];
  dataSource = new MatTableDataSource(this.cursusinstanties);
  constructor(
    private cursusinstantiesService: CursusinstantiesService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  //Added "= new MatSort" may break
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngOnInit(): void {
    this.cursusinstantiesService.getAll()
      .subscribe((cursusinstanties: CursusInstantie[]) => {
        this.cursusinstanties = cursusinstanties;
      })
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
