import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ISchedules } from '../../models/schedules.interface';
import { SailingSchedulesService } from '../../services/sailing-schedules.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

// Component to Display the List of Schedules for to and from location.
export class SchedulesTableComponent implements OnInit {
  public dataSource: MatTableDataSource<ISchedules>;
  public columnsToDisplay = [
    'id',
    'productType',
    'carrier.name',
    'hub.name',
    'portOfLoading.name',
  ];
  public columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  public expandedElement: ISchedules | null = null;
  public displayMsg: string =
    'Please Select To and From Location to see Schedules Table';
  public showTable: boolean = false;

  @Input() schedules: ISchedules[];

  constructor(private sailingSchedulesService: SailingSchedulesService) {
    this.dataSource = new MatTableDataSource(this.schedules);
  }

  public ngOnInit(): void {
    this.sailingSchedulesService.getSchedules$().subscribe(
      (schedules: ISchedules[]) => {
        this.schedules = [...schedules];
        if (this.schedules.length > 0) {
          this.showTable = true;
          this.initTableData();
        } else {
          this.showTable = false;
          this.displayMsg = 'No Entry Found';
        }
      },
      (err) => {
        this.displayMsg = 'No Entry Found';
      }
    );
  }

  public initTableData(): void {
    this.dataSource.data = this.schedules;
  }

  public getvalue(element: any, column: string): string {
    let obj: any = element;
    const list = column.split('.');

    list.forEach((string) => {
      obj = obj[string];
    });
    console.log(obj);
    return obj;
  }

  public camelCaseToWords(str: string) {
    return str
      .replace('.', ' ')
      .replace(/^[a-z]/g, (char) => ` ${char.toUpperCase()}`)
      .replace(/[A-Z]|[0-9]+/g, ' $&')
      .replace(/(?:\s+)/, (char) => '');
  }
}
