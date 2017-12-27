import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { RandomStoreComponent }  from './random-store/random-store.component';

const routes: Routes = [
  { path: 'dashboard', redirectTo: '/dashboard/stores', pathMatch: 'full' },
  { path: '', redirectTo: '/randomStore', pathMatch: 'full' },
  { path: 'dashboard/:content', component: DashboardComponent },
  { path: 'randomStore', component: RandomStoreComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {
    
}