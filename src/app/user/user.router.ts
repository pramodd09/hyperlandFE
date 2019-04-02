import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MasterAgentComponent } from './user-agent/user-agent.component';
const userRoutes: Routes = [
    {path: 'useragent', component: MasterAgentComponent , data: { animation: 'userAgentComponent' }}
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
