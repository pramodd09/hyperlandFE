import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MasterAgentComponent } from './user-agent/user-agent.component';
import { MasterDailyExpenseComponent } from './dailyexpense/dailyexpense.component';
import { AddUserComponent } from './add-user/add-user.component';
const userRoutes: Routes = [
    {path: 'useragent', component: MasterAgentComponent , data: { animation: 'userAgentComponent' }},
    {path: 'daily-expenses', component: MasterDailyExpenseComponent , data: { animation: 'dailyExpenseComponent' }},
    {path: 'add-user', component: AddUserComponent , data: { animation: 'add-user' }},
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class UserRouterModule {}
