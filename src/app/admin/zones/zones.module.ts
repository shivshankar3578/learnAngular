import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ZonesRoutingModule }       from './zones.routing.module';
import { ZonesComponent } from './zones.component';
import { ZonesCreateComponent } from './zones-create.component';

import { ZoneService } from './zones.service';

@NgModule({
  imports: [
    CommonModule,
    ZonesRoutingModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ZonesComponent,
    ZonesCreateComponent,
  ],
  providers: [
    ZoneService
  ],
  entryComponents: [
    ZonesCreateComponent
  ]
})
export class ZonesModule {}
