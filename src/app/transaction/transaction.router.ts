import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
const transactionRoutes: Routes = [
    {path: 'bookingform', component: BookingFormComponent , data: { animation: 'bookingForm' }}
];

@NgModule({
  imports: [
    RouterModule.forChild(transactionRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class TransactionRouterModule {}
