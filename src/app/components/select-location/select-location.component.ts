import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ILocation } from '../../models/location.interface';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
})
export class SelectLocationComponent implements OnInit, AfterViewInit {
  public myControl: FormControl = new FormControl();
  public filteredOptions: ILocation[] = [];
  private subscriptions: Subscription[] = [];
  public height: string = '';

  @Input() title: string = '';
  @Input() locationList: ILocation[] = [];

  constructor() {
    // initialize form group and control.
  }

  public ngOnInit(): void {
    this.filteredOptions = this.locationList;
    this.initForm();
  }

  public ngAfterViewInit(): void {}

  public get Location(): ILocation {
    return this.myControl.value;
  }

  public displayFn(user: ILocation): string {
    return user && user.name ? user.name : '';
  }

  private initForm() {
    this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          let searchstring: string =
            typeof value === 'string' ? value : value?.name;
          // Filter the options
          this.filterData(searchstring);
          console.log(this.filteredOptions);
          if (this.filteredOptions.length < 4) {
            this.height = this.filteredOptions.length * 50 + 'px';
          } else {
            this.height = '200px';
          }
        })
      )
      .subscribe();
  }

  private filterData(enteredData: string) {
    this.filteredOptions = this.locationList.filter((item) => {
      return item.name.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
  }
}
