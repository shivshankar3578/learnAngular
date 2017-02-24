import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {MaterialModule} from '@angular/material';

import { AdminComponent }           from './admin.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UsersComponent } from './users/users.component';
import { ZonesModule }       from './zones/zones.module';
import { RoomsModule }       from './rooms/rooms.module';
import { AdminRoutingModule }       from './admin.routing.module';
import { UsersListComponent } from './users/users-list.component';
import { UsersCreateComponent } from './users/users-create.component';
import { UsersEditComponent } from './users/users-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ZonesModule,
    RoomsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavBarComponent,
    SideBarComponent,
    AdminComponent,
    UsersComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent,
  ]
})
export class AdminModule {}