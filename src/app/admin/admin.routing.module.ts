import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard.service';
import { AdminComponent } from './admin.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list.component';
import { UsersCreateComponent } from './users/users-create.component';
import { UsersEditComponent } from './users/users-edit.component';
import { ZonesComponent } from './zones/zones.component';
import { RoomsComponent } from './rooms/rooms.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          { 
            path: 'users', 
            component: UsersComponent, 
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
              },
              { path: 'list', component: UsersListComponent },
              { path: 'create', component: UsersCreateComponent },
              { path: 'edit', component: UsersEditComponent },
            ] 
          },
          { path: 'dashboard', component: DashboardComponent },
        ],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}