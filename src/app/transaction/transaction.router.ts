import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { RegisterComponent } from '../register/register.component';
import { RegistryComponent } from './registry/registry.component';
const transactionRoutes: Routes = [
    {path: 'bookingform', component: BookingFormComponent , data: { animation: 'bookingForm' }},
    {path: 'registryform', component: RegistryComponent , data: { animation: 'registryform' }},
    {path: 'verifytransaction', component: ViewtransactionComponent , data: { animation: 'verifytransaction' }}

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
