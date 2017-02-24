import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard.service';
import { ZonesComponent } from './zones.component';
import { AdminComponent } from '../admin.component';

const zonesRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
          { path: 'zones', component: ZonesComponent },
        ],
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(zonesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ZonesRoutingModule {}