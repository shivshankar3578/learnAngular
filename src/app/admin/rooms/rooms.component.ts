import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { RoomsCreateComponent } from './rooms-create.component';
import { Observable } from 'rxjs/Observable';
import { Room } from './rooms.model';
import { RoomService } from './rooms.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
   rooms: Observable<Room[]>;
	dialogRef: MdDialogRef<RoomsCreateComponent>;

  constructor(
    private roomService: RoomService,
    public dialog: MdDialog,
    private route :ActivatedRoute,
    public viewContainerRef: ViewContainerRef
    ) {
      //const zone: Observable<string> = route.params.map(zone => zone.id);
      // const url: Observable<string> = route.url.map(segments => segments.join(''));
      // // route.data includes both `data` and `resolve`
      // const user = route.data.map(d => d.user);
   }

  ngOnInit() {
     this.route.params.subscribe(params => {
      let zoneId = +params['zoneId'];
      console.log('zoneId',zoneId);
      this.rooms = this.roomService.rooms;
      this.roomService.loadAll(zoneId);
    });

  }

 //  ngOnDestroy() {
 //      if(this.route$) this.route$.unsubscribe();
 // }

  deleteRoom(roomId: number) {
    this.roomService.remove(roomId);
  }

  openDialog() {
     console.log("openDialog called")
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.roomService.removeSingleRoom();
    this.dialogRef = this.dialog.open(RoomsCreateComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  openDialogEdit(room:Room) {
     console.log("openDialogEdit called", room)
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(RoomsCreateComponent, config);
    this.roomService.setSingleRoom(room);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


}
