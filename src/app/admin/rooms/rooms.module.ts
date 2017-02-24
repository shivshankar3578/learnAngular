import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RoomsRoutingModule }       from './rooms.routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsCreateComponent } from './rooms-create.component';

import { RoomService } from './rooms.service';
import { ZoneService } from '../zones/zones.service';

@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    RoomsComponent,
    RoomsCreateComponent,
  ],
  providers: [
    RoomService,
    ZoneService
  ],
  entryComponents: [
    RoomsCreateComponent
  ]
})
export class RoomsModule {}