import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MasterFirmComponent } from './master-firm/master-firm.component';
import { MasterCityComponent } from './master-city/master-city.component';
import { MasterProjectComponent } from './master-project/master-project.component';
import { MasterBlockComponent } from './master-block/master-block.component';
import { MasterTypeComponent } from './master-type/master-type.component';
import { MasterPlcComponent } from './master-plc/master-plc.component';
import { MasterLocationComponent } from './master-location/master-location.component';
import { MasterAdditionalChargesComponent } from './master-additionalcharges/master-additionalcharges.component';
import { MasterBankComponent } from './master-bank/master-bank.component';
import { MasterInvestorComponent } from './master-investor/master-investor.component';
import { MasterInvestmentComponent } from './master-investment/master-investment.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { MasterFarmerComponent } from './master-farmer/master-farmer.component';
import { MasterLandComponent } from './master-land/master-land.component';

import { TreeChecklistExample } from './master-role-configuration/role-configuration.component';

const masterRoutes: Routes = [
    {path: 'masterfirm', component: MasterFirmComponent , data: { animation: 'masterfirm' }},
    {path: 'mastercity', component: MasterCityComponent , data: { animation: 'mastercity' }},
    {path: 'masterproject', component: MasterProjectComponent , data: { animation: 'masterproject' }},
    {path: 'masterblock', component: MasterBlockComponent , data: { animation: 'masterblock' }},
    {path: 'mastertype', component: MasterTypeComponent , data: { animation: 'mastertype' }},
    {path: 'masterplc', component: MasterPlcComponent , data: { animation: 'masterplc' }},
    {path: 'masterlocation', component: MasterLocationComponent , data: { animation: 'masterlocation' }},
    {path: 'masterbank', component: MasterBankComponent , data: { animation: 'masterbank' }},
    {path: 'masteradditionalcharges', component: MasterAdditionalChargesComponent , data: { animation: 'masterAdditionalChargesComponent' }},
	{path: 'masterinvestor', component: MasterInvestorComponent , data: { animation: 'masterinvestor' }},
    {path: 'masterinvestment', component: MasterInvestmentComponent , data: { animation: 'masterinvestment' }},
    {path: 'expensecategory', component: ExpenseCategoryComponent , data: { animation: 'expensecategory' }},
    {path: 'farmer', component: MasterFarmerComponent , data: { animation: 'farmer' }},
    {path: 'land', component: MasterLandComponent , data: { animation: 'land' }},
    {path: 'role', component: TreeChecklistExample , data: { animation: 'role' }}

];

@NgModule({
  imports: [
    RouterModule.forChild(masterRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class MasterRouterModule {}
