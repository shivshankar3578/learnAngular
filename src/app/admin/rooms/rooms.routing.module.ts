import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard.service';
import { RoomsComponent } from './rooms.component';
import { AdminComponent } from '../admin.component';

const roomsRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
          { path: 'zones/:zoneId/rooms', component: RoomsComponent },
        ],
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(roomsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoomsRoutingModule {}
