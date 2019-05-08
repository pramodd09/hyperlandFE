import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { RegisterComponent } from '../register/register.component';
import { RegistryComponent } from './registry/registry.component';
import { PropertyCancellationComponent } from './property-cancellation/property-cancellation.component';
const transactionRoutes: Routes = [
    {path: 'bookingform', component: BookingFormComponent , data: { animation: 'bookingForm' }},
    {path: 'registryform', component: RegistryComponent , data: { animation: 'registryform' }},
    {path: 'verifytransaction', component: ViewtransactionComponent , data: { animation: 'verifytransaction' }},
    {path: 'propertycancellation', component: PropertyCancellationComponent , data: { animation: 'propertycancellation' }}

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
