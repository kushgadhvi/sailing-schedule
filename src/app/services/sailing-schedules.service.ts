import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { ILocation } from '../models/location.interface';
import { ISchedules } from '../models/schedules.interface';

//Service to get Location and Schedules.

@Injectable({
  providedIn: 'root',
})
export class SailingSchedulesService {
  private baseUrl: string = 'https://apitest.ecuworldwide.com/';
  private locations$: Subject<ILocation[]> = new Subject<ILocation[]>();
  private schedules$: Subject<ISchedules[]> = new Subject<ISchedules[]>();

  constructor(private http: HttpClient) {}

  public fetchLocations(): void {
    this.http
      .get<ILocation[]>(this.baseUrl + 'codes/locations')
      .subscribe((locations: ILocation[]) => this.locations$.next(locations));
  }

  public getLocations$(): Observable<ILocation[]> {
    return this.locations$.asObservable();
  }

  public fetchSchedules(toLocation: string, fromLocation: string): void {
    const params: HttpParams = new HttpParams()
      .set('to', fromLocation)
      .set('from', toLocation);
    this.http
      .get<ISchedules[]>(this.baseUrl + 'schedules', { params: params })
      .subscribe(
        (schedules: ISchedules[]) => this.schedules$.next(schedules),
        (err) => {
          console.log(err);
          this.schedules$.next([]);
        }
      );
  }

  public getSchedules$(): Observable<ISchedules[]> {
    return this.schedules$.asObservable();
  }
}
