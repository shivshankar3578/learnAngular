import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFindComponent } from './page-not-find/page-not-find.component';

const appRoutes: Routes = [
	{
	  path: '',
	  redirectTo: '/home',
	  pathMatch: 'full'
	},
  { 
  	path: 'login', 
  	component: LoginComponent 
  },
  { 
  	path: 'home', 
  	component: HomeComponent 
  },
  { 
  	path: '**', 
  	component: PageNotFindComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}