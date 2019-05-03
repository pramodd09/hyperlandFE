import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmerPaymentDetailsComponent } from './farmer-payment-details/farmer-payment-details.component';
import { AssociatePaymentDetailsComponent } from './associate-payment-details/associate-payment-details.component';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

const accountsRoutes: Routes = [
    //{path: 'masterfirm', component: MasterFirmComponent , data: { animation: 'masterfirm' }},
    {path: 'farmer-payment-details', component: FarmerPaymentDetailsComponent , data: { animation: 'farmer-payment-details' }},
    {path: 'associate-payment-details', component: AssociatePaymentDetailsComponent , data: { animation: 'associate-payment-details' }},
    
];

@NgModule({
  imports: [
    RouterModule.forChild(accountsRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class AccountsRouterModule {}