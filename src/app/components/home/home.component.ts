import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISchedules } from 'src/app/models/schedules.interface';
import { SailingSchedulesService } from '../../services/sailing-schedules.service';
import { ILocation } from '../../models/location.interface';
import { SelectLocationComponent } from '../select-location/select-location.component';
import { DialogService } from '../../services/dialog/dialog.service';
import { DialogRef } from '../../services/dialog/dialog-ref';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SchedulesTableComponent } from '../schedules-table/schedules-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

// Home Component for the Sailing Schedule App.
export class HomeComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public locationList: ILocation[] = [];
  public toLocationTitle: string = 'To Location';
  public fromLocationTitle: string = 'From Location';
  public schedules: ISchedules[] = [];
  private isLocationListLoaded: boolean = false;
  private dialogRef: DialogRef;

  @ViewChild('toLocation')
  toLocation: SelectLocationComponent = new SelectLocationComponent();

  @ViewChild('fromLocation')
  fromLocation: SelectLocationComponent = new SelectLocationComponent();

  @ViewChild('schedulesTable')
  schedulesTable: SchedulesTableComponent;

  constructor(
    private sailingSchedulesService: SailingSchedulesService,
    private dialog: DialogService
  ) {}

  public get IsLocationListLoaded(): boolean {
    return this.isLocationListLoaded;
  }

  public ngOnInit(): void {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      data: 'Please Wait Locations are getting loaded....',
    });
    this.setupSubscriptions();
    this.sailingSchedulesService.fetchLocations();
  }
  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }
  public getSchedules(): void {
    const toLocationCode = this.toLocation.Location.unCode;
    const fromLocationCode = this.fromLocation.Location.unCode;
    if (toLocationCode && fromLocationCode) {
      this.dialogRef = this.dialog.open(SpinnerComponent, {
        data: 'Please Wait Schedules are getting loaded....',
      });
      this.sailingSchedulesService.fetchSchedules(
        toLocationCode,
        fromLocationCode
      );
    } else {
      this.schedulesTable.showTable = false;
      this.schedulesTable.displayMsg = 'Please Enter Valid Values.';
    }
  }

  private setupSubscriptions() {
    const s1 = this.sailingSchedulesService.getLocations$().subscribe(
      (locations: ILocation[]) => {
        locations.forEach((location) => {
          this.locationList.push(location);
        });
        this.isLocationListLoaded = true;
        this.dialogRef.close();
      },
      (error) => {
        console.log('Some Problem occured please load again.');
      }
    );
    this.subscriptions.push(s1);
    const s2 = this.sailingSchedulesService.getSchedules$().subscribe(
      (resp) => {
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      }
    );
    this.subscriptions.push(s2);
  }

  private removeSubscriptions() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
