import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AdminModule }            from './admin/admin.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard.service';

import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFindComponent } from './page-not-find/page-not-find.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFindComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AdminModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
