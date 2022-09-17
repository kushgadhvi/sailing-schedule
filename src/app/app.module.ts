import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { SelectLocationComponent } from './components/select-location/select-location.component';
import { SailingSchedulesService } from './services/sailing-schedules.service';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleDetailsComponent } from './components/schedules-detail/schedule-details.component';
import { SchedulesTableComponent } from './components/schedules-table/schedules-table.component';
import { DatePipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectLocationComponent,
    HomeComponent,
    SchedulesTableComponent,
    ScheduleDetailsComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DatePipe,
    OverlayModule,
  ],
  providers: [SailingSchedulesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
