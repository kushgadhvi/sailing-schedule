import { Component, OnInit, Input } from '@angular/core';
import { ISchedules } from '../../models/schedules.interface';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss'],
})

// Component to Display Scedule Details.
export class ScheduleDetailsComponent implements OnInit {
  constructor() {}

  @Input() info: ISchedules;
  public displayInfo: string;

  ngOnInit(): void {}
}
