import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ZonesCreateComponent } from './zones-create.component';
import { Observable } from 'rxjs/Observable';
import { Zone } from './zones.model';
import { ZoneService } from './zones.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})

export class ZonesComponent implements OnInit {
  zones: Observable<Zone[]>;
	dialogRef: MdDialogRef<ZonesCreateComponent>;
  
  constructor(
    private zoneService: ZoneService,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef
    ) {}
  
  ngOnInit() {
    this.zones = this.zoneService.zones;
    
    this.zoneService.loadAll();
  }
  

  
  deleteZone(zoneId: number) {
    this.zoneService.remove(zoneId);
  }
  
  openDialog() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.zoneService.removeSingleZone();
    this.dialogRef = this.dialog.open(ZonesCreateComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  openDialogEdit(zone:Zone) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(ZonesCreateComponent, config);
    this.zoneService.setSingleZone(zone);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  

}
